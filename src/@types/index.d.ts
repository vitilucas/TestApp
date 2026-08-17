export = HPro
export as namespace HPro

import { StackScreenProps } from '@react-navigation/stack'

declare namespace HPro {
	type Operation = 'Insert' | 'Update' | 'Delete' | 'Consult'

	type bool = boolean
	type color = string
	type date = string
	type datetime = string
	type float = number
	type integer = number
	type string = string
	type time = string

	interface Request {
		asu: HPro.string
		cad: HPro.date
		corfun: HPro.string
		corlet: HPro.string
		des: HPro.string
		hor: HPro.time
		num: HPro.string
		resset: HPro.string
		seq: HPro.integer
		sit: HPro.string
		sol: HPro.string
		sta: HPro.integer
		stades: HPro.string
		urg: HPro.string
		tip: HPro.string
	}

	interface FollowUp {
		ana: HPro.string
		colapsed?: HPro.bool
		corfun?: HPro.string
		corlet?: HPro.string
		dat: HPro.string
		hor: HPro.string
		key: HPro.string
		nom?: HPro.string
		obs: HPro.string
		set: HPro.string
		stades?: HPro.string
	}

	interface Timeline {
		dat: HPro.datetime
		sta: HPro.integer
		obs: HPro.string
		enabled: HPro.bool
		stades: HPro.string
		corfun: HPro.color
		corlet: HPro.color
		img: HPro.string
	}

	interface User {
		username: HPro.string
		empresa: HPro.string
		token: HPro.string
	}

	interface Settings {
		server: HPro.string
		port: HPro.string
	}

	interface Attachments {
		file: HPro.string
		icon: HPro.string
		path: HPro.string
		nom: HPro.string
		tam: HPro.string
		cri: HPro.string
		alt: HPro.string
		ext: HPro.string
	}

	/* Navigation */
	type Props<T, P extends keyof T = string> = StackScreenProps<T, P>

	type AppDrawer = {
		Home: undefined
		Main: undefined
		Notifications: undefined
		Requests: undefined
		Duty: undefined
		Settings: undefined
	}

	type AppStack = {
		Auth: undefined
		Home: undefined
		Main: undefined
		Notifications: undefined
		Requests: undefined
		Settings: undefined
	}

	type MainStack = {
		Auth: undefined
		Home: undefined
		Main: undefined
		Notifications: undefined
		Requests: undefined
		Duty: undefined
		SettingsServer: undefined
	}

	type AuthStack = {
		Auth: undefined
		Forgot: {
			username?: HPro.string
		}
		Main: undefined
		SettingsServer: undefined
	}

	type SettingsStack = {
		ChangePassword: undefined
		Main: undefined
		Settings: undefined
		SettingsServer: undefined
	}

	type NotificationsStack = {
		Main: undefined
		Notifications: undefined
		Notification: undefined
	}

	type RequestParams =
		| {
				operation: 'Insert'
		  }
		| ({
				operation: 'Consult'
		  } & HPro.Request)

	type TimelineParams = {
		num: HPro.string
		seq: HPro.integer
	}

	type FollowUpParams =
		| {
				operation: 'Insert'
				num: HPro.string
				seq: HPro.integer
		  }
		| {
				operation: 'Consult'
				num: HPro.string
				seq: HPro.integer
				dat: HPro.date
				eve: HPro.integer
		  }

	type FollowUpsParams = {
		num: HPro.string
		seq: HPro.integer
	}

	type AttachmentsParams = {
		num: HPro.string
		seq: HPro.integer
	}

	type RequestsStack = {
		Main: undefined
		Request: RequestParams
		Requests: undefined
		Timeline: TimelineParams
		FollowUp: FollowUpParams
		FollowUps: FollowUpsParams
		Attachments: AttachmentsParams
	}

	type DutyStack = {
		Duty: undefined
		Attachments: AttachmentsParams
	}
}
