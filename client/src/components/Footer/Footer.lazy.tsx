import { Suspense, lazy, memo, type FC } from 'react'

import { type FooterProps } from './Footer'

interface LazyFooterProps extends FooterProps {}

const Footer = lazy(async () => await import('./Footer'))

const LazyFooter: FC<LazyFooterProps> = memo(props => (
    <Suspense fallback={null}>
        <Footer {...props} />
    </Suspense>
))

LazyFooter.displayName = 'Footer'
export default LazyFooter
