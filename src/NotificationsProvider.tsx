import { createContext } from 'react'
import NotificationDispatcher from './NotificationDispatcher'

export const NotificationsContext = createContext<NotificationDispatcher | undefined>(undefined)

export default NotificationsContext.Provider
