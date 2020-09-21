const express = require("express"),
	  routes = require('./routes'),
	  app = express()
;

require('./database');

app.use(express.json());
app.use(routes);


app.listen(3333);