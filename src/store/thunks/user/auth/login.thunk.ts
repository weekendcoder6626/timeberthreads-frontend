import { isErrorResponse } from "../../../../api/resources/resources";
import { loginAPI } from "../../../../api/auth.api";
import { CurrentUser } from "../../../../types/DBTypes/User.type";
import { createAThunk } from "../../../createAThunk";

export const loginThunk = createAThunk(
    'user/login',
    async (input: { email: string, password: string }, thunkApi) => {

        // await wait(2000);
        const response = await loginAPI(input.email, input.password, thunkApi.signal);

        if (isErrorResponse(response)) {

            throw thunkApi.rejectWithValue(response.message);
        }

        console.log(response);

        return response.payload as CurrentUser;

    }
  )