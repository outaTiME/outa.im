/*!
 *              __     _
 *   _    _/__  /./|,//_`
 *  /_//_// /_|///  //_, v.0.2.0
 *
 * Copyright © 2016 outaTiME. All rights reserved.
 */
"use strict";!function(t){var e="ontouchstart"in t;$(".cover-avatar").on(e?"touchstart":"click",function(t){t.preventDefault(),$(this).toggleClass("hover")});var n,o=function(t,e){e=e||$.noop,t!==n&&(t!==!0?(console.log("Midnight commander"),e.call(this),$("body").removeClass("dott").addClass("mc")):(console.log("Day of the tentacle"),e.call(this),$("body").removeClass("mc").addClass("dott")),n=t)},a=function(t){o(!0,t)},s=function(){if(arguments.length>0){var e=arguments[0];console.log("Location: %s",e.country);var s=SunCalc.getTimes(new Date,e.latitude,e.longitude);console.log("Sunrise: %s",s.sunrise),console.log("Sunset: %s",s.sunset);var i=s.sunrise,l=s.sunset,c=60*i.getHours()+i.getMinutes(),r=60*l.getHours()+l.getMinutes();a=function(t){var e=new Date,n=60*e.getHours()+e.getMinutes();o(n>=c&&r>=n,t)}}else console.log("No location found");a(function(){var e=t.setInterval(function(){a()},6e4);t.outa={dott:function(n,a){if(t.clearInterval(e),a!==!1){var s=this.localInterval;"undefined"!=typeof s&&(t.clearInterval(s),delete this.localInterval)}o(n)},mc:function(t,e){this.dott(!t,e)},"switch":function(t){this.dott(!n,t)},party:function(e){var n=this;this["switch"](),this.localInterval=t.setInterval(function(){n["switch"](!1)},1*(e||1e3))}},$(".blocking-overlay").addClass("done")})},i=new PxLoader;i.addImage("images/empty_wide.jpg"),i.addImage("images/night_empty_wide.jpg"),i.addImage("//2.gravatar.com/avatar/5674d32fd9778602c097731984f0ec96?s=200"),i.addImage("images/avatar-2x.png"),i.addCompletionListener(function(){$.ajax({url:"//freegeoip.io/json/",type:"POST",dataType:"jsonp"}).success(function(t){s({ip:t.ip,country:t.country_name,latitude:t.latitude,longitude:t.longitude})}).fail(function(){s()})}),i.start()}(window);