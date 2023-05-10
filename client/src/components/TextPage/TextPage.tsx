import { Grid, Spacer } from '@nextui-org/react'
import { memo, type FC, type ReactNode } from 'react'

import { Container } from '@/components'

import s from './TextPage.module.scss'

export interface TextPageProps extends JSX.IntrinsicAttributes {
    children?: ReactNode
}

const TextPage: FC<TextPageProps> = memo(({ children }) => {
    return (
        <Container>
            <Spacer y={2} />
            <Grid.Container gap={2} className={s.TextPage}>
                {children}
            </Grid.Container>
            <Spacer y={2} />
        </Container>
    )
})

TextPage.displayName = 'TextPage'
export default TextPage
