import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks"
import ProductList from "../ProductList/ProductList";
import { Center, Stack, Text } from "@mantine/core";
import { IconMoodEmpty } from "@tabler/icons-react";

export default function Wishlist() {

    // preventing re-render
    const wishlist = useAppSelector((state) => state.user.wishlist, { equalityFn: (a, b) => {

        if(!a && !!b)
            return false;

        return true;
    } });

    const loading = useAppSelector((state) => state.user.userLoading)
    const error = useAppSelector((state) => state.user.error)

    const navigate = useNavigate();

    const clickHandler = (productId: string) => {

        navigate("/product/" + productId);

    }

    return (
        <>

            {(wishlist && wishlist.length > 0) || loading ? <ProductList products={wishlist || []} clickHandler={clickHandler} mode="wishlist" loading={loading} error={error} /> : 
            <Center h={"100%"}>
            
                <Stack align="center">
                
                    <IconMoodEmpty />

                    <Text>
                    
                        Nothing in wishlist
                    
                    </Text>

                </Stack>
            
            </Center>}
        
        </>
    )
}
