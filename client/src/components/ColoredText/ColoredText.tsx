import { memo, type CSSProperties, type FC, type HTMLAttributes, type ReactNode } from 'react'

import s from './ColoredText.module.scss'

export interface ColoredTextProps extends JSX.IntrinsicAttributes, HTMLAttributes<HTMLSpanElement> {
    className?: string
    style?: CSSProperties
    children: ReactNode
}

const ColoredText: FC<ColoredTextProps> = memo(({ children, className = '', style }) => {
    return (
        <span className={`${s.ColoredText} ${className}`} style={style}>
            {children}
        </span>
    )
})

ColoredText.displayName = 'ColoredText'
export default ColoredText
