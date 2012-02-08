var ObjectId = require('buffalo').ObjectId;

/*
 * Get From Time ObjectId
 */

module.exports = function(days){
  var ts = (new Date().getTime() - days*24*60*60*1000);  
  return new ObjectId(undefined, ts);
};
