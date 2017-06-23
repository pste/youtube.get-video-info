# youtube.get-video-info
A parser for the get_video_info request on Youtube (no API required)

# Usage
```
npm install youtube.get-video-info --save
```
then
```
var yt = require('youtube.get-video-info');
yt.retrieve('ml-v1bgMJDQ', function(err, res) {
  if (err) throw err;
  console.log(res);
});
```
