export interface danceEventPayloadItemInterface {
    id: string
    city: string
    calendar: string
    category: string
    summary: string
    description: string
    start_date_time: string
    end_date_time: string
    location: string
}

export interface DanceDatesCollectionInterface {
        [key: string]: Array<number>
}

export interface DanceEventsCollection {
    [key: number]: DanceEventPayloadItem
}

export interface DanceEventsFiltersInterface {
    [key: string]: {
        [key: string]: {
            active: boolean,
            count: number | null
        }
    }
}

export interface DanceEventsApiFilters {
    [key: string]: Array<string>
}

export interface danceEventsApiResponseInterface {
    filters: DanceEventsFiltersInterface
    danceEvents: Array<danceEventPayloadItemInterface>
    dates: DanceDatesCollectionInterface
}

export class DanceEventPayloadItem {
    id: number
    city?: string
    calendar?: string
    category?: string
    summary?: string
    location?: string
    description?: string
    startDateTime: Date
    endDateTime: Date

    constructor (payload: danceEventPayloadItemInterface) {
        this.startDateTime = new Date(payload.start_date_time)
        this.endDateTime = new Date(payload.end_date_time)
        this.id = parseInt(payload.id)
        this.city = payload.city
        this.calendar = payload.calendar
        this.category = payload.category
        this.summary = payload.summary
        this.description = payload.description
        this.location = payload.location
    }
}
