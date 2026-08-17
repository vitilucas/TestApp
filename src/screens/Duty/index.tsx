/* Dependencies */
import { useFocusEffect } from '@react-navigation/native'
import React, { useRef } from 'react'
import { Animated, ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

/* Project */
import Appbar from '../../components/Appbar'
import Combobox, { type ComboboxRef } from '../../components/Combobox'
import getOperation from '../../components/Constants'
import Container from '../../components/Container'
import Input, { type InputRef } from '../../components/Input'
import { useLoading } from '../../contexts/loading'
import { useUser } from '../../contexts/user'
import { alert, confirm } from '../../functions/dialogs'
import { post } from '../../functions/fetch'
import { isResponseError } from '@hproinformatica/hpro-functions'

interface Data {
	asu: HPro.string
	des: HPro.string
	set: HPro.string
	sol: HPro.string
	urg: HPro.string
	ope: HPro.string
	pla: HPro.string
	tel: HPro.string
	num: HPro.string
	seq: HPro.integer
}

interface Pk {
	num: HPro.string
	seq: HPro.integer
}

interface CancelData {
	num: HPro.string
	seq: HPro.integer
	ope: HPro.string
}

const subtitle = `Prezado cliente,

O nosso plantão está disponível todos os dias após o horário de expediente da HPro.

Reiteramos que, em nosso plantão, atendemos somente assuntos emergenciais, tais como: problemas com emissão de notas fiscais, emissão de cupons SAT, acesso ao sistema, problemas com servidor, com acesso à nuvem, entre outros que impeçam a operação total da empresa.

Após a abertura da solicitação de plantão, você receberá um retorno no prazo máximo de 2 (duas) horas (sistemas e infraestrutura).

Agradecemos desde já.

Atenciosamente,
Equipe HPro.`

const DutyScreen = ({ navigation }: HPro.Props<HPro.DutyStack, 'Duty'>) => {

	/* Contexts */
	const { setLoading } = useLoading()
	const { user } = useUser()

	/* States */
	const [colapsabled, setColapsabled] = React.useState<boolean>(false)
	const [consult, setConsult] = React.useState<boolean>(false)
	const [pk, setPk] = React.useState<Pk>(null)

	/* References */
	const refAsu = useRef<InputRef>(null)
	const refSol = useRef<InputRef>(null)
	const refDes = useRef<InputRef>(null)
	const refSet = useRef<ComboboxRef>(null)
	const refTel = useRef<InputRef>(null)

	/* Functions */
	useFocusEffect(React.useCallback(() => {
		onLoad()
	}, []))

	async function onLoad() {
		setLoading(true)
		try {
			const response = await post<Data>('$sol_verificaplantao', {
				user: user?.username,
				token: user?.token
			})

			if (isResponseError(response)) {
				alert({
					title: 'Atenção',
					message: response.message
				})
				return
			}

			const ret = response.content

			if (ret.pla === 'Não') {
				setConsult(false)
				setPk(null)
				refSol.current?.reset()
				refAsu.current?.reset()
				refDes.current?.reset()
				refSet.current?.reset()
				refTel.current?.reset()
			} else {
				setConsult(true)
				setPk({ num: ret.num, seq: ret.seq })
				refSol.current?.setValue(ret.sol)
				refAsu.current?.setValue(ret.asu)
				refDes.current?.setValue(ret.des)
				refSet.current?.setValue(ret.set)
			}

		} finally {
			setLoading(false)
		}
	}

	async function handleInsert() {
		const data = {
			sol: refSol.current?.getValue(),
			asu: refAsu.current?.getValue(),
			des: refDes.current?.getValue(),
			set: refSet.current?.getValue(),
			tel: refTel.current?.getValue(),
			urg: 'Sim',
			pla: 'Sim'
		} as Data

		if (!data.sol) {
			await alert({
				title: 'Atenção',
				message: 'Informe o campo "Nome do solicitante"'
			})
			refSol.current.focus()
			return
		} else if (!data?.asu) {
			await alert({
				title: 'Atenção',
				message: 'Informe o campo "Assunto"'
			})
			refAsu.current.focus()
			return
		} else if (!data?.set) {
			await alert({
				title: 'Atenção',
				message: 'Informe o campo "Setor"'
			})
			refSet.current.focus()
			return
		} else if (!data?.tel) {
			await alert({
				title: 'Atenção',
				message: 'Informe o campo "Telefones para contato"'
			})
			refTel.current.focus()
			return
		} else if (!data?.des) {
			await alert({
				title: 'Atenção',
				message: 'Informe o campo "Descrição"'
			})
			refDes.current.focus()
			return
		}

		setLoading(true)
		try {
			const response = await post<Data>('$sol_incluir', {
				token: user?.token,
				...data
			})

			if (isResponseError(response)) {
				alert({
					title: 'Atenção',
					message: response.message
				})
				return
			}

			alert({
				title: 'Sucesso',
				message: 'Sua solicitação de plantão será atendida o mais rápido possível!'
			})
			navigation.goBack()

		} finally {
			setLoading(false)
		}
	}

	async function handleCancel() {

		if (!await confirm({
			title: 'Confirma o cancelamento do plantão?',
			message: 'Esta ação não poderá ser desfeita!'
		})) {
			return
		}

		if (!consult) {
			return
		}

		const data = {
			num: pk.num,
			seq: pk.seq,
			ope: getOperation('Cancel')
		} as CancelData

		setLoading(true)
		try {
			const response = await post<CancelData>('$sol_cancelar', {
				token: user?.token,
				...data
			})

			if (isResponseError(response)) {
				alert({
					title: 'Atenção',
					message: response.message
				})
				return
			}

			alert({
				title: 'Sucesso',
				message: 'Plantão cancelado com sucesso!'
			})

			await onLoad()

		} finally {
			setLoading(false)
		}
	}

	const colapseAnim = useRef(new Animated.Value(0)).current;

	const colapse = (state: boolean) => {
		setColapsabled(state)
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.timing(colapseAnim, {
			toValue: state ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start();
	};

	return (<>
		<Container>
			<Appbar
				title={'Plantão'}
				actions={[{
					icon: 'file',
					enabled: consult,
					onPress: () => {
						if (consult) {
							navigation.navigate('Attachments', {
								num: pk.num,
								seq: pk.seq
							})
						}
					}
				}, {
					icon: 'delete',
					enabled: consult,
					onPress: () => {
						if (consult) {
							handleCancel()
						}
					}
				}, {
					icon: 'content-save',
					enabled: !consult,
					onPress: handleInsert
				}]} />
			<View style={styles.titleContainer}>
				<Text style={styles.title}>
					{'Instruções sobre o plantão HPro'}
				</Text>
				<View>
					<TouchableHighlight
						style={{
							borderRadius: 50,
							padding: 5
						}}
						underlayColor={'#ccc'}
						onPress={() => colapse(!colapsabled)}>
						<Icon
							name={!colapsabled ? 'chevron-down' : 'chevron-up'}
							size={25} />
					</TouchableHighlight>
				</View>
			</View>
			<Animated.View
				style={[{
					paddingHorizontal: 10,
					paddingVertical: colapseAnim.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 10]
					}),
					maxHeight: colapseAnim.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 500]
					}),
				}]}>
				<Text style={styles.subtitle}>
					{subtitle}
				</Text>
			</Animated.View>
			<Divider />
			<ScrollView
				// automaticallyAdjustKeyboardInsets
				alwaysBounceHorizontal={false}
				alwaysBounceVertical={false}>
				<View style={styles.container}>
					<Input.Root
						editable={!consult}
						maxLength={40}
						placeholder={'Nome do solicitante'}
						ref={refSol}
						required
						style={consult ? styles.disabled : {}} />
					<Input.Root
						editable={!consult}
						maxLength={40}
						placeholder={'Assunto'}
						ref={refAsu}
						required
						style={consult ? styles.disabled : {}} />
					<Combobox.Root
						editable={!consult}
						options={['Infraestrutura', 'Sistemas']}
						placeholder={'Setor'}
						ref={refSet}
						style={{
							zIndex: 999,
							...(consult ? styles.disabled : {})
						}} />
					<Input.Root
						editable={!consult}
						maxLength={40}
						placeholder={'Telefones para contato'}
						ref={refTel}
						required
						style={consult ? styles.disabled : {}} />
					<Divider />
					<Input.Root
						editable={!consult}
						multiline
						placeholder={'Descrição'}
						ref={refDes}
						required
						style={{
							...styles.memo,
							...(consult ? styles.disabled : {})
						}} />
				</View>
			</ScrollView>
		</Container >
	</>)
}

export default DutyScreen

const styles = StyleSheet.create({
	container: {
		gap: 10,
		padding: 10
	},
	disabled: {
		color: '#999'
	},
	memo: {
		height: 200
	},
	titleContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10
	},
	title: {
		color: 'red',
		fontSize: 18,
		fontWeight: 'bold'
	},
	subtitle: {
		fontWeight: 'bold'
	}
})
