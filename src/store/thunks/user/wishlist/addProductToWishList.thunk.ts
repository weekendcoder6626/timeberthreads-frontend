import { isErrorResponse } from "../../../../api/resources/resources";
import { addProductToWishlistAPI } from "../../../../api/user.api";
import { ProductOverviewType } from "../../../../types/DBTypes/Product.type";
import { createAThunk } from "../../../createAThunk";

export const addProductToWishListThunk = createAThunk(
    'user/addWishlist',
    async (input: { product: ProductOverviewType }, thunkApi) => {

        const response = await addProductToWishlistAPI(input.product.productId, thunkApi.signal);

        if (isErrorResponse(response)) {

            throw thunkApi.rejectWithValue(response.message);
        }


        return {
            product: input.product,
            message: response.message
        };

    }
)