/* Dependencies */
import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

/* Project */
import { styles } from './styles'
import type * as Types from './types'

function ButtonRoot(props: Types.ButtonRootProps) {

	// Deconstruct props
	const {
		children,
		enabled = true,
		loading = false,
		style,
		text,
		onPress
	} = props

	const containerStyle = {
		...styles.container,
		backgroundColor: style?.backgroundColor,
		borderColor: style?.borderColor,
		borderRadius: style?.borderRadius,
		borderWidth: style?.borderWidth,
		height: style?.height,
		justifyContent: style?.justifyContent ?? styles.container.justifyContent,
		width: style?.width ?? styles.container.width
	}

	const textStyle = {
		...styles.text,
		color: style?.color,
		fontFamily: style?.fontFamily,
		fontSize: style?.fontSize
	}

	const iconStyle = {
		...styles.icon,
		display: (children ? 'flex' : 'none') as 'flex' | 'none'
	}

	return (<>
		<TouchableHighlight
			disabled={!enabled || loading}
			onPress={onPress}
			style={containerStyle}
			underlayColor={'#999'}>
			<>
				<Text style={textStyle}>
					{text}
				</Text>
				<View style={iconStyle}>
					{children}
				</View>
			</>
		</TouchableHighlight>
	</>)
}

export default ButtonRoot
