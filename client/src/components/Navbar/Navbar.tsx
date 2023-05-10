import { memo, type CSSProperties, type FC, type HTMLAttributes } from 'react'

import { Container, Icon, Navigation } from '@/components'

import s from './Navbar.module.scss'
import { type NavbarLink } from './types'

export interface NavbarProps extends JSX.IntrinsicAttributes, HTMLAttributes<HTMLDivElement> {
    links: NavbarLink[]
    className?: string
    style?: CSSProperties
}

const Navbar: FC<NavbarProps> = memo(({ links, className = '', style }) => {
    return (
        <Container>
            <div className={`${s.Navbar} ${className}}`} style={style}>
                <Icon type="logo" />
                <Navigation links={links} />
            </div>
        </Container>
    )
})

Navbar.displayName = 'Navbar'
export default Navbar
