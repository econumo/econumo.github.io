(function(window, document) {
    // const getHostname = function (url) {
    //     let a = document.createElement('a');
    //     a.href = url;
    //     return a.hostname;
    // };
    const USER_LOCALE = 'userLocale';
    const savedUserLocale = window.sessionStorage.getItem(USER_LOCALE);
    const pageLocale = document.documentElement.lang;

    if (savedUserLocale) {
        return;
    }

    // if (savedUserLocale) {
    //     if (pageLocale === savedUserLocale) {
    //         return;
    //     } else {
    //         if (document.referrer && getHostname(document.referrer) === document.location.hostname) {
    //             window.sessionStorage.setItem(USER_LOCALE, pageLocale);
    //             return;
    //         }
    //     }
    // }

    let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
    let shortLang = lang;
    do {
        shortLang = shortLang.split('-')[0];
    } while (shortLang.indexOf('-') !== -1);

    window.sessionStorage.setItem(USER_LOCALE, shortLang);
    if (pageLocale === shortLang) {
        return;
    }

    const availableLanguages = document.querySelectorAll('link[rel=alternate]');
    let defaultUrl = null;
    let redirectUrl = null;
    availableLanguages.forEach((item) => {
        if (!defaultUrl && item.getAttribute('hreflang') === 'x-default') {
            defaultUrl = item.getAttribute('href');
        }
        if (!redirectUrl && item.getAttribute('hreflang') === shortLang) {
            redirectUrl = item.getAttribute('href');
        }
    })

    if (redirectUrl) {
        window.location.replace(redirectUrl);
    } else if (defaultUrl) {
        window.location.replace(defaultUrl);
    }
})(window, document);

