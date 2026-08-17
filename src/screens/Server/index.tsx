/* Dependencies */
import { onlyNumbers } from '@hproinformatica/functions'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

/* Project */
import Appbar from '../../components/Appbar'
import Container from '../../components/Container'
import { useLoading } from '../../contexts/loading'
import { useSettings } from '../../contexts/settings'

const ServerConfig = ({ navigation }) => {

	/* Contexts */
	const { saveSettings, loadSettings, settings } = useSettings()
	const { setLoading } = useLoading()

	/* States */
	const [server, setServer] = useState<string>('')
	const [port, setPort] = useState<string>('')

	/* References */
	const portRef = useRef(null)

	/* Effects */
	useFocusEffect(
		useCallback(() => {
			onLoad()
		}, [])
	)

	/* Functions */
	async function onLoad() {
		setLoading(true)
		try {
			await loadSettings()

			setServer(settings?.server ?? '')
			setPort(settings?.port ?? '')

		} finally {
			setLoading(false)
		}
	}

	async function onHandleSave() {
		await saveSettings({ server, port })
		navigation.goBack()
	}

	return (<>
		<Container>
			<Appbar
				title={'Servidor'}
				type={'back'}
				actions={[{
					icon: 'content-save',
					onPress: onHandleSave
				}]} />
			<TextInput
				blurOnSubmit={false}
				label={'Endereço IP'}
				mode={'flat'}
				onChangeText={(value) => setServer(value)}
				onSubmitEditing={() => portRef.current?.focus()}
				returnKeyType={'next'}
				style={styles.input}
				value={server} />
			<TextInput
				keyboardType={'numeric'}
				label={'Porta'}
				mode={'flat'}
				onChangeText={(value) => setPort(onlyNumbers(value))}
				ref={portRef}
				style={styles.input}
				value={port} />
		</Container>
	</>)
}

export default ServerConfig

const styles = StyleSheet.create({
	input: {
		margin: 8
	}
})
