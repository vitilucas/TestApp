/* Dependencies */
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'

/* Project */
import Appbar from '../../components/Appbar'
import Container from '../../components/Container'
import EmptyList from '../../components/EmptyList'
import { useLoading } from '../../contexts/loading'
import { useNotification } from '../../contexts/notification'
import { theme } from '../../themes'

const NotificationsScreen = ({ navigation }: HPro.Props<HPro.NotificationsStack, 'Notifications'>) => {

	/* Contexts */
	const { setNotification } = useNotification()
	const { loading, setLoading } = useLoading()

	/* States */
	const [data, setData] = React.useState<any[]>([])

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
			// const content = await fetcher('$schedules_get', {
			// 	usr: user?.cod
			// })

			// if (!content) {
			// 	setData(null)
			// 	return
			// }

			// setData(content as Data)
			// setData([
			// 	{
			// 		title: 'Title',
			// 		description: 'Description',
			// 	},
			// 	{
			// 		title: 'Title',
			// 		description: 'Description',
			// 	},
			// 	{
			// 		title: 'Title',
			// 		description: 'Description',
			// 	}
			// ])

		} finally {
			setLoading(false)
		}
	}

	return (<>
		<Container>
			<Appbar title={'Notificações'} />
			<FlatList
				data={data}
				ItemSeparatorComponent={() => <Divider />}
				keyExtractor={(item) => item.seq.toString()}
				refreshControl={<RefreshControl
					colors={['#fff']}
					onRefresh={onLoad}
					progressBackgroundColor={theme.PRIMARY}
					refreshing={loading} />}
				ListEmptyComponent={<EmptyList
					title={'Nenhuma notificação encontrada!'}
					subtitle={'Atualize a tela e tente novamente'} />}
				renderItem={({ item }) => (<>
					<View style={styles.container}>
						<Text style={styles.title}>
							{item.title}
						</Text>
						<Text style={styles.description}>
							{item.description}
						</Text>
					</View>
				</>)} />
		</Container>
	</>)
}

export default NotificationsScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10
	},
	title: {
		color: theme.TEXT,
		fontSize: 16,
		fontWeight: 'bold'
	},
	description: {
		color: theme.TEXT,
		fontSize: 12
	}
})
