import tailwindTypography from '@tailwindcss/typography'
import webpack from 'webpack'
import i18n from './i18n'

export default {
    // Target (https://go.nuxtjs.dev/config-target)
    target: 'static',
    dev: process.env.NODE_ENV !== 'production',

    publicRuntimeConfig: {
        apiHost: (process.env.NODE_ENV !== 'production'
            ? 'http://localhost:8088/'
            : 'https://api.rmswing.de/'
        )
    },

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'frontend-nuxtjs',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://use.typekit.net/etw5suf.css'
            },
            {
                rel: 'stylesheet',
                href: '//fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,400&family=Poiret+One&display=swap'
            }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '~/node_modules/vue2-animate/src/sass/vue2-animate.scss'
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '~/plugins/axios-accessor.ts',
        { src: '~/plugins/infiniteLoading', ssr: false }
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
    // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        ['@nuxtjs/fontawesome', {
            component: 'fa',
            icons: {
                solid: true,
                regular: true,
                brands: true
            }
        }]
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
    // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
        ['nuxt-i18n', {
            parsePages: false,
            pages: {
                dataprotection: {
                    de: '/datenschutz',
                    en: '/data-protection'
                },
                imprint: {
                    de: '/impressum',
                    en: '/imprint'
                },
                index: {
                    de: '/',
                    en: '/en/'
                },
                learn: {
                    de: '/lernen',
                    en: '/learn'
                },
                music: {
                    de: '/musik',
                    en: '/music'
                },
                scene: {
                    de: '/szene',
                    en: '/scene'
                },
                dance: {
                    de: '/tanzen',
                    en: '/dance'
                }
            },
            lazy: true,
            langDir: 'locales/',
            strategy: 'prefix_except_default',
            useCookie: true,
            cookieKey: 'i18n_redirected',
            defaultLocale: 'de',
            fallbackLocale: 'en'
        }],
        'vue-scrollto/nuxt'
    ],

    tailwindcss: {
        exposeConfig: true,
        config: {
            plugins: [tailwindTypography]
        }
    },

    i18n: {
        locales: [
            { code: 'en', iso: 'en-US', file: 'en.json', name: 'switch to English' },
            { code: 'de', iso: 'de-DE', file: 'de.json', name: 'zu Deutsch wechseln' }
        ],
        vueI18n: {
            dateTimeFormats: {
                de: {
                    longDate: {
                        weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
                    },
                    shortDate: {
                        month: 'short',
                        day: 'numeric'
                    },
                    shortTime: {
                        hour: 'numeric',
                        minute: 'numeric'
                    }
                }
            }
        }
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {},

    // Content module configuration (https://go.nuxtjs.dev/config-content)
    content: {
        liveEdit: false,
        fullTextSearchFields: ['uid', 'homepage', 'nav']
    },

    router: {
        // middleware: ['PageTranslations']
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extend (config, ctx) {
            if (ctx.isDev) {
                config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                _: 'lodash'
            })
        ]
    }
}
