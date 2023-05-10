import { useCallback } from 'react'

import { useOnEvent, type UseOnEventCb } from '@/hooks'

type UseOnKeydown = (key: string, cb: UseOnEventCb) => void

export const useOnKeydown: UseOnKeydown = (key, cb) => {
    const keydownCb = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === key) cb()
        },
        [key, cb],
    )

    useOnEvent('keydown', keydownCb)
}
