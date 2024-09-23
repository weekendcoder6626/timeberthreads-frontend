import { ProductOverviewType, ProductDetailedType } from "../types/DBTypes/Product.type";
import { Review } from "../types/DBTypes/Review.type";
import { BASE_URL, getFullHeader } from "./resources/resources";
import { ResponseType } from "./resources/response.type";

/**
 * @description Gets all product overviews
 * @method GET
 * @param signal AbortSignal
 * @returns Success or Error response
 * @returns Gets all products
 */
export async function getAllProductsOverviewAPI(signal?: AbortSignal): Promise<ResponseType<ProductOverviewType[]>> {

    try {

        const rawResponse = await fetch(`${BASE_URL}/product/`, {
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
 * @description Gets product detailed for given ID
 * @method GET
 * @param productId string
 * @param signal AbortSignal
 * @returns Success or Error response
 * @returns Gets all products
 */
export async function getProductDetailedAPI(productId: string, signal?: AbortSignal): Promise<ResponseType<ProductDetailedType>> {

    try {

        const rawResponse = await fetch(`${BASE_URL}/product/${productId}`, {
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
 * @description Adds review to the given product
 * @method POST
 * @param productId 
 * @param review
 * @returns Success or Error response
 */
export async function addReviewAPI(productId: string, review: Review, signal?: AbortSignal): Promise<ResponseType> {

    try {

        const rawResponse = await fetch(`${BASE_URL}/product/addReview`, {
            method: 'POST',
            headers: getFullHeader("with token"),
            body: JSON.stringify({ ...review, productId }),
            signal
        });

        return await rawResponse.json();

    } catch (e) {

        return await Promise.resolve({ status: 400, message: "", payload: { error: "Issue" } })
    }
}

/**
 * @description Removes review to the given product
 * @method POST
 * @param productId 
 * @param email
 * @returns Success or Error response
 */
export async function removeReviewAPI(productId: string, email: string, signal?: AbortSignal): Promise<ResponseType> {

    try {

        const rawResponse = await fetch(`${BASE_URL}/product/removeReview`, {
            method: 'POST',
            headers: getFullHeader("with token"),
            body: JSON.stringify({ email, productId }),
            signal
        });

        return await rawResponse.json();

    } catch (e) {

        return await Promise.resolve({ status: 400, message: "", payload: { error: "Issue" } })
    }
}