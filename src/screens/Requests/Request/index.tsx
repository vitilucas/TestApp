/* Dependencies */
import React, { useRef } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Divider, Portal, Dialog, Text, Button, TextInput } from 'react-native-paper'

/* Project */
import Appbar from '../../../components/Appbar'
import Combobox, { type ComboboxRef } from '../../../components/Combobox'
import Container from '../../../components/Container'
import Input, { type InputRef } from '../../../components/Input'
import { useLoading } from '../../../contexts/loading'
import { useUser } from '../../../contexts/user'
import { alert } from '../../../functions/dialogs'
import { post } from '../../../functions/fetch'
import getOperation from '../../../components/Constants'
import { isResponseError } from '@hproinformatica/hpro-functions'

interface Data {
	asu: HPro.string
	des: HPro.string
	set: HPro.string
	sol: HPro.string
	urg: HPro.string
	ope: HPro.string
}

interface CancelData {
	num: HPro.string
	seq: HPro.integer
	ope: HPro.string
}

const RequestScreen = ({ navigation, route }: HPro.Props<HPro.RequestsStack, 'Request'>) => {

	/* Params */
	const params = route.params

	const isInsert = params.operation === 'Insert'
	const isConsult = params.operation === 'Consult'

	/* Contexts */
	const { setLoading } = useLoading()
	const { user } = useUser()

	/* States */
	const [submmited, setSubmmited] = React.useState<boolean>(false)
	const [cancel, setCancel] = React.useState<boolean>(false)

	/* References */
	const refAsu = useRef<InputRef>(null)
	const refSol = useRef<InputRef>(null)
	const refDes = useRef<InputRef>(null)
	const refSet = useRef<ComboboxRef>(null)
	const refUrg = useRef<ComboboxRef>(null)
	const refTip = useRef<ComboboxRef>(null)

	/* Functions */
	async function handleInsert() {
		setSubmmited(true)

		const data = {
			sol: refSol.current?.getValue(),
			asu: refAsu.current?.getValue(),
			des: refDes.current?.getValue(),
			set: refSet.current?.getValue(),
			urg: refUrg.current?.getValue(),
			tip: refTip.current?.getValue(),
			ope: getOperation(params.operation)
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
		} else if (!data?.urg) {
			await alert({
				title: 'Atenção',
				message: 'Informe o campo "Urgente"'
			})
			refUrg.current.focus()
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
				message: 'Solicitação registrada com sucesso!'
			})
			navigation.goBack()

		} finally {
			setLoading(false)
		}
	}

	const handleCancel = async () => {

		if (!isConsult) {
			return
		}

		const data = {
			num: params.num.replace(/\D/g, ''),
			seq: params.seq,
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
				message: 'Solicitação cancelada com sucesso!'
			})
			navigation.goBack()

		} finally {
			setLoading(false)
		}
	}

	return (<>
		<Container>
			<Appbar
				title={'Solicitação'}
				type={'back'}
				actions={[{
					icon: 'timeline-text-outline',
					enabled: isConsult,
					onPress: () => {
						if (isConsult) {
							navigation.navigate('Timeline', {
								num: params.num,
								seq: params.seq
							})
						}
					}
				}, {
					icon: 'comment-search',
					enabled: isConsult,
					onPress: () => {
						if (isConsult) {
							navigation.navigate('FollowUps', {
								num: params.num,
								seq: params.seq
							})
						}
					}
				}, {
					icon: 'file',
					enabled: isConsult,
					onPress: () => {
						if (isConsult) {
							navigation.navigate('Attachments', {
								num: params.num,
								seq: params.seq
							})
						}
					}
				}, {
					icon: 'delete',
					enabled: isConsult,
					onPress: () => {
						if (isConsult) {
							setCancel(true)
						}
					}
				}, {
					icon: 'content-save',
					enabled: isInsert,
					onPress: handleInsert
				}]} />
			<Portal>
				<Dialog visible={cancel} onDismiss={() => setCancel(false)}>
					<Dialog.Title>Alert</Dialog.Title>
					<Dialog.Content>
						<Text variant="bodyMedium">Confirma o cancelamento da solicitação em questão?</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => handleCancel()}>Sim</Button>
						<Button onPress={() => setCancel(false)}>Não</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<ScrollView
				// automaticallyAdjustKeyboardInsets
				alwaysBounceHorizontal={false}
				alwaysBounceVertical={false}>
				<View style={styles.container}>
					<Input.Root
						defaultValue={isInsert ? user.username : params?.sol}
						editable={isInsert}
						maxLength={40}
						placeholder={'Nome do solicitante'}
						ref={refSol}
						required
					/>

					<View style={{
						...styles.xxx,
						zIndex: 1000
					}}>
						<View style={{
							flex: 1
						}}>
						<Combobox.Root
							defaultValue={isInsert ? '' : params?.tip}
							editable={isInsert}
							options={['Requisição', 'Incidente']}
							placeholder={'Tipo'}
							ref={refTip}
						/>
						</View>
						<View style={{
							flex: 0.1,
							alignItems: 'center',
							justifyContent: 'center'
						}}>
							<TextInput.Icon
								icon={'account-question'}
								onPress={() => {
									alert({
										title: 'Atenção',
										message: [
											`Requisição: Refere-se a um evento que necessita de planejamento ou análise prévia.\nExemplos: Ajuste de sistema, instalações, agendamento de serviços ou visitas, solicitação de reuniões.`,
											`Incidente: Refere-se a um evento causado por falhas ou interrupções que necessitam de intervenção do suporte.\nExemplos: Erros de sistemas, dúvidas pontuais, indisponibilidade de serviços ou acessos.`
										].join('\n\n')
									})
								}}
							/>
						</View>
					</View>

					<View style={{
						...styles.xxx,
						zIndex: 999
					}}>
						<View style={styles.yyy}>
						<Combobox.Root
							defaultValue={isInsert ? '' : params?.resset}
							editable={isInsert}
							options={['Infraestrutura', 'Sistemas']}
							placeholder={'Setor'}
							ref={refSet}
						/>
						</View>
						<View style={{
							flex: 0.1,
							alignItems: 'center',
							justifyContent: 'center'
						}}>
							<TextInput.Icon
								icon={'account-question'}
								onPress={() => {
									alert({
										title: 'Atenção',
										message: [
											`Infraestrutura - Refere-se a solicitações que envolvem soluções para redes,servidores,impressoras,email,antivirus,etc.`,
											`Sistema - Refere-se a solicitações que envolvem sistemas HPRO de forma geral como Personalizados,Sistemas Web,Pacotes,etc.`
										].join('\n\n')
									})
								}}
							/>
						</View>
					</View>

					<View style={{
						display: 'flex',
						flexDirection: 'row',
						zIndex: 998
					}}>
						<View style={styles.yyy}>
						<Combobox.Root
							defaultValue={isInsert ? '' : params?.urg}
							editable={isInsert}
							options={['Não', 'Sim']}
							placeholder={'Urgente'}
							ref={refUrg}
						/>
						</View>
						<View style={{
							flex: 0.1,
							alignItems: 'center',
							justifyContent: 'center'
						}}>
							<TextInput.Icon
								icon={'account-question'}
								onPress={() => {
									alert({
										title: 'Atenção',
										message: `Urgente: Refere-se a solicitações de urgência, como: parada de servidor,problemas com emissão de nota fiscal,etc.`
									})
								}}
							/>
						</View>
					</View>

					<Divider />

					<View style={styles.xxx}>
						<Input.Root
							autoFocus={isInsert}
							defaultValue={isInsert ? '' : params?.asu}
							editable={isInsert}
							maxLength={40}
							placeholder={'Assunto'}
							ref={refAsu}
							required
						/>

						<View style={{
							position: "absolute",
							right: 35,
							top: 10,
							zIndex: 1000
						}}>
							<TextInput.Icon
									icon={'account-question'}
									onPress={() => {
										alert({
											title: 'Atenção',
											message: `Assunto: Escreva em poucas palavras o assunto chave da requisição ou incidente.`
										})
									}}
								/>
						</View>
					</View>


					<View style={styles.xxx}>
						<Input.Root
							defaultValue={isInsert ? '' : params?.des}
							editable={isInsert}
							multiline
							placeholder={'Descrição'}
							ref={refDes}
							required
							style={styles.memo}
						/>

						<View style={{
							position: "absolute",
							right: 35,
							top: 10,
							zIndex: 1000
						}}>
							<TextInput.Icon
									icon={'account-question'}
									onPress={() => {
										alert({
											title: 'Atenção',
											message: `Descrição: Escreva com o máximo de detalhes a requisição ou incidente, isso irá proporcionar um melhor atendimento e mais agilidade na solução de sua solicitação.`
										})
									}}
								/>
						</View>
					</View>


				</View>
			</ScrollView>
		</Container>
	</>)
}

export default RequestScreen

const styles = StyleSheet.create({
	xxx: {
		display: 'flex',
		flexDirection: 'row',
	},
	yyy: {
		flex: 1
	},
	container: {
		gap: 10,
		flex: 1,
		padding: 10
	},
	memo: {
		height: 200
	}
})
