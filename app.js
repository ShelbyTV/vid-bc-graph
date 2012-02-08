var DAYS = process.argv[2];
if (!DAYS){
  console.error('Specify graph size in days');
  process.exit();
}

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , server_conf = require('./conf/server.js')
  , db_conf = require('./conf/db.js')
  , mongoat = require('mongoat')(db_conf.db_name, db_conf.host, db_conf.port)
  , build = require('./lib/build.js')
  , sort = require('./lib/sort.js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

mongoat.db.open(function(e, db_client){
  build(db_client, DAYS, mongoat.do_query, function(e, graph){
    var resources = {
      graph : graph,
      do_query : mongoat.do_query,
      db_client : db_client,
      popularity : Object.keys(graph)
    };
    sort(resources.popularity, resources.graph);
    //Routes
    app.get('/query', function(req, res){
      routes.query(resources, req, res);
    });
    app.get('/rebuild', function(req, res){
      routes.rebuild(resources, req, res, function(e, _graph){
        resources.graph = _graph;
        resources.popularity = Object.keys(resources.graph);
        sort(resources.popularity, resources.graph);
        //and sort popularity w/ new graph
        res.end(JSON.stringify({e:e, size:Object.keys(resources.graph).length}));
      });
    });
    app.get('/popular', function(req, res){
      routes.popular(resources, req, res);
    });

    app.listen(server_conf.port);
    console.log("Graph with "+Object.keys(resources.graph).length+" nodes listening on port %d in %s mode", app.address().port, app.settings.env);
  });

});
