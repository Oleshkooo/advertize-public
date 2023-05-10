import {
    createContext,
    memo,
    useContext,
    useState,
    type Dispatch,
    type FC,
    type ReactNode,
    type SetStateAction,
} from 'react'

interface MenuContextType {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}
interface MenuContextProviderProps {
    children?: ReactNode
}
type UseMenuContext = () => MenuContextType

const MenuContext = createContext<MenuContextType>(null as unknown as MenuContextType)

export const MenuContextProvider: FC<MenuContextProviderProps> = memo(({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return <MenuContext.Provider value={{ isOpen, setIsOpen }}>{children}</MenuContext.Provider>
})
MenuContextProvider.displayName = 'MenuContextProvider'

export const useMenuContext: UseMenuContext = () => {
    const context = useContext<MenuContextType>(MenuContext)

    if (context === undefined || context === null)
        throw new Error('useMenu context must be used within a MenuContext Provider')

    return context
}
