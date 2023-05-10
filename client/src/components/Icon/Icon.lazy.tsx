import { Suspense, lazy, memo, type FC } from 'react'

import { type IconProps } from './Icon'

interface LazyIconProps extends IconProps {}

const Icon = lazy(async () => await import('./Icon'))

const LazyIcon: FC<LazyIconProps> = memo(props => (
    <Suspense fallback={null}>
        <Icon {...props} />
    </Suspense>
))

LazyIcon.displayName = 'Icon'
export default LazyIcon
