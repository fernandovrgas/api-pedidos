'use strict';

// TODO - Talvez exista uma forma de criar a coluna do banco referenciando o ENUM do config para STATUS
module.exports = {
	up(queryInterface, Sequelize) {
	  	return Promise.all([
			queryInterface.addColumn('pedidos', 'status', {
				type: Sequelize.INTEGER,
				allowNull: false
			}),
			queryInterface.addColumn('pedidos', 'valor_total', {
				type: Sequelize.DECIMAL(10,2),
				allowNull: false
			})
		]);
	},

	down: function (queryInterface, Sequelize) {
		return [
		  queryInterface.removeColumn('pedidos', 'status'),
		  queryInterface.removeColumn('pedidos', 'valor_total')
		];
	}
};