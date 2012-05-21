/*!
 *              __     _
 *   _    _/__  /./|,//_`
 *  /_//_// /_|///  //_, outaTiME.js
 */

$(function () {
  var a = $(window), c = $("#box"), d = c.closest(".container");
  c.bind("center", function () {
    var e = a.height() - d.height() - 36; // 36 too from container padding
    var f = Math.floor(e / 2);
    if (f > 0) { // took from style
      d.css({marginTop: f});
    }
  }).trigger("center");
  a.resize(function(){
    $.doTimeout('resize', 250, function () {
      c.trigger("center");
    });
  });
  c.css({visibility: "visible"});
  // happy code
  $('#avatar').hover(
    function () {
      $(this).addClass("plate");
    },
    function () {
      $(this).removeClass("plate");
      // $(this).removeClass("real");
    }
  );
  /* $('#avatar').click(function () {
    if ($(this).hasClass("plate")) {
      $(this).addClass("real");
    } else {
      $(this).removeClass("real");
    }
  }); */
});
