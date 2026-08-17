/* Dependencies */
import React, { createContext, useContext, useState } from 'react'

/* Libraries */
import { alert } from '@hproinformatica/hpro-components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUrl } from '@hproinformatica/hpro-functions'

/* Types */
interface ContextProps {
	settings: TSettings
	loadSettings: () => Promise<HPro.Settings>
	saveSettings: (Settings: HPro.Settings) => Promise<void>
}
interface SettingsProps {
	children: React.ReactNode
}
interface TSettings extends HPro.Settings {
	url: (subdir: string) => string
}

/* Contexts */
export const SettingsContext = createContext({} as ContextProps)

/* Environments */
const STORAGE_KEY = 'SETTINGS_INFO'

/* Providers */
export default function SettingsProvider({ children }: SettingsProps) {
	/* States */
	const [settings, setSettings] = useState<TSettings | null>(null)

	/* Functions */
	async function loadSettings() {
		try {
			const item = await AsyncStorage.getItem(STORAGE_KEY)
			const content: HPro.Settings = item ? JSON.parse(item) : null

			// Default values
			const conf: HPro.Settings = {
				server: 'https://gestaohpro.com.br',
				port: '443'
			}

			if (content) {
				conf.server = content.server
				conf.port = content.port
			} else if (__DEV__) {
				conf.server = '192.168.0.92'
				conf.port = '80'
			}

			await saveSettings(conf)

			return conf
		} catch (error) {
			alert({
				title: 'Erro',
				message: error.message
			})
		}
	}

	async function saveSettings(value: HPro.Settings) {
		try {
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value))
			setUrl(new URL(`${value.server}:${value.port}`))
			setSettings({
				url: (subdir: string) => {
					if (!subdir.startsWith('/')) {
						subdir = '/' + subdir
					}

					let url = `${value.server}:${value.port}${subdir}`

					if (!url.startsWith('https://') && !url.startsWith('http://')) {
						url = 'http://' + url
					}

					return url
				},
				...value
			})
		} catch (error) {
			alert({
				title: 'Erro',
				message: error.message
			})
		}
	}

	return (
		<SettingsContext.Provider value={{ settings, loadSettings, saveSettings }}>
			{children}
		</SettingsContext.Provider>
	)
}

/* useContexts */
export function useSettings() {
	return useContext(SettingsContext)
}
