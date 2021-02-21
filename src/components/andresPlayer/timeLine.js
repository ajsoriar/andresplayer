window.TimeLine = {
    refresh: function(duration, current) {
        var percentage = (current * 100 / duration).toFixed(2);
        document.getElementById("time-line").style.width = percentage +"%";
        document.getElementById("remaining-time-percentage").innerHTML = percentage +"%";
    },
    setToEnd: function(){
        document.getElementById("time-line").style.width = "100%";
        document.getElementById("remaining-time-percentage").innerHTML = "100%";
    }
};
