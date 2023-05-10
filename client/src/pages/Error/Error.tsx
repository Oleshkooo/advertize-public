import { Spacer } from '@nextui-org/react'
import { useCallback, type FC } from 'react'
import { type FallbackProps } from 'react-error-boundary'

import { Button, Footer } from '@/components'

import s from './Error.module.scss'

export const Error: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
    const handleClick = useCallback(() => {
        console.error(error)
        resetErrorBoundary()
    }, [error, resetErrorBoundary])

    return (
        <>
            {/* <Meta>Виникла помилка</Meta> */}

            <main className={s.Error}>
                <h1>500 | Виникла помилка</h1>
                <Spacer y={1.5} />
                <Button bordered link to="/" onClick={handleClick}>
                    На головну
                </Button>
            </main>
            <Footer />
        </>
    )
}
