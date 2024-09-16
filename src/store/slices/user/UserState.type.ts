import { CurrentUser } from "../../../types/DBTypes/User.type";

export interface UserState extends Omit<CurrentUser, "password"> {
    loggedIn: boolean,
    userLoading: boolean,
    wishlistLoading: boolean,
    cartLoading: boolean,
    message?: string | null,
}