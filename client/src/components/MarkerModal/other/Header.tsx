import { Modal, Text } from '@nextui-org/react'
import { memo, type FC } from 'react'

import { type IAdspace } from '@/models'

import { textLarge } from '../MarkerModal.data'

interface HeaderProps extends JSX.IntrinsicAttributes {
    id: IAdspace['id']
    type: IAdspace['type']
}

export const Header: FC<HeaderProps> = memo(({ id, type }) => {
    const typeString = type === 'arka' ? 'Арка' : 'Білборд'

    return (
        <Modal.Header justify="flex-start">
            <Text size={textLarge}>
                {typeString} ({id})
            </Text>
        </Modal.Header>
    )
})

Header.displayName = 'MarkerModal-header'
