import { motion } from 'framer-motion'
import { memo, useCallback, type CSSProperties, type FC, type HTMLAttributes } from 'react'

import { buttonAnimation, containerAnimation, transition } from './Menu.data'
import s from './Menu.module.scss'

export interface MenuProps extends JSX.IntrinsicAttributes, HTMLAttributes<HTMLButtonElement> {
    isOpen: boolean
    onClick: () => void
    linesClassName?: string
    className?: string
    style?: CSSProperties
}

const Menu: FC<MenuProps> = memo(
    ({ isOpen, onClick, linesClassName = '', className = '', style }) => {
        const getOpenString = useCallback(() => (isOpen ? 'open' : 'close'), [isOpen])

        return (
            <motion.button
                role="button"
                aria-label="menu-open-close"
                className={`${s.Menu} ${isOpen ? s.open : ''} ${className}`}
                onClick={onClick}
                whileHover={buttonAnimation.hover}
                whileTap={buttonAnimation.click}
                transition={transition}
                style={style}
            >
                <motion.div animate={containerAnimation[getOpenString()]} transition={transition}>
                    <motion.span
                        className={linesClassName}
                        animate={buttonAnimation.topLine[getOpenString()]}
                        transition={transition}
                    />
                    <motion.span
                        className={linesClassName}
                        animate={buttonAnimation.middleLine[getOpenString()]}
                        transition={transition}
                    />
                    <motion.span
                        className={linesClassName}
                        animate={buttonAnimation.bottomLine[getOpenString()]}
                        transition={transition}
                    />
                </motion.div>
            </motion.button>
        )
    },
)

Menu.displayName = 'Menu'
export default Menu
