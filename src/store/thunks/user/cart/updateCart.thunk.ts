import { isErrorResponse } from "../../../../api/resources/resources";
import { updateCartAPI } from "../../../../api/user.api";
import { Cart } from "../../../../types/DBTypes/Cart.type";
import { createAThunk } from "../../../createAThunk";

export const updateCartThunk = createAThunk(
    'user/updateCart',
    async (input: { cart: Cart }, thunkApi) => {

        console.log("Syncing with backend");

        // await wait(2000);
        const response = await updateCartAPI(input.cart.map((item) => ({productId: item.product.productId, quantity: item.quantity})), thunkApi.signal);

        if (isErrorResponse(response)) {

            throw thunkApi.rejectWithValue(response.message);
        }

        console.log(response);

        return;

    },
);