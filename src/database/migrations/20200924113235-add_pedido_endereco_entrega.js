'use strict';

module.exports = {
	up(queryInterface, Sequelize) {
	  	return Promise.all([
			queryInterface.addColumn('pedidos',
		  		'endereco_entrega', {
					type: Sequelize.STRING,
					allowNull: false,
		  		}
			)
		]);
	},

	down(queryInterface, Sequelize) {
	  	return Promise.all([queryInterface.removeColumn('pedidos', 'forma_pagamento')]);
	}
};