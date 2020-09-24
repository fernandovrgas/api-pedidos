const Carrinho = require('../models/Carrinho'),
	  Usuario = require('../models/Usuario'),
	  Produto = require('../models/Produto')
;

module.exports = {
	/**
	 * Retorna a soma de dois números
	 *
	 * @author fernando.vargas
	 * @since 22/09/2020
	 */
	async add(req, res) {
		const token = req.headers.token;
		if (!token) {
			return res.status(400).json({ error: "Token inválido" });
		}

		if (!req.body.produto_id || !req.body.quantidade) {
			return res.status(400).json({ error: "Informe os campos produto_id e quantidade no corpo da requisição!" });
		}

		// garantir que quantidade seja um inteiro
		if (!Number.isInteger(req.body.quantidade)) {
			return res.status(400).json({ error: "O campo quantidade precisar ser um número inteiro!" });
		}

		try {
			// TODO - Controle por token - Melhorar a forma como o token é gerido. Desta forma possivelmente não funcionará com dois logins simultaneos
			const usuario = await Usuario.findAll({ where: { token }, plain: true });
			if (!usuario) {
				return res.status(400).json({ error: "Token inválido" });
			}

			const produto = await Produto.findByPk(req.body.produto_id);
			if (!produto) {
				return res.status(400).json({ error: 'Produto não encontrado' });
			}

			// se usuário não tem carrinho criaremos uma única vez por usuário
			const [ carrinho ] = await Carrinho.findOrCreate({
				where: { usuario_id: usuario.id }
			});

			// método auxiliar que inserir produto para carrinho
			await produto.addCarrinho(carrinho, { through: { quantidade: req.body.quantidade } });

			return res.json(carrinho.id);
		} catch (err) {
            return res.status(400).json({ error: "Falha no registro do carrinho " + err });
        }
	}
}