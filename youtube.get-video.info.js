var request = require('request');

var DOUBLE_ENCODED_KEYS = [
    'adaptive_fmts',
    'fflags',
    'rvs',
    'url_encoded_fmt_stream_map'
]

function qsToJson(qs) {
  var res = {};
  var pars = qs.split('&');
  var kv, k, v;
  for (i in pars) {
    kv = pars[i].split('=');
    k = kv[0];
    v = kv[1];
    res[k] = decodeURIComponent(v);
  }
  return res;
}

function remap(info, key) {
    var tmp = info[key];
    if (tmp) {
      tmp = tmp.split(',');
      for (i in tmp) {
        tmp[i] = qsToJson(tmp[i]);
      }
      return tmp;
    }
}

exports.retrieve = function(id, callback) {
  var url = 'http://www.youtube.com/get_video_info?html5=1&video_id=' + id;

  request(url, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var get_video_info = qsToJson(body);

      // parse double encoded keys
      for (i in DOUBLE_ENCODED_KEYS){
          var dEncode = DOUBLE_ENCODED_KEYS[i]
          get_video_info[dEncode] = remap(get_video_info, dEncode);
      }

      callback(null, get_video_info);
    }
    else {
      console.log('(youtube.get-video.info) HTTP response not 200/OK');
      callback(err, null);
    }
  });
}
