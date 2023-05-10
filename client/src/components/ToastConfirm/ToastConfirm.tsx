import { memo, type FC, type HTMLAttributes } from 'react'

import s from './ToastConfirm.module.scss'

export interface ToastConfirmProps extends JSX.IntrinsicAttributes, HTMLAttributes<HTMLDivElement> {
    onClick: () => void
    submitText?: string
}

const ToastConfirm: FC<ToastConfirmProps> = memo(({ onClick, submitText = 'Так', children }) => {
    return (
        <div className={s.ToastConfirm}>
            {children}
            <button onClick={onClick}>{submitText}</button>
        </div>
    )
})

ToastConfirm.displayName = 'ToastConfirm'
export default ToastConfirm
