const express = require("express"),
	  routes = express.Router(),
	  CarrinhoController = require('./controllers/CarrinhoController'),
	  PedidoController = require('./controllers/PedidoController'),
	  ProdutoController = require('./controllers/ProdutoController'),
	  UsuarioController = require('./controllers/UsuarioController'),
      authMiddleware = require("./middlewares/auth")
;

// ======== Rotas privadas ====================
// Produtos
routes.get('/produtos', authMiddleware, ProdutoController.index);
routes.get('/produtos/:id', authMiddleware, ProdutoController.show);
routes.post('/produtos', authMiddleware, ProdutoController.create);
routes.put('/produtos/:id', authMiddleware, ProdutoController.update);
routes.delete('/produtos/:id', authMiddleware, ProdutoController.delete);

routes.post('/carrinhos', authMiddleware, CarrinhoController.add);

// Pedidos
routes.get('/pedidos', authMiddleware, PedidoController.index);
routes.post('/pedidos', authMiddleware, PedidoController.checkout);
routes.put('/pedidos/:id', authMiddleware, PedidoController.update);


// ======== Rotas pública ====================
// Usuarios
routes.post("/usuarios/create", UsuarioController.create);
routes.post("/usuarios/auth", UsuarioController.authenticate);

module.exports = routes;