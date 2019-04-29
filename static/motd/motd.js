/* eslint-disable eqeqeq */
/* eslint-disable semi */
$(document).ready(function () {
    console.log([window.motd, window.newMotd, window.login]);
    if (window.motd && window.newMotd.enable === 'true') {
        var ver = checkIosVersion();
        var version;
        if (ver !== false) {
            version = parseInt(ver);
        } else {
            version = false;
        }
        console.log(version);
        if (version >= 12.2 || version === false) {
            $('#motd').load('static/motd/motd.html', function () {
                var buttonText;
                var blurClasses = ['#map', '#header', '.search-container', '.fullscreen-toggle'];
                $.each(blurClasses, function (i, v) {
                    $(v).addClass('motd-blur');
                });
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
                if (window.sSUser != false) {
                    buttonText = 'Logout';
                    if (window.paypalUrl != '') {
                        buttonText += ' / Donate';
                    }
                }
                if (buttonText !== '') {
                    if ($('#currentWeather').length > 0) {
                        $('<button data-first="1" class="btn m-1 motdButton btn-primary">' + buttonText + '</button>').insertBefore('#currentWeather');
                    } else if ($('#statsToggle').length > 0 && $('#currentWeather').length > 0) {
                        $('<button data-first="1" class="btn m-1 motdButton btn-primary">' + buttonText + '</button>').insertBefore('#statsToggle');
                    } else {
                        $('header').append('<button data-first="1" class="btn m-1 motdButton btn-primary">' + buttonText + '</button>');
                    }
                }
                $('header').on('click', '.motdButton', showMotd);
                $('.motdMessage').html(window.newMotd.message);
                $('body').on('click', '.motd-blur', hideMotd);
                // eslint-disable-next-line no-undef
                if (window.sSUser) {
                    var userSpan = $('header > span')[0];
                    // eslint-disable-next-line no-undef
                    $(userSpan).html(sSUser.user);
                    $('.motd-btn-login').text('Logout');
                    $('.motd-btn-login').click(function (e) {
                        e.preventDefault();
                        window.location.href = 'logout.php';
                    });
                    $(userSpan).css({
                        'color': '#ffffff',
                        'text-shadow': '0.5px 0.5px .5px rgb(110,255,110)'
                    });
                } else {
                    showMotd();
                }
            });
        } else if (version <= 12.1 && version !== false) {
            var alertMessage = 'Some of our features and updates require you to update your iOS version to at least 12.2\nYour current version is ' + version;
            alert(alertMessage);
        }
    }
});

function checkIosVersion() {
    var agent = window.navigator.userAgent;
    var start = agent.indexOf('OS ');
    if ((agent.indexOf('iPhone') > -1 || agent.indexOf('iPad') > -1) && start > -1) {
        return window.Number(agent.substr(start + 3, 4).replace('_', '.'));
    }
    return false;
}


function hideMotd(e) {
    $('.motd-blur').removeClass('motd-blur');
    $('#motd').hide();
    $('body').off('click', hideMotd);
    return false;
}

function showMotd(e) {
    var blurClasses = ['#map', '#header', '.search-container', '.fullscreen-toggle'];
    $.each(blurClasses, function (i, v) {
        $(v).addClass('motd-blur');
    });
    $('body').find('#motd').show();
    setTimeout(function () {
        $('body').on('click', '.motd-blur', hideMotd);
    }, 3000);
}
