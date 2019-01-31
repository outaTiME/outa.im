
/* global SunCalc, PxLoader */

(function(window) {

  'use strict';

  // touch

  var hasTouch = 'ontouchstart' in window;

  $('.cover-avatar').on(hasTouch ? 'touchstart' : 'click', function(e) {
    e.preventDefault();
    $(this).toggleClass('hover');
  });

  // bg

  var state;

  var dott = function(activate, callback) {
    callback = callback || $.noop;
    if (activate !== state) {
      if (activate !== true) {
        // trace
        console.log('Midnight commander');
        callback.call(this);
        // attach classes
        $('body').removeClass('dott').addClass('mc');
      } else {
        // trace
        console.log('Day of the tentacle');
        callback.call(this);
        // attach classes
        $('body').removeClass('mc').addClass('dott');
      }
      state = activate;
    }
  };

  var check = function(callback) {
    // always dott
    dott(true, callback);
  };

  var init = function() {
    // init style
    if (arguments.length > 0) {
      // with location
      var data = arguments[0];
      // trace
      // console.log('Location: %o', data);
      console.log('Location: %s', data.country);
      var times = SunCalc.getTimes(new Date(), data.latitude, data.longitude);
      // trace
      console.log('Sunrise: %s', times.sunrise);
      console.log('Sunset: %s', times.sunset);
      var sunrise = times.sunrise;
      var sunset = times.sunset;
      var sunriseMins = sunrise.getHours() * 60 + sunrise.getMinutes();
      var sunsetMins = sunset.getHours() * 60 + sunset.getMinutes();
      // override
      check = function(callback) {
        var current = new Date();
        var currentMins = current.getHours() * 60 + current.getMinutes();
        dott(currentMins >= sunriseMins && currentMins <= sunsetMins, callback);
      };
    } else {
      // trace
      console.log('No location found');
    }
    // set initial bg
    check(function() {
      // end first load
      var interval = window.setInterval(function() {
        check();
      }, 1 * 60 * 1000); // 1 minute
      // use for party mode
      var partyInterval;
      // apply theme
      var apply = function(dottTheme, clear) {
        // clear check interval
        window.clearInterval(interval);
        // clear party interval
        if (clear !== false && partyInterval) {
          window.clearInterval(partyInterval);
        }
        dott(dottTheme !== false);
      }
      // test
      window.outa = {
        dott: function(clear) {
          apply(true, clear);
        },
        mc: function(clear) {
          apply(false, clear);
        },
        switch: function(clear) {
          apply(!state, clear);
        },
        party: function(speed) {
          var self = this;
          this.switch();
          partyInterval = window.setInterval(function() {
            self.switch(false);
          }, 1 * (speed || 1000));
        }
      };
      // hide loader and show container
      $('.blocking-overlay').addClass('done');
    });
  };

  // proload images

  var loader = new PxLoader();
  loader.addImage('images/empty_wide.jpg');
  loader.addImage('images/night_empty_wide.jpg');
  loader.addImage('//2.gravatar.com/avatar/5674d32fd9778602c097731984f0ec96?s=200');
  loader.addImage('images/avatar-2x.png');
  loader.addCompletionListener(function() {
    // took geolocation data
    $.ajax({
      // url: '//freegeoip.io/json/',
      // type: 'POST',
      url: '//freegeoip.app/json/',
      dataType: 'jsonp'
    }).done(function(data) {
      init({
        ip: data.ip,
        country: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude
      });
    }).fail(function() {
      init();
    });
  });
  loader.start();

}(window));
