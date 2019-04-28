/* eslint-disable semi */
$(document).ready(function () {
    console.log([window.motd, window.newMotd, window.noDonate, window.login]);
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
                $('#map').addClass('motd-blur');
                $('#header').addClass('motd-blur');
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
                if (buttonText !== '') {
                    $('header').append('<button data-first="1" class="btn m-1 motdButton btn-primary">' + buttonText + '</button>');
                    $('header').on('click', '.motdButton', showMotd);
                }
                $('.motdMessage').html(newMotd.message);
                $('body').on('click', '.motd-blur', hideMotd);
                // eslint-disable-next-line no-undef
                if (window.sSUser) {
                    var userSpan = $('header > span')[0];
                    // eslint-disable-next-line no-undef
                    $(userSpan).html(sSUser.user);
                    $(userSpan).css({
                        'color': '#ffffff'
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
    $('body').find('#map').addClass('motd-blur');
    $('body').find('#header').addClass('motd-blur');

    $('body').find('#motd').show();
    setTimeout(function () {
        $('body').on('click', '.motd-blur', hideMotd);
    }, 3000);
}
