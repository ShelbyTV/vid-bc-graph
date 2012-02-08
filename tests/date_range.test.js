var db_conf = require('../conf/db.js');
var mongoat = require('mongoat')(db_conf.db_name, db_conf.host, db_conf.port);
var build = require('../lib/build.js');
var build_size = 1000;
var get_from_time_id = require('../lib/get_from_time_id.js');

var print_doc_dates = function(doc, position){
  console.log('position', position, 'created_at', doc.created_at);
  console.log('position', position, 'updated_at', doc.updated_at);
};

mongoat.db.open(function(e, db_client){
  var days = 14;
  var gtid = get_from_time_id(days).toString();
  gtid = db_client.bson_serializer.ObjectID.createFromHexString(gtid);
  var query_options = {
    collection : 'broadcasts', 
    params : {'_id' : {'$gte' : gtid}},
    options : {}
  };
  console.log('queyring for', query_options);
  mongoat.do_query(db_client, query_options, function(e, docs){
    console.log(docs.length);
    print_doc_dates(docs[0], 0);
    print_doc_dates(docs[docs.length-1], docs.length-1);
  });
});
