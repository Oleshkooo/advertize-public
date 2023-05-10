import { Suspense, lazy, memo, type FC } from 'react'

import { type ButtonProps } from './Button'

interface LazyButtonProps extends ButtonProps {}

const Button = lazy(async () => await import('./Button'))

const LazyButton: FC<LazyButtonProps> = memo(props => (
    <Suspense fallback={null}>
        <Button {...props} />
    </Suspense>
))

LazyButton.displayName = 'Button'
export default LazyButton
