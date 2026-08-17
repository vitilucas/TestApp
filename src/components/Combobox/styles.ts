/* Dependencies */
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	fieldsetLeft: {
		borderBottomLeftRadius: 4,
		borderBottomWidth: 1,
		borderColor: '#999',
		borderLeftWidth: 1,
		borderTopLeftRadius: 4,
		borderTopWidth: 1,
		width: 5
	},
	fieldsetRight: {
		borderBottomRightRadius: 4,
		borderBottomWidth: 1,
		borderColor: '#999',
		borderRightWidth: 1,
		borderTopRightRadius: 4,
		borderTopWidth: 1,
		flex: 1,
		minWidth: 5
	},
	fieldsetCenter: {
		borderBottomWidth: 1,
		borderColor: '#999',
		flexDirection: 'row',
		paddingHorizontal: 2,
		position: 'relative'
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		height: 48 // Changeable
	},
	placeholder: {
		alignSelf: 'center',
		borderColor: 'transparent',
		color: '#aaa',
		fontSize: 16, // Changeable
	},
	floating: {
		flexDirection: 'row',
		gap: 5,
		height: '100%',
		justifyContent: 'space-between',
		position: 'absolute',
		width: '100%'
	},
	input: {
		alignSelf: 'center',
		flex: 1,
		fontSize: 16, // Changeable
		position: 'relative'
	},
	icons: {
		alignSelf: 'center',
		flexDirection: 'row',
		gap: 5,
		position: 'relative'
	}
})
