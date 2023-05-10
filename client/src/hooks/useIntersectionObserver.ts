import { useEffect, useMemo } from 'react'

type UseIntersectionObserver = (seletorHidden: string, classNameShow: string) => void

export const useIntersectionObserver: UseIntersectionObserver = (seletorHidden, classNameShow) => {
    const observer = useMemo(
        () =>
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(classNameShow)
                        return
                    }
                    entry.target.classList.remove(classNameShow)
                })
            }),
        [classNameShow],
    )

    useEffect(() => {
        const hiddenElements = document.querySelectorAll(seletorHidden)

        hiddenElements.forEach(element => {
            observer.observe(element)
        })

        return () => {
            hiddenElements.forEach(element => {
                observer.unobserve(element)
            })
        }
    }, [observer, seletorHidden])
}
