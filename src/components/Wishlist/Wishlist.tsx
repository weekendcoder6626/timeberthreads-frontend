import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks"
import ProductList from "../ProductList/ProductList";

export default function Wishlist() {

    // preventing re-render
    const wishlist = useAppSelector((state) => state.user.wishlist, { equalityFn: () => true });

    const navigate = useNavigate();

    const clickHandler = (productId: string) => {

        navigate("/product/" + productId);

    }

    return (
        <>

            <ProductList products={wishlist || []} clickHandler={clickHandler} mode="wishlist" loading={false} error={false} />
        
        </>
    )
}
