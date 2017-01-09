$(window).on('load', function() {

    var width = 480;

    if ($(window).width() > width) {
        var flag = false;
    } else {
        var flag = true;
    }
    

    $(window).resize(function() {
        if ($(this).width() <= width && flag) {
            flag = false;
            $('header nav a').each(function() {
                $(this).attr('style', '');
            });
        } else if ($(this).width() >= width && !flag) {
            flag = true;
            // Увеличение размера каждой ссылочки на пару пикселей, чтобы меню не прыгало при наведении
            // Ибо ссылки становятся жиробасами при наведении
            // Эти 2 пикселя вычтены из margin в css
            $('header nav a').each(function() {
                $(this).width($(this).width() + 2);
            });
        }
    });

    $('.loader-inner').fadeOut();
    $('.loader').delay(400).fadeOut();

    $(this).trigger('resize');
});

$("html").niceScroll({
    cursorcolor: '#314559',
    cursoropacitymin: '0',
    cursoropacitymax: '1',
    cursorwidth: '4px',
    cursorborder: 'none',
    zindex: 999999,
    horizrailenabled: false,
    enablekeyboard: true
});