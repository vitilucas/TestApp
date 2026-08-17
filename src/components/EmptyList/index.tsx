/* Dependencies */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const EmptyList = ({ actions = [], title, subtitle }: {
	actions?: React.ReactNode[]
	subtitle: string
	title: string
}) => {

	const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			flex: 1,
			justifyContent: 'center',
			marginTop: 30
		},
		subtitle: {
			color: 'rgba(0, 0, 0, 0.60)',
			fontSize: 14,
			textAlign: 'center'
		},
		title: {
			fontSize: 16,
			textAlign: 'center'
		}
	})

	return (<>
		<View style={styles.container}>
			<Text style={styles.title}>
				{title}
			</Text>
			<Text style={styles.subtitle}>
				{subtitle}
			</Text>
			<View style={{
				marginTop: 20
			}}>
				{/* Add key to each action */}
				{actions.map((action, index) => {
					return <View key={index} style={{ marginBottom: 10 }}>
						{action}
					</View>
				})}
			</View>
		</View>
	</>)
}

export default EmptyList
