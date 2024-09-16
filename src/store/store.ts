import { configureStore } from "@reduxjs/toolkit";
// import { userReducer, userSlice } from "./slices/user/userSlice";
import { userSliceWithThunks, userWithThunksReducer } from "./slices/user/userSlice";

export const store = configureStore({
    reducer: {
        [userSliceWithThunks.name]: userWithThunksReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch