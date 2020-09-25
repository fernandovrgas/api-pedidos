const config = require('../config/config'),
	  Carrinho = require('../models/Carrinho'),
	  Pedido = require('../models/Pedido'),
	  Usuario = require('../models/Usuario')
;

module.exports = {
	/**
	 * Recebe o token do usuario. Lista pedido e itens se pedido for do usuário logado.
	 *
	 * @author fernando.vargas
	 * @since 22/09/2020
	 */
	async index(req, res) {
		const token = req.headers.token,
			  { page = 1 } = req.query, // parametro da pagina a pesquisar default 1
			  paginate = config.enums.limitPaginacaoPedido // registros por pagina,
		;

		// TODO - Controle por token - Melhorar a forma como o token é gerido. Desta forma possivelmente não funcionará com dois logins simultaneos
		const usuario = await Usuario.findAll({ where: { token }, plain: true });
		if (!usuario) {
			return res.status(400).json({ error: "Token inválido" });
		}

		let where = { usuario_id: usuario.id };
		if (req.body.pendentes) {
			where = { usuario_id: usuario.id, status: [
				config.enums.statusPedido.novo,
				config.enums.statusPedido.aceito,
				config.enums.statusPedido.saiu_para_entrega
			]};
		}

		const pedidos = await Pedido.paginate({
			page, paginate,
			attributes: ['id', 'status', 'valor_total', 'createdAt' ],
			where: where,
			order: [['createdAt', 'ASC']],
			include: {
				association: 'produtos',
				attributes: ['nome'],
				through: {
					attributes: []
			 	}
			}
		});

		return res.json(pedidos);
	},

	/**
	 * Recebe o token do usuario. Busca todos os itens do carrinho e fecha o pedido.
	 * Depois do pedido fechado os itens do carrinho do usuário serão limpos
	 *
	 * @author fernando.vargas
	 * @since 22/09/2020
	 */
	async checkout(req, res) {
		const token = req.headers.token;

		if (!req.body.endereco_entrega) {
			return res.status(400).json({ error: "O campo endereco_entrega é obrigatório" });
		}

		if (!req.body.forma_pagamento) {
			return res.status(400).json({ error: "O campo forma_pagamento é obrigatório" });
		}

		if (req.body.forma_pagamento != config.enums.formaPagamento.dinheiro &&
			req.body.forma_pagamento != config.enums.formaPagamento.cartao) {
				return res.status(400).json({ error: "A forma de pagamento informa é inválida" });
		}

		// validar os campos do pedido
		try {
			// TODO - Controle por token - Melhorar a forma como o token é gerido. Desta forma possivelmente não funcionará com dois logins simultaneos
			const usuario = await Usuario.findAll({ where: { token }, plain: true });
			if (!usuario) {
				return res.status(400).json({ error: "Token inválido" });
			}

			// TODO - Melhorar a forma como o retorno de dados vem. O ideial seria cada linha conter carrinho_produtos com quantidade
			const carrinho = await Carrinho.findAll({
				attributes: ['id', 'usuario_id'],
				where: { usuario_id: usuario.id },
				include: { association: 'produtos'},
				plain: true
			});

			if (!carrinho) {
				return res.status(400).json({ error: "Carrinho não existe ou não possui produtos selecionados" });
			}

			const valorTotal = carrinho.produtos.reduce( function( prevVal, elem ) {
				console.log(elem);
				return parseFloat(prevVal) + (parseFloat(elem.preco) * parseFloat(elem.carrinho_produtos.quantidade));
			}, 0);

			if (valorTotal < config.enums.valorMinimoPedido) {
				return res.status(400).json({ error: "O valor mínimo para fechar o pedido é de R$ " + config.enums.valorMinimoPedido + "!" });
			}

			const pedido = await Pedido.create({
				forma_pagamento: req.body.forma_pagamento,
				endereco_entrega: req.body.endereco_entrega,
				valor_total: valorTotal,
				status: config.enums.statusPedido.novo,
				usuario_id: usuario.id
			});

			carrinho.produtos.forEach(async produto => {
				try {
					await pedido.addProdutos(produto.id, {
						through: {
							quantidade: produto.carrinho_produtos.quantidade,
							preco: produto.preco
						}
					});
					await carrinho.removeProdutos(produto.id);
				} catch {}
			});

			return res.json(pedido);
		} catch (err) {
            return res.status(400).json({ error: "Falha no registro do pedido " + err });
        }
	},

	/**
	 * Atualizar status do pedido
	 *
	 * @author fernando.vargas
	 * @since 22/09/2020
	 */
	async update(req, res) {
		if (!req.body.status) {
			return res.status(400).json({ error: 'Informe o novo Status para o Pedido' });
		}

		// garantir que quantidade seja um inteiro
		if (!Number.isInteger(req.body.status)) {
			return res.status(400).json({ error: "O campo Status precisa ser um número inteiro!" });
		}

		if ((req.body.status > 5) || (req.body.status <= 0)) {
			return res.status(400).json({ error: 'Status informado é inválido' });
		}

		let pedido = await Pedido.update({status: req.body.status}, {
			where: { id: req.params.id }
		});

		if (!pedido) {
			return res.status(400).json({ error: 'Pedido não atualizado' });
		}

		pedido = await Pedido.findByPk(req.params.id);

		return res.json(pedido);
	},
}