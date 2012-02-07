console.log('-----------');
console.log('Key from URL test');
console.log('-----------');

var get_key_from_url = require('../lib/get_key_from_url.js');

/*
 * Get key from URL test
 */

var expected_key = 'youtubeNLqAF9hrVbY';

var urls = [
  "http://www.youtube.com/sandalsResorts#p/c/54B8C800269D7C1B/0/NLqAF9hrVbY",
  "http://www.youtube.com/user/Scobleizer#p/u/1/NLqAF9hrVbY",
  "http://youtu.be/NLqAF9hrVbY",
  "http://www.youtube.com/embed/NLqAF9hrVbY",
  "https://www.youtube.com/embed/NLqAF9hrVbY",
  "http://www.youtube.com/v/NLqAF9hrVbY?fs=1&hl=en_US",
  "http://www.youtube.com/watch?v=NLqAF9hrVbY",
  "http://www.youtube.com/user/Scobleizer#p/u/1/NLqAF9hrVbY",
  "http://www.youtube.com/ytscreeningroom?v=NLqAF9hrVbY",
  "http://www.youtube.com/user/Scobleizer#p/u/1/NLqAF9hrVbY",
  "http://www.youtube.com/watch?v=NLqAF9hrVbY&feature=featured"
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
