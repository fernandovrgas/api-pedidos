const express = require('express'),
	  bodyParser = require("body-parser"),
	  cookieParser = require('cookie-parser'),
	  config = require('./config/config'),
	  routes = require('./routes'),
	  cors = require('cors'),
	  app = express()
;

require('./database');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(routes);

app.listen(config.server.port);