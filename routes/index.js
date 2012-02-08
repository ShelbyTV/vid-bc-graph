var query = require('../lib/query.js');
var get_key_from_url = require('../lib/get_key_from_url');
var build = require('../lib/build.js');
var get_popular = require('../lib/get_popular.js');

/*
 * GET home page.
 */

var success = function(e, data, res){
  res.end(JSON.stringify({e:e, data:data}));
};

exports.query = function(r, req, res){
  var key = get_key_from_url(req.query.url);
  query(key, r.db_client, r.do_query, r.graph, function(e, data){
    success(e, data, res);
  }); 
};

exports.popular = function(r, req, res){
  get_popular(r, req, res);  
};

exports.rebuild = function(r, req, res, cb){
  console.log('rebuilding graph, covering ', req.query.days, ' days');
  build(r.db_client, req.query.days, r.do_query, cb);  
};
