import { Modal } from '@nextui-org/react'
import { memo, useCallback, type FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/hooks'
import { type IAdspace } from '@/models'
import { closeModalAction } from '@/store/slices'

import { Body, Footer, Header } from './other'

interface MarkerModalProps extends JSX.IntrinsicAttributes {
    data: IAdspace
}

export const MarkerModal: FC<MarkerModalProps> = memo(({ data }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const closeModal = useCallback(() => {
        const action = closeModalAction()
        dispatch(action)
    }, [dispatch])

    const handleOrderClick = useCallback(() => {
        closeModal()
        navigate('/order', { state: { data } })
    }, [navigate, closeModal, data])

    return (
        <>
            <Header id={data.id} type={data.type} />
            <Modal.Body>
                <Body data={data} />
            </Modal.Body>
            <Footer onOrder={handleOrderClick} />
        </>
    )
})

MarkerModal.displayName = 'MarkerModal'
