const express = require("express"),
	  routes = express.Router(),
	  ProdutoController = require('./controllers/ProdutoController')
;

routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id', ProdutoController.show);
routes.post('/produtos', ProdutoController.create);
routes.put('/produtos/:id', ProdutoController.update);
routes.delete('/produtos/:id', ProdutoController.delete);

module.exports = routes;