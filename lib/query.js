/*
 * Query
 * this has its own file
 * as queries may be db based in future
 */

var query_by_bcids = function(db_client, do_query, bcids, cb){
  var query_options = {
    collection : 'broadcasts',
    params : {_id : {"$in" : []}},
    options : {}
  };
  bcids.forEach(function(id){
    query_options.params._id["$in"].push(db_client.bson_serializer.ObjectID.createFromHexString(id.toString()));
  });
  do_query(db_client, query_options, cb);
};

module.exports = function(key, db_client, do_query, graph, cb){
  if (graph.hasOwnProperty(key)){
    return cb(null, graph[key]);
    // Deprecated in branch 'inflate'
    //var bcids = graph[key];
    //return query_by_bcids(db_client, do_query, bcids, cb);
  }
  return cb({e: 'video not found'});      
};
