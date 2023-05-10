import { memo, useMemo, type CSSProperties, type FC, type HTMLAttributes } from 'react'

import { icons, type IconType } from './Icon.data'

export interface IconProps extends JSX.IntrinsicAttributes, HTMLAttributes<HTMLImageElement> {
    type: IconType
    className?: string
    style?: CSSProperties
}

const Icon: FC<IconProps> = memo(({ type, className = '', style }) => {
    const iconProps = useMemo(() => {
        const icon = icons.find(icon => icon.type === type)

        if (icon !== undefined && className !== '') {
            icon.className = `${icon.className ?? ''} ${className}`
        }

        return icon
    }, [className, type])

    const isFaIcon = useMemo(() => type.startsWith('fa-'), [type])

    if (isFaIcon) {
        return <i {...iconProps} style={style} />
    }

    return <img {...iconProps} style={style} />
})

Icon.displayName = 'Icon'
export default Icon
