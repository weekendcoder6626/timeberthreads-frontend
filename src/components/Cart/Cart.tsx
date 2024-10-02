import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import ProductList from "../ProductList/ProductList";
import { Center, Stack, Text } from "@mantine/core";
import { IconMoodEmpty } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";

export default function Cart() {

    const [debounceLoading, setDebounceLoading] = useState(true);
    
    
    const initCart = useAppSelector((state) => state.user.cart, {
        // preventing re-render
        equalityFn: (a, b) => {

            if ((!a || a.length === 0) && (!!b && b.length > 0)) {

                return false;
            }

            return true;
        }
    });

    const [cart, setCart] = useState(initCart);

    const cartLoading = useAppSelector((state) => state.user.cartLoading);
    const error = useAppSelector((state) => state.user.error);

    const loading = cartLoading || debounceLoading;

    const newCart = useAppSelector((state) => state.user.cart);

    const debounceUpdateCart = useDebouncedCallback(() => {

        if(newCart) {

            setDebounceLoading(false);
        }

        setCart(newCart);

    }, 500);

    useEffect(() => {

        debounceUpdateCart();

    }, [newCart])

    const navigate = useNavigate();

    const clickHandler = (productId: string) => {

        navigate("/product/" + productId);

    }

    return (
        <>

            {(cart && cart.length > 0) || loading
                ?
                <ProductList products={cart?.map((item) => item.product) || []} clickHandler={clickHandler} mode="cart" loading={loading} error={error} />
                :
                <Center h={"100%"}>

                    <Stack align="center">

                        <IconMoodEmpty />

                        <Text>

                            Nothing in cart

                        </Text>

                    </Stack>

                </Center>}

        </>
    )
}
