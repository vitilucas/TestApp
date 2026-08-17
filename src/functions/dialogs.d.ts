import { PropsWithChildren } from 'react'
import { ImageSourcePropType, AlertButton } from 'react-native'

interface BasicProps {
	/**
	 * Defines the dialog title.
	 */
	title: string
	/**
	 * Defines the DialogProps message.
	 * @default undefined
	 */
	message?: string
}

interface TAbortProps extends BasicProps {
	/**
	 * Define the text of the abort button.
	 * @default 'Cancelar'
	 */
	abortText?: string
	/**
	 * Define the text of the negative button.
	 * @default 'Não'
	 */
	negativeText?: string
	/**
	 * Define the text of the positive button.
	 * @default 'Sim'
	 */
	positiveText?: string
}

interface TAlertProps extends BasicProps {
	/**
	 * Define the text of the neutral button.
	 * @default 'OK'
	 */
	neutralText?: string
}

interface TConfirmProps extends BasicProps {
	/**
	 * Define the text of the negative button.
	 * @default 'Não'
	 */
	negativeText?: string
	/**
	 * Define the text of the positive button.
	 * @default 'Sim'
	 */
	positiveText?: string
}
