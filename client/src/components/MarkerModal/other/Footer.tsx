import { memo, useMemo, type FC } from 'react'

import { Button, Modal } from '@nextui-org/react'

import s from '../MarkerModal.module.scss'

interface FooterProps extends JSX.IntrinsicAttributes {
    isAdmin?: boolean
    onOrder?: () => void
    onSave?: () => void
    onClose?: () => void
}

export const Footer: FC<FooterProps> = memo(({ isAdmin = false, onOrder, onSave, onClose }) => {
    const defaultFooter = useMemo(
        () => (
            <Button onPress={onOrder} className={s.submitButton}>
                Замовити
            </Button>
        ),
        [onOrder],
    )

    const adminFooter = useMemo(
        () => (
            <>
                <Button onPress={onClose} auto flat color="error">
                    Скасувати
                </Button>
                <Button onPress={onSave} auto className={s.submitButton}>
                    Зберегти
                </Button>
            </>
        ),
        [onClose, onSave],
    )

    return <Modal.Footer>{isAdmin ? adminFooter : defaultFooter}</Modal.Footer>
})

Footer.displayName = 'MarkerModal-footer'
