const { Model, DataTypes } = require('sequelize');

class Pedido extends Model {
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
		this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuarios' });

		let PedidoProduto = this.sequelize.define('pedido_produtos', {
			quantidade: DataTypes.INTEGER
		});

		this.belongsToMany(models.Produto, { foreignKey: 'pedido_id', through: 'pedido_produtos', as: 'pedidos' });
	}
}

module.exports = Pedido;