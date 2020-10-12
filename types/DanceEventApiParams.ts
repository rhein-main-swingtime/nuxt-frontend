export default class danceEventApiParams {
    static readonly DIVIDER = '|'
    static readonly SLASH = '/'
    static readonly LIMIT = 16

    readonly routeParts: Array<string>
    readonly categories: string
    readonly cities: string
    readonly calendars: string

    constructor (routeString: string) {
        this.routeParts = routeString.split(danceEventApiParams.SLASH)
        this.routeParts.map(part => part.toLowerCase())
        this.categories = this.routeParts[0] || ''
        this.cities = this.routeParts[1] || ''
        this.calendars = this.routeParts[2] || ''
    }

    private filterValues (allowed: Array<string>, values: string): Array<string> {
        const splittedValues = values.split(danceEventApiParams.DIVIDER)

        if (allowed.length > 0) {
            splittedValues.filter(element => (allowed.includes(element)))
        }

        return splittedValues
    }

    private getCategories (): Array<string> {
        const allowed = [
            'social', 'class'
        ]
        return this.filterValues(allowed, this.categories)
    }

    private getCities (): Array<string> {
        return this.filterValues([], this.cities)
    }

    private getCalendar (): Array<string> {
        return this.filterValues([], this.calendars)
    }

    public getParams (): Object {
        return {
            calendar: this.getCalendar(),
            cities: this.getCities(),
            categories: this.getCategories(),
            limit: danceEventApiParams.LIMIT
        }
    }
}
