
(function (window) {

    'use strict';

    // touch

    var hasTouch = 'ontouchstart' in window;

    $('.cover-avatar').on(hasTouch ? 'touchstart' : 'click', function (e) {
        $(this).toggleClass('hover');
        e.preventDefault();
    });

    // bg

    var _dott;

    var dott = function (activate, callback) {
        if (activate !== _dott) {
            if (activate !== true) {
                // trace
                console.log('Midnight commander');
                // update image
                /* $.backstretch('images/night_empty_wide.jpg', {
                    fade: 400
                }); */
                $.vegas({
                    src:'images/night_empty_wide.jpg',
                    fade: 400,
                    loading: false,
                    complete: callback
                });
                // attach classes
                $('body').removeClass('dott').addClass('mc');
            } else {
                // trace
                console.log('Day of the tentacle');
                // update image
                /* $.backstretch('images/empty_wide.jpg', {
                    fade: 400
                }); */
                $.vegas({
                    src:'images/empty_wide.jpg',
                    fade: 400,
                    loading: false,
                    complete: callback
                });
                // attach classes
                $('body').removeClass('mc').addClass('dott');
            }
            _dott = activate;
        }
    };

    var check = function (callback) {
        // always dott
        dott(true, callback || $.noop);
    };

    var init = function () {
        // init style
        if (arguments.length > 0) {
            // with location
            var data = arguments[0];
            // trace
            console.log('Using location: %o', data);
            var times = SunCalc.getTimes(new Date(), data.latitude, data.longitude);
            // trace
            console.log('Dawn: %s', times.dawn);
            console.log('Dusk: %s', times.dusk);
            var dawn = times.dawn;
            var dusk = times.dusk;
            var dawnMins = dawn.getHours() * 60 + dawn.getMinutes();
            var duskMins = dusk.getHours() * 60 + dusk.getMinutes();
            // override
            check = function (callback) {
                var current = new Date();
                var currentMins = current.getHours() * 60 + current.getMinutes();
                dott(currentMins >= dawnMins && currentMins <= duskMins,
                    callback || $.noop);
            };
        } else {
            // trace
            console.log('No location found');
        }
        // set initial bg
        check(function () {
            // trace
            console.log('Vegas completed');
            // end first load
            var interval = window.setInterval(function () {
                check();
            }, 1 * 60 * 1000); // 1 minute
            // test
            window.outa = {
                dott: function (activate, clear) {
                    // clear check interval
                    window.clearInterval(interval);
                    // clear local interval
                    if (clear !== false) {
                        var localInterval = this._interval;
                        if (typeof localInterval !== 'undefined') {
                            window.clearInterval(localInterval);
                            delete this._interval;
                        }
                    }
                    dott(activate);
                },
                mc: function (activate, clear) {
                    this.dott(!activate, clear);
                },
                switch: function (clear) {
                    this.dott(!_dott, clear);
                },
                party: function (speed) {
                    var self = this;
                    this.switch();
                    this._interval = window.setInterval(function () {
                        self.switch(false);
                    }, 1 * (speed || 1000));
                }
            };
            // hide loader and show container
            // $('.blocking-overlay, .container').addClass('done');
            $('.blocking-overlay').addClass('done');
        });
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

}(window));
