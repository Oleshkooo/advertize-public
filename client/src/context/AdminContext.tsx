import {
    createContext,
    memo,
    useCallback,
    useContext,
    useState,
    type FC,
    type ReactNode,
} from 'react'

interface AdminData {
    username: string
    isAdmin: boolean
    loginDate: number | null
}
interface AdminContextType {
    admin: AdminData
    setAdmin: (data: AdminData) => void
    clearAdmin: () => void
    shouldReLogin: () => boolean
}
interface AdminContextProviderProps {
    children?: ReactNode
}
type UseAdminContext = () => AdminContextType

const AdminContext = createContext<AdminContextType>(null as unknown as AdminContextType)

export const AdminContextProvider: FC<AdminContextProviderProps> = memo(({ children }) => {
    const [admin, setAdminState] = useState<AdminData>(() => {
        const defaultAdmin = {
            username: '',
            isAdmin: false,
            loginDate: null,
        }
        const local = localStorage.getItem('admin')

        if (local !== null) return JSON.parse(local) as AdminData
        return defaultAdmin
    })

    const setAdmin = useCallback((data: AdminData) => {
        localStorage.setItem('admin', JSON.stringify(data))
        setAdminState(data)
    }, [])

    const clearAdmin = useCallback(() => {
        localStorage.removeItem('admin')
        setAdminState({ username: '', isAdmin: false, loginDate: null })
    }, [])

    const shouldReLogin = useCallback(() => {
        if (!admin.isAdmin) return false
        if (admin.loginDate === null) return false

        const now = new Date()
        const month = 2_592_000_000 // 1000 * 60 * 60 * 24 * 30 = 30 days
        const difference = now.getTime() - admin.loginDate

        if (difference > month) {
            clearAdmin()
            return true
        }

        return false
    }, [admin.isAdmin, admin.loginDate, clearAdmin])

    return (
        <AdminContext.Provider value={{ admin, setAdmin, clearAdmin, shouldReLogin }}>
            {children}
        </AdminContext.Provider>
    )
})
AdminContextProvider.displayName = 'AdminContextProvider'

export const useAdminContext: UseAdminContext = () => {
    const context = useContext<AdminContextType>(AdminContext)

    if (context === undefined || context === null)
        throw new Error('useAdmin context must be used within a AdminContext Provider')

    return context
}
