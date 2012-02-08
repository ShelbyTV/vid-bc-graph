var get_skip = require('./get_skip.js');
/*
 * Build : build the vid-bc graph
 */

var BAD_DOC_KEY = 'bad_docs';

var get_query_options = function(db_client, limit, cb){
  return cb(null, {
    collection : 'broadcasts',
    params : {},
    options : {limit : limit}
  });
  /*get_skip(db_client, limit, function(e, skip){
    var opts = {
      collection : 'broadcasts',
      params : {},
      options : {skip : skip}
    };
    return cb(e, opts);
  });*/
};

var get_key = function(bcast){
  if (!bcast.video_provider_name || !bcast.video_id_at_provider){
    return false;
  }
  return bcast.video_provider_name+bcast.video_id_at_provider;
};

var insert_bcast = function(graph, key, bcast){
  if (graph.hasOwnProperty(key)){
    return graph[key].push(bcast._id);
  }
  return graph[key] = [bcast._id];
};


module.exports = function(db_client, size, do_query, cb){
  var graph = {};
  get_query_options(db_client, size, function(e, query_options){
    do_query(db_client, query_options, function(e, docs){
      if (e) return cb(e);
      docs.forEach(function(doc){
        var key = get_key(doc);
        if (key){
          insert_bcast(graph, key, doc);
        }
      })
      return cb(null, graph);    
    });
  });  
};
