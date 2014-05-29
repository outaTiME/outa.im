
'use strict';

$(document).ready(function () {

    /*
    <link rel="prefetch" href="images/empty_wide.jpg">
    <link rel="prefetch" href="images/night_empty_wide.jpg">
    <link rel="prefetch" href="//2.gravatar.com/avatar/5674d32fd9778602c097731984f0ec96?s=100">
    <link rel="prefetch" href="//2.gravatar.com/avatar/5674d32fd9778602c097731984f0ec96?s=200">
    */

    // when loads

    // $('.preload').remove();

    var hasTouch = 'ontouchstart' in window;

    $('.cover-avatar').on(hasTouch ? 'touchstart' : 'click', function (e) {
        $(this).toggleClass('hover');
        e.preventDefault();
    });

    var nightStyle = false;

    var updateStyle = window._updateStyle = function (night) {
        if (night !== nightStyle) {
            if (night === true) {
                $('body').removeClass('day').addClass('night');
            } else {
                $('body').removeClass('night').addClass('day');
            }
            nightStyle = night;
        }
    };

    var checkTime = function () {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        if (hours >= 10 && hours < 19) {
            updateStyle(false);
        } else {
            updateStyle(true);
        }
    };

    // initial
    checkTime();

    // interval
    window.setInterval(function () {
        checkTime();
    }, 1 * 1000);

    // FIXME: end loading


});
