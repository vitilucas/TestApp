/* Dependencies */
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Animated, TextInput as NativeInput, Platform, Pressable, View } from 'react-native'

/* Project */
import { styles } from './styles'
import type * as Types from './types'

const InputRoot = forwardRef<Types.InputRef, Types.InputRootProps>((props, ref) => {

	// Deconstruct props
	const {
		autoFocus = false,
		children,
		defaultValue,
		editable = true,
		enabled = true,
		enterKey,
		maxLength,
		multiline = false,
		placeholder,
		required = false,
		style,
		type = 'default',
		onSubmit
	} = props

	const isEditable = editable && enabled
	const isScrollable = isEditable || multiline

	const containerStyle = {
		...styles.container,
		height: style?.height ?? styles.container.height
	}

	const placeholderStyle = {
		...styles.placeholder,
		fontSize: style?.fontSize
	}

	const inputStyle = {
		...styles.input,
		color: style?.color ?? (enabled ? '#000' : '#999'),
		fontSize: style?.fontSize
	}

	const iconStyle = {
		...styles.icons,
		color: style?.color,
		display: (children ? 'flex' : 'none') as 'flex' | 'none'
	}

	// Check the type property
	const validTypes = ['default', 'numeric', 'password']
	if (!validTypes.includes(type)) {
		console.error('The property "type" must be one of the following: ' + validTypes.join(', ') + '.')
	}

	// Check the multiline property
	if (multiline) {
		// Check the type property for multiline
		if (type !== 'default') {
			console.error('The property "multiline" is only available for the property "type" with the value "default".')
		}
	}

	// Check the enterKey property
	switch (Platform.OS) {
		case 'android': {
			const validEnterKey = [undefined, 'done', 'enter', 'next', 'search', 'send', 'previous']
			if (!validEnterKey.includes(enterKey)) {
				console.error('The property "enterKey" for "android" must be one of the following: ' + validEnterKey.join(', ') + '.')
			}
			break
		} case 'ios': {
			const validEnterKey = [undefined, 'done', 'enter', 'next', 'search', 'send', 'go']
			if (!validEnterKey.includes(enterKey)) {
				console.error('The property "enterKey" for "ios" must be one of the following: ' + validEnterKey.join(', ') + '.')
			}
			break
		} default: {
			console.error('The property "enterKey" must be an object with the properties "android" and "ios".')
		}
	}

	/* States */
	const [value, setValue] = useState<string>(defaultValue ?? '')

	useEffect(() => {
		animatePlaceholder()
	}, [])

	/* Refs */
	const refNativeInput = useRef<NativeInput>(null)
	useImperativeHandle(ref, () => ({
		blur: () => {
			refNativeInput.current?.blur()
		},
		clear: () => {
			animatePlaceholder(true)
			refNativeInput.current?.clear()
		},
		focus: () => {
			refNativeInput.current?.focus()
		},
		reset: () => {
			setValue(defaultValue ?? '')
			refNativeInput.current?.focus()
		},
		setValue: (value: string) => {
			animatePlaceholder(Boolean(value.length))
			setValue(value)
		},
		getValue: () => {
			return value
		}
	}))

	/* Refs */
	const animated = useRef(new Animated.Value(0)).current

	// Function to animate the placeholder size
	function animatePlaceholder(stage?: boolean) {
		stage = stage || Boolean(value.length)
		Animated.timing(animated, {
			duration: 150,
			toValue: stage ? 1 : 0,
			useNativeDriver: false,
		}).start()
	}

	return (<>
		<View style={containerStyle}>
			<View style={styles.fieldsetLeft} />
			<Animated.View style={[
				styles.fieldsetCenter,
				{
					borderTopWidth: animated.interpolate({
						inputRange: [0, 1],
						outputRange: [1, 0]
					})
				}
			]}>
				<Animated.Text
					style={[
						placeholderStyle,
						{
							transform: [
								{
									translateY: animated.interpolate({
										inputRange: [0, 1],
										outputRange: [0, -(containerStyle.height / 2)] // half of the input container height
									})
								}
							]
						}
					]}>
					{placeholder + (required ? ' *' : '')}
				</Animated.Text>
			</Animated.View>
			<View style={styles.fieldsetRight} />
			<Pressable
				onPress={() => {
					refNativeInput.current.focus()
				}}
				style={styles.floating}>
				<NativeInput
					autoFocus={autoFocus}
					caretHidden={!isEditable}
					contextMenuHidden={!isEditable}
					editable={isScrollable}
					showSoftInputOnFocus={isEditable}
					// enterKeyHint={enterKey}
					inputMode={type === 'numeric' ? 'numeric' : 'text'}
					maxLength={maxLength}
					multiline={multiline}
					focusable={!(editable && enabled)}
					onBlur={() => animatePlaceholder(false)}
					scrollEnabled={multiline}
					onChangeText={(text) => {
						animatePlaceholder(Boolean(text.length))
						setValue((prev) => {
							if (isEditable)
								return text

							return prev
						})
					}}
					onFocus={() => animatePlaceholder(true)}
					onSubmitEditing={onSubmit}
					ref={refNativeInput}
					secureTextEntry={type === 'password'}
					style={inputStyle}
					textAlign={type === 'numeric' ? 'right' : 'left'}
					value={value} />
				<View
					style={iconStyle}>
					{children}
				</View>
			</Pressable>
		</View>
	</>)
})

export default InputRoot
