import { Suspense, lazy, memo, type FC } from 'react'

import { type PageAnimationProps } from './PageAnimation'

interface LazyPageAnimationProps extends PageAnimationProps {}

const PageAnimation = lazy(async () => await import('./PageAnimation'))

const LazyPageAnimation: FC<LazyPageAnimationProps> = memo(props => (
    <Suspense fallback={null}>
        <PageAnimation {...props} />
    </Suspense>
))

LazyPageAnimation.displayName = 'PageAnimation'
export default LazyPageAnimation
