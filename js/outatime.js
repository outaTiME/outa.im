
$(function () {

  /* var a = $(window), c = $("#box"), d = c.closest(".container"), click = 0, tooltip = false;
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
  c.css({visibility: "visible"}); */

  var click = 0, tooltip = false;

  // configure tooltip
  $('#avatar').tooltip({
    title: "Woooot, happy face!",
    trigger: "manual",
    placement: 'top'
  });

  // configure tooltips for social
  $('#social a').tooltip({
    placement: 'bottom'
  });

  // happy code
  if (Modernizr.touch) {
    $('#avatar').bind('touchstart', function () {
      click += 1;
      if (click === 5) {
        $(this).addClass("real");
        $(this).tooltip('show');
        tooltip = true;
        click = 0;
      } else {
        $(this).addClass('plate');
      }
    });
    $('#avatar').bind('touchend', function () {
      $(this).removeClass('plate');
      $(this).removeClass("real");
      if (tooltip === true) {
        $(this).tooltip('hide');
        tooltip = false;
      }
    });
  } else {
    $('#avatar').hover(
      function () {
        click += 1;
        if (click === 5) {
          $(this).addClass("real");
          $(this).tooltip('show');
          tooltip = true;
          click = 0;
        } else {
          $(this).addClass("plate");
        }
      },
      function () {
        $(this).removeClass("plate");
        $(this).removeClass("real");
        if (tooltip === true) {
          $(this).tooltip('hide');
          tooltip = false;
        }
      }
    );
  }
});
