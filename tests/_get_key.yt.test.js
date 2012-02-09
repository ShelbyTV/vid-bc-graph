console.log('-----------');
console.log('Key from URL test');
console.log('-----------');

var get_key_from_url = require('../lib/get_key_from_url.js');

/*
 * Get key from URL test
 */

var expected_key = 'youtubeuGi_r9xlvqE';

var urls = [
  "http://www.youtube.com/watch?v=uGi_r9xlvqE"
];

urls.forEach(function(url){
  var key = get_key_from_url(url);
  if (key!==expected_key){
    console.error('FAIL: expected', expected_key, 'got', key, 'on', url); 
    process.exit();
  } 
  console.log('PASS: all keys expected');
  process.exit();
});
