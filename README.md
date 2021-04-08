# youtube.get-video-info
A parser for the get_video_info request on Youtube (no API required)

# Usage
```
npm install youtube.get-video-info --save
```
then

```
const yt = require('./youtube.get-video-info');

(async () => {
    try {
        const result = await yt.retrieve('ml-v1bgMJDQ');
        console.log(result);
    } catch (e) {
        console.log('Error: ', e);
    }
})();
```

# Dependencies
* axios.js
