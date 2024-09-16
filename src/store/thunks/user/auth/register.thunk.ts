import { isErrorResponse } from "../../../../api/resources/resources";
import { registerAPI } from "../../../../api/auth.api";
import { createAThunk } from "../../../createAThunk";

export const registerThunk = createAThunk(
    'user/register',
    async (input: { email: string, password: string, username: string, phNumber: string }, thunkApi) => {

        // await wait(2000);
        const response = await registerAPI(input.email, input.username, input.phNumber, input.password, thunkApi.signal);

        if (isErrorResponse(response)) {

            throw thunkApi.rejectWithValue(response.message);
        }

        return;

    }
  )