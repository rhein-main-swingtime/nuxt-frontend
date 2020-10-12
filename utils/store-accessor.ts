import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import { danceEvents } from '~/store/danceEvents'

let danceEventsStore : danceEvents

function initialiseStores (store: Store<any>): void {
    danceEventsStore = getModule(danceEvents, store)
}

export { initialiseStores, danceEventsStore }
