/* Dependencies */
import { dtoc } from '@hproinformatica/functions'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useRef } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Divider } from 'react-native-paper'

/* Project */
import { post } from '../../../functions/fetch'
import Appbar from '../../../components/Appbar'
import getOperation from '../../../components/Constants'
import Container from '../../../components/Container'
import Input, { type InputRef } from '../../../components/Input'
import { useLoading } from '../../../contexts/loading'
import { useUser } from '../../../contexts/user'
import { alert } from '../../../functions/dialogs'
import { isResponseError } from '@hproinformatica/hpro-functions'

interface Data {
	num: HPro.string
	seq: HPro.string
	dat: HPro.string
	hor: HPro.string
	ana: HPro.string
	obs: HPro.string
	sta: HPro.string
	ope: HPro.string
	resset: HPro.string
	resana: HPro.string
	posset: HPro.string
	posana: HPro.string
}

const FollowUpScreen = ({ navigation, route }: HPro.Props<HPro.RequestsStack, 'FollowUp'>) => {

	/* Params */
	const params = route.params

	const isInsert = params.operation === 'Insert'
	const isConsult = params.operation === 'Consult'

	/* Contexts */
	const { setLoading } = useLoading()
	const { user } = useUser()

	/* States */
	const [submmited, setSubmmited] = React.useState<boolean>(false)

	/* References */
	const refNum = useRef<InputRef>(null)
	const refDat = useRef<InputRef>(null)
	const refHor = useRef<InputRef>(null)
	const refAna = useRef<InputRef>(null)
	const refObs = useRef<InputRef>(null)
	const refSta = useRef<InputRef>(null)
	const refResset = useRef<InputRef>(null)
	const refResana = useRef<InputRef>(null)
	const refPosset = useRef<InputRef>(null)
	const refPosana = useRef<InputRef>(null)

	/* Hooks */
	useFocusEffect(
		useCallback(() => {
			onLoad()
		}, [])
	)

	const htoc = () => {
		const today = new Date()

		const hor = today.getHours().toString()
		const min = today.getMinutes().toString()

		return hor.padStart(2, '0') + ':' + min.padStart(2, '0')
	}

	/* Functions */
	async function onLoad() {
		setLoading(true)
		try {
			if (['Insert', 'Consult'].includes(params.operation)) {
				refNum.current.setValue(params.num)
			}

			if (params.operation === 'Insert') {
				refDat.current.setValue(dtoc())
				refHor.current.setValue(htoc())
			} else if (params.operation === 'Consult') {
				refDat.current.setValue(params.dat)
				// refHor.current.setValue(params.hor)
			}

		} finally {
			setLoading(false)
		}
	}

	async function handleInsert() {
		setSubmmited(true)

		const data = {
			num: refNum.current?.getValue().replace(/\D/g, ''),
			seq: params.seq.toString(),
			dat: refDat.current?.getValue(),
			hor: refHor.current?.getValue(),
			obs: refObs.current?.getValue(),
			sta: '1',
			ope: getOperation(params.operation)
		} as Data

		if (!data?.obs) {
			await alert({
				title: 'Atenção',
				message: 'Informe o campo "Descrição"'
			})
			refObs.current.focus()
			return
		}

		setLoading(true)
		try {
			const response = await post<Data>('$sol_acompanhamentosincluir', {
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
				message: 'Acompanhamento registrado com sucesso!'
			})
			navigation.goBack()

		} finally {
			setLoading(false)
		}
	}

	return (<>
		<Container>
			<Appbar
				title={'Acompanhamentos'}
				type={'back'}
				actions={[{
					icon: 'content-save',
					enabled: isInsert,
					onPress: handleInsert
				}]} />
			<ScrollView
				alwaysBounceHorizontal={false}
				alwaysBounceVertical={false}
				automaticallyAdjustKeyboardInsets>
				<View style={styles.container}>
					<Input.Root
						defaultValue={params?.num}
						enabled={false}
						maxLength={40}
						placeholder={'Número da solicitação'}
						ref={refNum}
						style={styles.disabled} />
					<View style={styles.row}>
						<Input.Root
							defaultValue={isInsert ? dtoc() : params?.dat}
							enabled={false}
							maxLength={40}
							placeholder={'Data'}
							ref={refDat}
							style={styles.disabled} />
						<Input.Root
							enabled={false}
							maxLength={40}
							placeholder={'Hora'}
							ref={refHor}
							style={styles.disabled} />
					</View>
					<Divider />
					<Input.Root
						autoFocus={isInsert}
						enabled={isInsert}
						multiline
						placeholder={'Descrição'}
						ref={refObs}
						required
						style={{
							...styles.memo,
							...(isConsult ? styles.disabled : {})
						}} />
				</View>
			</ScrollView>
		</Container>
	</>)
}

export default FollowUpScreen

const styles = StyleSheet.create({
	container: {
		gap: 10,
		padding: 10
	},
	row: {
		flexDirection: 'row',
		gap: 10
	},
	disabled: {
		color: '#999'
	},
	memo: {
		height: 200
	}
})
