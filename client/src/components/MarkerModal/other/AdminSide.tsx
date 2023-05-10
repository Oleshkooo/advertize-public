import { Input, Text, type FormElement } from '@nextui-org/react'
import { memo, useCallback, type ChangeEvent, type FC } from 'react'

import { type IAdspaceSide } from '@/models'

import { textMedium } from '../MarkerModal.data'
import s from '../MarkerModal.module.scss'

interface AdminSideProps extends JSX.IntrinsicAttributes {
    char: string
    index: number
    text: IAdspaceSide['text']
    expireDate: string
    image: IAdspaceSide['image']
    onChange: (e: ChangeEvent<FormElement>, index: number) => void
}

export const AdminSide: FC<AdminSideProps> = memo(
    ({ char, index, text, expireDate, image, onChange }) => {
        const handleChange = useCallback(
            (e: ChangeEvent<FormElement>) => {
                onChange(e, index)
            },
            [index, onChange],
        )

        return (
            <>
                <Text size={textMedium}>Сторона {char}</Text>
                <div className={s.side}>
                    <Input
                        value={text}
                        onChange={handleChange}
                        name="text"
                        placeholder="Текст"
                        bordered
                        color="primary"
                        spellCheck={false}
                        aria-label="side-text"
                    />
                    <Input
                        value={expireDate}
                        onChange={handleChange}
                        name="expireDate"
                        placeholder="Дата"
                        type="date"
                        bordered
                        color="primary"
                        spellCheck={false}
                        aria-label="side-expire-date"
                    />
                    <Input
                        value={image}
                        onChange={handleChange}
                        name="image"
                        placeholder="Зображення"
                        bordered
                        color="primary"
                        spellCheck={false}
                        aria-label="side-image"
                    />
                </div>
            </>
        )
    },
)

AdminSide.displayName = 'AdminMarkerModal-side'
