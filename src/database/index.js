const Sequelize = require('sequelize'),
	  dbConfig = require('../config/database'),
	  connection = new Sequelize(dbConfig),
	  Produto = require('../models/Produto')
;

Produto.init(connection);

module.exports = connection;