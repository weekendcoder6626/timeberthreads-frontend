import { ProductOverviewType, ProductDetailedType } from "../types/DBTypes/Product.type";
import { BASE_URL, getFullHeader } from "./resources/resources";
import { ResponseType } from "./resources/response.type";

/**
 * @description Gets user by Email
 * @method GET
 * @param signal AbortSignal
 * @returns Success or Error response
 * @returns Gets all products
 */
export async function getAllProductsOverviewAPI(signal: AbortSignal): Promise<ResponseType<ProductOverviewType[]>> {

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
 * @description Gets user by Email
 * @method GET
 * @param productId string
 * @param signal AbortSignal
 * @returns Success or Error response
 * @returns Gets all products
 */
export async function getProductDetailedAPI(productId: string, signal: AbortSignal): Promise<ResponseType<ProductDetailedType>> {

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