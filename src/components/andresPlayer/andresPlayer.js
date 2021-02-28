"use strict";

var andresPlayer = {
    x: 0,
    y: 0,
    w: 600,
    h: 250
};

var currentVideo = {
    url: null,
    duration: 0,
    currentTime: 0,
    seconds: 0,
    cont: 0
};

andresPlayer.moveTo = function (x, y) {

    if (!x || !y) {
        x = andresPlayer.x;
        y = andresPlayer.y;
    }

    try {
        webapis.avplay.setDisplayRect(x, y, andresPlayer.w, andresPlayer.h);
    } catch (e) {
        if (e instanceof ReferenceError) {
            ajsrConsole.error("HTML5 player needed!");
        }
    }

    // move screen
    var player_container = document.getElementById("av-player");
    player_container.style.left = x + "px"; // 2px is the border of the circle's cursor
    player_container.style.top = y + "px";
    player_container.style.width = y + andresPlayer.w + "px";
    player_container.style.height = y + andresPlayer.h + "px";

    // move controls
    var player_controls = document.getElementById("av-player-controls");
    player_controls.style.left = x + "px"; // 2px is the border of the circle's cursor
    player_controls.style.width = y + andresPlayer.w + "px";
    player_controls.style.top = y + andresPlayer.h + andresPlayer.y + "px";
};

andresPlayer.initListeners = function () {

    try {

        var listener = {
            onbufferingstart: function () {
                console.log("Buffering start.");
                debug("Buffering start.");
            },
    
            onbufferingprogress: function (percent) {
                console.log("Buffering progress data : " + percent);
                //debug("Buffering progress data : " + percent);
                document.getElementById("buffering").innerHTML = percent + "%";
            },
    
            onbufferingcomplete: function () {
                console.log("Buffering complete.");
                debug("Buffering complete.");
            },
    
            onstreamcompleted: function () {
                console.log("Stream Completed");
                debug("Stream Completed");
                webapis.avplay.stop();
                window.TimeLine.setToEnd();
            },
    
            oncurrentplaytime: function(currentTime) {
              //console.log("Current playtime: " + currentTime);
              //debug("Current playtime: " + currentTime);
              document.getElementById("current-time-ms").innerHTML = currentTime;
              document.getElementById("remaining-time-ms").innerHTML = currentVideo.duration - currentTime;
              window.TimeLine.refresh( currentVideo.duration, currentTime );
            },
    
            onerror: function (eventType) {
                console.log("event type error : " + eventType);
                debug("event type error : " + eventType);
            },
    
            onevent: function (eventType, eventData) {
                console.log("event type: " + eventType + ", data: " + eventData);
                debug("event type: " + eventType + ", data: " + eventData);
            },
    
            onsubtitlechange: function (duration, text, data3, data4) {
                console.log("subtitleText: " + text);
                debug("subtitleText: " + text);
            },

            ondrmevent: function (drmEvent, drmData) {
                console.log("DRM callback: " + drmEvent + ", data: " + drmData);
                debug("DRM callback: " + drmEvent + ", data: " + drmData);
            }
        };
    
        webapis.avplay.setListener(listener);

    } catch (e) {

    }
};

var getMinFromMs = function (ms) {
    return (ms / 1000 / 60 ).toFixed(2)
};

andresPlayer.loadAndPlay = function (videoUrl) {
    if (videoUrl) currentVideo.url = videoUrl
    debug("andresPlayer.loadAndPlay() videoUrl:" + videoUrl);
    try {
        webapis.avplay.stop();
        debug("webapis.avplay:", webapis.avplay);
        //webapis.avplay.setStreamingProperty("SET_MODE_4K") //for 4K contents			
        webapis.avplay.open(currentVideo.url);
        webapis.avplay.setDisplayRect(andresPlayer.x, andresPlayer.y, 600, 250); //call this method after open() - To be called in these states - "IDLE", "PAUSE"
        webapis.avplay.prepare();
        currentVideo.duration = webapis.avplay.getDuration();
        document.getElementById("duration-ms").innerHTML = currentVideo.duration;
        document.getElementById("duration-min").innerHTML = getMinFromMs(currentVideo.duration);
        debug("duration:" + currentVideo.duration);
        webapis.avplay.play();
    } catch (e) {
        ajsrConsole.error("try catch, error");
        ajsrConsole.error(e);
    }
};

andresPlayer.playFromBeginning = function () {
    debug("andresPlayer.playAgain()!!!!");
};

andresPlayer.ply_mouse_action = function (option, data) {
    switch (option) {

        case 'play':
            var currentPlayerState = webapis.avplay.getState(); //  "NONE", "IDLE", "READY", "PLAYING", "PAUSED".
            debug("webapis.avplay.getState() is: " + currentPlayerState);
            if (currentPlayerState === "PLAYING") {
                webapis.avplay.pause();
            } else if(currentPlayerState === "PAUSED"){
                webapis.avplay.play();
            } else {
                andresPlayer.loadAndPlay();
            }
            break;

        case 'stop':
            try {
                webapis.avplay.stop();
            } catch (e) {
                ajsrConsole.error(e);
            }
            break;

        case 'pause':
            webapis.avplay.pause();
            break;

        case 'forward':
            //webapis.avplay.jumpForward(currentVideo.currentTime + 10000, function () { })
            webapis.avplay.jumpForward(15);
            break;

        case 'back':
            //webapis.avplay.jumpBackward(currentVideo.currentTime - 10000, function () { });
            webapis.avplay.jumpBackward(15);
            break;

        case 'seek':
            webapis.avplay.seekTo(data.newTime, function () {
                debug("webapis.avplay.seekTo success function");
            }, function () {
                debug("webapis.avplay.seekTo error function");
            });
            break;
    
    }
};