import { Suspense, lazy, memo, type FC } from 'react'

const ModalElement = lazy(async () => await import('./ModalElement'))

const LazyModalElement: FC = memo(props => (
    <Suspense fallback={null}>
        <ModalElement {...props} />
    </Suspense>
))

LazyModalElement.displayName = 'ModalElement'
export default LazyModalElement
