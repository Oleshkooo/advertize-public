import {
    memo,
    useMemo,
    type CSSProperties,
    type FC,
    type HTMLAttributes,
    type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'

import s from './Button.module.scss'

export interface ButtonProps extends JSX.IntrinsicAttributes, HTMLAttributes<HTMLButtonElement> {
    primary?: boolean
    secondary?: boolean
    bordered?: boolean
    borderedNoHover?: boolean
    isActive?: boolean
    link?: boolean
    to?: string
    onClick?: () => void
    style?: CSSProperties
    children?: ReactNode
}

const Button: FC<ButtonProps> = memo(
    ({
        primary = false,
        secondary = false,
        bordered = false,
        borderedNoHover = false,
        isActive = false,
        link,
        to,
        onClick,
        children,
        className = '',
        style,
    }) => {
        const type = useMemo(() => {
            if (primary) {
                return 'primary'
            } else if (secondary) {
                return 'secondary'
            } else if (bordered) {
                return 'bordered'
            } else if (borderedNoHover) {
                return 'borderedNoHover'
            }
            return 'primary'
        }, [primary, secondary, bordered, borderedNoHover])

        const props = useMemo(() => {
            const activeClassName = isActive ? s.borderedActive : ''

            return {
                className: `${s.Button} ${s[type]} ${activeClassName} ${className}`,
                onClick,
                style,
            }
        }, [className, isActive, onClick, style, type])

        if (link === true && to !== undefined) {
            return (
                <Link role="link" to={to} {...props}>
                    {children}
                </Link>
            )
        }

        return (
            <button role="button" {...props}>
                {children}
            </button>
        )
    },
)

Button.displayName = 'Button'
export default Button
