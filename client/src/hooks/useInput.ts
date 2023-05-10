import {
    useCallback,
    useMemo,
    useRef,
    useState,
    type ChangeEvent,
    type Dispatch,
    type MutableRefObject,
    type SetStateAction,
} from 'react'

type ChangeEv = ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
type UseInput = (initialValue?: string) => {
    value: string
    setValue: Dispatch<SetStateAction<string>>
    currentRef: MutableRefObject<string>
    reset: () => void
    bindings: {
        value: string
        onChange: (event: ChangeEv) => void
    }
}

export const useInput: UseInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue)
    const currentRef = useRef(value)

    const reset = useCallback(() => {
        setValue(initialValue)
        currentRef.current = initialValue
    }, [initialValue])

    const bindings = useMemo(
        () => ({
            value,
            onChange: (event: ChangeEv) => {
                if (typeof event === 'string') {
                    setValue(event)
                    currentRef.current = event
                } else {
                    setValue(event.target.value)
                    currentRef.current = event.target.value
                }
            },
        }),
        [value],
    )

    return {
        value,
        setValue,
        currentRef,
        reset,
        bindings,
    }
}
