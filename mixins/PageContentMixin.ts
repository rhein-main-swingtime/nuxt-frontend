import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PageContentMixin extends Vue {
    async asyncData (context: any) {
        const { $content, app, route } = context
        const routeName = route.name.slice(0, route.name.indexOf('___'))
        const content = await $content(`${app.i18n.locale}/${routeName}`).fetch()
        return {
            content
        }
    }
}
