import { Suspense, lazy, memo, type FC } from 'react'

import { type ToastConfirmProps } from './ToastConfirm'

interface LazyToastConfirmProps extends ToastConfirmProps {}

const ToastConfirm = lazy(async () => await import('./ToastConfirm'))

const LazyToastConfirm: FC<LazyToastConfirmProps> = memo(props => (
    <Suspense fallback={null}>
        <ToastConfirm {...props} />
    </Suspense>
))

LazyToastConfirm.displayName = 'ToastConfirm'
export default LazyToastConfirm
