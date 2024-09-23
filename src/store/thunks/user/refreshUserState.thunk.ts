import { isErrorResponse } from "../../../api/resources/resources";
import { getCurrentUserAPI } from "../../../api/user.api";
import { CurrentUser } from "../../../types/DBTypes/User.type";
import { createAThunk } from "../../createAThunk";

export const refreshUserStateThunk = createAThunk(
    'user/refreshUserState',
    async (_, thunkApi) => {

        // await wait(2000);
        const response = await getCurrentUserAPI(thunkApi.signal);

        if (isErrorResponse(response)) {

            throw thunkApi.rejectWithValue(response.message);
        }

        console.log(response.payload);

        return response.payload as CurrentUser;

    },
);