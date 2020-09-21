const express = require("express"),
	  routes = express.Router(),
	  ProdutoController = require('./controllers/ProdutoController'),
	  UsuarioController = require('./controllers/UsuarioController'),
      authMiddleware = require("./middlewares/auth")
;

routes.get('/produtos', authMiddleware, ProdutoController.index);
routes.get('/produtos/:id', authMiddleware, ProdutoController.show);
routes.post('/produtos', authMiddleware, ProdutoController.create);
routes.put('/produtos/:id', authMiddleware, ProdutoController.update);
routes.delete('/produtos/:id', authMiddleware, ProdutoController.delete);

// Users
routes.post("/usuarios/create", UsuarioController.create);
routes.post("/usuarios/auth", UsuarioController.authenticate);

module.exports = routes;