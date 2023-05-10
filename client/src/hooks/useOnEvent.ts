import { useEffect, useRef } from 'react'

const cache = new Map()

export type UseOnEventCb = (...params: any) => void
type UseOnEvent = (event: string, cb: UseOnEventCb) => void

export const useOnEvent: UseOnEvent = (event, cb) => {
    const cbRef = useRef<UseOnEventCb>(cb)
    const started = useRef<boolean>(false)

    useEffect(() => {
        cbRef.current = cb
    }, [cb])

    useEffect(() => {
        if (started.current) return
        if (cache.get(event)?.includes(cbRef.current) === true) return

        window.addEventListener(event, cbRef.current)
        cache.set(event, [...(cache.get(event) ?? []), cbRef.current])
        started.current = true

        return () => {
            window.removeEventListener(event, cbRef.current)
            cache.set(
                event,
                cache.get(event).filter((f: UseOnEventCb) => f !== cbRef.current),
            )
            started.current = false
        }
    }, [event])
}
