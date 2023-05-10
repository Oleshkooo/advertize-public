import { Modal } from '@nextui-org/react'
import { memo, useCallback, type FC } from 'react'

import { useAppDispatch, useAppSelector, useDisableBodyScroll } from '@/hooks'
import { closeModalAction } from '@/store/slices'

import { defaultWidth } from './ModalElement.data'

import s from './ModalElement.module.scss'

const ModalElement: FC = memo(() => {
    const { isOpen, element } = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch()

    const closeModal = useCallback(() => {
        const action = closeModalAction()
        dispatch(action)
    }, [dispatch])

    useDisableBodyScroll(isOpen)

    return (
        <Modal
            scroll
            blur
            closeButton
            open={isOpen}
            onClose={closeModal}
            width={defaultWidth}
            className={s.ModalElement}
        >
            {element}
        </Modal>
    )
})

ModalElement.displayName = 'ModalElement'
export default ModalElement
