import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../../thunks/user/auth/login.thunk";
import { registerThunk } from "../../thunks/user/auth/register.thunk";
import { removeToken, setToken } from "../../auth";
import { logoutThunk } from "../../thunks/user/auth/logout.thunk";
import { refreshUserStateThunk } from "../../thunks/user/refreshUserState.thunk";
import { UserState } from "./UserState.type";
import { addProductToWishListThunk } from "../../thunks/user/wishlist/addProductToWishList.thunk";
import { removeProductFromWishListThunk } from "../../thunks/user/wishlist/removeProductFromWishList.thunk";
import { ProductOverviewType } from "../../../types/DBTypes/Product.type";

export const wait = (ms: number) => new Promise(r => setTimeout(r, ms))

const initialState: UserState = {
    userLoading: true,
    wishlistLoading: true,
    cartLoading: true,
    loggedIn: false,
    token: '',
    message: null,
    email: '',
    username: '',
    profilePic: '',
    phNumber: '',
    wishlist: undefined,
    cart: undefined,
    isFirstLogin: false,
}

export const userSliceWithThunks = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserState: (state, action) => {

            const newState: UserState = {
                ...state,
                ...action.payload,
            }

            return newState;

        },
    },

    extraReducers: (builder) => {

        // REFRESH USER STATE
        builder
            .addCase(refreshUserStateThunk.pending, (state) => {

                state.userLoading = true;
                state.wishlistLoading = true;
                state.cartLoading = true;

            })
            .addCase(refreshUserStateThunk.fulfilled, (_, action) => {

                const newState: UserState = {
                    ...initialState,

                    userLoading: false,
                    wishlistLoading: false,
                    cartLoading: false,
                    loggedIn: true,
                    message: null,
                    ...action.payload,
                }

                return newState;

            })
            .addCase(refreshUserStateThunk.rejected, (state, action) => {

                state.userLoading = true;
                state.wishlistLoading = true;
                state.cartLoading = true;
                state.message = action.payload || action.error.message;
            });

        // REGISTER
        builder
            .addCase(registerThunk.pending, (state) => {

                state.userLoading = true;

            })
            .addCase(registerThunk.fulfilled, (state) => {

                state.userLoading = false;
                state.message = "Registered Successfully!"

            })
            .addCase(registerThunk.rejected, (state, action) => {

                state.userLoading = false;
                state.message = action.payload || action.error.message;
            });

        // LOGIN
        builder
            .addCase(loginThunk.pending, (state) => {

                state.userLoading = true;
                state.wishlistLoading = true;
                state.cartLoading = true;

            })
            .addCase(loginThunk.fulfilled, (_, action) => {

                setToken(action.payload.token)

                const newState: UserState = {
                    ...initialState,
                    userLoading: false,
                    wishlistLoading: false,
                    cartLoading: false,
                    loggedIn: true,
                    ...action.payload,
                    message: "Logged in successfully!",
                }

                return newState;

            })
            .addCase(loginThunk.rejected, (state, action) => {

                const newState: UserState = {
                    ...state,
                    ...initialState,
                    message: action.payload || action.error.message,
                    userLoading: false,
                    wishlistLoading: false,
                    cartLoading: false,
                }

                return newState;
            });

        // LOGOUT
        builder
            .addCase(logoutThunk.pending, (state) => {

                state.userLoading = true;
                state.wishlistLoading = true;
                state.cartLoading = true;

            })
            .addCase(logoutThunk.fulfilled, () => {

                removeToken()

                const newState: UserState = {
                    ...initialState,
                    userLoading: false,
                    wishlistLoading: false,
                    cartLoading: false,
                }

                return newState;

            })
            .addCase(logoutThunk.rejected, (state, action) => {

                state.userLoading = true;
                state.wishlistLoading = true;
                state.cartLoading = true;
                state.message = action.payload || action.error.message
            });

        // ADD TO WISHLIST
        builder
            .addCase(addProductToWishListThunk.pending, (state) => {

                state.wishlistLoading = true;

            })
            .addCase(addProductToWishListThunk.fulfilled, (state, action) => {

                const newWishlist: ProductOverviewType[] = [];

                if (!state.wishlist) {

                    newWishlist.push(action.payload.product);
                } else {

                    newWishlist.push(...state.wishlist, action.payload.product);

                }

                const newState: UserState = {
                    ...state,
                    wishlistLoading: false,
                    wishlist: newWishlist,
                    message: action.payload.message
                }

                return newState;

            })
            .addCase(addProductToWishListThunk.rejected, (state, action) => {

                state.wishlistLoading = false;
                state.message = action.payload || action.error.message
            });

        // REMOVE FROM WISHLIST
        builder
            .addCase(removeProductFromWishListThunk.pending, (state) => {

                state.wishlistLoading = true;

            })
            .addCase(removeProductFromWishListThunk.fulfilled, (state, action) => {

                const newWishlist: ProductOverviewType[] = [];

                if (!state.wishlist) {

                    return state;

                } else {

                    newWishlist.push(...state.wishlist.filter((prod) => {

                        console.log(prod.productId !== action.payload.productId);

                        return prod.productId !== action.payload.productId
                    }));

                }

                const newState: UserState = {
                    ...state,
                    wishlistLoading: false,
                    wishlist: newWishlist,
                    message: action.payload.message
                }

                return newState;

            })
            .addCase(removeProductFromWishListThunk.rejected, (state, action) => {

                state.wishlistLoading = false;
                state.message = action.payload || action.error.message

            });
    }
});

// Action creators are generated for each case reducer function
export const { setUserState } = userSliceWithThunks.actions

export const userWithThunksReducer = userSliceWithThunks.reducer