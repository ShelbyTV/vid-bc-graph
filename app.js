
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongoat = require('mongoat')
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
  var build_size = 1000;
  build(db_client, build_size, mongoat.do_query, function(e, graph){
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

    app.listen(3000);
    console.log("Graph with "+Object.keys(resources.graph).length+" nodes listening on port %d in %s mode", app.address().port, app.settings.env);
  });

});