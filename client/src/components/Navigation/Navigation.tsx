import { motion } from 'framer-motion'
import { memo, useCallback, useMemo, type CSSProperties, type FC, type HTMLAttributes } from 'react'

import { Menu, type NavbarLink } from '@/components'
import { useAppDispatch, useAppSelector, useOnEvent } from '@/hooks'
import { setMenuAction } from '@/store/slices'

import s from './Navigation.module.scss'

export interface NavigationProps extends JSX.IntrinsicAttributes, HTMLAttributes<HTMLElement> {
    links: NavbarLink[]
    buttonClassName?: string
    linesClassName?: string
    className?: string
    style?: CSSProperties
}

const Navigation: FC<NavigationProps> = memo(
    ({ links, buttonClassName = '', linesClassName = '', className = '', style }) => {
        const dispatch = useAppDispatch()
        const { isOpen } = useAppSelector(state => state.menu)

        const toggleMenu = useCallback(() => {
            const action = setMenuAction('toggle')
            dispatch(action)
        }, [dispatch])

        const closeMenu = useCallback(() => {
            const action = setMenuAction(false)
            dispatch(action)
        }, [dispatch])

        const LinksElements = useMemo(
            () =>
                links.map(item => (
                    <span key={item.text} onClick={item.onClick}>
                        {item.text}
                    </span>
                )),
            [links],
        )

        useOnEvent('scroll', closeMenu)

        return (
            <>
                <Menu
                    className={`${s.Menu} ${buttonClassName}`}
                    linesClassName={linesClassName}
                    isOpen={isOpen}
                    onClick={toggleMenu}
                />
                <motion.nav
                    className={`${s.Navigation} ${isOpen ? s.open : ''} ${className}`}
                    style={style}
                >
                    {LinksElements}
                </motion.nav>
            </>
        )
    },
)

Navigation.displayName = 'Navigation'
export default Navigation
