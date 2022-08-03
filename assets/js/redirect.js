(function(window, document) {
    const USER_LOCALE = 'userLocale';
    const savedUserLocale = window.localStorage.getItem(USER_LOCALE);

    let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
    let shortLang = lang;
    do {
        shortLang = shortLang.split('-')[0];
    } while (shortLang.indexOf('-') !== -1);

    if (savedUserLocale) {
        if (shortLang !== savedUserLocale) {
            window.localStorage.setItem(USER_LOCALE, shortLang);
        }
        return;
    }

    window.localStorage.setItem(USER_LOCALE, shortLang);
    if (document.documentElement.lang === shortLang) {
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

