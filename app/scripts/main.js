
'use strict';

var hasTouch = 'ontouchstart' in window;

$('.cover-avatar').on(hasTouch ? 'touchstart' : 'click', function (e) {
    $(this).toggleClass('hover');
    e.preventDefault();
});

var nightStyle = false;

var updateStyle = function (night) {
    if (night !== nightStyle) {
        if (night === true) {
            console.log('night');
        } else {
            console.log('day');
        }
        nightStyle = night;
    }
};

var checkTime = function () {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    if (hours >= 10 && hours <= 19) {
        updateStyle(false);
    } else {
        updateStyle(true);
    }
};

// initial
checkTime();

// interval
window.setInterval(function () {
    console.log('tick');
    checkTime();
}, 1 * 1000);

// FIXME: end loading
