import { Spacer } from '@nextui-org/react'
import { memo, useMemo, type FC, type HTMLAttributes } from 'react'
import { useLocation } from 'react-router-dom'

import { Button, Container } from '@/components'

import { currentYear, footerLinks } from './Footer.data'
import s from './Footer.module.scss'

export interface FooterProps extends JSX.IntrinsicAttributes, HTMLAttributes<HTMLDivElement> {}

const Footer: FC<FooterProps> = memo(() => {
    const location = useLocation()

    const DisplayHeader = useMemo(() => {
        if (location.pathname !== '/') {
            return null
        }

        return (
            <>
                <Spacer y={7} />
                <h1>Реклама тут і зараз</h1>
                <Spacer y={2} />
                <div className={s.buttonWrapper}>
                    <Button secondary link to="/order">
                        Замовити рекламу
                    </Button>
                </div>
            </>
        )
    }, [location.pathname])
    const LinkElements = useMemo(
        () =>
            footerLinks.map(group => (
                <div key={group.title} className={s.linksGroup}>
                    <span className={s.title}>{group.title}</span>
                    <Spacer y={1} />
                    <div className={s.links}>
                        {group.links.map(link => (
                            <a
                                key={link.text}
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link?.position === 'left' && link?.icon}
                                {link.text}
                                {link?.position === 'right' && link?.icon}
                            </a>
                        ))}
                    </div>
                </div>
            )),
        [],
    )

    return (
        <section id="footer" className={s.Footer}>
            <Container className={s.wrapper}>
                {DisplayHeader}

                <Spacer y={8} />
                <div className={s.linksWrapper}>{LinkElements}</div>

                <Spacer y={8} />
                <span className={s.bottom}>Advertize | BravoBoard | РА Браво © {currentYear}</span>
            </Container>
        </section>
    )
})

Footer.displayName = 'Footer'
export default Footer
