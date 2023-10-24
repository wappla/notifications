// Remove this polyfill when the issue below is resolved
// https://github.com/jsdom/jsdom/issues/2156

type Event = {
    type: string
}

export default class EventTargetPolyfill {
    events: any

    constructor() {
        this.events = {}
    }

    addEventListener(type: string, listener: () => void) {
        if (typeof this.events[type] === 'undefined') {
            this.events[type] = []
        }
        this.events[type].push(listener)
    }

    removeEventListener(type: string, listener: () => void) {
        if (typeof this.events[type] !== 'undefined') {
            const index = this.events[type].indexOf(listener)
            if (index > -1) {
                this.events[type].splice(index, 1)
            }
        }
    }

    dispatchEvent(event: Event) {
        const { type } = event
        if (typeof this.events[type] !== 'undefined') {
            this.events[type].forEach((listener) => {
                listener(event)
            })
        }
    }
}
