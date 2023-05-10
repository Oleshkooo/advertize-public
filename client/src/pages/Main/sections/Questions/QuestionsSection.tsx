import { type FC } from 'react'

import { Navigation, type NavbarLink } from '@/components'

import { QuestionsContainer } from '../../components'

import s from './QuestionsSection.module.scss'
import { questions } from './QuestionsSectionData'

interface QuestionsSectionProps {
    links: NavbarLink[]
}

export const QuestionsSection: FC<QuestionsSectionProps> = ({ links }) => {
    return (
        <section id="questions" className={s.QuestionsSection}>
            <div className={s.inner}>
                <Navigation
                    className={s.navigation}
                    buttonClassName={s.navigationButton}
                    linesClassName={s.navigationLines}
                    links={links}
                />
                <QuestionsContainer s={s} questions={questions} animation={true} />
            </div>
            <QuestionsContainer className={s.hidden} s={s} questions={questions} />
        </section>
    )
}
