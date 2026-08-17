/* Dependencies */
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'

/*  Project */
import Container from './components/Container'
import { useNotification } from './contexts/notification'
import { useSettings } from './contexts/settings'
import { useUser } from './contexts/user'
import { post } from './functions/fetch'
import { theme } from './themes'

export default function Main({
	navigation
}: HPro.Props<HPro.MainStack, 'Main'>) {
	/* Fonts */
	// const [loaded] = useFonts({
	// 	roboto: require('./assets/fonts/RobotoMono-Regular.ttf'),
	// 	openSans: require('./assets/fonts/OpenSans-Regular.ttf'),
	// 	openSansSb: require('./assets/fonts/OpenSans-SemiBold.ttf'),
	// })

	/* Contexts */
	const { loadSettings } = useSettings()
	const { loadUser } = useUser()
	const { loadToken } = useNotification()

	/* Effects */
	useFocusEffect(
		useCallback(() => {
			onLoad()
		}, [])
	)

	/* Functions */
	async function onLoad() {
		if (!(await loadSettings())) {
			navigation.navigate('SettingsServer')
			return
		}

		const user = await loadUser()
		if (!user) {
			navigation.navigate('Auth')
			return
		}

		const token = await loadToken()
		if (token) {
			await post('$notifications_token_register', {
				token: user?.token,
				tok: token.data
			})
		}

		navigation.navigate('Home')
	}

	return (
		<>
			<Container>
				<View style={styles.container}>
					<Text style={styles.message}>
						{'Aguarde enquanto carregamos as infomações...'}
					</Text>
					<Text style={styles.hpro}>{'HPro Informática'}</Text>
				</View>
			</Container>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: theme.PRIMARY,
		flex: 1,
		justifyContent: 'center'
	},
	message: {
		color: theme.ACCENT,
		fontSize: 20,
		fontWeight: 'bold'
	},
	hpro: {
		color: theme.ACCENT,
		position: 'absolute',
		bottom: '10%',
		fontSize: 14,
		fontWeight: 'bold'
	}
})
