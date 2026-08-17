/* Dependencies */
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useRef, useState } from 'react'
import { Image, Platform, StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

/* Project */
import { expo } from '../../../app.json'
import Container from '../../components/Container'
import Shortcut from '../../components/Shortcut'
import { useLoading } from '../../contexts/loading'
import { useUser } from '../../contexts/user'
import { alert, confirm } from '../../functions/dialogs'
import { post } from '../../functions/fetch'
import { isResponseError } from '@hproinformatica/hpro-functions'

const AuthScreen = ({ navigation }: HPro.Props<HPro.AuthStack, 'Auth'>) => {
	/* Contexts */
	const { setLoading } = useLoading()
	const { saveUser } = useUser()

	/* States */
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [visible, setVisible] = useState<boolean>(false)

	/* References */
	const refUsername = useRef(null)
	const refPassword = useRef(null)

	/* Effects */
	useFocusEffect(
		useCallback(() => {
			setUsername('')
			setPassword('')
		}, [])
	)

	/* Functions */
	async function signin() {
		if (!username) {
			await alert({
				title: 'Atenção',
				message: 'Informe o usuário'
			})
			refUsername.current.focus()
			return
		} else if (!password) {
			await alert({
				title: 'Atenção',
				message: 'Informe a senha'
			})
			refPassword.current.focus()
			return
		}

		setLoading(true)
		try {
			const response = await post<HPro.User>('$login', {
				clientID: expo.slug,
				pwd: password,
				usr: username
			})

			console.log(response)
			if (isResponseError(response)) {
				await alert({
					title: 'Atenção',
					message: response.message
				})
				return
			}

			await saveUser(response.content)
			navigation.navigate('Main')
		} finally {
			setLoading(false)
		}
	}

	async function forgot() {
		if (!username) {
			await alert({
				title: 'Atenção',
				message: 'Informe o usuário'
			})
			refUsername.current.focus()
			return
		}

		if (
			!(await confirm({
				title: 'Cofirmação',
				message:
					'Deseja iniciar o processo de recuperação de senha para este e-mail ?'
			}))
		) {
			return
		}

		setLoading(true)
		try {
			const response = await post<string>('$senha', { usr: username })
			console.log(response)
			if (isResponseError(response)) return

			await alert({ title: 'Sucesso', message: response.content })
			navigation.goBack()
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Container>
				<View style={styles.logoContainer}>
					<Image
						resizeMode={'contain'}
						source={require('../../../assets/images/logo.png')}
						style={styles.logo}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						blurOnSubmit={false}
						label={'Usuário'}
						mode={'outlined'}
						onChangeText={value => setUsername(value)}
						onSubmitEditing={() => refPassword.current.focus()}
						ref={refUsername}
						returnKeyType={'next'}
						style={styles.input}
						value={username}
					/>
					<TextInput
						blurOnSubmit={false}
						keyboardType={Platform.select({
							android: visible ? 'visible-password' : undefined
						})}
						label={'Senha'}
						mode={'outlined'}
						onChangeText={value => setPassword(value)}
						onSubmitEditing={signin}
						ref={refPassword}
						returnKeyType={'go'}
						secureTextEntry={!visible}
						style={styles.input}
						textContentType={'password'}
						value={password}
						right={
							<TextInput.Icon
								icon={visible ? 'eye-off' : 'eye'}
								onPress={() => setVisible(!visible)}
							/>
						}
					/>
					<Button
						icon={'login'}
						mode={'contained'}
						onPress={signin}
						style={styles.button}
					>
						{'ENTRAR'}
					</Button>
					<Button
						icon={'account-key'}
						mode={'text'}
						onPress={forgot}
						style={styles.button}
					>
						{'ESQUECI MINHA SENHA'}
					</Button>
				</View>
				<Shortcut>
					<Button
						icon={'server'}
						mode={'text'}
						onPress={() => navigation.navigate('SettingsServer')}
					>
						{'CONFIGURAR SERVIDOR'}
					</Button>
				</Shortcut>
			</Container>
		</>
	)
}

export default AuthScreen

const styles = StyleSheet.create({
	logoContainer: {
		flexGrow: 2,
		padding: 10
	},
	logo: {
		flex: 1,
		height: undefined,
		width: undefined
	},
	inputContainer: {
		flexGrow: 0.75
	},
	input: {
		margin: 5
	},
	button: {
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10
	}
})
