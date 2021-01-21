export class UXHelers {
    static function headersHeight(horizontalNeighbour: Element | undefined) {
        let height = 0
        let scrollTargetXLength = 0

        if

        const scrollTargetXPos = scrollTarget.getBoundingClientRect().x +
        scrollTarget.getBoundingClientRect().width

        const headerElements = [
            'vc-container-parent',
            'page-header'
        ]

        headerElements.forEach((e) => {
            const element = document.getElementById(e)
            if (element) {
                const bounding = element.getBoundingClientRect()
                if (bounding.x > scrollTargetXPos) {
                    console.log('nebeneinander')
                    return
                }
                offset = offset + bounding.height
            }
        })
    }
}

export const headerElementIDs = [
    'vc-container-parent',
    'page-header'
]

export const uxHeadersHeight = function(): Number {
    let y = 0;
    headerElementIDs.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
            y += element.getBoundingClientRect().height
        }
    })
    return y
}