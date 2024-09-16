import { isErrorResponse } from "../../../../api/resources/resources";
import { logoutAPI } from "../../../../api/auth.api";
import { createAThunk } from "../../../createAThunk";

export const logoutThunk = createAThunk(
    'user/logout',
    async (_, thunkApi) => {

        // await wait(2000);
        const response = await logoutAPI(thunkApi.signal);

        if (isErrorResponse(response)) {

            throw thunkApi.rejectWithValue(response.message);
        }

        return response.message;

    },
)