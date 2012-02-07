/*
 * Get graph key from vid URL
 * youtube.source = http://stackoverflow.com/questions/6903823/regex-for-youtube-id
 */

var LEGAL_URL_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

var EXPRESSIONS = {
  'youtube' : /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i,
  'vimeo' : /http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/
};

var MATCHES = {
  'youtube' : 1,
  'vimeo' : 2
};

var PROVIDERS = ['youtube', 'vimeo'];

var get_formatted_url = function(url, legal_chars){
  var formatted_url = '';
  url.split('').forEach(function(char){
    if (legal_chars.indexOf(char)!==-1){
      formatted_url+=char;
    }
  });
  return formatted_url;
};
  

var get_provider = function(url, providers){
  var provider = null;
  providers.forEach(function(pro){
    if (url.indexOf(pro)!==-1){
      provider = pro;
    }
  });
  return provider;
};

module.exports = function(url){
  var formatted_url = get_formatted_url(url, LEGAL_URL_CHARS);
  var provider = get_provider(formatted_url, PROVIDERS);
  if (!provider) return null;
  var matches = EXPRESSIONS[provider].exec(url);
  var key = provider+matches[MATCHES[provider]];
  return key;
};
