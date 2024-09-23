import { ProductOverviewType } from "./Product.type";

export type Cart = { product: ProductOverviewType, quantity: number }[]

export interface LocalStorageCart {
    token?: string,
    cart: Cart
}