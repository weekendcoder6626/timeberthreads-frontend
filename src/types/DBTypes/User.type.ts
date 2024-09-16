import { ProductOverviewType } from "./Product.type";

export interface User {
    email: string,
    username: string,
    profilePic?: string,
    phNumber: string,
    password?: string,
    wishlist?: ProductOverviewType[],
    cart?: ProductOverviewType[],
    isFirstLogin: boolean,
}

export interface CurrentUser extends User {
    token: string
}