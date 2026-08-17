/* Dependencies */
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Shortcut = ({ children }) => {
	return (<>
		<View style={styles.container}>
			{children}
		</View>
	</>)
}

export default Shortcut

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		height: 50,
		justifyContent: 'center',
	}
})
