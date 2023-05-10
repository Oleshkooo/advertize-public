import { memo, type FC, type HTMLAttributes, type ReactNode } from 'react'

import s from './Container.module.scss'

export interface ContainerProps extends JSX.IntrinsicAttributes, HTMLAttributes<HTMLDivElement> {
    className?: string
    children: ReactNode
}

const Container: FC<ContainerProps> = memo(({ className = '', children }) => {
    return <div className={`${s.Container} ${className}`}>{children}</div>
})

Container.displayName = 'Container'
export default Container
