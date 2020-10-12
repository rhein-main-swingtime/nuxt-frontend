export default async function (context) {
    const {
        store,
        route,
        $content,
        params,
        app
    } = context

    let slug = params.slug || '/index'

    console.log(slug)

    const page = await $content(`${app.i18n.locale}/`, slug || 'index').fetch()
    const uid = page.uid

    const i18n = app.i18n.locales

    const translations = await $content({ deep: true }).where({ uid }).fetch()
    const pageTranslations = []

    translations.forEach((element) => {
        const elementLocale = element.dir.split('/')[1]
        const translation = i18n.find(loc => loc.code === elementLocale)

        const pageTranslation = {
            name: translation.name,
            locale: translation.code,
            path: element.path
        }

        // if (elementLocale === app.i18n.defaultLocale) {
            pageTranslation.path = pageTranslation.path.replace('/' + elementLocale, '')
        // }

        pageTranslations.push(pageTranslation)
    })

    store.commit('PageHeader/SET_pageTranslations', pageTranslations)
}
