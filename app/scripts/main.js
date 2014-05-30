
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
            // update image
            $.backstretch('images/night_empty_wide.jpg', {
                fade: 400
            });
            /* $.vegas({
                src:'images/night_empty_wide.jpg',
                fade: 400,
                loading: false,
                complete: callback
            }); */
            // attach classes
            $('body').removeClass('dott').addClass('mc');
        } else {
            // trace
            console.log('Day of the tentacle');
            // update image
            $.backstretch('images/empty_wide.jpg', {
                fade: 400
            });
            /* $.vegas({
                src:'images/empty_wide.jpg',
                fade: 400,
                loading: false,
                complete: callback
            }); */
            // attach classes
            $('body').removeClass('mc').addClass('dott');
        }
        _dott = activate;
    }
};

var check = function () {
    // always dott
    dott(true);
};

var init = function () {
    // init style
    if (arguments.length > 0) {
        // with location
        var data = arguments[0];
        console.log('Using location: %o', data);
        var times = SunCalc.getTimes(new Date(), data.latitude, data.longitude);
        console.log('Dawn: %s', times.dawn);
        console.log('Dusk: %s', times.dusk);
        // override
        check = function () {
            var current = new Date().getTime();
            var dawn = times.dawn.getTime();
            var dusk = times.dusk.getTime();
            dott(current >= dawn && current <= dusk);
        };
    } else {
        console.log('No location found');
    }
    // set initial bg
    check();
    // end first load
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
};

// proload images

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

new preLoader(preload, {
    onComplete: function () {
        // took location
        $.getJSON('//www.telize.com/geoip?callback=?', function (data) {
            init(data);
        })
        .fail(function () {
            init();
        });
    }
});
