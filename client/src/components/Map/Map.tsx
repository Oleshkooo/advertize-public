import {
    memo,
    useMemo,
    type CSSProperties,
    type FC,
    type HTMLAttributes,
    type ReactNode,
} from 'react'
import ReactMapGL, { type Fog } from 'react-map-gl'

import { MAPBOX_STYLE, MAPBOX_TOKEN } from '@/config'

import 'mapbox-gl/dist/mapbox-gl.css'
import { defaultLat, defaultLng, defaultZoom, initialMapStyles } from './Map.data'
import s from './Map.module.scss'

export interface MapProps extends JSX.IntrinsicAttributes, HTMLAttributes<HTMLDivElement> {
    lat?: number
    lng?: number
    zoom?: number
    innerClassName?: string
    className?: string
    style?: CSSProperties
    children?: ReactNode
}
interface MapViewport {
    latitude: number
    longitude: number
    zoom: number
}

const Map: FC<MapProps> = memo(
    ({
        lat = defaultLat,
        lng = defaultLng,
        zoom = defaultZoom,
        innerClassName = '',
        className = '',
        style,
        children,
    }) => {
        const initialViewport = useMemo<MapViewport>(
            () => ({
                latitude: lat,
                longitude: lng,
                zoom,
            }),
            [lat, lng, zoom],
        )
        const fog = useMemo<Fog>(() => ({}), [])

        return (
            <div className={`${s.Map} ${className}`} style={style}>
                <div className={`${s.inner} ${innerClassName}`}>
                    <ReactMapGL
                        initialViewState={initialViewport}
                        mapStyle={MAPBOX_STYLE}
                        mapboxAccessToken={MAPBOX_TOKEN}
                        cooperativeGestures={true}
                        attributionControl={false}
                        projection="globe"
                        maxZoom={16}
                        fog={fog}
                        style={initialMapStyles}
                    >
                        {children}
                    </ReactMapGL>
                </div>
            </div>
        )
    },
)

Map.displayName = 'Map'
export default Map
