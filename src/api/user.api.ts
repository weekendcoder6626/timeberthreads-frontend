import { User } from "../types/DBTypes/User.type";
import { BASE_URL, getFullHeader } from "./resources/resources";
import { ResponseType } from "./resources/response.type";

/**
 * @description Gets user by Email
 * @method GET
 * @param email 
 * @returns Success or Error response
 * @returns User details
 */
export async function getUserByEmailAPI(email: string, signal?: AbortSignal): Promise<ResponseType<User>> {

    try {

        const rawResponse = await fetch(`${BASE_URL}/user/${email}`, {
            method: 'GET',
            headers: getFullHeader("without token"),
            signal
        });

        return await rawResponse.json();

    } catch (e) {

        return await Promise.resolve({ status: 400, message: "", payload: { error: "Issue" } })
    }

}

/**
 * @description Gets currrent user
 * @method GET
 * @returns Success or Error response
 * @returns User details
 */
export async function getCurrentUserAPI(signal?: AbortSignal): Promise<ResponseType<User>> {

    try {

        const rawResponse = await fetch(`${BASE_URL}/user`, {
            method: 'GET',
            headers: getFullHeader("with token"),
            signal
        });

        return await rawResponse.json();
        
    } catch (e) {

        return await Promise.resolve({ status: 400, message: "", payload: { error: "Issue" } })
    }

}

/**
 * @description Adds given product to wishlist
 * @method POST
 * @param productId 
 * @returns Success or Error response
 */
export async function addProductToWishlistAPI(productId: string, signal?: AbortSignal): Promise<ResponseType> {

    try {

        const rawResponse = await fetch(`${BASE_URL}/user/addWishlist`, {
            method: 'POST',
            headers: getFullHeader("with token"),
            body: JSON.stringify({ productId }),
            signal
        });

        return await rawResponse.json();

    } catch (e) {

        return await Promise.resolve({ status: 400, message: "", payload: { error: "Issue" } })
    }
}

/**
 * @description Removes given product to wishlist
 * @method POST
 * @param productId 
 * @returns Success or Error response
 */
export async function removeProductFromWishlistAPI(productId: string, signal?: AbortSignal): Promise<ResponseType> {

    try {

        const rawResponse = await fetch(`${BASE_URL}/user/removeWishlist`, {
            method: 'POST',
            headers: getFullHeader("with token"),
            body: JSON.stringify({ productId }),
            signal
        });

        return await rawResponse.json();

    } catch (e) {

        return await Promise.resolve({ status: 400, message: "", payload: { error: "Issue" } })
    }
}

/**
 * @description Updates cart
 * @method POST
 * @param cart Object
 * @returns Success or Error response
 */
export async function updateCartAPI(cart: { productId: string, quantity: number }[], signal?: AbortSignal): Promise<ResponseType> {

    try {

        const rawResponse = await fetch(`${BASE_URL}/user/updateCart`, {
            method: 'POST',
            headers: getFullHeader("with token"),
            body: JSON.stringify({ cart }),
            signal
        });

        return await rawResponse.json();

    } catch (e) {

        return await Promise.resolve({ status: 400, message: "", payload: { error: "Issue" } })
    }
}