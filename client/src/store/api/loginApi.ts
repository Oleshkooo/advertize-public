import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './config'
import { type ApiResponse } from './types'

interface LoginData {
    username: string
    password: string
}

export const loginApi = createApi({
    reducerPath: 'login',
    keepUnusedDataFor: 0,
    baseQuery,
    endpoints: builder => ({
        login: builder.mutation<ApiResponse, LoginData>({
            query: body => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useLoginMutation } = loginApi
