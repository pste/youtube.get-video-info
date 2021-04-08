const yt = require('./youtube.get-video-info');

(async () => {
    try {
        const result = await yt.retrieve('ml-v1bgMJDQ');
        console.log(result);
    } catch (e) {
        console.log('Error: ', e);
    }
})();

