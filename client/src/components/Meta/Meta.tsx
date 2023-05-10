import { memo, useMemo, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import { DEFAULT_TITLE } from '@/config'

export interface MetaProps extends JSX.IntrinsicAttributes {
    children?: string
    noindex?: boolean
}

const Meta: FC<MetaProps> = memo(({ noindex = false, children = DEFAULT_TITLE }) => {
    const fullTittle = useMemo(() => `${children} | ${DEFAULT_TITLE}`, [children])
    const href = useMemo(() => window.location.href, [])
    const NoIndex = useMemo(() => {
        if (!noindex) {
            return null
        }
        return <meta name="robots" content="noindex, nofollow" />
    }, [noindex])

    return (
        <Helmet>
            <title>{fullTittle}</title>
            <meta name="title" content={fullTittle} />
            <link rel="canonical" href={href} />
            {NoIndex}
        </Helmet>
    )
})

Meta.displayName = 'Meta'
export default Meta
