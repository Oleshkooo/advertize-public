import { Suspense, lazy, memo, type FC } from 'react'

import { type TemplateNameProps } from './TemplateName'

interface LazyTemplateNameProps extends TemplateNameProps {}

const TemplateName = lazy(async () => await import('./TemplateName'))

const LazyTemplateName: FC<LazyTemplateNameProps> = memo(props => (
    <Suspense fallback={null}>
        <TemplateName {...props} />
    </Suspense>
))

LazyTemplateName.displayName = 'TemplateName'
export default LazyTemplateName
