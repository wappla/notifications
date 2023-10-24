import EventTarget from './EventTarget'

const DEFAULT_DURATION = 5000

export enum ENotificationType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
}

export type NotificationData = {
    type: ENotificationType
    title: string
    message?: string
}

export type Notification = {
    duration: number
    createdAt: number
    data: NotificationData
}

export default class NotificationDispatcher extends EventTarget {
    defaultDuration: number
    notifications: Notification[]

    constructor(defaultDuration = DEFAULT_DURATION) {
        super()
        this.notifications = []
        this.defaultDuration = defaultDuration
    }

    createNotification(
        data: NotificationData,
        duration = this.defaultDuration,
        createdAt = Date.now(),
    ): Notification {
        return {
            data,
            duration,
            createdAt,
        }
    }

    removeNotification(notification: Notification) {
        const index = this.notifications.indexOf(notification)
        if (index !== -1) {
            this.notifications.splice(index, 1)
        }
        this.dispatchEvent(new CustomEvent('changed'))
        this.dispatchEvent(new CustomEvent('removed', { detail: notification }))
    }

    dispatchNotification(notification: Notification) {
        this.notifications.push(notification)
        if (notification.duration) {
            setTimeout(() => {
                this.removeNotification(notification)
            }, notification.duration)
        }
        this.dispatchEvent(new CustomEvent('changed'))
        this.dispatchEvent(new CustomEvent('added', { detail: notification }))
    }

    dispatch(data: NotificationData, duration?: number, createdAt?: number) {
        const notification = this.createNotification(data, duration, createdAt)
        this.dispatchNotification(notification)
    }

    subscribe(listener) {
        this.addEventListener('changed', () =>
            listener([...this.notifications]),
        )
        return () => {
            this.removeEventListener('changed', () =>
                listener([...this.notifications]),
            )
        }
    }
}

let notificationDispatcher: any = null
export const getNotificationDispatcher = (): NotificationDispatcher => {
    if (notificationDispatcher === null) {
        notificationDispatcher = new NotificationDispatcher()
        return notificationDispatcher
    }
    return notificationDispatcher
}
