/* Dependencies */
import type { PropsWithChildren } from 'react'
import type { ColorValue, DimensionValue } from 'react-native'

interface ContainerStyle {
	/**
	 * Defines the container content justification.
	 */
	justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
	/**
	 * Defines the container background color.
	 */
	backgroundColor?: ColorValue
	/**
	 * Defines the container border color.
	 */
	borderColor?: ColorValue
	/**
	 * Defines the container border radius.
	 */
	borderRadius?: AnimatableNumericValue
	/**
	 * Defines the container border width.
	 */
	borderWidth?: number
	/**
	 * Defines the container height.
	 */
	height?: DimensionValue
	/**
	 * Defines the container width.
	 * @default '100%'
	 */
	width?: DimensionValue
}

interface TextStyle {
	/**
	 * Defines the text color.
	 */
	color?: ColorValue
	/**
	 * Defines the text font family.
	 */
	fontFamily?: string
	/**
	 * Defines the text font size.
	 */
	fontSize?: number
}

interface IconStyle {
	/**
	 * Defines the icon size.
	 * @default 20
	 */
	// size?: number
}

export interface ButtonRootProps extends PropsWithChildren<{}> {
	/**
	 * Defines if is enabled.
	 * When the button is disabled, the event is not dispatched.
	 * @default true
	*/
	enabled?: boolean
	/**
	 * Defines if is loading.
	 */
	loading?: boolean
	/**
	 * Defines the styles.
	 */
	style?: ContainerStyle & TextStyle & IconStyle
	/**
	 * Defines the text.
	 */
	text: string
	/**
	 * Dispatches the event on press.
	 * When the button is disabled, the event is not dispatched.
	 */
	onPress?: () => void
}
