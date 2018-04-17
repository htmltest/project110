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

    $('.distrib-map-list-item').click(function() {
        var curItem = $(this);
        var curID = curItem.data('id');
        $('.distrib-map-list-item.active').removeClass('active');
        curItem.addClass('active');
        $('.distrib-map-scheme-point.active').removeClass('active');
        $('.distrib-map-scheme-point[data-id="' + curID + '"]').addClass('active');
    });

    $('.distrib-map-scheme-point').hover(
        function() {
            var curPoint = $(this);
            var curID = curPoint.data('id');
            $('.distrib-map-list-item[data-id="' + curID + '"]').addClass('hover');
        },

        function() {
            $('.distrib-map-list-item.hover').removeClass('hover');
        }
    );

    $('.distrib-map-menu ul li a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.distrib-map-menu ul li.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.distrib-map-menu ul li').index(curItem);
            $('.distrib-map-tab.active').removeClass('active');
            $('.distrib-map-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.distrib-map-tab-list').jScrollPane({autoReinitialise: true, verticalDragMinHeight: 60});

});