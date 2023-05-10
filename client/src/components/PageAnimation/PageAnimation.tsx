import { motion } from 'framer-motion'
import { memo, useCallback, useEffect, type FC, type ReactNode } from 'react'

import { useAppDispatch } from '@/hooks'
import { setMenuAction } from '@/store/slices'
import {
    getRandomBoolean,
    getReverseCorner,
    isDevelopment,
    scrollToTop,
    type Corner,
} from '@/utils'

import s from './PageAnimation.module.scss'

export interface PageAnimationProps extends JSX.IntrinsicAttributes {
    children?: ReactNode
}
interface Corners {
    top: Corner
    left: Corner
}

const PageAnimation: FC<PageAnimationProps> = memo(({ children }) => {
    const dispatch = useAppDispatch()

    const closeMenu = useCallback(() => {
        const action = setMenuAction(false)
        dispatch(action)
    }, [dispatch])

    useEffect(() => {
        if (isDevelopment()) return

        scrollToTop()
        closeMenu()
    }, [closeMenu])

    const corners: Corners = {
        top: getRandomBoolean() ? '0%' : '100%',
        left: getRandomBoolean() ? '0%' : '100%',
    }
    const reverseCorners: Corners = {
        top: getReverseCorner(corners.top),
        left: getReverseCorner(corners.left),
    }
    const animation = {
        initial: {
            width: '300vmax',
            ...corners,
        },
        animate: {
            width: '0vmax',
        },
        exit: {
            width: '300vmax',
            ...reverseCorners,
        },
        transition: {
            duration: 0.8,
        },
    }

    return (
        <>
            {children}

            <motion.div
                className={s.PageAnimation}
                initial={animation.initial}
                animate={animation.animate}
                exit={animation.exit}
                transition={animation.transition}
            />
        </>
    )
})

PageAnimation.displayName = 'PageAnimation'
export default PageAnimation
