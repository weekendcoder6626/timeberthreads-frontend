import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAThunk = createAsyncThunk.withTypes<{
    rejectValue: string,
}>();