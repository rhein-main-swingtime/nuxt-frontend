import { DanceEventDatesMap } from './../../types/DanceEvent';
import { Module, VuexModule, Mutation, MutationAction, Action } from 'vuex-module-decorators'
import _ from 'lodash'
import {
    DanceEventDataItem,
    DanceEventsFiltersInterface,
    danceEventsApiResponseInterface,
    DanceDatesCollectionInterface
} from '../../types/DanceEvent'
import { $axios } from '~/utils/api'

// function isFilterInUrl (category: string, filterName: string, url: string): boolean {
//     return decodeURI(url)
//         .toLowerCase()
//         .includes(
//             category.toLowerCase() + '[]=' + filterName.toLowerCase()
//         )
// }

@Module({
    name: 'modules/DanceEventsModule',
    stateFactory: true,
    namespaced: true
})
export default class DanceEventsModule extends VuexModule {
    searchParams: null | string = null
    danceEvents: {[key: number]: DanceEventDataItem} | null = null
    filters: DanceEventsFiltersInterface | null = {}
    eventsLoading: boolean | null = null
    moreEventsAvailable: boolean = false
    numberOfEvents = 0
    minDate: Date = new Date()
    maxDate: Date = new Date(new Date().setFullYear(this.minDate.getFullYear() + 2))
    // dateMaps = this.createEmptyDateMaps()
    dateMaps = this.createEmptyDateMaps()

    private createEmptyDateMaps () {
        const monthly: DanceDatesCollectionInterface = {}
        const daily: DanceDatesCollectionInterface = {}
        // const movingDate = new Date(this.minDate)

        // while (movingDate <= this.maxDate) {
        //     const monthAsString = this.returnMonthlyKey(movingDate)
        //     if (!Object.keys(monthly).includes(monthAsString)) {
        //         monthly[monthAsString] = []
        //     }
        //     daily[this.returnDailyKey(movingDate)] = []
        //     movingDate.setDate(movingDate.getDate() + 1)
        // }

        return { monthly, daily }
    }

    private returnMonthlyKey (date: Date): string {
        return [
            date.getFullYear(),
            (date.getMonth() + 1).toString().padStart(2, '0')
        ].join('-')
    }

    private returnDailyKey (date: Date) {
        return this.returnMonthlyKey(date) + '-' + date.getDate().toString().padStart(2, '0')
    }

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

    get eventsByMonth (): null | DanceDatesCollectionInterface {
        return this.dateMaps.monthly || {}
    }

    get eventsByDay () : null | DanceDatesCollectionInterface {
        return this.dateMaps.daily || {}
    }

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
        this.dateMaps.monthly['2021-01'] = []
        this.eventsLoading = status
    }

    @Mutation
    toggleMoreEventsAvailable (status: boolean) {
        this.moreEventsAvailable = status
    }

    @Mutation setDanceEvents (danceEvents: {[key: number]: DanceEventDataItem}) {
        this.danceEvents = danceEvents
    }

    @Mutation appendDanceEvents (danceEvents: {[key: number]: DanceEventDataItem}) {
        this.danceEvents = _.merge(this.danceEvents, danceEvents)
    }

    @Mutation setEventByDates (datesCollection: any) {
        this.dateMaps.monthly = datesCollection.monthly
        this.dateMaps.daily = datesCollection.daily
    }

    @Mutation appendEventsByDates (datesCollection: any) {
        this.dateMaps.monthly = _.merge(this.dateMaps.monthly, datesCollection.monthly)
        this.dateMaps.daily = _.merge(this.dateMaps.daily, datesCollection.daily)
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
                const events : {[key: number]: DanceEventDataItem} = {}

                payload.danceEvents.forEach((e) => {
                    events[parseInt(e.id)] = new DanceEventDataItem(e)
                })

                if (append) {
                    this.appendDanceEvents(events)
                    this.appendEventsByDates(payload.dates)
                    this.incrementNumber(_.size(payload.danceEvents))
                } else {
                    this.setDanceEvents(events)
                    this.setEventByDates(payload.dates)
                    this.setNumberOfEvents(_.size(payload.danceEvents))
                }

                this.setFilters(payload.filters)

                // this.toggleEventsLoading(false)
                this.toggleMoreEventsAvailable(Object.keys(payload.danceEvents).length === 25)
            })
    }
}
