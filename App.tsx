/* Dependencies */
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'
import { Badge, Provider as PaperProvider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

/*  Project */
import ScreenMain from './src/Main'
import CustomDrawerContent from './src/components/Drawer'
import LoadingProvider from './src/contexts/loading'
import NavigateProvider from './src/contexts/navigate'
import NotificationProvider, {
	useNotification
} from './src/contexts/notification'
import SettingsProvider from './src/contexts/settings'
import UserProvider from './src/contexts/user'
import ScreenAttachments from './src/screens/Attachments'
import ScreenAuth from './src/screens/Auth'
import ScreenDuty from './src/screens/Duty'
import ScreenFollowUps from './src/screens/FollowUps'
import ScreenFollowUp from './src/screens/FollowUps/FollowUp'
import ScreenHome from './src/screens/Home'
import ScreenNotifications from './src/screens/Notifications'
import ScreenRequests from './src/screens/Requests'
import ScreenRequest from './src/screens/Requests/Request'
import ScreenSettingsServer from './src/screens/Server'
import ScreenSettings from './src/screens/Settings'
import ScreenTimeline from './src/screens/Timeline'
import { navigatorTheme, paperTheme } from './src/themes'

const AuthStack = () => {
	const Stack = createStackNavigator<HPro.AuthStack>()
	return (
		<>
			<Stack.Navigator
				headerMode={'none'}
				initialRouteName={'Auth'}
				screenOptions={{ gestureEnabled: false }}
			>
				<Stack.Screen component={ScreenAuth} name={'Auth'} />
				<Stack.Screen
					component={ScreenSettingsServer}
					name={'SettingsServer'}
					options={{ gestureEnabled: true }}
				/>
			</Stack.Navigator>
		</>
	)
}

const NotificationsStack = () => {
	const Stack = createStackNavigator<HPro.NotificationsStack>()
	return (
		<>
			<Stack.Navigator
				headerMode={'none'}
				initialRouteName={'Notifications'}
				screenOptions={{ gestureEnabled: false }}
			>
				{/* <Stack.Screen
				component={ScreenNotification}
				name={'Notification'} /> */}
				<Stack.Screen component={ScreenNotifications} name={'Notifications'} />
			</Stack.Navigator>
		</>
	)
}

const RequestsStack = () => {
	const Stack = createStackNavigator<HPro.RequestsStack>()
	return (
		<>
			<Stack.Navigator
				headerMode={'none'}
				initialRouteName={'Requests'}
				screenOptions={{ gestureEnabled: false }}
			>
				<Stack.Screen
					component={ScreenFollowUp}
					name={'FollowUp'}
					options={{ gestureEnabled: true }}
				/>
				<Stack.Screen
					component={ScreenFollowUps}
					name={'FollowUps'}
					options={{ gestureEnabled: true }}
				/>
				<Stack.Screen
					component={ScreenTimeline}
					name={'Timeline'}
					options={{ gestureEnabled: true }}
				/>
				<Stack.Screen
					component={ScreenRequest}
					name={'Request'}
					options={{ gestureEnabled: true }}
				/>
				<Stack.Screen
					component={ScreenRequests}
					name={'Requests'}
					options={{ gestureEnabled: true }}
				/>
				<Stack.Screen
					component={ScreenAttachments}
					name={'Attachments'}
					options={{ gestureEnabled: true }}
				/>
			</Stack.Navigator>
		</>
	)
}

const DutyStack = () => {
	const Stack = createStackNavigator<HPro.DutyStack>()
	return (
		<>
			<Stack.Navigator
				headerMode={'none'}
				initialRouteName={'Duty'}
				screenOptions={{ gestureEnabled: false }}
			>
				<Stack.Screen
					component={ScreenDuty}
					name={'Duty'}
					options={{ gestureEnabled: true }}
				/>
				<Stack.Screen
					component={ScreenAttachments}
					name={'Attachments'}
					options={{ gestureEnabled: true }}
				/>
			</Stack.Navigator>
		</>
	)
}

const HomeStack = () => {
	/* Contexts */
	const { notification } = useNotification()

	const Drawer = createDrawerNavigator<HPro.AppDrawer>()
	return (
		<>
			<Drawer.Navigator
				screenOptions={{ headerShown: false }}
				drawerContent={props => <CustomDrawerContent {...props} />}
				initialRouteName={'Home'}
			>
				<Drawer.Screen
					component={ScreenHome}
					name={'Home'}
					options={{
						drawerIcon: ({ color }) => (
							<View>
								<Icon color={color} name={'home'} size={22} />
							</View>
						),
						drawerLabel: 'Início',
						gestureEnabled: true
					}}
				/>
				<Drawer.Screen
					component={NotificationsStack}
					name={'Notifications'}
					options={{
						drawerIcon: ({ color }) => (
							<View>
								<Icon color={color} name={'bell'} size={22} />
								<Badge
									visible={Boolean(notification)}
									size={10}
									style={{ position: 'absolute' }}
								/>
							</View>
						),
						drawerLabel: 'Notificações',
						gestureEnabled: true
					}}
				/>
				<Drawer.Screen
					component={RequestsStack}
					name={'Requests'}
					options={{
						drawerIcon: ({ color }) => (
							<View>
								<Icon color={color} name={'clipboard-text'} size={22} />
							</View>
						),
						drawerLabel: 'Solicitações',
						gestureEnabled: true
					}}
				/>
				<Drawer.Screen
					component={DutyStack}
					name={'Duty'}
					options={{
						drawerIcon: ({ color }) => (
							<View>
								<Icon color={color} name={'chat-alert'} size={22} />
							</View>
						),
						drawerLabel: 'Plantão',
						gestureEnabled: true
					}}
				/>
				<Drawer.Screen
					component={SettingsStack}
					name={'Settings'}
					options={{
						drawerIcon: ({ color }) => (
							<View>
								<Icon color={color} name={'cog'} size={22} />
							</View>
						),
						drawerLabel: 'Configurações',
						gestureEnabled: true
					}}
				/>
			</Drawer.Navigator>
		</>
	)
}

const SettingStack = () => {
	const Stack = createStackNavigator<HPro.SettingsStack>()
	return (
		<Stack.Navigator
			headerMode={'none'}
			initialRouteName={'Settings'}
			screenOptions={{ gestureEnabled: false }}
		>
			<Stack.Screen component={ScreenSettings} name={'Settings'} />
			<Stack.Screen
				component={ScreenSettingsServer}
				name={'SettingsServer'}
				options={{ gestureEnabled: true }}
			/>
		</Stack.Navigator>
	)
}

const SettingsStack = () => {
	const Stack = createStackNavigator<HPro.SettingsStack>()
	return (
		<>
			<Stack.Navigator
				headerMode={'none'}
				initialRouteName={'Settings'}
				screenOptions={{ gestureEnabled: false }}
			>
				<Stack.Screen name={'Settings'} component={ScreenSettings} />
				<Stack.Screen
					name={'SettingsServer'}
					component={ScreenSettingsServer}
					options={{ gestureEnabled: true }}
				/>
			</Stack.Navigator>
		</>
	)
}

const App = () => {
	const Stack = createStackNavigator<HPro.AppStack>()

	return (
		<>
			<LoadingProvider>
				<NavigateProvider>
					<SettingsProvider>
						<UserProvider>
							<PaperProvider theme={paperTheme}>
								<NavigationContainer theme={navigatorTheme}>
									<NotificationProvider>
										<Stack.Navigator
											headerMode={'none'}
											initialRouteName={'Main'}
											screenOptions={{ gestureEnabled: false }}
										>
											<Stack.Screen component={ScreenMain} name={'Main'} />
											<Stack.Screen
												component={NotificationsStack}
												name={'Notifications'}
											/>
											<Stack.Screen
												component={RequestsStack}
												name={'Requests'}
											/>
											<Stack.Screen component={AuthStack} name={'Auth'} />
											<Stack.Screen component={HomeStack} name={'Home'} />
											<Stack.Screen
												component={SettingStack}
												name={'Settings'}
											/>
										</Stack.Navigator>
									</NotificationProvider>
								</NavigationContainer>
							</PaperProvider>
						</UserProvider>
					</SettingsProvider>
				</NavigateProvider>
			</LoadingProvider>
		</>
	)
}

export default App
