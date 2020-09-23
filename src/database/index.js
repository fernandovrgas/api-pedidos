const Sequelize = require('sequelize'),
	  dbConfig = require('../config/database'),
	  connection = new Sequelize(dbConfig),
	  Carrinho = require('../models/Carrinho'),
	  Pedido = require('../models/Pedido'),
	  Produto = require('../models/Produto'),
	  Usuario = require('../models/Usuario')
;

Carrinho.init(connection);
Pedido.init(connection);
Produto.init(connection);
Usuario.init(connection);

Carrinho.associate(connection.models);
Pedido.associate(connection.models);
Produto.associate(connection.models);
Usuario.associate(connection.models);

module.exports = connection;