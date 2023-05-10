import { Suspense, lazy, memo, type FC } from 'react'

import { type ColoredTextProps } from './ColoredText'

interface LazyColoredTextProps extends ColoredTextProps {}

const ColoredText = lazy(async () => await import('./ColoredText'))

const LazyColoredText: FC<LazyColoredTextProps> = memo(props => (
    <Suspense fallback={null}>
        <ColoredText {...props} />
    </Suspense>
))

LazyColoredText.displayName = 'ColoredText'
export default LazyColoredText
