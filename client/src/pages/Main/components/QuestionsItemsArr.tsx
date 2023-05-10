import { type FC } from 'react'

import { type QuestionAnswer } from './types'

import { AnimationQuestionsItem, QuestionsItem } from '.'

interface IQuestionsItemsArr {
    s: any
    questions: QuestionAnswer[]
    animation?: boolean
}

export const QuestionsItemsArr: FC<IQuestionsItemsArr> = ({ s, questions, animation = false }) => {
    if (animation)
        return (
            <>
                {questions.map((item: QuestionAnswer) => (
                    <AnimationQuestionsItem
                        key={item.question}
                        s={s}
                        question={item.question}
                        answer={item.answer}
                    />
                ))}
            </>
        )

    return (
        <>
            {questions.map((item: QuestionAnswer) => (
                <QuestionsItem
                    key={item.question}
                    s={s}
                    question={item.question}
                    answer={item.answer}
                />
            ))}
        </>
    )
}
