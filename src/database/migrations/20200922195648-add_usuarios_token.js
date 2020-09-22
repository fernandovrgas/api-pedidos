'use strict';

module.exports = {
	up(queryInterface, Sequelize) {
	  	return Promise.all([
			queryInterface.addColumn('usuarios', // table name
		  		'token', {// new field name
					type: Sequelize.STRING,
					allowNull: true,
		  		}
			),
		]);
	},

	down(queryInterface, Sequelize) {
	  	return Promise.all([queryInterface.removeColumn('usuarios', 'token')]);
	}
};