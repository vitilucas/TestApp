/* Dependencies */
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

/* Project */
import Appbar from '../../components/Appbar'
import Container from '../../components/Container'
import { useLoading } from '../../contexts/loading'
import { useSettings } from '../../contexts/settings'

const SettingsScreen = ({ navigation }) => {

	/* Contexts */
	const { loadSettings } = useSettings()
	const { setLoading } = useLoading()

	/* Hooks */
	useEffect(() => {
		onLoad()
	}, [])

	async function onLoad() {
		setLoading(true)
		try {
			await loadSettings()
		} finally {
			setLoading(false)
		}
	}

	function handleServer() {
		navigation.navigate('SettingsServer')
	}

	return (<>
		<Container>
			<Appbar title={'Configurações'} />
			<ScrollView>
				<TouchableRipple
					onPress={handleServer}
					style={styles.itemContainer}>
					<View>
						<Text style={styles.itemTitle}>
							{'Servidor'}
						</Text>
						<Text style={styles.itemDetail}>
							{'Configurações do servidor'}
						</Text>
					</View>
				</TouchableRipple>
			</ScrollView>
		</Container>
	</>)
}

export default SettingsScreen

const styles = StyleSheet.create({
	itemContainer: {
		padding: 16,
	},
	itemTitle: {
		fontSize: 16,
	},
	itemDetail: {
		color: 'rgba(0, 0, 0, 0.60)',
		fontSize: 12,
		marginTop: 4
	}
})
