var db_conf = require('../conf/db.js');
var mongoat = require('mongoat')(db_conf.db_name, db_conf.host, db_conf.port);
var build = require('../lib/build.js');
var build_size = 1000;

var print_doc_dates = function(doc, position){
  console.log('position', position, 'created_at', doc.created_at);
  console.log('position', position, 'updated_at', doc.updated_at);
};

mongoat.db.open(function(e, db_client){
  var query_options = {
    collection : 'broadcasts', 
    params : {},
    options : {limit:1000, sort:[['created_at', 'desc']]}
  };
  mongoat.do_query(db_client, query_options, function(e, docs){
    console.log(docs.length);
    print_doc_dates(docs[0], 0);
    print_doc_dates(docs[docs.length-1], docs.length-1);
  });
});
