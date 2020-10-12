import { FilterValuesFromURLInterface } from '../types/FilterTypes'

const DIVIDER = '|'
const SLASH = '/'

export class RouteFilterValues {
    readonly path: string

    constructor (path: string) {
        this.path = path
    }

    public getValues (): FilterValuesFromURLInterface {
        const routeParts = this.path.split(SLASH)
        const filterObjectValues: FilterValuesFromURLInterface = {}
        routeParts.forEach((segment, idx) => {
            filterObjectValues[idx] = segment.split(DIVIDER)
        })

        return filterObjectValues
    }
}
