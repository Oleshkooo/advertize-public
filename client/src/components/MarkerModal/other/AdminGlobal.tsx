import { Input, Radio, Text } from '@nextui-org/react'
import { type BindingsChangeTarget } from '@nextui-org/react/types/use-input/use-input'
import { memo, useMemo, type FC } from 'react'

import { useScreenWidth } from '@/hooks'
import { type IAdspace } from '@/models'

import { textLarge } from '../MarkerModal.data'
import s from '../MarkerModal.module.scss'

export interface AdminGlobalProps extends JSX.IntrinsicAttributes {
    bindType: {
        value: IAdspace['type']
        onChange: (value: string) => void
    }
    bindLatitude: {
        value: string
        onChange: (event: BindingsChangeTarget) => void
    }
    bindLongitude: {
        value: string
        onChange: (event: BindingsChangeTarget) => void
    }
}

export const AdminGlobal: FC<AdminGlobalProps> = memo(
    ({ bindType, bindLatitude, bindLongitude }) => {
        const screenWidth = useScreenWidth()

        const orientation = useMemo(
            () => (screenWidth > 480 ? 'horizontal' : 'vertical'),
            [screenWidth],
        )

        return (
            <>
                <Text size={textLarge}>Налаштування</Text>
                <Radio.Group
                    orientation={orientation}
                    size="sm"
                    aria-label="space-type"
                    className={s.radioGroup}
                    {...bindType}
                >
                    <Radio value="billboard" aria-label="billboard">
                        Білборд
                    </Radio>
                    <Radio value="arka" aria-label="arka">
                        Арка
                    </Radio>
                    <Radio value="oneside" aria-label="oneside">
                        Односторонній
                    </Radio>
                    <Radio value="duplex" aria-label="duplex">
                        Дуплекс
                    </Radio>
                </Radio.Group>
                <div className={s.global}>
                    <Input
                        bordered
                        color="primary"
                        placeholder="Широта"
                        spellCheck={false}
                        tabIndex={1}
                        aria-label="latitude"
                        {...bindLatitude}
                    />
                    <Input
                        bordered
                        color="primary"
                        placeholder="Довгота"
                        spellCheck={false}
                        tabIndex={2}
                        aria-label="longitude"
                        {...bindLongitude}
                    />
                </div>
            </>
        )
    },
)

AdminGlobal.displayName = 'AdminMarkerModal-global'
