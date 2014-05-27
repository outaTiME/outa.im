
'use strict';

var hasTouch = 'ontouchstart' in window;

$('.cover-avatar').on(hasTouch ? 'touchstart' : 'click', function (e) {
    $(this).toggleClass('hover');
    e.preventDefault();
});
