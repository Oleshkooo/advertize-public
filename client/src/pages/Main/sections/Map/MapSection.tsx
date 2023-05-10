import { Spacer } from '@nextui-org/react'
import { AnimatePresence } from 'framer-motion'
import { memo, useCallback, useMemo, useState, type FC } from 'react'

import { Button, Container, LazyMap, Marker } from '@/components'
import { useGetMarkersQuery } from '@/store/api'

import s from './MapSection.module.scss'
import { filterButtonAnimationDelay } from './MapSectionData'

export const MapSection: FC = memo(() => {
    const { data: markersData } = useGetMarkersQuery()

    const [isBillboardButton, setBillboardButton] = useState<boolean>(false)
    const [isArkaButton, setArkaButton] = useState<boolean>(false)
    const [isFreeButton, setFreeButton] = useState<boolean>(false)

    const MarkersElements = useMemo(() => {
        if (!Array.isArray(markersData?.data)) {
            return null
        }

        let tempMarkers = markersData?.data.slice()

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
    }, [markersData, isFreeButton, isBillboardButton, isArkaButton])

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
                        style={{
                            animationDelay: `${filterButtonAnimationDelay(0)}s`,
                        }}
                    >
                        Білборд
                    </Button>
                    <Button
                        borderedNoHover
                        isActive={isArkaButton}
                        onClick={handleArkaClick}
                        style={{
                            animationDelay: `${filterButtonAnimationDelay(1)}s`,
                        }}
                    >
                        Арка
                    </Button>
                    <Button
                        borderedNoHover
                        isActive={isFreeButton}
                        onClick={handleFreeClick}
                        style={{
                            animationDelay: `${filterButtonAnimationDelay(2)}s`,
                        }}
                    >
                        Вільна площина
                    </Button>
                </div>
            </Container>

            <Spacer y={0.5} />

            <Container className={s.mapContainer}>
                <LazyMap className={s.map}>
                    <AnimatePresence>{MarkersElements}</AnimatePresence>
                </LazyMap>
            </Container>

            <Spacer y={1} />

            <Container className={s.helpers}>
                <div>
                    <span className={s.billboard} />
                    <span className={s.text}>Білборд</span>
                </div>
                <div>
                    <span className={s.arka} />
                    <span className={s.text}>Арка</span>
                </div>
            </Container>
        </section>
    )
})
MapSection.displayName = 'MapSection'
