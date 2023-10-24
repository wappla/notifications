<h1 align="center">@dashdot/notifications</h1>
<div align="center">

<sub>Built with ❤︎ by
<a href="#about-us">Dashdot</a> and
<a href="https://github.com/wappla/notifications/graphs/contributors">
contributors
</a>

</div>

<details>
    <summary>Table of Contents</summary>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- https://github.com/thlorenz/doctoc -->

-   [Motivation](#motivation)
    -   [Installing](#installing)
-   [Versioning](#versioning)
-   [Authors](#authors)
-   [About us](#about-us)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

</details>

## Motivation

This package contains a Notification dispatcher EventListener to dispatch and listen to notifications

### Installing

Install package

```
npm i @dashdot/notifications
```

Add provider

```
import { getNotificationDispatcher } from '@dashdot/notifications/NotificationDispatcher'
import NotificationsProvider from '@dashdot/notifications/NotificationsProvider'

export default function AppProviders() {
    return (
        <NotificationsProvider value={getNotificationDispatcher()}>
            {children}
        </NotificationsProvider>
    )
}

```

Subscribe and dispatch to notifications

```
import { useEffect, useState, useContext } from 'react'
import { NotificationsContext } from '@dashdot/notifications/NotificationsProvider'
import {
    Notification,
    NotificationData,
    ENotificationType,
} from '@dashdote/notifications/NotificationDispatcher'

export default function useNotifications() {
    const notificationDispatcher = useContext(NotificationsContext)
    const [notifications, setNotifications] = useState<[Notification] | []>([])
    useEffect(
        () =>
            notificationDispatcher?.subscribe(
                (newNotifications: [Notification]) => {
                    setNotifications(newNotifications)
                },
            ),
        [notificationDispatcher],
    )

    const success = (data = {}, duration?: undefined | number) => {
        notificationDispatcher?.dispatch(
            {
                type: ENotificationType.SUCCESS,
                title: 'Success,
                ...data,
            },
            duration,
        )
    }

    const removeNotification = (notification: any) => {
        notificationDispatcher?.removeNotification(notification)
    }

    return {
        notifications,
        success,
        dispatch: (
            data: NotificationData,
            createdAt?: number,
            duration?: number,
        ) => notificationDispatcher?.dispatch(data, createdAt, duration),
        removeNotification,
    }
}

```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/wappla/notifications/tags).

## Authors

-   **Dries Vandermeulen** - _Initial work_ - [Kevin Hurts](https://github.com/fromthemills)
-   **Kevin Hurts** - _Create package_ - [Kevin Hurts](https://github.com/KevinHurts)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## About us

[Dashdot BV](https://www.dashdot.be/)
We shape, build and grow ambitious digital products.
