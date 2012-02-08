/*
 * Get skip val
 * to take adv on natural ordering in mongo
 */

module.exports = function(db_client,  size, cb){
  db_client.collection('broadcasts', function(e, collection){
    collection.count(function(e, count){
      var skip = (count-size<0) ? 0 : (count-size);
      return cb(e, skip);
    });
  });
};

