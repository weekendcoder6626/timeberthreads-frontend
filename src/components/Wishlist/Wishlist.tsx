import { useAppSelector } from "../../store/hooks"

export default function Wishlist() {

    const wishlist = useAppSelector((state) => state.user.wishlist);

    return (
        <div>

            {
                wishlist?.map((prod, idx) => (
                    <div key={idx}>{prod.productName}</div>
                ))
            }
        
        </div>
    )
}
