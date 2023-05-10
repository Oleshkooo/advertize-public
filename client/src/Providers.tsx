import { type FC, type ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import { Provider as ReduxProvider } from 'react-redux'

import { AdminContextProvider, MenuContextProvider } from '@/context'
import { Error } from '@/pages'
import { store } from '@/store'

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={Error}>
            <ReduxProvider store={store}>
                <AdminContextProvider>
                    <MenuContextProvider>
                        <HelmetProvider>{children}</HelmetProvider>
                    </MenuContextProvider>
                </AdminContextProvider>
            </ReduxProvider>
        </ErrorBoundary>
    )
}

export default Providers
