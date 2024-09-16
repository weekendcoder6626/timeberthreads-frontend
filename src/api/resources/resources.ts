import { getToken } from "../../store/auth";
import { ResponseType } from "./response.type";

export const BASE_URL: string = import.meta.env.VITE_APP_API_BASE_URL;

const COMMON_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const IGNORE_TOKEN = {
    'Ignore-Token': 'true'
}

const ONLY_ADMIN = {
    'only-admin': 'true'
}

function getTokenHeader() {
    return {
        'Access-Token': getToken()
    }
}

export function getFullHeader(mode: 'with token' | 'without token' | 'admin only') {

    switch(mode) {
        case 'with token': 
            return {
                ...COMMON_HEADERS,
                ...getTokenHeader()
            }
        
        case 'without token': 
            return {
                ...COMMON_HEADERS,
                ...IGNORE_TOKEN
            }

        case 'admin only':
            return {
                ...COMMON_HEADERS,
                ...getTokenHeader(),
                ...ONLY_ADMIN
            }
    }
}

export function isErrorResponse(response: ResponseType): boolean {

    return !!response.payload && Object.keys(response.payload).findIndex((v) => v === "error") !== -1;
}
