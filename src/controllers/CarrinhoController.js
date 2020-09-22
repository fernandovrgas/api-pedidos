const Carrinho = require('../models/Carrinho'),
	  Usuario = require('../models/Usuario')
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

		try {
			let usuario = await Usuario.findAll({ where: { token }, plain: true });
			if (!usuario) {
				return res.status(400).json({ error: "Token inválido" });
			}

			const usuario_id = usuario.id;
			// se usuário não tem carrinho criaremos uma única vez por usuário
			let carrinho = await Carrinho.findAll({ where: { usuario_id }, plain: true });

			if (!carrinho) {
				carrinho = await Carrinho.create({ usuario_id });
			}

			return res.json(carrinho.id);
		} catch (err) {
            return res.status(400).json({ error: "Falha no registro do usuário " + err });
        }
	}
}