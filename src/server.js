const express = require('express'),
	  routes = require('./routes'),
	  app = express(),
	  config = require('./config/config')
;

require('./database');

app.use(express.json());
app.use(routes);


app.listen(config.server.port);