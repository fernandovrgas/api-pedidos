const jwt = require("jsonwebtoken"),
      { promisify } = require("util")
;

module.exports = async (req, res, next) => {
	const token = req.headers.token;

	console.log(token);

    if (!token) {
        return res.status(401).send({ error: "Nenhum token registrado" });
    }

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

        req.userId = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).send({ error: "Token inválido" });
    }
};