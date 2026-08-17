/* Dependencies */
import React from 'react'
import { FlatList, RefreshControl, StyleSheet, View, Image } from 'react-native'
import {
	Divider,
	Text,
	FAB,
	TouchableRipple,
	IconButton
} from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { Buffer } from 'buffer'

/* Project */
import Appbar from '../../components/Appbar'
import Container from '../../components/Container'
import EmptyList from '../../components/EmptyList'
import { useLoading } from '../../contexts/loading'
import { useUser } from '../../contexts/user'
import { useSettings } from '../../contexts/settings'
import { alert, confirm } from '../../functions/dialogs'
import { post } from '../../functions/fetch'
import { theme } from '../../themes'
import getOperation from '../../components/Constants'
import HPro from '../../@types'
import { isResponseSuccess } from '@hproinformatica/hpro-functions'

const AttachmentsScreen = ({
	navigation,
	route
}: HPro.Props<HPro.RequestsStack, 'Attachments'>) => {
	/* Params */
	const params = route.params

	/* Contexts */
	const { loading, setLoading } = useLoading()
	const { user } = useUser()
	const { settings } = useSettings()

	/* States */
	const [data, setData] = React.useState<HPro.Attachments[]>([])

	/* Functions */
	useFocusEffect(
		React.useCallback(() => {
			onLoad()
		}, [])
	)

	const onLoad = async () => {
		setLoading(true)
		try {
			const response = await post<{ dados: HPro.Attachments[] }>(
				'$mainAnexos_exibir',
				{
					token: user?.token,
					user: user?.username,
					ope: getOperation('Change'),
					tip: 'Solicitações',
					key: params.num.replace(/\D/g, ''),
					idanexo: params.num,
					arq: 'x'
				}
			)

			if (!response.success) {
				setData([])
				return
			}

			setData(response.content.dados)
		} finally {
			setLoading(false)
		}
	}

	const handleInsert = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		})

		if (!result.canceled) {
			setLoading(true)
			try {
				const response = await post<{ dados: HPro.Attachments[] }>(
					'$mainAnexos_anexar',
					{
						token: user?.token,
						user: user?.username,
						ope: getOperation('Change'),
						tip: 'Solicitações',
						key: params.num.replace(/\D/g, ''),
						idanexo: params.num,
						arq: {
							uri: result.assets[0].uri,
							name: result.assets[0].fileName,
							filename: result.assets[0].fileName,
							type: 'image/png'
						}
					}
				)
				onLoad()
			} finally {
				setLoading(false)
			}
		}
	}

	const handleDelete = async (cArq: HPro.string) => {
		if (
			await confirm({
				title: 'Exclusão',
				message: 'Confirma a exclusão do anexo selecionado?'
			})
		) {
			setLoading(true)
			try {
				const response = await post<{ dados: HPro.Attachments[] }>(
					'$mainanexos_excluir',
					{
						token: user?.token,
						user: user?.username,
						ope: getOperation('Change'),
						tip: 'Solicitações',
						key: params.num.replace(/\D/g, ''),
						idanexo: params.num,
						arq: cArq
					}
				)

				if (!isResponseSuccess(response)) {
					setData([])
					return
				}

				setData(response.content.dados)
			} finally {
				setLoading(false)
			}
		}
	}

	const list = data

	return (
		<>
			<Container>
				<Appbar type='back' title={'Anexos'} />
				<FlatList
					data={list}
					ItemSeparatorComponent={() => <Divider />}
					keyExtractor={item => item.nom}
					refreshControl={
						<RefreshControl
							colors={['#fff']}
							onRefresh={onLoad}
							progressBackgroundColor={theme.PRIMARY}
							refreshing={loading}
						/>
					}
					ListEmptyComponent={
						<EmptyList
							title={'Nenhum anexo encontrado!'}
							subtitle={'Atualize a tela e tente novamente'}
						/>
					}
					renderItem={({ item }) => (
						<>
							<TouchableRipple
								//onPress={() => handleConsult(item)}
								style={styles.container}
							>
								<View
									style={{
										flex: 1,
										flexDirection: 'row',
										height: 100
									}}
								>
									<View
										style={{
											height: 100,
											width: 80,
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
										<Image
											source={{
												uri: `http://${settings.server}:${settings.port}/${item.icon}`
											}}
											style={{ height: 50, width: 50 }}
										/>
									</View>
									<View style={{ flex: 1, justifyContent: 'center' }}>
										<Text style={{ fontWeight: 'bold' }}>{`${item.file}`}</Text>
										<Text>{`Tamanho: ${item.tam}`}</Text>
										<Text>{`Criação: ${item.cri}`}</Text>
										<Text>{`Ultima alteração: ${item.alt}`}</Text>
									</View>
									<View
										style={{ alignItems: 'center', justifyContent: 'center' }}
									>
										<IconButton
											icon='delete'
											//iconColor={theme.PRIMARY}
											onPress={() => handleDelete(item.file)}
										/>
									</View>
								</View>
							</TouchableRipple>
						</>
					)}
				/>
				<FAB
					color={theme.ACCENT}
					icon={'plus'}
					onPress={handleInsert}
					style={styles.fab}
				/>
			</Container>
		</>
	)
}

export default AttachmentsScreen

const styles = StyleSheet.create({
	container: {
		gap: 10
	},
	fab: {
		backgroundColor: theme.PRIMARY,
		bottom: 32,
		position: 'absolute',
		right: 16
	}
})
