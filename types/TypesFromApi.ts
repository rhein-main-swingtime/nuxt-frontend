export interface FiltersFromStoreType {
    calendars? : Array<string>
    categories?: Array<string>
    cities?: Array<string>
}

export interface DanceEventsFromApi {
    // filters: {[key: string]: Array<string>}
    danceEvents: Array<danceEventPayloadItemInterface>
}