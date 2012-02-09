//bcids.push(r.db_client.bson_serializer.ObjectID.createFromHexString(bcid.toString()));

var get_keys = function(limit, popularity){
  var keys = [];
  for (var i=0 ;i<limit; i++){
    keys.push(popularity[popularity.length-1-i]);
  }
  return keys;
};

var get_bcids = function(db_client, _bcids){
  var bcids = [];
  _bcids.forEach(function(bcid){
    bcids.push(db_client.bson_serializer.ObjectID.createFromHexString(bcid.toString()));
  });
  return bcids;
};

module.exports = function(r, req, res){
  var keys = get_keys(req.query.limit, r.popularity);
  var completed = [];
  keys.forEach(function(k, index){
    completed[index] = r.graph[k]
  });
  completed.forEach(function(el, index){
    console.log(index, 'has', el.length);
  });
  return res.end(JSON.stringify({e:null, data:completed}));
  //Deprecated on branch 'inflate' 
  /*keys.forEach(function(key, index){
    var bcids = get_bcids(r.db_client, r.graph[key]);
    var query_options = {
      collection : 'broadcasts',
      params : {_id : {'$in':bcids} },
      options : {}
    };
    r.do_query(r.db_client, query_options, function(e, data){
      completed[index] = data;      
      if (e){
        return res.end(JSON.stringify({e:e}));
      }
      if (completed.length===keys.length){
        return res.end(JSON.stringify({e:null, data:completed}));
      }
    });
  });*/
};
