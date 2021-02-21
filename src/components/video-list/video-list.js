(function () {

    window.videoList = {
        x: 100,
        y: 80,
        w: 250,
        h: "100%",
        init: function () {
            debug("videoList.init()");
            videoList.fillTheList(window.videosdata.list);
        }
    };

    videoList.clickOver = function (num) {
        debug("videoList.clickOver() num:" + num);
        var vodObj = window.videosdata.list[num];
        debug.printObj(vodObj);
        andresPlayer.loadAndPlay(vodObj.video_source);
    };

    videoList.createItem = function (jsonData, i) {
        console.log("jsonData:" + jsonData);
        var str = '';
        str += '<li onclick="videoList.clickOver(' + i + ')" class="focusable">';
        str += '<div class="ico-movie"></div>';
        str += '<div class="info">';
        str += '<div class="title">File name: <b>' + jsonData.file_name + '-' + i + '</b></div>';
        str += '<div class="BANDWIDTH">Bandwidth: <b>' + jsonData.bandwidth + '</b></div>';
        str += '<div class="CODECS">Codecs: <b>' + jsonData.codecs + '</b></div>';
        str += '<div class="RESOLUTION">Resolution: <b>' + jsonData.resolution + '</b></div>';
        str += '</div>';
        str += '</li>';
        return str;
    }

    videoList.fillTheList = function (jsonSource) {
        debug("videoList.fillTheList()");
        var targetElement = document.getElementById("video-list-content"),
            lon = jsonSource.length,
            html = "";

        for (var i = 0; i < lon; i++) {
            html += this.createItem(jsonSource[i], i)
        }
        targetElement.innerHTML = html;
    };

}());