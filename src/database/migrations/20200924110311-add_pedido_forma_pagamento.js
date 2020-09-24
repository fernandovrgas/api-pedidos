'use strict';

// TODO - Talvez exista uma forma de criar a coluna do banco referenciando o ENUM do config
module.exports = {
	up(queryInterface, Sequelize) {
	  	return Promise.all([
			queryInterface.addColumn('pedidos', // table name
		  		'forma_pagamento', {// new field name
					type: Sequelize.INTEGER,
					allowNull: true,
		  		}
			)
		]);
	},

	down(queryInterface, Sequelize) {
	  	return Promise.all([queryInterface.removeColumn('pedidos', 'forma_pagamento')]);
	}
};