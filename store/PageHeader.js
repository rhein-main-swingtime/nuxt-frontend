export const state = () => ({
    intro: null,
    teasers: null,
    translations: null,
    responsiveNavShown: false
})

export const mutations = {
    SET_intro (state, content) {
        state.intro = content
    },
    SET_pageTranslations (state, translations) {
        state.translations = translations
    },
    TOGGLE_nav (state) {
        state.responsiveNavShown = !state.responsiveNavShown
    }
}
