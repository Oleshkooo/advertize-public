import { motion } from 'framer-motion'
import { memo, useCallback, useMemo, type FC } from 'react'
import { Marker as MarkerGL } from 'react-map-gl'
import { useLocation } from 'react-router-dom'

import { AdminMarkerModal, MarkerModal } from '@/components'
import { HIDDEN_LINKS } from '@/config'
import { useAppDispatch } from '@/hooks'
import { type IAdspace } from '@/models'
import { openModalAction } from '@/store/slices'

import { markerAnimation } from './Marker.data'
import s from './Marker.module.scss'

export interface MarkerProps extends JSX.IntrinsicAttributes {
    data: IAdspace
}

const Marker: FC<MarkerProps> = memo(({ data }) => {
    const dispatch = useAppDispatch()
    const location = useLocation()

    const openModal = useCallback(() => {
        const markerModalVariant = HIDDEN_LINKS.includes(location.pathname) ? (
            <AdminMarkerModal data={data} />
        ) : (
            <MarkerModal data={data} />
        )
        const action = openModalAction(markerModalVariant)
        dispatch(action)
    }, [data, dispatch, location.pathname])

    const isFullBusy = useMemo(() => data.sides.every(side => side.isBusy), [data.sides])
    const iconClassName = useMemo(() => {
        let className = ''
        if (['billboard', 'oneside', 'duplex'].includes(data.type)) {
            className = 'billboard'
        } else if (data.type === 'arka') {
            className = 'arka'
        }
        if (isFullBusy) className += '-busy'
        return s[className]
    }, [data.type, isFullBusy])
    const busyIconClassName = useMemo(
        () => (isFullBusy ? 'fa-location-xmark' : 'fa-location-dot'),
        [isFullBusy],
    )

    return (
        <MarkerGL latitude={data.lat} longitude={data.lng} onClick={openModal} aria-role="button">
            <motion.i
                onClick={openModal}
                className={`${busyIconClassName} ${s.icon} ${iconClassName} fa-solid fa-3x cursor-pointer`}
                initial={markerAnimation.initial}
                animate={markerAnimation.animate}
                exit={markerAnimation.exit}
                whileHover={markerAnimation.hover}
                whileTap={markerAnimation.click}
                transition={markerAnimation.transition}
            />
        </MarkerGL>
    )
})

Marker.displayName = 'Marker'
export default Marker
