export default [
    {
        translation: 'nav-homepage',
        nav: {
            name: 'index'
        }
    },
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
