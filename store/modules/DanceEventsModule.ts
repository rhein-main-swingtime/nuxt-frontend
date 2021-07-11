import { Module, VuexModule, Mutation, MutationAction, Action } from 'vuex-module-decorators'
import _ from 'lodash'
import { faTshirt } from '@fortawesome/free-solid-svg-icons'
import {
    DanceEventDataItem,
    DanceEventsFiltersInterface,
    danceEventsApiResponseInterface,
    danceEventPayloadItemInterface
} from '../../types/DanceEvent'
import { DanceEventDatesMap } from './../../types/DanceEvent'
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
    danceEvents: {[key: number]: DanceEventDataItem} = {}
    filters: DanceEventsFiltersInterface | null = {}
    months = this.returnAllMonths()
    _eventIdsByMonth: {[key: string]: Array<string>} = {}
    startDate = new Date(
        (new Date()).getFullYear(),
        (new Date()).getMonth(),
        1
    )

    endDate = new Date(
        this.startDate.getFullYear() + 2,
        this.startDate.getMonth(),
        this.startDate.getDate()
    )

    _dateMap = this.generateDateMap()

    get eventIdsByMonth () {
        return this._eventIdsByMonth
    }

    private generateDateMap () {
        const rollingDate = this.startDate
        const out: {[key: string]: Array<number> | null } = {}
        while (rollingDate <= this.endDate) {
            const key = [
                rollingDate.getFullYear(),
                rollingDate.getMonth(),
                rollingDate.getDate()
            ].join('-')
            out[key] = null
            rollingDate.setDate(rollingDate.getDate() + 1)
        }
        return out
    }

    private returnAllMonths (): Date[] {
        const startDate = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        )

        const endDate = new Date(
            startDate.getFullYear() + 2,
            startDate.getMonth(),
            startDate.getDate()
        )

        const months = []

        let dateIterrator = startDate

        while (dateIterrator <= endDate) {
            months.push(dateIterrator)
            const nextMonth = dateIterrator.getMonth() < 11 ? dateIterrator.getMonth() + 1 : 0

            const nextYear = nextMonth > 0
                ? dateIterrator.getFullYear()
                : dateIterrator.getFullYear() + 1

            dateIterrator = new Date(
                nextYear,
                nextMonth,
                1
            )
        }

        return months
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
    addEvent (payload: {id: number, danceEvent: DanceEventDataItem}) {
        const tmp = this.danceEvents
        this.danceEvents = {}

        this.danceEvents = _.merge(
            tmp,
            {
                [payload.id]: payload.danceEvent
            }
        )
    }

    @Mutation
    addEventIDsToDateMap (eventIds: Array<number>) {
        const tmp = this._dateMap
        this._dateMap = {}

        for (const eventId of eventIds) {
            const eventDate = this.danceEvents[eventId].startDateTime
            const dateKey = [eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()].join('-')

            if (tmp[dateKey] === null) {
                tmp[dateKey] = []
            }

            tmp[dateKey]?.push(eventId)
        }

        this._dateMap = tmp
    }

    @Action
    async fetchEventsForMonth (date: string) {
        const host = '//localhost:8088/'
        return await $axios.get(host + 'events/byMonth/' + date)
            .then(response => response.data)
            .then((payload: Array<danceEventPayloadItemInterface>) => {
                const eventIds: number[] = []

                payload.map((e) => {
                    const danceEvent = new DanceEventDataItem(e)
                    const id = e.id
                    this.addEvent({ id, danceEvent })
                    eventIds.push(e.id)
                })

                this.addEventIDsToDateMap(eventIds)
            })
    }
}
