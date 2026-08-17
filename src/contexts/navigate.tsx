/* Dependencies */
import React, { createContext, useContext, useState } from 'react'

/* Types */
type Navigate = {
	screen: string
	params?: any
}
interface ContextProps {
	navigate: Navigate
	setNavigate: React.Dispatch<React.SetStateAction<Navigate>>
}
interface NavigateProps {
	children: React.ReactNode
}

/* Contexts */
export const NavigateContext = createContext({} as ContextProps)

/* Providers */
export default function NavigateProvider({ children }: NavigateProps) {

	/* States */
	const [navigate, setNavigate] = useState<Navigate>({
		screen: '',
		params: {}
	})

	return (
		<NavigateContext.Provider value={{
			navigate, setNavigate
		}}>
			{children}
		</NavigateContext.Provider>
	)
}

/* useContexts */
export function useNavigate() {
	return useContext(NavigateContext)
}
