/* Dependencies */
import type { PropsWithChildren } from 'react'
import type { ColorValue, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native'

export interface InputRootProps extends PropsWithChildren<{}> {
	/**
	 * If true, the input will be focused.
	 * @default false
	 */
	autoFocus?: boolean
	/**
	 * Defines the input value.
	 * @default undefined
	 */
	defaultValue?: string
	/**
	 * Defines if the input is editable or not.
	 * @default true
	 */
	editable?: boolean
	/**
	 * Defines if the input is enabled or not.
	 * @default true
	 */
	enabled?: boolean
	/**
	 * Defines the maximum length of the input.
	 * @default undefined
	 */
	maxLength?: number
	/**
	 * Defines if the input is multiline or not.
	 * @default false
	 */
	multiline?: boolean
	/**
	 * Defines the input name.
	 */
	// name: string
	/**
	 * Defines if the placeholder to be shown.
	 */
	placeholder: string
	/**
	 * Defines if the input is required or not.
	 */
	required?: boolean
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
	}
	/**
	 * Defines the type of the input.
	 * @default 'default'
	 */
	type?: 'default' | 'numeric' | 'password'
	/**
	 * Defines the enter key type of the input.
	 *
	 * Behavior:
	 * - The value 'go' are only available to iOS.
	 * - The value 'previous' are only available to Android.
	 *
	 * @example
	 * ```tsx
	 * // Same value for all platforms
	 * <Input
	 * 	enterKey="done"
	 * 	// ...
	 * />
	 *
	 * // Different value for each platform
	 * <Input
	 * 	enterKey={Platform.select({ android: "done", ios: "enter" })}
	 * 	// ...
	 * />
	 * ```
	 *
	 * @see https://reactnative.dev/docs/textinput#enterkeyhint
	 */
	enterKey?:
	| 'done' | 'enter' | 'next' | 'search' | 'send' | 'go' | 'previous'
	/**
	 * Callback that is called when the text input's submit button is pressed.
	 */
	onSubmit?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
}

export interface InputRef {
	/**
	 * Dispatch blur event.
	 */
	blur: () => void
	/**
	 * Dispatch clear event.
	 */
	clear: () => void
	/**
	 * Dispatch focus event.
	 */
	focus: () => void
	/**
	 * Dispatch reset event.
	 */
	reset: () => void
	/**
	 * Set the input value.
	 */
	setValue: (value: string) => void
	/**
	 * Get the input value.
	 */
	getValue: () => string
}
