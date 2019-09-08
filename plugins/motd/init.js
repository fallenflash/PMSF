/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
$(document).ready(function() {
    $('#motd').remove();
    $('head').append('<link href="./plugins/motd/css/motd.css" rel="stylesheet">');
    $.get('./plugins/motd/motd.php', function(data) {
        $('.wrapper').append(data);
    });
    var buttonText;
    if (window.login) {
        $('header').find('a[href="./user"]').hide();
    }
    if (window.paypalUrl !== '') {
        $('header').find('a[href="' + window.paypalUrl + '"]').hide();
    }

    if (window.login && window.paypalUrl !== '') {
        buttonText = 'Login / Donate';
    } else if (window.login && window.paypalUrl === '') {
        buttonText = 'Login';
    } else if (!window.login && window.paypalUrl !== '') {
        buttonText = 'Donate';
    } else if (!window.login && window.paypalUrl !== '') {
        buttonText = '';
    }
    if (/[A-Za-z]{2,32}#\d{4}/g.test(window.sessionUser)) {
        buttonText = 'Logout';
        if (window.paypalUrl !== '') {
            buttonText += ' / Donate';
        }
    }
    if (buttonText !== '') {
        if ($('#currentWeather').length > 0) {
            $('<button data-first="1" class="btn motd-open-btn" onclick="showMotd(event);">' + buttonText + '</button>').insertBefore('#currentWeather');
        } else if ($('#statsToggle').length > 0 && $('#currentWeather').length > 0) {
            $('<button data-first="1" class="btn motd-open-btn" onclick="showMotd(event);">' + buttonText + '</button>').insertBefore('#statsToggle');
        } else {
            $('header').append('<button data-first="1" class="btn motd-open-btn" onclick="showMotd(event);">' + buttonText + '</button>');
        }
    }
    // eslint-disable-next-line no-undef
    if (/[A-Za-z]{2,32}#\d{4}/g.test(window.sessionUser)) {
        // eslint-disable-next-line no-undef
        $('#header > span').text(window.sessionUser);
        $('#header > span').css({
            'color': '#ffffff',
            'text-shadow': '0.5px 0.5px .5px rgb(110,255,110)'
        });
    }
    showMotd();
});

function hideMotd(event) {
    $('.motd-blur').removeClass('motd-blur');
    $('#motdNew').hide();
    $('body').off('click','.motd-blur', hideMotd);
    return false;
    }


function showMotd(event) {
    if (event) {
        event.stopPropagation();
    }
    var blurClasses = ['#map', '#header', '.search-container', '.fullscreen-toggle'];
    $.each(blurClasses, function(i, v) {
        $(v).addClass('motd-blur');
    });
    $('body').find('#motdNew').show();
    $('.wrapper').on('click', '.motd-blur', hideMotd);
    $(window).trigger('resize');
    return false;
}
