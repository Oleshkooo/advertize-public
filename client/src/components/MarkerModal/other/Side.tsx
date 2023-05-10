import { Image, Spacer, Text } from '@nextui-org/react'
import { memo, useMemo, type FC, type HTMLAttributes } from 'react'

import { useScreenWidth } from '@/hooks'
import { type IAdspace, type IAdspaceSide } from '@/models'
import { normalizeDate } from '@/utils'

import { textMedium, textSmall, xsScreenWidth } from '../MarkerModal.data'
import s from '../MarkerModal.module.scss'

interface SideProps extends JSX.IntrinsicAttributes, HTMLAttributes<HTMLDivElement> {
    type: IAdspace['type']
    sideData: IAdspaceSide
    char: string
    index: number
    maxIndex: number
}

export const Side: FC<SideProps> = memo(({ type, sideData, char, index, maxIndex }) => {
    const screenWidth = useScreenWidth()

    const imageSrc = useMemo(() => `/adspaces/${sideData.image ?? 'no-img.jpg'}`, [sideData.image])
    const imageAlt = useMemo(() => `Фото сторони ${char}`, [char])
    const normalizedDate = useMemo(() => normalizeDate(sideData.expireDate), [sideData.expireDate])
    const freeBusyText = useMemo(
        () => (sideData.isBusy ? `Зайнята до ${normalizedDate}` : 'Вільна ✅'),
        [normalizedDate, sideData.isBusy],
    )
    const DisplaySpacer = useMemo(() => {
        const defaultReturn = <Spacer y={2} />

        if (screenWidth <= xsScreenWidth && index < maxIndex - 1) return defaultReturn
        if (type === 'duplex' && screenWidth > xsScreenWidth && index < maxIndex - 2)
            return defaultReturn

        return null
    }, [index, maxIndex, screenWidth, type])

    return (
        <div className={s.Side}>
            <Image
                className={s.image}
                src={imageSrc}
                alt={imageAlt}
                showSkeleton={true}
                objectFit="cover"
            />
            <Spacer y={1} />

            <Text size={textMedium}>
                Сторона {char}: {freeBusyText}
            </Text>
            <Spacer y={0.25} />

            <Text size={textSmall}>{sideData.text}</Text>
            {DisplaySpacer}
        </div>
    )
})

Side.displayName = 'MarkerModal-side'
