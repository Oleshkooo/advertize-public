import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query/react'

import { loginApi, mapApi, orderApi } from '@/store/api'
import { menuSlice, modalSlice } from '@/store/slices'

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof configureStore>
export type AppDispatch = AppStore['dispatch']

const rootReducer = combineReducers({
    [menuSlice.name]: menuSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
    [mapApi.reducerPath]: mapApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(mapApi.middleware)
            .concat(orderApi.middleware)
            .concat(loginApi.middleware),
    devTools: process.env.NODE_ENV === 'development',
})

setupListeners(store.dispatch)
