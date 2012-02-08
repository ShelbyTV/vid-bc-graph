var get_skip = require('./get_skip.js');
var get_from_time_id = require('./get_from_time_id.js');
/*
 * Build : build the vid-bc graph
 */

var BAD_DOC_KEY = 'bad_docs';

var get_query_options = function(db_client, days, cb){
  var gtid = db_client.bson_serializer.ObjectID.createFromHexString(get_from_time_id(days).toString())
  return cb(null, {
    collection : 'broadcasts',
    params : {_id : {'$gte' : gtid}},
    options : {}
  });
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


module.exports = function(db_client, days, do_query, cb){
  var graph = {};
  get_query_options(db_client, days, function(e, query_options){
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
