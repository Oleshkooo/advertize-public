import { memo, useEffect, useMemo, type FC, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAdminContext } from '@/context'

interface RequireAuthProps {
    children: ReactElement
}

export const RequireAdmin: FC<RequireAuthProps> = memo(({ children }) => {
    const navigate = useNavigate()
    const { admin, shouldReLogin } = useAdminContext()

    const allowAccess = useMemo(
        () => admin.isAdmin || (admin.isAdmin && !shouldReLogin()),
        [admin.isAdmin, shouldReLogin],
    )

    useEffect(() => {
        if (!allowAccess) {
            navigate('/adm-login')
        }
    }, [allowAccess, navigate])

    if (!allowAccess) {
        return null
    }

    return children
})
