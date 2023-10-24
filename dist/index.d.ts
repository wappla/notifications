import * as react from 'react';

type Event = {
    type: string;
};
declare class EventTargetPolyfill {
    events: any;
    constructor();
    addEventListener(type: string, listener: () => void): void;
    removeEventListener(type: string, listener: () => void): void;
    dispatchEvent(event: Event): void;
}

type NotificationData = {
    type: string;
    title: string;
    message?: string;
};
type Notification = {
    duration: number;
    createdAt: number;
    data: NotificationData;
};
declare class NotificationDispatcher extends EventTargetPolyfill {
    defaultDuration: number;
    notifications: Notification[];
    constructor(defaultDuration?: number);
    createNotification(data: NotificationData, duration?: number, createdAt?: number): Notification;
    removeNotification(notification: Notification): void;
    dispatchNotification(notification: Notification): void;
    dispatch(data: NotificationData, duration?: number, createdAt?: number): void;
    subscribe(listener: (notifications: Notification[]) => void): () => void;
}
declare const getNotificationDispatcher: () => NotificationDispatcher;

declare const NotificationsContext: react.Context<NotificationDispatcher | undefined>;
declare const NotificationsProvider: react.Provider<NotificationDispatcher | undefined>;

export { Notification, NotificationData, NotificationDispatcher, NotificationsContext, NotificationsProvider, getNotificationDispatcher };
