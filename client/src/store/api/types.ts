export interface ApiResponse<T = any> {
    status: number
    message: string
    error?: any
    data?: T
}
