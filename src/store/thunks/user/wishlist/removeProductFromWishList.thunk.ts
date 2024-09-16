import { isErrorResponse } from "../../../../api/resources/resources";
import { removeProductFromWishlistAPI } from "../../../../api/user.api";
import { createAThunk } from "../../../createAThunk";

export const removeProductFromWishListThunk = createAThunk(
    'user/removeWishlist',
    async (input: { productId: string }, thunkApi) => {

        const response = await removeProductFromWishlistAPI(input.productId, thunkApi.signal);

        if (isErrorResponse(response))
            throw thunkApi.rejectWithValue(response.message);

        return {
            productId: input.productId,
            message: response.message
        };

    }
)