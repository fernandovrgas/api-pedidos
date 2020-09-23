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
			  pedido = []
		;

		if (!token) {
			return res.status(400).json({ error: "Token inválido" });
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

			pedido.formaPagamento = req.body.formaPagamento;
			pedido.endereco = usuario.endereco;
			pedido.valorTotal = valorTotal;
			pedido.status = config.enums.statusPedido.novo;

			carrinho.forEach(produto => {
				//inserir produto no pedido_produto e remover do carrinho produto
				//console.log(produto.carrinho_produtos);
			});

			return res.json(carrinho);
		} catch (err) {
            return res.status(400).json({ error: "Falha no registro do pedido " + err });
        }

		return res.json(token);
	}
}