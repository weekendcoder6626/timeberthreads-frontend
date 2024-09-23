import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { UserState } from "../../store/slices/user/UserState.type";
import { Cart } from "../../types/DBTypes/Cart.type";
import { setLocalCart } from "./localCart";
import { updateCartThunk } from "../../store/thunks/user/cart/updateCart.thunk";
import { isLoggedIn } from "../../store/auth";

export async function cartUpdate(cart: Cart, dispatch: ThunkDispatch<{
    user: UserState;
}, undefined, UnknownAction> & Dispatch<UnknownAction>) {

    setLocalCart(cart);

    if(isLoggedIn())
        dispatch(updateCartThunk({ cart }));
    // do async call to update db cart if logged in


}