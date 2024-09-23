import { ActionIcon } from "@mantine/core"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ProductOverviewType } from "../../types/DBTypes/Product.type";
import { addWishlist, removeWishlist } from "../../store/slices/user/userSlice";
import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import { removeProductFromWishListThunk } from "../../store/thunks/user/wishlist/removeProductFromWishList.thunk";
import { addProductToWishListThunk } from "../../store/thunks/user/wishlist/addProductToWishList.thunk";
import { useEffect, useState } from "react";
import AuthModal from "../LoginRegister/Reusable/AuthModal";

type Props = {
    product: ProductOverviewType,
    externalDebounceMethod?: (product: ProductOverviewType) => void;
}
export default function AddToWishlistButton({ product, externalDebounceMethod }: Props) {

    const [authModalOpened, { open: authModalOpen, close: authModalClose }] = useDisclosure();

    const wishlist = useAppSelector((state) => state.user.wishlist);
    const loggedIn = useAppSelector((state) => state.user.loggedIn);

    const isWishlist = (productId: string) => !!wishlist && wishlist.findIndex((prod) => prod.productId === productId) !== -1;

    const [eventQueue, setEventQueue] = useState([] as ("add" | "remove")[]);

    useEffect(() => {

        console.log("mounted", product.productName);

        return () => console.log("unmounted", product.productName);

    })

    const debouncedWishlistUpdate = useDebouncedCallback((product: ProductOverviewType) => {

        console.log(product);

        if (eventQueue[0] === eventQueue[eventQueue.length - 1]) return;

        switch (eventQueue[eventQueue.length - 1]) {

            case "add":
                dispatch(addProductToWishListThunk({ product }));
                break;

            case "remove":
                dispatch(removeProductFromWishListThunk({ product }));
                break;

        }

        setEventQueue([]);

    }, 500)


    const dispatch = useAppDispatch();

    const wishListHandler = (product: ProductOverviewType) => {

        return () => {

            console.log(product);

            if (!loggedIn) {

                authModalOpen();
                return;

            }

            if (isWishlist(product.productId)) {

                if (eventQueue.length === 0)
                    setEventQueue(["add", "remove"]);
                else
                    setEventQueue((prev) => [...prev, "remove"])

                externalDebounceMethod ? externalDebounceMethod(product) : debouncedWishlistUpdate(product);
                dispatch(removeWishlist(product));

            } else {


                if (eventQueue.length === 0)
                    setEventQueue(["remove", "add"]);
                else
                    setEventQueue((prev) => [...prev, "add"])

                externalDebounceMethod ? externalDebounceMethod(product) : debouncedWishlistUpdate(product);
                dispatch(addWishlist(product));

            }

        }

    }

    return (
        <>

            <AuthModal modalProps={
                {
                    opened: authModalOpened,
                    onClose: authModalClose,
                }
            } />

            <ActionIcon onClick={wishListHandler(product)} variant="transparent" radius={0} h={35} w={40}>
                {!isWishlist(product.productId) ? <IconHeart /> : <IconHeartFilled />}
            </ActionIcon>

        </>
    )
}