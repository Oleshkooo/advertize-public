import { Suspense, lazy, memo, type FC } from 'react'

import { type TextPageProps } from './TextPage'

interface LazyTextPageProps extends TextPageProps {}

const TextPage = lazy(async () => await import('./TextPage'))

const LazyTextPage: FC<LazyTextPageProps> = memo(props => (
    <Suspense fallback={null}>
        <TextPage {...props} />
    </Suspense>
))

LazyTextPage.displayName = 'TextPage'
export default LazyTextPage
