export interface LearnCardPayload {
    name: string
    city: string
    category: string
    contact: {
        facebook?: string,
        instagram?: string,
        mail?: string,
        tel?: string
        web?: string
        youtube?: string,
    }
    address?: string[],
    desc?: string | {[key: string]: string}
}
