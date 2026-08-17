export interface IconProps {
	/**
	 * Defines if is enabled.
	 * When the button is disabled, the event is not dispatched.
	 * @default true
	 */
	enabled?: boolean
	/**
	 * Defines the name.
	 */
	name: string
	/**
	 * Defines the padding.
	 */
	padding?: number
	/**
	 * Defines the size.
	 */
	size?: number
	/**
	 * Dispatches the event on press.
	 * When the button is disabled, the event is not dispatched.
	 */
	onPress?: () => void
}

export interface FontIconProps extends PropsWithChildren {
	/**
	 * Defines the icon name.
	 */
	name: string
}
