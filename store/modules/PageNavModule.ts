import { Module, VuexModule, Mutation, MutationAction } from 'vuex-module-decorators'
import { Watch } from 'nuxt-property-decorator';

@Module({
    name: 'modules/PageNavModule',
    stateFactory: true,
    namespaced: true
})
export default class PageNavModule extends VuexModule {
    activeNav : null | String = null

    @Mutation
    SET_ActiveNav (activeNav: null | String) {
        this.activeNav = activeNav
    }

}
