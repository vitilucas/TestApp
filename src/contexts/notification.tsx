/* Dependencies */
import React, { createContext, useContext, useEffect, useState } from 'react'

/* Libraries */
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { expo } from '../../app.json'
import { alert } from '../functions/dialogs'

/* Types */
interface TNotification<T> {
	notification: Notifications.Notification
	data: T
}
interface ContextProps {
	notification: Notifications.Notification
	setNotification: React.Dispatch<
		React.SetStateAction<Notifications.Notification>
	>
	getNotification: <T>() => TNotification<T>
	scheduleNotification: (
		request: Notifications.NotificationRequestInput
	) => Promise<void>
	loadToken: () => Promise<Notifications.ExpoPushToken>
	token: Notifications.ExpoPushToken
}
interface NotificationProps {
	children: React.ReactNode
}

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldPlaySound: true,
		shouldSetBadge: true,
		shouldShowAlert: true
	})
})

/* Contexts */
export const NotificationContext = createContext({} as ContextProps)

/* Providers */
export default function NotificationProvider({ children }: NotificationProps) {
	/* States */
	const [notification, setNotification] = useState<Notifications.Notification>(
		null
	)
	const [token, setToken] = useState<Notifications.ExpoPushToken>(null)

	/* Functions */
	useEffect(() => {
		// loadToken()

		const notificationListener = Notifications.addNotificationReceivedListener(
			handleNotification
		)
		const responseListener = Notifications.addNotificationResponseReceivedListener(
			handleNotificationResponse
		)

		return () => {
			Notifications.removeNotificationSubscription(notificationListener)
			Notifications.removeNotificationSubscription(responseListener)
		}
	}, [])

	async function loadToken() {
		let token: Notifications.ExpoPushToken = null
		let status = 'undetermined'

		try {
			if (Platform.OS === 'android') {
				await Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					importance: Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: '#FF231F7C',
					showBadge: true
				})
			}

			// If the device is not a physical device
			if (!Device.isDevice) {
				alert({
					title: 'Erro ao carregar token de notificação',
					message: 'O dispositivo não é compatível com notificações'
				})
				return token
			}

			status = (await Notifications.getPermissionsAsync()).status
			if (status !== 'granted') {
				status = (await Notifications.requestPermissionsAsync()).status
				if (status !== 'granted') {
					return token
				}
			}

			token = await Notifications.getExpoPushTokenAsync({
				projectId: expo.extra.eas.projectId
			})
		} catch (error) {
			alert({
				title: 'Erro',
				message: error.message
			})
		} finally {
			setToken(token)
			return token
		}
	}

	function handleNotification(notification: Notifications.Notification) {
		setNotification(notification)
	}

	function handleNotificationResponse(
		response: Notifications.NotificationResponse
	) {
		//console.log('Notification response: ', response)
		// setNavigate({
		// 	screen: 'Notifications',
		// 	params: {}
		// })
	}

	async function scheduleNotification(
		request: Notifications.NotificationRequestInput
	) {
		await Notifications.scheduleNotificationAsync(request)
	}

	function getNotification<T>(): TNotification<T> {
		if (!notification) return null
		if (!notification.request) return null
		if (!notification.request.content) return null
		if (!notification.request.content.data) return null

		return {
			notification,
			data: notification.request.content.data as T
		}
	}

	return (
		<NotificationContext.Provider
			value={{
				notification,
				setNotification,
				getNotification,
				scheduleNotification,
				loadToken: loadToken,
				token
			}}
		>
			{children}
		</NotificationContext.Provider>
	)
}

/* useContexts */
export function useNotification() {
	return useContext(NotificationContext)
}
