var request = require('request');

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

exports.retrieve = function(id, callback) {
  var url = 'http://www.youtube.com/get_video_info?html5=1&video_id=' + id;
  
  request(url, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var get_video_info = qsToJson(body);
      
      // remapping urls into an array of objects
      var tmp = get_video_info["url_encoded_fmt_stream_map"];
      if (tmp) {
        tmp = tmp.split(',');
        for (i in tmp) {
          tmp[i] = qsToJson(tmp[i]);
        }
        get_video_info["url_encoded_fmt_stream_map"] = tmp;
      }
      
      // done
      callback(null, get_video_info);
    }
    else {
      console.log('(youtube.get-video.info) HTTP response not 200/OK');
      callback(err, null);
    }
  });
}
