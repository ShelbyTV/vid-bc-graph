var db_confs = {
  'development' : {
    db_name : 'nos-development',
    host : 'localhost',
    port : 27017
  },
  'production' : {
    db_name : 'nos-production',
    host : '10.183.192.15',
    port : 27019
  }
};

module.exports = db_confs[process.env.NODE_ENV];
