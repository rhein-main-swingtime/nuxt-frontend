import { Module, VuexModule, Mutation, MutationAction, Action } from 'vuex-module-decorators'
import _ from 'lodash'
import {
    DanceEventsCollection as DanceEventsByDatesCollection,
    DanceEventPayloadItem,
    DanceEventsFiltersInterface,
    danceEventsApiResponseInterface
} from '../../types/DanceEvent'
import { $axios } from '~/utils/api'

function isFilterInUrl (category: string, filterName: string, url: string): boolean {
    return decodeURI(url)
        .toLowerCase()
        .includes(
            category.toLowerCase() + '[]=' + filterName.toLowerCase()
        )
}

@Module({
    name: 'modules/DanceEventsModule',
    stateFactory: true,
    namespaced: true
})
export default class DanceEventsModule extends VuexModule {
    searchParams: null | string = null
    dates: DanceEventsByDatesCollection = []
    danceEvents: {[key: number]: DanceEventPayloadItem} | null = null
    filters: DanceEventsFiltersInterface | null = {}
    eventsLoading: boolean | null = null
    moreEventsAvailable: boolean = false
    numberOfEvents = 0

    get routeQuery (): string {
        if (this.filters === null) {
            return ''
        }

        const queryParts = []

        for (const [category, filters] of Object.entries(this.filters)) {
            for (const [filter, value] of Object.entries(filters)) {
                if (value.active === true) {
                    queryParts.push(encodeURI(category) + '[]=' + encodeURI(filter))
                }
            }
        }

        return (queryParts.length > 0 ? '?' + queryParts.join('&') : '')
    }

    get hasActiveFilter () {
        if (this.filters === null || this.filters === {}) {
            return false
        }

        Object.values(this.filters).forEach((section) => {
            const activeNum = Object.values(section).filter(item => item.active).length
            if (activeNum > 0) {
                return true
            }
        })

        return false
    }

    // @MutationAction({ mutate: ['filters'] })
    // async fetchFilters (params: { ['host']: string, ['search']: string }) {
    //     return await $axios.get(params.host + 'filters')
    //         .then(response => response.data)
    //         .then((payload: {[key: string]: Array<string>}) => {
    //             const filters = {} as DanceEventsFiltersInterface

    //             for (const [category, entries] of Object.entries(payload)) {
    //                 filters[category] = {}

    //                 entries.forEach((entry) => {
    //                     filters[category][entry] = isFilterInUrl(category, entry, params.search)
    //                 })
    //             }

    //             return { filters }
    //         })
    // }

    @Mutation
    updateFilter (payload: any) {
        this.filters = _.merge(this.filters, payload)
    }

    @Mutation
    resetFilters () {
        const resetFilters: DanceEventsFiltersInterface = {}

        for (const [category, filters] of Object.entries(this.filters || {})) {
            resetFilters[category] = {}
            Object.keys(filters).forEach((name) => {
                resetFilters[category][name] = {
                    active: false,
                    count: null
                }
            })
        }

        this.filters = resetFilters
    }

    @Mutation
    toggleEventsLoading (status: boolean) {
        this.eventsLoading = status
    }

    @Mutation
    toggleMoreEventsAvailable (status: boolean) {
        this.moreEventsAvailable = status
    }

    @Mutation setDanceEvents (danceEvents: {[key: number]: DanceEventPayloadItem}) {
        this.danceEvents = danceEvents
    }

    @Mutation appendDanceEvents (danceEvents: {[key: number]: DanceEventPayloadItem}) {
        this.danceEvents = _.merge(this.danceEvents, danceEvents)
    }

    @Mutation setDates (datesCollection: any) {
        this.dates = datesCollection
    }

    @Mutation appendDates (datesCollection: any) {
        this.dates = _.merge(this.dates, datesCollection)
    }

    @Mutation setFilters (filters: DanceEventsFiltersInterface) {
        this.filters = filters
    }

    @Mutation setNumberOfEvents (value: number) {
        this.numberOfEvents = value
    }

    @Mutation incrementNumber (value: number) {
        this.numberOfEvents += value
    }

    @Action
    async fetchEvents (params: { ['host']: string, ['skip']: number }) {
        this.toggleEventsLoading(true)
        this.toggleMoreEventsAvailable(false)
        let search = this.routeQuery

        if (params.skip) {
            const prefix = (search === '' ? '?' : '&')
            search += prefix + 'skip=' + params.skip
        }

        return await $axios.get(params.host + 'events' + search)
            .then(response => response.data)
            .then((payload: danceEventsApiResponseInterface) => {
                const append = (params.skip > 0 && this.numberOfEvents > 0)
                const events : {[key: number]: DanceEventPayloadItem} = {}

                payload.danceEvents.forEach((e) => {
                    events[parseInt(e.id)] = new DanceEventPayloadItem(e)
                })

                if (append) {
                    this.appendDanceEvents(events)
                    this.appendDates(payload.dates)
                    this.incrementNumber(_.size(payload.danceEvents))
                } else {
                    this.setDanceEvents(events)
                    this.setDates(payload.dates)
                    this.setNumberOfEvents(_.size(payload.danceEvents))
                }

                this.setFilters(payload.filters)

                this.toggleEventsLoading(false)
                this.toggleMoreEventsAvailable(Object.keys(payload.danceEvents).length === 25)
            })
    }
}
