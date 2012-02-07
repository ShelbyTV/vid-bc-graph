console.log('-----------');
console.log('Key from URL test');
console.log('-----------');

var get_key_from_url = require('../lib/get_key_from_url.js');

/*
 * Get key from URL test
 */

var expected_key = 'vimeo19819283';

var urls = [
  "http://www.vimeo.com/19819283",
  "http://vimeo.com/hd#19819283",
  "http://vimeo.com/groups/aftereffects/videos/19878538"
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
