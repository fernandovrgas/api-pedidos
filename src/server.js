const express = require('express'),
	  config = require('./config/config'),
	  routes = require('./routes'),
	  cors = require('cors'),
	  app = express()
;

require('./database');

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(config.server.port);