const { Model, DataTypes } = require('sequelize'),
	  sequelizePaginate = require('sequelize-paginate')
;

class Pedido extends Model {
	static init(sequelize) {
		super.init({
			usuario_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: sequelize.models.Usuario,
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

		this.sequelize.define('pedido_produtos', {
			quantidade: DataTypes.INTEGER,
			preco: DataTypes.DECIMAL(10,2)
		});

		this.belongsToMany(models.Produto, { foreignKey: 'pedido_id', through: 'pedido_produtos', as: 'produtos' });
	}
}

sequelizePaginate.paginate(Pedido);

module.exports = Pedido;