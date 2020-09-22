const { Model, DataTypes } = require('sequelize');

class Carrinho extends Model {
	static init(sequelize) {
		super.init({
			usuario_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: sequelize.models.Usuario,
                    key: 'id'
                }
            }
		}, { sequelize });
	}

	static associate(models) {
		this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
	}
}

module.exports = Carrinho;