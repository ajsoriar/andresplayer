var App = {},
    tvModel,
    timestamp_A = Date.now(),
    timestamp_B = timestamp_A,
    seconds = 0,
    minutes = 0,
    mov = window.requestAnimationFrame( refresh ),
    tvKey = null,
    Main = {},
    duration = null;

window.addEventListener("load", function() {
    debug("window.load()");
    andresPlayer.initListeners();
    window.videoList.init();    
});

function refresh() {
    if ( ( timestamp_A + 1000 ) < timestamp_B ) {
        timestamp_A = Date.now();
        timestamp_B = timestamp_A;     
        seconds++;
        if (seconds === 60){
            seconds = 0;
            minutes++;
        } 
        currentVideo.currentTime = webapis.avplay.getCurrentTime();
        //if ( currentVideo.currentTime > (duration - 2000) ) andresPlayer.playAgain();
        document.getElementById("start-time").innerHTML = minutes + ":" + seconds;
        //document.getElementById("current-time").innerHTML = currentVideo.currentTime;
    }
    //obj.innerHTML = timestamp_A +" - "+ timestamp_B +" - "+ seconds +" - "+ cont; 
    //document.getElementById("app-counter").innerHTML = seconds + ", "+ currentVideo.currentTime; // +" - "+ cont; 
    timestamp_B = Date.now();
    mov = window.requestAnimationFrame( refresh );
}

Main.onLoad = function() { // called from BODY tag on init.
    debug("Main.onLoad()");
    if (window.tizen === undefined) return;
    tvKey = new Common.API.TVKeyValue();
    // Register keys on Tizen
    var keys = tizen.tvinputdevice.getSupportedKeys();
    debug( "keys:", keys );
    var usedKeys = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'ColorF0Red',
        'ColorF1Green',
        'ColorF2Yellow',
        'ColorF3Blue',
        'Info',
        'Exit',
        'MediaFastForward',
        'MediaPause',
        'MediaPlay',
        'MediaPlayPause',
        'MediaRecord',
        'MediaRewind',
        'MediaStop',
        'Menu',
        'Tools',
        'Exit',
        'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown',
        'Enter',
        'Back'
    ];

    keys.forEach(function(key) {
        if (usedKeys.indexOf(key.name) !== -1) {
            tizen.tvinputdevice.registerKey(key.name);
        }
    });
}

Main.keyDown = function ( event ) {

    var keyCode = event.keyCode;
    debug("Main Key code : " + keyCode);

    switch (keyCode) {
        case 37:
            nav.move.left();
            break;

        case 39:
            nav.move.right();
            break;

        case 38:
            nav.move.up();
            break;

        case 40:
            nav.move.down();
            break;

        case 13:
            //nav.action();
            break;
        case tvKey.KEY_ENTER: // Code for Enter key event

            break;

        case 10009: // tvKey.KEY_RETURN:
            break;

        case tvKey.KEY_LEFT:

            break;

        case tvKey.KEY_RIGHT:

            break;

        case tvKey.KEY_UP:

            break;

        case tvKey.KEY_DOWN:

            break;

        case tvKey.KEY_ENTER:

            break;

        case tvKey.KEY_RETURN:

            break;
    }
};

var okd = function(){
    debug("KeyHandler on onkeydown");
};

var oku = function(){
    debug("KeyHandler on onkeyup");
};

Main.onUnload = function() {};

App.onClick = function( t ) {
    debug( "App.onClick! x:" + event.clientX + ", y:" + event.clientY , "YELLOW" );
};
