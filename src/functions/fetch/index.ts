import * as functions from '@hproinformatica/hpro-functions'
import type { Endpoint, Options, Params } from './types'

export async function fetcher<T>(
	endpoint: Endpoint,
	params?: Params,
	options: Options = {},
) {
	const response = await functions.fetcher<T,string>(endpoint, params, {
		isSecure: false,
		...options,
	})

	if(response.content.toString().startsWith('NOK')) {
		response.message = response.content.toString().replace('NOK', '')
		response.content = null
		response.success = false
	}

	if (response.status === 401) options.onUnauthorized?.()
	if (functions.isResponseError(response))
		response.message = response.content ?? response.message

	return response
}

export async function get<T>(endpoint: Endpoint, options?: Options) {
	return await fetcher<T>(endpoint, {}, { ...options, method: 'GET' })
}

export async function post<T>(
	endpoint: Endpoint,
	params?: Params,
	options?: Options,
) {
	return await fetcher<T>(endpoint, params, { ...options, method: 'POST' })
}
