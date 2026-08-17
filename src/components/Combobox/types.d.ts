/* Dependencies */
import type { ColorValue } from 'react-native'
import type { InputRef, InputRootProps } from '../Input/types'

export interface ComboboxRootProps extends InputRootProps {
	/**
	 * Defines the values to be shown.
	 */
	options: string[]
	/**
	 * Defines the type of the input.
	 */
	style?: {
		/**
		 * Defines the text color.
		 */
		color?: ColorValue
		/**
		 * Defines the text font size.
		 */
		fontSize?: number
		/**
		 * Defines the container height.
		 */
		height?: DimensionValue
		/**
		 * Defines the z-index. Used to show the options above the other components.
		 */
		zIndex: number
	}
	/**
	 * Dispatched when the value changes.
	 */
	onChange?: (value: string) => void
}

export interface ComboboxRef extends InputRef {}
