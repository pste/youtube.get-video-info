var yt = require('./youtube.get-video.info');

function cb(err, res) {
  if (err) console.log('ERROR:', err);
  else console.log(res);
}

yt.retrieve('ml-v1bgMJDQ', cb);