
'use strict';

$(document).ready(function () {

    // when loads

    // $('.preload').remove();

    var hasTouch = 'ontouchstart' in window;

    $('.cover-avatar').on(hasTouch ? 'touchstart' : 'click', function (e) {
        $(this).toggleClass('hover');
        e.preventDefault();
    });

    var _night;

    var night = function (night) {
        if (night !== _night) {
            if (night === true) {
                // trace
                console.log('Midnight commander');
                $('body').removeClass('day').addClass('night');
            } else {
                // trace
                console.log('Day of the tentacle');
                $('body').removeClass('night').addClass('day');
            }
            _night = night;
        }
    };

    var checkTime = function () {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        if (hours >= 10 && hours < 19) {
            night(false);
        } else {
            night(true);
        }
    };

    var interval;

    window._night = function (night) {
        window.clearInterval(interval);
        night(night);
    };

    var preload = [
        'images/empty_wide.jpg',
        'images/night_empty_wide.jpg'
    ];

    if (window.devicePixelRatio > 1) {
        preload.push(
            '//2.gravatar.com/avatar/5674d32fd9778602c097731984f0ec96?s=200',
            'images/avatar-2x.png'
        );
    } else {
        preload.push(
            '//2.gravatar.com/avatar/5674d32fd9778602c097731984f0ec96?s=100',
            'images/avatar.png'
        );
    }

    var promises = [];

    var loadImage = function (url, promise) {
        var img = new Image();
        img.onload = function () {
            promise.resolve();
        };
        img.src = url;
    };

    for (var i = 0; i < preload.length; i++) {
        loadImage(preload[i], promises[i] = $.Deferred());
    }

    $.when.apply($, promises).done(function () {
        // initial
        checkTime();
        // interval
        interval = window.setInterval(function () {
            checkTime();
        }, 1 * 1000);
        // hide loader and show container
        $('.blocking-overlay, .container').addClass('done');
    });

});
