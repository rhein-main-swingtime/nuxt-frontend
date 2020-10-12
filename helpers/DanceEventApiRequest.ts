import { FilterItemInterface, FilterObjectInterface } from '../types/FilterTypes'

export default class DanceEventApiRequestHelper {
    readonly limit: number;
    readonly skip: number;
    readonly filterObjects: FilterObjectInterface[]

    constructor (filterObjects: FilterObjectInterface[], limit: number = 16, skip: number = 0) {
        this.limit = limit
        this.skip = skip
        this.filterObjects = filterObjects
    }

    public getSearchParams (): URLSearchParams {
        const searchParams = new URLSearchParams()

        if (this.skip > 0) {
            searchParams.append('skip', String(this.skip))
        }

        this.filterObjects.forEach((filterObject) => {
            const filterCategory = filterObject.categoryName
            filterObject.items.forEach((item: FilterItemInterface) => {
                if (item.active === true) {
                    searchParams.append(filterCategory + '[]', item.filterName)
                }
            })
        })

        searchParams.append('limit', String(this.limit))
        return searchParams
    }
}
