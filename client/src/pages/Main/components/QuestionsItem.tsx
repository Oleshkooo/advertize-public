import { memo, type FC } from 'react'

export interface IQuesitonItem {
    question: string
    answer: string
    s: {
        question: string
        questionText: string
        answerText: string
    }
    className?: string
}

export const QuestionsItem: FC<IQuesitonItem> = memo(({ question, answer, s, className = '' }) => (
    <div className={`${s.question} ${className}`}>
        <h2 className={s.questionText}>{question}</h2>
        <span className={s.answerText}>{answer}</span>
    </div>
))

export const AnimationQuestionsItem: FC<IQuesitonItem> = ({
    question,
    answer,
    s,
    className = '',
}) => {
    return (
        <QuestionsItem
            className={`intersection ${className}`}
            s={s}
            question={question}
            answer={answer}
        />
    )
}
