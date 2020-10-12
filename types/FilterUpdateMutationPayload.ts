export class FilterUpdatePayload {
    category: string
    item: string
    value: Boolean

    constructor (category: string, item: string, value: Boolean) {
        this.category = category
        this.item = item
        this.value = value
    }

    getCategory (): string {
        return this.category
    }

    getItem (): string {
        return this.item
    }

    getValue (): Boolean {
        return this.value
    }
}
