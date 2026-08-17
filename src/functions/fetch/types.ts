import * as functions from '@hproinformatica/hpro-functions'

export type Endpoint = string
export type Params = functions.Params

export interface Options extends functions.Options {
	onUnauthorized?: () => void
}
