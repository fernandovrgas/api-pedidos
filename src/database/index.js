const Sequelize = require('sequelize'),
	  dbConfig = require('../config/database'),
	  connection = new Sequelize(dbConfig),
	  Produto = require('../models/Produto'),
	  Usuario = require('../models/Usuario')
;

Produto.init(connection);
Usuario.init(connection);

module.exports = connection;