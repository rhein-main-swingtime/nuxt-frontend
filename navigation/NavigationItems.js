const big = [
    {
        translation: 'nav-events-all',
        nav: {
            name: 'dance'
        }
    },
    {
        translation: 'nav-events-socials',
        nav: {
            name: 'dance',
            query: { 'categories[]': 'socials' }
        }
    },
    {
        translation: 'nav-events-classes',
        nav: {
            name: 'dance',
            query: { 'categories[]': 'class' }
        }
    }
]

const major = [
    {
        translation: 'nav-homepage',
        nav: {
            name: 'index'
        }
    },
    {
        translation: 'nav-learn',
        nav: {
            name: 'learn'
        }
    },
    {
        translation: 'nav-music',
        nav: {
            name: 'music'
        }
    },
    {
        translation: 'nav-scene',
        nav: {
            name: 'scene'
        }
    }
]

const minor = [
    {
        translation: 'nav-imprint',
        nav: {
            name: 'imprint'
        }
    },
    {
        translation: 'nav-data-protection',
        nav: {
            name: 'dataprotection'
        }
    },
    {
        translation: 'nav-get-involved',
        nav: {
            name: 'get-involved'
        }
    }
]

export default { big, major, minor }
