const Usuario = require('../models/Usuario'),
	  bcrypt = require("bcryptjs")
;

module.exports = {
    async create(req, res) {
		const { email, telefone } = req.body;

        try {
			let usuarioExiste = await Usuario.findAll({ where: { email }, plain: true });
			if (usuarioExiste) {
               return res.status(400).json({ error: "E-mail já vinculado em um usuário" });
			}

			usuarioExiste = await Usuario.findAll({ where: { telefone }, plain: true });
			if (usuarioExiste) {
               return res.status(400).json({ error: "Telefone já vinculado em um usuário" });
			}

			const dadosUsuario = req.body;
			dadosUsuario.senha = await bcrypt.hash(dadosUsuario.senha, 8);

            const usuario = await Usuario.create(req.body);

            return res.json({ usuario });
        } catch (err) {
            return res.status(400).json({ error: "Falha no registro do usuário" });
        }
    },

    async authenticate(req, res) {
        try {
			const { email, telefone, senha } = req.body;
			let usuario = null;

			// autenticacao por email ou telefone. Prioridade no e-mail
			if (email) {
				usuario = await Usuario.findAll({ where: { email }, plain: true });
			} else if (telefone) {
				usuario = await Usuario.findAll({ where: { telefone }, plain: true });
			}

            if (!usuario) {
            	return res.status(400).json({ error: "Usuário não encontrado" });
			}

            if (!(await usuario.compareHash(senha))) {
            	return res.status(400).json({ error: "Senha Inválida" });
            }

            return res.json({ token: usuario.generateToken() });
        } catch (err) {
            return res.status(400).json({ error: "Falha na autenticação" });
        }
	}
}