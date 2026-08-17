/* Dependencies */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../../themes'

const Powered = () => {
	return (<>
		<View style={styles.container}>
			<Text style={styles.text}>
				{'Powered by HPRO'}
			</Text>
		</View>
	</>)
}

export default Powered

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: theme.PRIMARY,
		justifyContent: 'center',
		height: 40,
	},
	text: {
		color: theme.ACCENT,
		fontSize: 18,
		fontWeight: 'bold'
	}
})
