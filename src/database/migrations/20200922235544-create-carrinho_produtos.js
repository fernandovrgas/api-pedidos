'use strict';

module.exports = {
  	up: (queryInterface, Sequelize) => {
    	return queryInterface.createTable('carrinho_produtos', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
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
    	return queryInterface.dropTable('carrinho_produtos');
  	}
};