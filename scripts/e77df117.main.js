/*!
 *              __     _
 *   _    _/__  /./|,//_`
 *  /_//_// /_|///  //_, v.0.0.3
 *
 * Copyright © 2014 outaTiME. All rights reserved.
 */

!function(a){"use strict";var b="ontouchstart"in a;$(".cover-avatar").on(b?"touchstart":"click",function(a){$(this).toggleClass("hover"),a.preventDefault()});var c,d=function(a,b){a!==c&&(a!==!0?(console.log("Midnight commander"),$.vegas({src:"images/a4cfb090.night_empty_wide.jpg",fade:400,loading:!1,complete:b}),$("body").removeClass("dott").addClass("mc")):(console.log("Day of the tentacle"),$.vegas({src:"images/d63ad850.empty_wide.jpg",fade:400,loading:!1,complete:b}),$("body").removeClass("mc").addClass("dott")),c=a)},e=function(a){d(!0,a||$.noop)},f=function(){if(arguments.length>0){var b=arguments[0];console.log("Location: %s, %s, %s",b.city,b.region,b.country);var f=SunCalc.getTimes(new Date,b.latitude,b.longitude);console.log("Sunrise: %s",f.sunrise),console.log("Sunset: %s",f.sunset);var g=f.sunrise,h=f.sunset,i=60*g.getHours()+g.getMinutes(),j=60*h.getHours()+h.getMinutes();e=function(a){var b=new Date,c=60*b.getHours()+b.getMinutes();d(c>=i&&j>=c,a||$.noop)}}else console.log("No location found");e(function(){var b=a.setInterval(function(){e()},6e4);a.outa={dott:function(c,e){if(a.clearInterval(b),e!==!1){var f=this._interval;"undefined"!=typeof f&&(a.clearInterval(f),delete this._interval)}d(c)},mc:function(a,b){this.dott(!a,b)},"switch":function(a){this.dott(!c,a)},party:function(b){var c=this;this.switch(),this._interval=a.setInterval(function(){c.switch(!1)},1*(b||1e3))}},$(".blocking-overlay").addClass("done")})},g=["images/d63ad850.empty_wide.jpg","images/a4cfb090.night_empty_wide.jpg"];a.devicePixelRatio>1?g.push("//2.gravatar.com/avatar/5674d32fd9778602c097731984f0ec96?s=200","images/db087e3a.avatar-2x.png"):g.push("//2.gravatar.com/avatar/5674d32fd9778602c097731984f0ec96?s=100","images/6ebff25a.avatar.png"),new preLoader(g,{onComplete:function(){$.getJSON("//www.telize.com/geoip?callback=?",function(a){f(a)}).fail(function(){f()})}})}(window);