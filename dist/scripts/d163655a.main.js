"use strict";var hasTouch="ontouchstart"in window;$(".cover-avatar").on(hasTouch?"touchstart":"click",function(a){$(this).toggleClass("hover"),a.preventDefault()});var _dott,dott=function(a,b){a!==_dott&&(a!==!0?(console.log("Midnight commander"),$.vegas({src:"images/1e5cba9f.night_empty_wide.jpg",fade:400,loading:!1,complete:b}),$("body").removeClass("dott").addClass("mc")):(console.log("Day of the tentacle"),$.vegas({src:"images/de448977.empty_wide.jpg",fade:400,loading:!1,complete:b}),$("body").removeClass("mc").addClass("dott")),_dott=a)},check=function(a){dott(!0,a||$.noop)},init=function(){if(arguments.length>0){var a=arguments[0];console.log("Using location: %o",a);var b=SunCalc.getTimes(new Date,a.latitude,a.longitude);console.log("Dawn: %s",b.dawn),console.log("Dusk: %s",b.dusk),check=function(a){var c=(new Date).getTime(),d=b.dawn.getTime(),e=b.dusk.getTime();dott(c>=d&&e>=c,a||$.noop)}}else console.log("No location found");check(function(){var a=window.setInterval(function(){check()},1e3);window._mc=function(b){window.clearInterval(a),dott(!b)},$(".blocking-overlay, .container").addClass("done")})},preload=["images/de448977.empty_wide.jpg","images/1e5cba9f.night_empty_wide.jpg"];window.devicePixelRatio>1?preload.push("//2.gravatar.com/avatar/5674d32fd9778602c097731984f0ec96?s=200","images/db087e3a.avatar-2x.png"):preload.push("//2.gravatar.com/avatar/5674d32fd9778602c097731984f0ec96?s=100","images/6ebff25a.avatar.png"),new preLoader(preload,{onComplete:function(){$.getJSON("//www.telize.com/geoip?callback=?",function(a){init(a)}).fail(function(){init()})}});