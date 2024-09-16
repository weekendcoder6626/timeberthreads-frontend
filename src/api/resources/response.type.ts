// RESPONSE TYPE
export interface SuccessResponse<T> {
    status: number;
    message: string;
    payload?: T;
}

export interface ErrorResponse {
    status: number;
    message: string;
    payload: {
        error: Object
    };
}

export type ResponseType<T=any> = SuccessResponse<T> | ErrorResponse;
