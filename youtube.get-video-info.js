const axios = require('axios');

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

exports.retrieve = async function(id) {
    const url = `https://www.youtube.com/get_video_info?html5=1&video_id=${id}`;
    let get_video_info = '';
    try {
        const response = await axios.get(url);
        const bod = response.data;
        get_video_info = qsToJson(bod);

        // remapping urls into an array of objects
        var tmp = get_video_info["url_encoded_fmt_stream_map"];
        if (tmp) {
            tmp = tmp.split(',');
            for (i in tmp) {
                tmp[i] = qsToJson(tmp[i]);
            }
            get_video_info["url_encoded_fmt_stream_map"] = tmp;
        }
        return get_video_info;
    } catch (e) {
        console.log('Error: ', e);
    }
}
