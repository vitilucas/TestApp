/* Dependencies */
import Icons from '@expo/vector-icons/MaterialCommunityIcons'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import {
	FlatList,
	RefreshControl,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native'
import { Divider, FAB } from 'react-native-paper'

/* Project */
import Appbar from '../../components/Appbar'
import Container from '../../components/Container'
import EmptyList from '../../components/EmptyList'
import { useLoading } from '../../contexts/loading'
import { useNotification } from '../../contexts/notification'
import { useUser } from '../../contexts/user'
import { post } from '../../functions/fetch'
import { colors, theme } from '../../themes'
import { isResponseError } from '@hproinformatica/hpro-functions'

const FollowUpsScreen = ({
	navigation,
	route
}: HPro.Props<HPro.RequestsStack, 'FollowUps'>) => {
	/* Params */
	const { num, seq } = route.params

	/* Contexts */
	const { loading, setLoading } = useLoading()
	const { setNotification } = useNotification()
	const { user } = useUser()

	/* States */
	const [data, setData] = React.useState<HPro.FollowUp[]>([])

	/* Hooks */
	useFocusEffect(
		useCallback(() => {
			//const notific = getNotification<Data>()
			//if (notific) {
			//	setData(notific.data)
			//} else {
			onLoad()
			//}
			setNotification(null)
		}, [])
	)

	/* Functions */
	async function onLoad() {
		setLoading(true)
		try {
			const response = await post<{
				dados: HPro.FollowUp[]
			}>('$sol_acompanhamentoslistar', {
				token: user?.token,
				num: num.replace(/[\/\-]/g, ''),
				seq
			})

			if (isResponseError(response)) {
				setData([])
				return
			}

			setData(response.content.dados)
		} finally {
			setLoading(false)
		}
	}

	function handleInsert() {
		navigation.navigate('FollowUp', {
			operation: 'Insert',
			num,
			seq
		})
	}

	return (
		<>
			<Container>
				<Appbar type={'back'} title={'Acompanhamentos'} />
				<FlatList
					data={data}
					ItemSeparatorComponent={() => <Divider />}
					keyExtractor={item => item.key}
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
							title={'Nenhum acompanhamento encontrado!'}
							subtitle={'Atualize a tela e tente novamente'}
						/>
					}
					renderItem={({ item, index }) => (
						<>
							<View style={styles.container}>
								<TouchableHighlight
									underlayColor={colors.TRANSLUCENT}
									onPress={() => {
										item.colapsed = !item.colapsed
										setData(prev => {
											const next = [...prev]
											next[index] = item
											return next
										})
									}}
									style={styles.details}
								>
									<>
										{Boolean(item.nom) && (
											<>
												<Text style={styles.name}>
													{[item.nom].filter(Boolean).join(' - ')}
												</Text>
											</>
										)}
										{Boolean(item.set) && (
											<>
												<Text style={styles.name}>
													{[item.set].filter(Boolean).join(' - ')}
												</Text>
											</>
										)}
										<Text style={styles.date}>
											{`${item.dat} - ${item.hor}`}
										</Text>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between'
											}}
										>
											<View
												style={{
													backgroundColor: item.corfun,
													borderRadius: 8,
													marginVertical: 5,
													padding: 5
												}}
											>
												<Text
													style={{
														...styles.status,
														color: item.corlet
													}}
												>
													{`${item.stades}`}
												</Text>
											</View>
											<Icons
												color={theme.TEXT}
												name={item.colapsed ? 'chevron-up' : 'chevron-down'}
												size={20}
											/>
										</View>
										{item.colapsed && (
											<>
												<Text style={styles.observations}>{`${item.obs}`}</Text>
											</>
										)}
									</>
								</TouchableHighlight>
							</View>
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

export default FollowUpsScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 0
	},
	details: {
		flex: 1,
		padding: 10
	},
	name: {
		color: theme.TEXT,
		fontSize: 16,
		fontWeight: 'bold'
	},
	date: {
		color: theme.TEXT,
		fontSize: 14
	},
	status: {
		color: theme.TEXT,
		fontSize: 14
	},
	observations: {
		color: theme.TEXT,
		fontSize: 15
	},
	fab: {
		backgroundColor: theme.PRIMARY,
		bottom: 32,
		position: 'absolute',
		right: 16
	}
})
