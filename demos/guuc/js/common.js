$(function() {

	$('.toggle-menu').click(function() {
		$(this).toggleClass('on');
		$(".main-menu").slideToggle();
		return false;
	});

	$('.button-top').click(function() {
		$("html, body").delay(150).animate({ scrollTop: 0 }, "slow");
	});

});

$(window).load(function() {

	$('.loader-inner').fadeOut();
	$('.loader').delay(400).fadeOut();

	$('.top-text h1').animated('fadeInDown', 'fadeOutUp');
	$('.top-text p').animated('fadeInUp', 'fadeOutDown');

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