import { useCallback, type FC } from 'react'
import { toast } from 'react-hot-toast'

import { Button } from '@/components'
import { defaultLat, defaultLng } from '@/components/Map'
import { type IAdspaceSide } from '@/models'
import { useCreateMarkerMutation, type ApiResponse } from '@/store/api'

import s from './CreateAdspaceSection.module.scss'

export const CreateAdspaceSection: FC = () => {
    const [createAdspace] = useCreateMarkerMutation()

    const handleCreateAdspace = useCallback(async () => {
        const markerData = {
            type: 'billboard' as IAdspaceSide['type'],
            lat: defaultLat,
            lng: defaultLng,
            sides: [] as IAdspaceSide[],
        }
        const tId = toast.loading('Відправляємо...')

        try {
            const { message } = await createAdspace(markerData).unwrap()
            toast.success(message)
        } catch ({ data }: any) {
            toast.error((data as ApiResponse).message)
        } finally {
            toast.dismiss(tId)
        }
    }, [createAdspace])

    return (
        <div className={s.CreateAdspaceSection}>
            <Button onClick={handleCreateAdspace} bordered>
                Додати площину
            </Button>
        </div>
    )
}
