$(function() {

    var smallStarsCols = 25;

    var windowHeight = $(window).height(),
        windowWidth = $(window).width();

    if (windowWidth > 1280 && windowWidth < 1680) {
        smallStarsCols = 18;
    } else if (windowWidth < 1280) {
        smallStarsCols = 13;
    }

    for (var i = 0; i < smallStarsCols; i++) {
        $('<div>').attr({
            'class': 'animated infinite small-star pulse',
        })
        .css({
            'background-position' : smallStarsCols % i * 12 + 'px',
            top: Math.random() * windowHeight - 12 + 'px',
            left: Math.random() * windowWidth - 12 + 'px',
            'animation-delay': Math.random() * 5 + 's',
            'transform': 'rotate(' + Math.ceil(Math.random() * 90) + 'deg)'
        })
        .appendTo($('#wrapper'));
    }

});
