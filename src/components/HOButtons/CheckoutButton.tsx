import { Button } from "@mantine/core"
import { IconPlant } from "@tabler/icons-react"
import { useAppSelector } from "../../store/hooks";
import { useDisclosure } from "@mantine/hooks";
import AuthModal from "../LoginRegister/Reusable/AuthModal";

type Props = {
    disabled?: boolean
}
export default function CheckoutButton({ disabled = false }: Props) {

    const [authModalOpened, { open: authModalOpen, close: authModalClose }] = useDisclosure();

    const loggedIn = useAppSelector((state) => state.user.loggedIn);
    const cart = useAppSelector((state) => state.user.cart);

    // const dispatch = useAppDispatch();

    // TODO Checkout Implementation
    const checkout = () => {

        if(!loggedIn) {
            authModalOpen();
            return;
        }

        console.log("checking out", cart);
    }

    return (
        <>

            <AuthModal modalProps={
                {
                    opened: authModalOpened,
                    onClose: authModalClose,
                }
            } />

            <Button disabled={disabled} fullWidth onClick={() => checkout()} radius={0} leftSection={
                <IconPlant />
            }>
                Checkout
            </Button>

        </>
    )
}