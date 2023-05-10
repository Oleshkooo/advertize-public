import { Spacer } from '@nextui-org/react'
import { type FC } from 'react'

import { Container, Icon } from '@/components'

import s from './InfoSection.module.scss'

export const InfoSection: FC = () => {
    return (
        <Container>
            <div className={s.infoSection}>
                <div className={s.heading}>
                    <div className={s.col} />
                    <h2>Розвивайте ваш бізнес, збільшуйте продажі та залучайте нових клієнтів</h2>
                    <div className={s.col} />
                    <div className={s.col} />
                </div>
                <Spacer y={3} />
                <div className={s.text}>
                    <div className={s.col} />
                    <div className={s.icons}>
                        <Icon type="speaker" />
                        {/* <Icon type="target" /> */}
                    </div>
                    <span>
                        Великий вибір рекламних площин, більша впізнаваність ваших товарів та
                        послуг, швидкий результат та низькі витрати на охоплення різних груп
                        споживачів
                    </span>
                    <div className={s.customCol} />
                </div>
            </div>
        </Container>
    )
}
