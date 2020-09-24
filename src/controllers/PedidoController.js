const config = require('../config/config'),
	  Carrinho = require('../models/Carrinho'),
	  Pedido = require('../models/Pedido'),
	  Produto = require('../models/Produto'),
	  Usuario = require('../models/Usuario')
;

module.exports = {
	/**
	 * Recebe o token do usuario. Busca todos os itens do carrinho e fecha o pedido.
	 * Depois do pedido fechado os itens do carrinho do usuário serão limpos
	 *
	 * @author fernando.vargas
	 * @since 22/09/2020
	 */
	async checkout(req, res) {
		const token = req.headers.token,
			  dataPedido = {}
		;

		if (!token) {
			return res.status(400).json({ error: "Token inválido" });
		}

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
			let carrinho = await Carrinho.findAll({
				attributes: ['id'],
				where: { usuario_id: usuario.id },
				include: { association: 'produtos'},
			});

			if (!carrinho) {
				return res.status(400).json({ error: "Carrinho não existe ou não possui produtos selecionados" });
			}

			const carrinho_id = carrinho[0].id;

			//carrinho = await carrinho.getProdutos();
			carrinho = JSON.parse(JSON.stringify(carrinho[0].produtos));

			const valorTotal = carrinho.reduce( function( prevVal, elem ) {
				return parseFloat(prevVal) + parseFloat(elem.preco);
			}, 0);

			if (valorTotal < config.enums.valorMinimoPedido) {
				return res.status(400).json({ error: "O valor mínimo para fechar o pedido é de R$ " + config.enums.valorMinimoPedido + "!" });
			}

			dataPedido.forma_pagamento = req.body.forma_pagamento;
			dataPedido.endereco_entrega = req.body.endereco_entrega;
			dataPedido.valor_total = valorTotal;
			dataPedido.status = config.enums.statusPedido.novo;
			dataPedido.usuario_id = usuario.id;

			const pedido = await Pedido.create(dataPedido);

			carrinho.map(async produto => {
				try {
					await pedido.addProdutos(pedido, {
						through: {
							produto_id: produto.carrinho_produtos.produto_id,
							quantidade: produto.carrinho_produtos.quantidade,
							preco: produto.preco
						}
					});
				} catch(err) {
					return res.status(400).json({ error: "Falha no registro do produto do pedido " + err });
				}
			});

			return res.json(pedido.id);
		} catch (err) {
            return res.status(400).json({ error: "Falha no registro do pedido " + err });
        }
	}
}