/* Dependencies */
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { Appbar as PaperAppbar } from 'react-native-paper'

/* Project */
import { theme } from '../../themes'

interface Props {
	actions?: {
		color?: HPro.string
		enabled?: boolean
		icon: HPro.string
		onPress: () => void
	}[]
	type?: 'back' | 'menu'
	title?: string
}

function Appbar(props: Props) {

	// Deconstruct props
	const {
		actions,
		type = 'menu',
		title
	} = props

	/* Contexts */
	const navigation = useNavigation()

	return (<>
		<PaperAppbar.Header
			statusBarHeight={0}
			safeAreaInsets={{
				bottom: 0,
				left: 0,
				right: 0,
				top: 0
			}}>
			<PaperAppbar.Action
				icon={type === 'menu' ? 'menu' : 'arrow-left'}
				color={theme.ACCENT}
				onPress={() => {
					if (type === 'menu') {
						navigation.dispatch(DrawerActions.openDrawer())
						return
					}

					navigation.goBack()
				}} />
			<PaperAppbar.Content
				style={{
					alignItems: 'flex-start',
				}}
				color={theme.ACCENT}
				title={title} />
			{actions?.map((action, index) => (
				<PaperAppbar.Action
					disabled={!(action.enabled ?? true)}
					key={index}
					color={action.color ?? theme.ACCENT}
					icon={action.icon}
					onPress={action.onPress} />
			))}
		</PaperAppbar.Header>
	</>)
}

export default Appbar
