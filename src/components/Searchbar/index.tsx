/* Dependencies */
import React from 'react'
import { StyleSheet } from 'react-native'

/*Libraries */
import { Searchbar as PaperSearchbar } from 'react-native-paper'
import { theme } from '../../themes'

const Searchbar = ({ onIconPress, search, setSearch }: {
	onIconPress?: () => void
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
}) => {

	return (<>
		<PaperSearchbar
			icon={onIconPress
				? {
					direction: 'auto',
					source: 'arrow-left'
				} : {
					direction: 'auto',
					source: 'magnify'
				}}
			onIconPress={onIconPress}
			onChangeText={(value) => setSearch(value)}
			placeholder={'Buscar'}
			style={styles.searchbar}
			value={search} />
	</>)
}

export default Searchbar

/* Styles */
const styles = StyleSheet.create({
	searchbar: {
		backgroundColor: theme.BACKGROUND,
		margin: 4
	}
})
