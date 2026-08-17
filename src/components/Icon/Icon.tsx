/* Dependencies */
import React from 'react'
// import type { StyleProp, ViewStyle } from 'react-native'
// import { Text, TouchableHighlight } from 'react-native'
import Icons from '@expo/vector-icons/MaterialCommunityIcons'

/* Project */
import { styles } from './styles'
import type * as Types from './types'

function Icon(props: Types.IconProps) {

	// Deconstruct props
	const {
		enabled = true,
		name,
		padding = 15,
		size = 20,
		onPress
	} = props

	// let glyph = String(schema[name] ?? '?')

	// if (glyph.length > 1) {
	//   glyph = String.fromCodePoint(Number(glyph))
	// }

	// let glyph = '👋'
	// if (name === 'home') {
	// 	glyph = '🏠'
	// } else if (name === 'chevron-up') {
	// 	glyph = '🔼'
	// } else if (name === 'chevron-down') {
	// 	glyph = '🔽'
	// }

	// const containerStyle = {
	// 	...styles.container,
	// 	height: size + padding,
	// 	width: size + padding,
	// 	borderRadius: (size + padding) / 2
	// } as StyleProp<ViewStyle>

	// const iconStyle = {
	// 	...styles.icon,
	// 	fontSize: size
	// } as StyleProp<ViewStyle>

	return (<>
		{/* <TouchableHighlight
			disabled={!enabled}
			onPress={onPress}
			style={containerStyle}
			underlayColor={'#9998'}>
			<Text style={iconStyle}>
				{glyph}
			</Text>
		</TouchableHighlight> */}
		<Icons
			disabled={!enabled}
			name={name as any}
			size={size}
			onPress={onPress}
		/>
	</>)
}

export default Icon
