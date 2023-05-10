import { Spacer } from '@nextui-org/react'
import { AnimatePresence } from 'framer-motion'
import { memo, useCallback, useMemo, useState, type FC } from 'react'

import { Button, Container, LazyMap, Marker } from '@/components'
import { useInput } from '@/hooks'
import { useGetMarkersQuery } from '@/store/api'

import s from './AdminMapSection.module.scss'

export const MapSection: FC = memo(() => {
    const { data: markersData } = useGetMarkersQuery()

    const [isBillboardButton, setBillboardButton] = useState<boolean>(false)
    const [isArkaButton, setArkaButton] = useState<boolean>(false)
    const [isFreeButton, setFreeButton] = useState<boolean>(false)

    const { value: searchValue, bindings: bindSearch } = useInput('')

    const MarkersElements = useMemo(() => {
        if (!Array.isArray(markersData?.data)) {
            return null
        }

        let tempMarkers = markersData?.data.slice()

        if (searchValue !== '') {
            tempMarkers = tempMarkers?.filter(item => item.id === +searchValue)
        }
        if (isBillboardButton) {
            tempMarkers = tempMarkers?.filter(item =>
                ['billboard', 'oneside', 'duplex'].includes(item.type),
            )
        }
        if (isArkaButton) {
            tempMarkers = tempMarkers?.filter(item => item.type === 'arka')
        }
        if (isFreeButton) {
            tempMarkers = tempMarkers?.filter(item => item.sides.some(side => !side.isBusy))
        }

        return tempMarkers?.map(item => <Marker key={item._id} data={item} />)
    }, [markersData?.data, searchValue, isBillboardButton, isArkaButton, isFreeButton])

    const handleBillboardClick = useCallback(() => {
        setBillboardButton((prev: boolean) => !prev)
        setArkaButton(false)
    }, [])
    const handleArkaClick = useCallback(() => {
        setArkaButton((prev: boolean) => !prev)
        setBillboardButton(false)
    }, [])
    const handleFreeClick = useCallback(() => {
        setFreeButton((prev: boolean) => !prev)
    }, [])

    return (
        <section id="map" className={s.MapSection}>
            <Container>
                <div className={s.filters}>
                    <Button
                        borderedNoHover
                        isActive={isBillboardButton}
                        onClick={handleBillboardClick}
                    >
                        Білборд
                    </Button>
                    <Button borderedNoHover isActive={isArkaButton} onClick={handleArkaClick}>
                        Арка
                    </Button>
                    <Button borderedNoHover isActive={isFreeButton} onClick={handleFreeClick}>
                        Вільна площина
                    </Button>
                    <input
                        type="text"
                        placeholder="ID площини"
                        className={s.search}
                        {...bindSearch}
                    />
                </div>
            </Container>

            <Spacer y={0.5} />

            <Container className={s.mapContainer}>
                <LazyMap className={s.map}>
                    <AnimatePresence>{MarkersElements}</AnimatePresence>
                </LazyMap>
            </Container>
        </section>
    )
})
MapSection.displayName = 'AdminMapSection'
