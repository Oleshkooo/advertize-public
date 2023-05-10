import { Suspense, lazy, memo, type FC } from 'react'

import { type MenuProps } from './Menu'

interface LazyMenuProps extends MenuProps {}

const Menu = lazy(async () => await import('./Menu'))

const LazyMenu: FC<LazyMenuProps> = memo(props => (
    <Suspense fallback={null}>
        <Menu {...props} />
    </Suspense>
))

LazyMenu.displayName = 'Menu'
export default LazyMenu
