
'use strict';

// touch

var hasTouch = 'ontouchstart' in window;

$('.cover-avatar').on(hasTouch ? 'touchstart' : 'click', function (e) {
    $(this).toggleClass('hover');
    e.preventDefault();
});

// bg

var _dott;

var dott = function (activate) {
    if (activate !== _dott) {
        if (activate !== true) {
            // trace
            console.log('Midnight commander');
            $('body').removeClass('dott').addClass('mc');
        } else {
            // trace
            console.log('Day of the tentacle');
            $('body').removeClass('mc').addClass('dott');
        }
        _dott = activate;
    }
};

// TODO: preload only required wide image ??

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

/* var promises = [];

var loadImage = function (url, promise) {
    var img = new Image();
    img.onload = function () {
        promise.resolve();
    };
    img.onerror = img.onabort = function () {
        promise.resolve();
    };
    img.src = url;
};

for (var i = 0; i < preload.length; i++) {
    loadImage(preload[i], promises[i] = $.Deferred());
}

$.when.apply($, promises).done(function () {
    // interval
    var interval = window.setInterval(function () {
        check();
    }, 1 * 1000);
    // test
    window._dott = function (enable) {
        window.clearInterval(interval);
        dott(enable);
    };
    // hide loader and show container
    $('.blocking-overlay, .container').addClass('done');
}); */

// console.log(preload);

new preLoader(preload, {
    onComplete: function () {

        var lat = -34.9097103;
        var lng = -57.9604389;
        var times = SunCalc.getTimes(new Date(), lat, lng);

        console.log(times.dawn, times.dusk);

        var check = function () {
            var currentTime = new Date();
            var hours = currentTime.getHours();
            if (hours >= 10 && hours < 19) {
                dott(true);
            } else {
                dott(false);
            }
        };

        // set initial bg

        check();

        // interval
        var interval = window.setInterval(function () {
            check();
        }, 1 * 1000);

        // test
        window._mc = function (enable) {
            window.clearInterval(interval);
            dott(!enable);
        };

        // hide loader and show container
        $('.blocking-overlay, .container').addClass('done');

    }
});
