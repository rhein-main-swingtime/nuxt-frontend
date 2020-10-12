import Vuex from 'vuex'
import DanceEventsModule from '~/store/modules/DanceEventsModule'

export function createStore () {
    return new Vuex.Store({
        modules: {
            DanceEventsModule
        }
    })
}
