import { useCallback, useEffect, useState } from 'react'

type UseScreenWidth = () => number

export const useScreenWidth: UseScreenWidth = () => {
    const [width, setWidth] = useState(window.innerWidth)

    const handleResize = useCallback(() => {
        setWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    return width
}
