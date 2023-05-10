import { Suspense, lazy, memo, type FC } from 'react'

import { type NavbarProps } from './Navbar'

interface LazyNavbarProps extends NavbarProps {}

const Navbar = lazy(async () => await import('./Navbar'))

const LazyNavbar: FC<LazyNavbarProps> = memo(props => (
    <Suspense fallback={null}>
        <Navbar {...props} />
    </Suspense>
))

LazyNavbar.displayName = 'Navbar'
export default LazyNavbar
