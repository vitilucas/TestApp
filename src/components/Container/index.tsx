/* Dependencies */
import React from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'

/* Project */
import { useNotification } from '../../contexts/notification'
import { colors, theme } from '../../themes'

const Container = ({ children, isPowered, title, actions }: {
	children: React.ReactNode
	isPowered?: boolean
	title?: string
	actions?: {
		badge?: boolean
		color?: HPro.string
		icon: HPro.string
		/**
		 * @default true
		 */
		enabled?: boolean
		onPress: Function
		/**
		 * @default 'left'
		 */
		position: 'left' | 'right'
	}[]
}) => {

	/* Contexts */
	const { notification } = useNotification()

	const left = actions?.filter(action => {
		if ((action.position ?? 'left') === 'left') {
			if (action.enabled ?? true) {
				return true
			}
		}
		return false
	})
	const right = actions?.filter(action => {
		if ((action.position ?? 'left') === 'right') {
			if (action.enabled ?? true) {
				return true
			}
		}
		return false
	})

	return (<>
		<StatusBar
			backgroundColor={colors.GREEN_DARK}
			barStyle={'light-content'} />
		<SafeAreaView style={{ flex: 0, backgroundColor: colors.GREEN_DARK }} />
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.GREEN_DARK }}>
			<View style={styles.container}>
				<KeyboardAvoidingView
					behavior={Platform.select({ android: undefined, ios: 'padding' })}
					style={styles.container}>
					{children}
				</KeyboardAvoidingView>
			</View>
		</SafeAreaView>
	</>)
}

export default Container

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.BACKGROUND,
		flex: 1,
	}
})
