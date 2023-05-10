import { type FC } from 'react'

import { Container } from '@/components'

import { QuestionsItemsArr } from './QuestionsItemsArr'
import { type QuestionAnswer } from './types'

interface IQuestionsContainer {
    s: any
    questions: QuestionAnswer[]
    animation?: boolean
    className?: string
}

export const QuestionsContainer: FC<IQuestionsContainer> = ({
    s,
    questions,
    animation = false,
    className = '',
}) => (
    <Container className={className}>
        <div className={s.questionsContainer}>
            <div className={s.col} />
            <div className={s.questions}>
                <QuestionsItemsArr s={s} questions={questions} animation={animation} />
            </div>
            <div className={s.col} />
        </div>
    </Container>
)
