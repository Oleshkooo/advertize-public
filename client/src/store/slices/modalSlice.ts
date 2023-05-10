import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type ReactElement } from 'react'

interface ModalState {
    isOpen: boolean
    element: ReactElement | null
}

const initialState: ModalState = {
    isOpen: false,
    element: null,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModalAction: (state, action: PayloadAction<ReactElement>) => {
            state.isOpen = true
            state.element = action.payload
        },
        closeModalAction: state => {
            state.isOpen = false
        },
    },
})

export const { openModalAction, closeModalAction } = modalSlice.actions
