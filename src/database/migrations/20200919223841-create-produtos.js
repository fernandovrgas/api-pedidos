'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
    	await queryInterface.createTable('produtos', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},

			nome: {
				type: Sequelize.STRING,
				allowNull: false
			},

			descricao: {
				type: Sequelize.STRING,
				allowNull: false
			},

			preco: {
				type: Sequelize.DECIMAL(10,2),
				allowNull: false
			},

			imagem: {
				type: Sequelize.STRING,
				allowNull: true
			},

			tags: {
				type: Sequelize.STRING,
				allowNull: true
			},

			status: {
				type: Sequelize.STRING(1),
				allowNull: true
			},

			created_at: {
				type: Sequelize.DATE,
				allowNull: false
			},

			updated_at: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
  	},

  	down: async (queryInterface, Sequelize) => {
     	await queryInterface.dropTable('produtos');
  	}
};