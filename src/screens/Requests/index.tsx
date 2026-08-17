/* Dependencies */
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { Divider, FAB, TouchableRipple } from 'react-native-paper'
import { alert } from '../../functions/dialogs'

/* Project */
import Appbar from '../../components/Appbar'
import Container from '../../components/Container'
import EmptyList from '../../components/EmptyList'
import { useLoading } from '../../contexts/loading'
import { useUser } from '../../contexts/user'
import { post } from '../../functions/fetch'
import { theme } from '../../themes'
import { isResponseError } from '@hproinformatica/hpro-functions'

const RequestsScreen = ({
	navigation
}: HPro.Props<HPro.RequestsStack, 'Requests'>) => {
	/* Contexts */
	const { loading, setLoading } = useLoading()
	const { user } = useUser()

	/* States */
	const [data, setData] = React.useState<HPro.Request[]>([])

	/* Hooks */
	useFocusEffect(
		useCallback(() => {
			onLoad()
		}, [])
	)

	/* Functions */
	async function onLoad() {
		setLoading(true)
		try {
			const response = await post<{
				dados: HPro.Request[]
			}>('$sol_listar', {
				token: user?.token,
				sit: 'Pendente',
				set: 'Todos'
			})

			if (isResponseError(response)) {
				return alert({
					title: 'Erro',
					message: response.message
				})
			}

			setData(response.content.dados)
		} finally {
			setLoading(false)
		}
	}

	function handleInsert() {
		navigation.navigate('Request', { operation: 'Insert' })
	}

	function handleConsult(item: HPro.Request) {
		navigation.navigate('Request', {
			operation: 'Consult',
			...item
		})
	}

	const list = data.sort((a, b) => {
		// Sort by  urg and num
		if (a.urg === 'Sim' && b.urg === 'Não') {
			return -1
		} else if (a.urg === 'Não' && b.urg === 'Sim') {
			return 1
		} else if (a.urg === 'Sim' && b.urg === 'Sim') {
			return a.num < b.num ? -1 : 1
		} else {
			return a.num < b.num ? -1 : 1
		}
	})

	return (
		<>
			<Container>
				<Appbar title={'Solicitações'} />
				<FlatList
					data={list}
					ItemSeparatorComponent={() => <Divider />}
					keyExtractor={item => item.num}
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
							title={'Nenhuma solicitação encontrada!'}
							subtitle={'Atualize a tela e tente novamente'}
						/>
					}
					renderItem={({ item }) => (
						<>
							<TouchableRipple
								onPress={() => handleConsult(item)}
								style={styles.container}
							>
								<View
									style={{
										flex: 1
									}}
								>
									<View
										style={{
											alignItems: 'center',
											flex: 1,
											flexDirection: 'row',
											justifyContent: 'space-between'
										}}
									>
										<Text style={styles.title}>{`${item.num}`}</Text>
										<View
											style={{
												backgroundColor:
													item.urg === 'Sim' ? '#FF0000' : '#00000000',
												borderRadius: 8,
												flexDirection: 'row',
												marginLeft: 5,
												padding: 5
											}}
										>
											<Text
												style={{
													...styles.title,
													color: item.urg === 'Sim' ? theme.ACCENT : '#00000000'
												}}
											>
												{`${item.urg === 'Sim' ? 'Urgente' : ''}`}
											</Text>
										</View>
									</View>
									<Text style={styles.date}>
										{`${item.cad} às ${item.hor} - ${item.resset}`}
									</Text>
									<Text style={styles.subject}>{`\n${item.asu}`}</Text>
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

export default RequestsScreen

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		flexDirection: 'row',
		padding: 10
	},
	title: {
		color: theme.TEXT,
		fontSize: 16,
		fontWeight: 'bold'
	},
	date: {
		color: theme.TEXT,
		fontSize: 14
	},
	subject: {
		color: theme.TEXT,
		fontSize: 14
	},
	fab: {
		backgroundColor: theme.PRIMARY,
		bottom: 32,
		position: 'absolute',
		right: 16
	}
})
