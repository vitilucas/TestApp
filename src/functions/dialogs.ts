import { Alert as NativeAlert } from 'react-native'
import type { TAbortProps, TAlertProps, TConfirmProps } from './dialogs.d'

/**
 * Opens native dialog to abort.
 *
 * @returns Promise<boolean | null>
*/
export async function abort({
	title,
	message,
	positiveText = 'Sim',
	negativeText = 'Não',
	abortText = 'Cancelar'
}: TAbortProps): Promise<boolean | null> {
	return new Promise((resolve) => {
		NativeAlert.alert(
			title,
			message,
			[{
				text: positiveText,
				onPress: () => {
					resolve(true)
				}
			}, {
				text: negativeText,
				onPress: () => {
					resolve(false)
				}
			}, {
				text: abortText,
				onPress: () => {
					resolve(null)
				}
			}],
			{ cancelable: false }
		)
	})
}

/**
 * Opens native dialog to alert.
 *
 * @returns Promise<void>
 */
export async function alert({
	title,
	message,
	neutralText = 'OK'
}: TAlertProps): Promise<void> {
	return new Promise((resolve) => {
		NativeAlert.alert(
			title,
			message,
			[{
				text: neutralText,
				onPress: () => {
					resolve()
				}
			}],
			{ cancelable: false }
		)
	})
}

/**
 * Opens a native dialog to confirm.
 *
 * Behavior:
 * - Returns `true` if the user pressed the positive button.
 * - Returns `false` if the user pressed the negative button.
 * - Returns `null` if the user dismissed the dialog.
 */
export async function confirm({
	title,
	message,
	positiveText = 'Sim',
	negativeText = 'Não'
}: TConfirmProps): Promise<boolean> {
	return new Promise((resolve) => {
		NativeAlert.alert(
			title,
			message,
			[{
				text: positiveText,
				onPress: () => {
					resolve(true)
				}
			}, {
				text: negativeText,
				onPress: () => {
					resolve(false)
				}
			}],
			{ cancelable: false })
	})
}
