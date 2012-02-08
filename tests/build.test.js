var db_conf = require('../conf/db.js');
var mongoat = require('mongoat')(db_conf.db_name, db_conf.host, db_conf.port);
var build = require('../lib/build.js');
var build_days = 14;

mongoat.db.open(function(e, db_client){
  build(db_client, build_days, mongoat.do_query, function(e, graph){
    var g_len = Object.keys(graph).length;
    console.log(g_len);
    if (!e && g_len){
      console.log('PASS: built graph w/', Object.keys(graph).length, 'video nodes');
    } else {
      console.error('FAIL: bad graph', e, graph);
    }
    process.exit();
  });
});
