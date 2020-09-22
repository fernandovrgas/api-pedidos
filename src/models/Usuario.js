const { Model, DataTypes } = require('sequelize'),
      jwt = require("jsonwebtoken"),
      bcrypt = require("bcryptjs")
;

require("dotenv-safe").config();

class Usuario extends Model {
	static init(sequelize) {
		super.init({
			nome: DataTypes.STRING,
			email: DataTypes.STRING,
			telefone: DataTypes.STRING,
			senha: DataTypes.STRING,
			endereco: DataTypes.STRING,
			token: DataTypes.STRING
		}, { sequelize });
	}

	async compareHash(hash) {
        return await bcrypt.compare(hash.toString(), this.senha);
    }

    generateToken() {
        return jwt.sign({ id: this.id }, process.env.SECRET, {
            expiresIn: 43200
        });
	}
}

module.exports = Usuario;