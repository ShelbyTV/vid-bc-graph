var mongoat = require('mongoat');
var build = require('../lib/build.js');
var build_size = 1000;

mongoat.db.open(function(e, db_client){
  build(db_client, build_size, mongoat.do_query, function(e, graph){
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
