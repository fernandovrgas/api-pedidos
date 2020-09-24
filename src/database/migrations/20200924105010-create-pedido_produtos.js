'use strict';

module.exports = {
  	up: (queryInterface, Sequelize) => {
    	return queryInterface.createTable('pedido_produtos', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			pedido_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'pedidos', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			produto_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'produtos', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			quantidade: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			preco: {
				type: Sequelize.DECIMAL(10,2),
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			}
		});
	},

	down: (queryInterface, Sequelize) => {
    	return queryInterface.dropTable('pedido_produtos');
  	}
};