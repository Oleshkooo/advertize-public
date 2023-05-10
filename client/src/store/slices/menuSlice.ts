import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface MenuState {
    isOpen: boolean
}

const initialState: MenuState = {
    isOpen: false,
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuAction: (state, action: PayloadAction<boolean | 'toggle'>) => {
            if (action.payload === 'toggle') {
                state.isOpen = !state.isOpen
                return
            }
            state.isOpen = action.payload
        },
    },
})

export const { setMenuAction } = menuSlice.actions
