/* Dependencies */
import { DefaultTheme as NavigationTheme } from '@react-navigation/native'
import { DefaultTheme as PaperTheme } from 'react-native-paper'

export const colors = {
	BLACK: '#000000',
	GRAY_DARK: '#575656',
	GRAY_LIGHT: '#f9f9f9',
	GRAY: '#7a7a7a',
	GREEN_DARK: '#0F8781',
	GREEN: '#11a199',
	RED: '#A8656C',
	TRASPARENT: 'transparent',
	TRANSLUCENT: '#00000010',
	WHITE: '#ffffff'
}

export const theme = {
	ACCENT: colors.WHITE,
	BACKGROUND: colors.GRAY_LIGHT,
	PRIMARY: colors.GREEN,
	SURFACE: colors.GREEN_DARK,
	TEXT: colors.BLACK,
	// ONSURFACE: colors.BLUE_LIGHT,
	NOTIFICATION: colors.GREEN,
	ERROR: colors.RED,
}

export const navigatorTheme = {
	...NavigationTheme,
	colors: {
		...NavigationTheme.colors,
		// background: theme.BACKGROUND,
		// notification: theme.NOTIFICATION,
		primary: theme.PRIMARY,
		// text: theme.TEXT,
		// card: theme.CARD,
		// border: theme.BORDER,
	}
} as typeof NavigationTheme

export const paperTheme = {
	...PaperTheme,
	colors: {
		...PaperTheme.colors,
		background: theme.BACKGROUND,
		// onSurface: theme.TEXT,
		primary: theme.PRIMARY,
		surface: theme.SURFACE,
		//backdrop: theme.BACKGROUND,
		// elevation: MD3ElevationColors,
		// error: theme.BACKGROUND,
		// errorContainer: theme.BACKGROUND,
		// inverseOnSurface: theme.BACKGROUND,
		// inversePrimary: theme.BACKGROUND,
		// inverseSurface: theme.BACKGROUND,
		// onBackground: theme.BACKGROUND,
		// onError: theme.BACKGROUND,
		// onErrorContainer: theme.BACKGROUND,
		// onPrimary: theme.BACKGROUND,
		// onPrimaryContainer: theme.BACKGROUND,
		// onSecondary: theme.BACKGROUND,
		// onSecondaryContainer: theme.BACKGROUND,
		// onSurfaceDisabled: theme.BACKGROUND,
		// onSurfaceVariant: theme.BACKGROUND,
		// onTertiary: theme.BACKGROUND,
		// onTertiaryContainer: theme.BACKGROUND,
		// outline: theme.BACKGROUND,
		// outlineVariant: theme.BACKGROUND,
		// primaryContainer: theme.BACKGROUND,
		// scrim: theme.BACKGROUND,
		// secondary: theme.BACKGROUND,
		// secondaryContainer: theme.BACKGROUND,
		// shadow: theme.BACKGROUND,
		// surfaceDisabled: theme.BACKGROUND,
		surfaceVariant: theme.BACKGROUND,
		// tertiary: theme.BACKGROUND,
		// tertiaryContainer: theme.BACKGROUND,
	}
} as typeof PaperTheme
