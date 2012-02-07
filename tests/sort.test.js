var mongoat = require('mongoat');
var build = require('../lib/build.js');
var sort = require('../lib/sort.js');
var build_size = 1000;

mongoat.db.open(function(e, db_client){
  build(db_client, build_size, mongoat.do_query, function(e, graph){
    var graph_keys = Object.keys(graph);  
    sort(graph_keys, graph);
    graph_keys.forEach(function(key){
      console.log(graph[key].length);
    });
  });
});
