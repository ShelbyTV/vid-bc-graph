var server_confs = {
  'development': {
    port : 3000
  },
  'production' : {
    port : 5000
  }
};

module.exports = server_confs[process.env.NODE_ENV];
