/* Dependencies */
import React, { createContext, useContext, useState } from 'react'

/* Libraries */
import { alert } from '@hproinformatica/hpro-components'
import AsyncStorage from '@react-native-async-storage/async-storage'

/* Types */
interface ContextProps {
	user: HPro.User
	loadUser: () => Promise<HPro.User>
	saveUser: (user: HPro.User) => Promise<void>
}
interface UserProps {
	children: React.ReactNode
}

/* Contexts */
export const UserContext = createContext({} as ContextProps)

/* Environments */
const STORAGE_KEY = 'USER_INFO'

/* Providers */
export default function UserProvider({ children }: UserProps) {
	/* States */
	const [user, setUser] = useState<HPro.User>(null)

	/* Functions */
	async function loadUser() {
		try {
			const content =
				(JSON.parse(await AsyncStorage.getItem(STORAGE_KEY)) as HPro.User) ||
				null
			setUser(content)
			return content
		} catch (error) {
			alert({
				title: 'Erro',
				message: error.message
			})
		}
	}

	async function saveUser(value: HPro.User) {
		try {
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value))
			setUser(value)
		} catch (error) {
			alert({
				title: 'Erro',
				message: error.message
			})
		}
	}

	return (
		<UserContext.Provider value={{ user, loadUser, saveUser }}>
			{children}
		</UserContext.Provider>
	)
}

/* useContexts */
export function useUser() {
	return useContext(UserContext)
}
