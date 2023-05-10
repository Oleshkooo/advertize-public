import { Spacer } from '@nextui-org/react'
import { type FC } from 'react'

import { Button, Footer } from '@/components'
import s from '@/pages/Error/Error.module.scss'

export const NotFoundPage: FC = () => {
    return (
        <>
            {/* <Meta>404</Meta> */}

            <main className={s.Error}>
                <h1>404 | Тут реклами нема</h1>
                <Spacer y={1.5} />
                <Button bordered link to="/">
                    На головну
                </Button>
            </main>
            <Footer />
        </>
    )
}
