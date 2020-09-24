const { Model, DataTypes } = require('sequelize');

class Pedido extends Model {
	static init(sequelize) {
		super.init({
			usuario_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: sequelize.models.Pedido,
                    key: 'id'
                }
			},
			forma_pagamento: DataTypes.INTEGER,
			valor_total: DataTypes.DECIMAL(10,2),
			endereco_entrega: DataTypes.STRING,
			status: DataTypes.INTEGER
		}, { sequelize });
	}

	static associate(models) {
		this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuarios' });

		let PedidoProduto = this.sequelize.define('pedido_produtos', {
			quantidade: DataTypes.INTEGER,
			preco: DataTypes.DECIMAL(10,2)
		});

		this.belongsToMany(models.Produto, { foreignKey: 'pedido_id', through: 'pedido_produtos', as: 'produtos' });
	}
}

module.exports = Pedido;