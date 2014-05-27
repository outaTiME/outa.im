
'use strict';

$('.cover-avatar').on('touchstart click', function (e) {
    $(this).toggleClass('hover');
    e.preventDefault();
});
