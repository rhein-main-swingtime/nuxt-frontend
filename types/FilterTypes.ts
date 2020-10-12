export interface FilterObjectInterface {
    categoryName: string,
    items: Array<FilterItemInterface>
}

export interface FilterItemInterface {
    filterName: string,
    active: boolean
}

export interface FilterValuesFromURLInterface {
    [key: number]: Array<string>
}

export interface FilterValuesFromApiInterface {
    [key: string]: Array<string>
}
