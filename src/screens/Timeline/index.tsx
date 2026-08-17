/* Dependencies */
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import {
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View
} from 'react-native'

/* Project */
import { isResponseError } from '@hproinformatica/hpro-functions'
import Appbar from '../../components/Appbar'
import Container from '../../components/Container'
import { useLoading } from '../../contexts/loading'
import { useUser } from '../../contexts/user'
import { alert } from '../../functions/dialogs'
import { post } from '../../functions/fetch'
import { theme } from '../../themes'

const TimelineScreen = ({
	route
}: HPro.Props<HPro.RequestsStack, 'Timeline'>) => {
	/* Params */
	const { num, seq } = route.params

	/* Contexts */
	const { setLoading } = useLoading()
	const { user } = useUser()

	/* States */
	const [data, setData] = React.useState<HPro.Timeline[]>([])

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
				dados: HPro.Timeline[]
			}>('$sol_timeline', {
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

	return (
		<>
			<Container>
				<Appbar type={'back'} title={'Acompanhamentos'} />
				<FlatList
					data={data}
					ItemSeparatorComponent={() => (
						<>
							<View>
								<View
									style={{
										alignSelf: 'center',
										backgroundColor: '#999',
										borderRadius: 10,
										height: 15,
										width: 2
									}}
								/>
							</View>
						</>
					)}
					keyExtractor={(_item, index) => `${index}`}
					renderItem={({ item }) => (
						<>
							{!item.separator ? (
								<>
									<View
										style={{
											alignItems: 'center',
											flexDirection: 'row',
											gap: 10,
											paddingVertical: 10
										}}
									>
										<View style={{ flex: 1 }}>
											<Text
												style={{ alignSelf: 'flex-end', fontWeight: 'bold' }}
											>
												{item.dat}
											</Text>
										</View>
										<Pressable
											onPress={() => {
												alert({
													title: 'Observações',
													message: item.obs
												})
											}}
										>
											{item.img ? (
												<>
													<Image
														source={{
															uri: item.img
														}}
														style={{ height: 35, width: 35 }}
													/>
												</>
											) : (
												<>
													<View
														style={{
															backgroundColor: theme.PRIMARY,
															borderRadius: 10,
															height: 20,
															margin: 7.5,
															width: 20
														}}
													/>
												</>
											)}
										</Pressable>
										<View style={{ flex: 1 }}>
											<Text style={{ alignSelf: 'flex-start' }}>
												{item.stades}
											</Text>
										</View>
									</View>
								</>
							) : (
								<>
									<View>
										<View
											style={{
												alignSelf: 'center',
												backgroundColor: '#999',
												borderRadius: 10,
												height: 15,
												width: 2
											}}
										/>
									</View>
								</>
							)}
						</>
					)}
				/>
			</Container>
		</>
	)
}

export default TimelineScreen

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
	}
})
