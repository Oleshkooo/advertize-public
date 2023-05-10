import { Container, Spacer } from '@nextui-org/react'
import { type FC } from 'react'

import { Button, ColoredText as Colored } from '@/components'

import s from './HeaderSection.module.scss'

export const HeaderSection: FC = () => {
    return (
        <section className={s.headerSection}>
            <Container md className={s.wrapper}>
                <h1>
                    Зовнішня реклама <Colored>швидко</Colored> та <Colored>просто</Colored>
                </h1>
                <Spacer y={1} />
                <div className={s.buttonWrapper}>
                    <Button primary link to="/order">
                        Замовити рекламу
                    </Button>
                </div>
            </Container>
        </section>
    )
}
