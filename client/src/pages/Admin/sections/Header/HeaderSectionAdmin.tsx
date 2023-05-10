import { Container, Spacer } from '@nextui-org/react'
import { type FC } from 'react'

import { ColoredText as Colored } from '@/components'
import { useAdminContext } from '@/context'

import s from './HeaderSectionAdmin.module.scss'

export const HeaderSection: FC = () => {
    const { admin } = useAdminContext()

    return (
        <section className={s.headerSection}>
            <Container md className={s.wrapper}>
                <h1>
                    Привіт, <Colored>{admin.username}</Colored>
                </h1>
                <Spacer y={1} />
                <h1 className={s.arrow}>
                    <i className="fa-light fa-arrow-down" />
                </h1>
            </Container>
        </section>
    )
}
