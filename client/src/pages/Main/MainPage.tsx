import { Spacer } from '@nextui-org/react'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Footer, Navbar, menuShowScreenWidth, type NavbarLink } from '@/components'
import { useIntersectionObserver, useScreenWidth, useScrollSelector } from '@/hooks'

import { isDevelopment } from '@/utils'

import { HeaderSection, InfoSection, MapSection, QuestionsSection } from './sections'

const intersectionClassName = 'intersection'
const intersectionShowClassName = `${intersectionClassName}_show`

export const MainPage = () => {
    useIntersectionObserver(`.${intersectionClassName}`, intersectionShowClassName)

    const navigate = useNavigate()
    const scroll = useScrollSelector()
    const screenWith = useScreenWidth()

    const handleLinkClick = useCallback((to: string) => scroll(to), [scroll])

    const navbarLinks = useMemo<NavbarLink[]>(() => {
        const adminLink: NavbarLink = {
            text: 'Адмінка',
            onClick: () => {
                navigate('/adm')
            },
        }
        const orderAdLink: NavbarLink = {
            text: 'Замовити рекламу',
            onClick: () => {
                navigate('/order')
            },
        }

        return [
            {
                text: 'Карта',
                onClick: handleLinkClick('#map'),
            },
            {
                text: 'FAQs',
                onClick: handleLinkClick('#questions'),
            },
            {
                text: 'Контакти',
                onClick: handleLinkClick('#footer'),
            },
            ...(isDevelopment() ? [adminLink] : []),
            ...(screenWith < menuShowScreenWidth ? [orderAdLink] : []),
        ]
    }, [handleLinkClick, navigate, screenWith])

    return (
        <>
            {/* <Meta>Головна</Meta> */}

            <Navbar links={navbarLinks} />

            <Spacer y={1} className="spacer-sm" />
            <Spacer y={2.8} className="spacer-sd" />
            <HeaderSection />

            <Spacer y={7} />
            <MapSection />

            <Spacer y={7} />
            <InfoSection />

            <Spacer y={10} />
            <QuestionsSection links={navbarLinks} />

            <Footer />
        </>
    )
}
