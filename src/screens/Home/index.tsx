/* Dependencies */
import React from 'react'
import { Image, StyleSheet } from 'react-native'

/* Components */
import Appbar from '../../components/Appbar'
import Container from '../../components/Container'

const Home = ({ navigation }: HPro.Props<HPro.MainStack, 'Home'>) => {
	return (
		<>
			<Container>
				<Appbar title={'Início'} />
				<Image
					resizeMode={'contain'}
					source={require('../../../assets/images/home.png')}
					style={styles.logo}
				/>
			</Container>
		</>
	)
}

export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10
	},
	logoContainer: {
		flexGrow: 9
	},
	logo: {
		flex: 1,
		height: undefined,
		width: undefined
	}
})
