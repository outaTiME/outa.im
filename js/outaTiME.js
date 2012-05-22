/*!
 *              __     _
 *   _    _/__  /./|,//_`
 *  /_//_// /_|///  //_, outatime.js
 */

$(function () {

  "use strict";

  var a = $(window), c = $("#box"), d = c.closest(".container");
  c.bind("center", function () {
    var e = a.height() - d.height() - 36, f = Math.floor(e / 2); // 36 too from container padding
    if (f > 0) { // took from style
      d.css({marginTop: f});
    }
  }).trigger("center");
  a.resize(function () {
    $.doTimeout('resize', 250, function () {
      c.trigger("center");
    });
  });
  c.css({visibility: "visible"});
  // happy code
  if (Modernizr.touch) {
    $('#avatar').bind('touchstart', function () {
      $(this).addClass('plate');
    });
    $('#avatar').bind('touchend', function () {
      $(this).removeClass('plate');
    });
  } else {
    $('#avatar').hover(
      function () {
        $(this).addClass("plate");
      },
      function () {
        $(this).removeClass("plate");
        // $(this).removeClass("real");
      }
    );
  }
});
