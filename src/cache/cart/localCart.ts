import { isLoggedIn, getToken } from "../../store/auth";
import { Cart, LocalStorageCart } from "../../types/DBTypes/Cart.type";

export function getLocalCart(authCheck = false) {

    const cartStringify = localStorage.getItem("cart");

    if(!cartStringify) return null;

    const cart = JSON.parse(cartStringify) as LocalStorageCart;

    if(isLoggedIn() && authCheck) {

        const token = getToken();
        
        if (cart.token !== token) {

            // clear cart
            clearLocalCart();
            return null;
        }
        
    }

    return cart.cart;

}

export function setLocalCart(cart: Cart) {

    if(!isLoggedIn()) {

        const localCart = {
            cart
        } as LocalStorageCart

        localStorage.setItem("cart", JSON.stringify(localCart));

        return;

    }

    const localCart = {
        token: getToken(),
        cart
    } as LocalStorageCart

    localStorage.setItem("cart", JSON.stringify(localCart));

}

export function clearLocalCart() {
    localStorage.removeItem("cart");
}