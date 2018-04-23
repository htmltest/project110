$(document).ready(function() {

    var searchTimer = null;

    $('.header-search-link').click(function(e) {
        $('html').toggleClass('search-open');
        window.clearTimeout(searchTimer);
        searchTimer = null;
        $('.header-search').removeClass('active');
        $('.header-search-results').hide();
        $('.header-search-input input').val('')
        e.preventDefault();
    });

    $('.header-search-input input').on('keyup', function() {
        var curValue = $('.header-search-input input').val();
        window.clearTimeout(searchTimer);
        searchTimer = null;
        if (curValue.length > 3) {
            $('.header-search').addClass('active');
            var curForm = $('.header-search-form form');
            searchTimer = window.setTimeout(function() {
                $.ajax({
                    type: 'POST',
                    url: curForm.attr('action'),
                    dataType: 'html',
                    data: curForm.serialize(),
                    cache: false
                }).done(function(html) {
                    $('.header-search').removeClass('active');
                    $('.header-search-count').html($(html).find('.window-search-count').html());
                    $('.header-search-results-inner').html($(html).find('.window-search-results').html());
                    $('.header-search-results').show();
                });
            }, 3000);
        }
    });

    $.validator.addMethod('maskPhone',
        function(value, element) {
            if (value == '') {
                return true;
            }
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curForm = curField.parents().filter('form');
        curField.find('.form-file-name-text').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curForm.find('.form-files').append(curForm.data('filesCode'));
    });

    $('body').on('click', '.form-file-name-remove', function() {
        var curField = $(this).parents().filter('.form-file');
        curField.remove();
    });

    $('form').each(function() {
        initForm($(this));
    });

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

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).data('window'));
        e.preventDefault();
    });

    $('.mobile-menu-link').click(function(e) {
        $('html').addClass('mobile-menu-open');
        e.preventDefault();
    });

    $('.mobile-menu-close, .mobile-menu-close-footer a').click(function(e) {
        $('html').removeClass('mobile-menu-open');
        e.preventDefault();
    });

    $('.catalogue-side-group-all .catalogue-side-group-title a').click(function(e) {
        if ($(window).width() < 990) {
            $('.catalogue-side-menu').toggleClass('open');
            e.preventDefault();
        }
    });

});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
    $('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.data('placeholder') != '') {
            curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
        }
    });
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('focus');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });

    curForm.find('.form-input input, .form-input textarea').blur(function() {
        if ($(this).val() == '') {
            $(this).parent().removeClass('focus');
        }
    });

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});
    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.data('placeholder') != '') {
            curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
        }
    });

    if (curForm.find('.form-files').length > 0) {
        curForm.data('filesCode', curForm.find('.form-files').html());
    }

    curForm.validate({
        ignore: '',
        invalidHandler: function(form, validatorcalc) {
            validatorcalc.showErrors();
            checkErrors();
        }
    });
}

function checkErrors() {
    $('.form-checkbox, .form-input').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-select').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('select.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('select.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}


function windowOpen(linkWindow, dataWindow) {
    var curPadding = $('.wrapper').width();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});

    if ($('.window').length > 0) {
        $('.window').remove();
    }

    $('.wrapper').append('<div class="window"><div class="window-loading"></div></div>')

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

            if ($('.window-container img').length > 0) {
                $('.window-container img').each(function() {
                    $(this).attr('src', $(this).attr('src'));
                });
                $('.window-container').data('curImg', 0);
                $('.window-container img').on('load', function() {
                    var curImg = $('.window-container').data('curImg');
                    curImg++;
                    $('.window-container').data('curImg', curImg);
                    if ($('.window-container img').length == curImg) {
                        $('.window-container').removeClass('window-container-load');
                        windowPosition();
                    }
                });
            } else {
                $('.window-container').removeClass('window-container-load');
                windowPosition();
            }

            $(window).resize(function() {
                windowPosition();
            });

            $('.window-close').click(function(e) {
                windowClose();
                e.preventDefault();
            });

            $('body').on('keyup', function(e) {
                if (e.keyCode == 27) {
                    windowClose();
                }
            });

            $('.window form').each(function() {
                initForm($(this));
            });

            $(document).click(function(e) {
                if ($(e.target).hasClass('window')) {
                    windowClose();
                }
            });
        }
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height()) {
            $('.window-container').css({'top': '0', 'margin-top': 0, 'padding-bottom': 0});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
    }
}