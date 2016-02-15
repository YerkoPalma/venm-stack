// server.js

  // set up ====================================================================
  import express from 'express'
  var app             = express();                    // create our app w/ express
  var mongoose        = require('mongoose');          // mongoose for mongodb
  var morgan          = require('morgan');            // log requests to the console (express4)
  var bodyParser      = require('body-parser');       // pull information from HTML POST (express4)
  var methodOverride  = require('method-override');   // simulate DELETE and PUT (express4)
  var http            = require('http');
  var port            = process.env.PORT || 8080;
  var ip              = process.env.IP || "127.0.0.1";
  var environment     = process.env.NODE_ENV || "development";
  import database from './config/database'
  import {routes} from './app/routes'

  // configuration =============================================================

  mongoose.connect(database.dev);                                 // connect to mongoDB database
  app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
  app.use(morgan('dev'));                                         // log every request to the console
  app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                                     // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(methodOverride());
  
  // routes ====================================================================
  routes(app);
  
  // listen (start app with node server.js) ====================================
  app.set('port', port);
  app.set('ip', ip);
  
  // launch ====================================================================
  http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
  });