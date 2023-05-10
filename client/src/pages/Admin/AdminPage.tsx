import { Spacer } from '@nextui-org/react'
import { useCallback, useMemo, type FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Navbar, type NavbarLink } from '@/components'
import { useAdminContext } from '@/context'
import { useScrollSelector } from '@/hooks'

import { CreateAdspaceSection, HeaderSection, MapSection } from './sections'

export const AdminPage: FC = () => {
    const navigate = useNavigate()
    const scroll = useScrollSelector()
    const { clearAdmin } = useAdminContext()

    const handleLinkClick = useCallback((to: string) => scroll(to), [scroll])

    const navbarLinks: NavbarLink[] = useMemo(
        () => [
            {
                text: 'Головна',
                onClick: () => {
                    navigate('/')
                },
            },
            {
                text: 'Карта',
                onClick: handleLinkClick('#map'),
            },
            {
                text: 'Вийти',
                onClick: clearAdmin,
            },
        ],
        [handleLinkClick, navigate, clearAdmin],
    )

    return (
        <>
            {/* <Meta noindex>Адмін-панель</Meta> */}

            <Navbar links={navbarLinks} />

            <Spacer y={1} className="spacer-sm" />
            <Spacer y={2.8} className="spacer-sd" />
            <HeaderSection />

            <Spacer y={7} />
            <MapSection />

            <Spacer y={1.5} />
            <CreateAdspaceSection />

            <Spacer y={7} />
        </>
    )
}
