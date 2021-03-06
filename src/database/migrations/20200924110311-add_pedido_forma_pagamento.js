'use strict';

// TODO - Talvez exista uma forma de criar a coluna do banco referenciando o ENUM do config para  FORMA_PAGAMENTO
module.exports = {
	up(queryInterface, Sequelize) {
	  	return Promise.all([
			queryInterface.addColumn('pedidos',
		  		'forma_pagamento', {
					type: Sequelize.INTEGER,
					allowNull: false,
		  		}
			)
		]);
	},

	down(queryInterface, Sequelize) {
	  	return Promise.all([queryInterface.removeColumn('pedidos', 'forma_pagamento')]);
	}
};