var db_conf = require('../conf/db.js');
var mongoat = require('mongoat')(db_conf.db_name, db_conf.host, db_conf.port);
var build = require('../lib/build.js');
var get_key_from_url = require('../lib/get_key_from_url.js');
var build_days = 500;
var query = require('../lib/query.js');

/*
 * Query functional test
 */

var URL = 'http://youtu.be/D3rOjkSho0A';
var EXPECTED_RESULTS = 3;

var query_graph = function(e, db_client, graph){
  var key = get_key_from_url(URL);
  query(key, db_client, mongoat.do_query, graph, function(e, results){
    if (!e && results.length===EXPECTED_RESULTS){
      console.log('PASS: got', EXPECTED_RESULTS, 'results for', URL);
      process.exit();
    } else {
      console.error(e);
      process.exit();
    }
  });
};

mongoat.db.open(function(e, db_client){
  build(db_client, build_days, mongoat.do_query, function(e, graph){
    query_graph(e, db_client, graph);
  });
});
