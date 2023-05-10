import { Button, Modal, Spacer, type FormElement } from '@nextui-org/react'
import { memo, useCallback, useMemo, useState, type ChangeEvent, type FC } from 'react'
import { toast, type Toast } from 'react-hot-toast'

import { ToastConfirm } from '@/components'
import { useAppDispatch, useInput } from '@/hooks'
import { type IAdspace, type IAdspaceSide } from '@/models'
import { getSideChars, isValidBillboardType } from '@/models/services'
import { useDeleteMarkerMutation, useUpdateMarkerMutation, type ApiResponse } from '@/store/api'
import { closeModalAction } from '@/store/slices'

import s from './MarkerModal.module.scss'
import { AdminGlobal, AdminSide, Body, Footer, Header } from './other'

interface AdminMarkerModalProps extends JSX.IntrinsicAttributes {
    data: IAdspace
}

export const AdminMarkerModal: FC<AdminMarkerModalProps> = memo(({ data }) => {
    const dispatch = useAppDispatch()
    const [updateAdspace] = useUpdateMarkerMutation()
    const [deleteAdspace] = useDeleteMarkerMutation()

    const [type, setType] = useState<IAdspace['type']>(data.type)
    const [sides, setSides] = useState<IAdspaceSide[]>(JSON.parse(JSON.stringify(data.sides)))

    const { value: latitudeValue, bindings: bindLatitude } = useInput(data.lat.toString())
    const { value: longitudeValue, bindings: bindLongitude } = useInput(data.lng.toString())

    const closeModal = useCallback(() => {
        const action = closeModalAction()
        dispatch(action)
    }, [dispatch])

    const handleTypeChange = useCallback((value: string) => {
        if (!isValidBillboardType(value)) return
        setType(value as IAdspace['type'])
    }, [])

    const handleSidesChange = useCallback(
        (e: ChangeEvent<FormElement>, index: number) => {
            const { name, value } = e.target
            const newSides = [...sides]
            newSides[index][name] = value
            setSides(newSides)
        },
        [sides],
    )

    const handleSave = useCallback(async () => {
        const newAdspace: IAdspace = {
            ...data,
            lat: +latitudeValue,
            lng: +longitudeValue,
            type,
            sides,
        }
        const tId = toast.loading('Збереження...')

        try {
            const { message } = await updateAdspace(newAdspace).unwrap()
            toast.success(`${message} (${newAdspace.id.toString()})`)
        } catch ({ data }: any) {
            toast.error((data as ApiResponse).message)
        } finally {
            toast.dismiss(tId)
            closeModal()
        }
    }, [closeModal, data, latitudeValue, longitudeValue, sides, type, updateAdspace])

    const handleDelete = useCallback(async () => {
        const confirm = async (t: Toast) => {
            toast.dismiss(t.id)
            const tId = toast.loading('Видалення...')

            try {
                const { message } = await deleteAdspace({ _id: data._id }).unwrap()
                toast.success(message)
            } catch ({ data }: any) {
                toast.error((data as ApiResponse).message)
            } finally {
                toast.dismiss(tId)
                closeModal()
            }
        }

        toast(
            t => (
                <ToastConfirm
                    onClick={() => {
                        void confirm(t)
                    }}
                >
                    Видилити площину?
                </ToastConfirm>
            ),
            {
                duration: 10_000,
            },
        )
    }, [closeModal, data._id, deleteAdspace])

    const bindType = useMemo(
        () => ({
            value: type,
            onChange: handleTypeChange,
        }),
        [handleTypeChange, type],
    )

    const AdminSides = useMemo(() => {
        const chars = getSideChars(data.type)

        return sides.map((side, index) => (
            <AdminSide
                key={side._id}
                index={index}
                char={chars[index]}
                text={side.text}
                expireDate={side.expireDate}
                image={side.image}
                onChange={handleSidesChange}
            />
        ))
    }, [data.type, handleSidesChange, sides])

    return (
        <>
            <Header id={data.id} type={data.type} />

            <Modal.Body className={s.AdminMarkerModal}>
                <Body data={data} />

                <Spacer y={0.5} />
                <AdminGlobal
                    bindType={bindType}
                    bindLatitude={bindLatitude}
                    bindLongitude={bindLongitude}
                />

                <Spacer y={0} />
                <div className={s.sides}>{AdminSides}</div>

                <Spacer y={0} />
                <div>
                    <Button onPress={handleDelete} auto flat color="error">
                        Видалити площину
                    </Button>
                </div>
            </Modal.Body>

            <Footer isAdmin onSave={handleSave} onClose={closeModal} />
        </>
    )
})

AdminMarkerModal.displayName = 'AdminMarkerModal'
