import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './config'
import { type ApiResponse } from './types'

interface OrderData {
    name: string
    phone: string
    order: string
}

export const orderApi = createApi({
    reducerPath: 'order',
    keepUnusedDataFor: 0,
    baseQuery,
    endpoints: builder => ({
        order: builder.mutation<ApiResponse, OrderData>({
            query: body => ({
                url: '/order',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useOrderMutation } = orderApi
