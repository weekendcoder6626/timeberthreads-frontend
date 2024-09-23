import { User } from "../types/DBTypes/User.type";
import { BASE_URL, getFullHeader } from "./resources/resources";
import { ResponseType } from "./resources/response.type";

/**
 * @description Used to register a new user
 * @method POST
 * @param email 
 * @param username 
 * @param phNumber 
 * @param password 
 * @returns Success or Error response
 */
export async function registerAPI(email: string, username: string, phNumber: string, password: string, signal?: AbortSignal): Promise<ResponseType> {

    try {

        const rawResponse = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: getFullHeader("without token"),
            body: JSON.stringify({ email, username, phNumber, password }),
            signal
        });

        return await rawResponse.json();

    } catch (e) {

        return await Promise.resolve({ status: 400, message: "", payload: { error: "Issue" } })
    }

}

/**
 * @description Used to login an existing user
 * @method POST
 * @param email 
 * @param password 
 * @returns Success or Error response
 * @returns User details and Auth-Token
 */
export async function loginAPI(email: string, password: string, signal?: AbortSignal): Promise<ResponseType<User>> {

    try {

        const rawResponse = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: getFullHeader("without token"),
            body: JSON.stringify({ email, password }),
            signal
        });

        return await rawResponse.json();

    } catch (e) {

        return await Promise.resolve({ status: 400, message: "", payload: { error: "Issue" } })
    }
}

/**
 * @description Used to logout current response - Suggest to make a check whether user is logged in before calling
 * @method POST
 * @returns Success or Error response
 */
export async function logoutAPI(signal?: AbortSignal): Promise<ResponseType> {

    try {

        const rawResponse = await fetch(`${BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: getFullHeader("with token"),
            signal
        });

        return await rawResponse.json();

    } catch (e) {

        return await Promise.resolve({ status: 400, message: "", payload: { error: "Issue" } })

    }

}