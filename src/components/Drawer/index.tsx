/* Dependencies */
import {
	DrawerContentComponentProps,
	DrawerItem,
	DrawerItemList
} from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

/* Project */
import { useNotification } from '../../contexts/notification'
import { useUser } from '../../contexts/user'
import { post } from '../../functions/fetch'
import { theme } from '../../themes'
import Container from '../Container'

function CustomDrawerContent(
	props: DrawerContentComponentProps & {
		navigation: any
	}
) {
	/* States */
	const { saveUser, user } = useUser()
	const { loadToken } = useNotification()
	const navigation = useNavigation()

	/* Functions */
	async function handleLogout() {
		const token = await loadToken()
		if (token) {
			post('$notifications_token_unregister', {
				token: user?.token,
				tok: token.data
			})
		}

		await saveUser(null)
		navigation.navigate('Main')
	}

	return (
		<>
			<Container>
				<View style={styles.header}>
					<Text style={styles.title}>{user?.username ?? 'Carregando...'}</Text>
					<Text style={styles.description}>
						{user?.empresa ?? 'Carregando...'}
					</Text>
				</View>
				<View style={styles.list}>
					<ScrollView>
						<DrawerItemList labelStyle={styles.item} {...props} {...user} />
						<DrawerItem
							icon={() => (
								<View>
									<Icon color={theme.ERROR} name={'logout'} size={22} />
								</View>
							)}
							labelStyle={styles.item}
							label={'Sair'}
							onPress={handleLogout}
						/>
					</ScrollView>
				</View>
			</Container>
		</>
	)
}

export default CustomDrawerContent

const styles = StyleSheet.create({
	header: {
		backgroundColor: theme.SURFACE,
		justifyContent: 'center',
		minHeight: 100,
		padding: 16
	},
	title: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	},
	description: {
		color: 'white',
		fontSize: 14
	},
	list: {
		backgroundColor: theme.BACKGROUND,
		flex: 1
	},
	item: {
		fontWeight: 'bold'
	}
})
