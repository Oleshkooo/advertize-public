import { Suspense, lazy, memo, type FC } from 'react'

import { type MapProps } from './Map'

interface LazyMapProps extends MapProps {}

const Map = lazy(async () => await import('./Map'))

const LazyMap: FC<LazyMapProps> = memo(props => (
    <Suspense fallback={null}>
        <Map {...props} />
    </Suspense>
))

LazyMap.displayName = 'Map'
export default LazyMap
