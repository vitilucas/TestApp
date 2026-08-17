/* Dependencies */
import React, { forwardRef, Fragment, useImperativeHandle, useRef, useState } from 'react'
import { Keyboard, Pressable, ScrollView, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'

/* Project */
import { theme } from '../../themes'
import Input, { InputRef } from '../Input'
import { styles } from './styles'
import type * as Types from './types'

const ComboboxRoot = forwardRef<Types.ComboboxRef, Types.ComboboxRootProps>((props, ref) => {

	// Deconstruct props
	const {
		editable = true,
		enabled = true,
		options,
		style,
		onChange
	} = props

	const containerStyle = {
		...styles.container,
		height: style?.height ?? styles.container.height,
		zIndex: style?.zIndex
	}

	const inputStyle = {
		...styles.input,
		color: style?.color,
		fontSize: style?.fontSize
	}

	const iconStyle = {
		...styles.icons,
		color: style?.color,
	}

	/* Refs */
	const refNativeInput = useRef<InputRef>(null)
	useImperativeHandle(ref, () => ({
		blur: () => {
			refNativeInput.current?.blur()
		},
		clear: () => {
			refNativeInput.current?.clear()
		},
		focus: () => {
			refNativeInput.current?.focus()
		},
		reset: () => {
			refNativeInput.current?.focus()
		},
		setValue: (value: string) => {
			refNativeInput.current?.setValue(value)
		},
		getValue: () => {
			return refNativeInput.current?.getValue()
		}
	}))

	/* States */
	const [boxVisible, setBoxVisible] = useState<boolean>(false)

	/* Functions */
	function onArrow() {
		if (enabled) {
			setBoxVisible(!boxVisible)
		}
		Keyboard.dismiss()
	}

	function onSelect(value: string) {
		onChange?.(value)
		refNativeInput.current.setValue(value)
		setBoxVisible(false)
	}

	return (<>
		<View style={containerStyle}>
			<Pressable
				onPress={() => {
					onArrow()
				}}
				style={styles.floating}>
				<Input.Root
					{...props}
					ref={refNativeInput}
					editable={false}
					style={inputStyle}>
					{editable && (<>
						<View style={iconStyle}>
							<Input.Icon
								enabled={enabled}
								size={30}
								name={boxVisible ? 'chevron-up' : 'chevron-down'}
								onPress={() => {
									onArrow()
								}} />
						</View>
					</>)}
				</Input.Root>
			</Pressable>
			{boxVisible &&
				<ScrollView
					style={{
						backgroundColor: theme.BACKGROUND,
						borderColor: '#999',
						borderWidth: 1,
						borderRadius: 4,
						height: 'auto',
						maxHeight: 400,
						position: 'absolute',
						top: containerStyle.height + 5,
						width: '100%',
						zIndex: 100
					}}>
					{options.map((item, index) => (
						<Fragment key={item}>
							<Pressable
								onPress={() => onSelect(item)}
								style={{
									height: 50,
									justifyContent: 'center',
									paddingHorizontal: 15
								}}>
								<Text>
									{item}
								</Text>
							</Pressable>
							{(index < options.length - 1)
								&& <Divider />}
						</Fragment>
					))}
				</ScrollView>}
		</View>
	</>)
})

export default ComboboxRoot
