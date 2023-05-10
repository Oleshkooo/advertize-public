import { Suspense, lazy, memo, type FC } from 'react'

import { type ContainerProps } from './Container'

interface LazyContainerProps extends ContainerProps {}

const Container = lazy(async () => await import('./Container'))

const LazyContainer: FC<LazyContainerProps> = memo(props => (
    <Suspense fallback={null}>
        <Container {...props} />
    </Suspense>
))

LazyContainer.displayName = 'Container'
export default LazyContainer
