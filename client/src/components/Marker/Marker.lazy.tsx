import { Suspense, lazy, memo, type FC } from 'react'

import { type MarkerProps } from './Marker'

interface LazyMarkerProps extends MarkerProps {}

const Marker = lazy(async () => await import('./Marker'))

const LazyMarker: FC<LazyMarkerProps> = memo(props => (
    <Suspense fallback={null}>
        <Marker {...props} />
    </Suspense>
))

LazyMarker.displayName = 'Marker'
export default LazyMarker
