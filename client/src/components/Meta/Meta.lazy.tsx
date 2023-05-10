import { Suspense, lazy, memo, type FC } from 'react'

import { type MetaProps } from './Meta'

interface LazyMetaProps extends MetaProps {}

const Meta = lazy(async () => await import('./Meta'))

const LazyMeta: FC<LazyMetaProps> = memo(props => (
    <Suspense fallback={null}>
        <Meta {...props} />
    </Suspense>
))

LazyMeta.displayName = 'Meta'
export default LazyMeta
