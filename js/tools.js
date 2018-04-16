$(document).ready(function() {

    $('.feedback-theme-title-value').click(function() {
        $('.feedback-theme-title').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.feedback-theme-title').length == 0) {
            $('.feedback-theme-title').removeClass('open');
        }
    });

    $('.feedback-theme-title ul li a').click(function(e) {
        var curLink = $(this);
        $('.feedback-theme-title ul li.active').removeClass('active');
        curLink.parent().addClass('active');
        $('.feedback-theme-title').removeClass('open');
        $('.feedback-theme-title-value').html(curLink.html());
        e.preventDefault();
    });

    $('.footer-back a').click(function(e) {
        $.scrollTo(0, 500);
        e.preventDefault();
    });

});