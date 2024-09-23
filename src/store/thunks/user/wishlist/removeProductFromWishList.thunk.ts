import { isErrorResponse } from "../../../../api/resources/resources";
import { removeProductFromWishlistAPI } from "../../../../api/user.api";
import { ProductOverviewType } from "../../../../types/DBTypes/Product.type";
import { createAThunk } from "../../../createAThunk";

export const removeProductFromWishListThunk = createAThunk(
    'user/removeWishlist',
    async (input: { product: ProductOverviewType }, thunkApi) => {

        const response = await removeProductFromWishlistAPI(input.product.productId, thunkApi.signal);

        if (isErrorResponse(response))
            throw thunkApi.rejectWithValue(response.message);

        return {
            productId: input.product.productId,
            message: response.message
        };

    }
)