import { Suspense, lazy, memo, type FC } from 'react'

import { type NavigationProps } from './Navigation'

interface LazyNavigationProps extends NavigationProps {}

const Navigation = lazy(async () => await import('./Navigation'))

const LazyNavigation: FC<LazyNavigationProps> = memo(props => (
    <Suspense fallback={null}>
        <Navigation {...props} />
    </Suspense>
))

LazyNavigation.displayName = 'Navigation'
export default LazyNavigation
