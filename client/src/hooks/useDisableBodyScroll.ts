import { useEffect } from 'react'

type UseDisableBodyScroll = (isOpen: boolean) => void

export const useDisableBodyScroll: UseDisableBodyScroll = isOpen => {
    useEffect(() => {
        const element = document.querySelector('html') as HTMLElement

        if (isOpen) {
            element.style.overflow = 'hidden'
            return
        }

        element.style.overflow = 'visible'

        return () => {
            element.style.overflow = 'visible'
        }
    }, [isOpen])
}
