import * as ERROR from './errorMessages'
import * as STATUS from './statusCodes'

import type { ApiErrorConstructor, IApiError, Message, Status } from './types'
import type { ErrorType } from '@/types'

export class ApiError implements IApiError {
    public status: Status
    public message: Message
    public error?: ErrorType

    constructor(params: ApiErrorConstructor) {
        const { status, message, error } = params

        this.status = status
        this.message = message
        this.error = error ?? ''
    }

    static internalServerError(error: ErrorType) {
        return new ApiError({
            status: STATUS.INTERNAL_SERVER_ERROR,
            message: ERROR.INTERNAL_SERVER,
            error,
        })
    }

    // TODO implement
    notify() {}
}
