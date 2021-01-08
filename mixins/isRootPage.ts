import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
    computed: {
        isRootPage () {
            return this.$route.path === '/' || this.$route.path === '/' + this.$i18n.locale
        }
    }
}
