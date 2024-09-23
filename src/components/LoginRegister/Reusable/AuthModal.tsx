import { Box, Modal, ModalProps } from "@mantine/core"
import AuthTabs from "./AuthTabs"

type Props = {
    modalProps: ModalProps
}
export default function AuthModal({ modalProps }: Props) {

    return (

        <Modal radius={10} {...modalProps} withCloseButton={false}>

            <Box pb={10} mx={-12}>
            
                <AuthTabs fromModal closeModal={modalProps.onClose}/>
            
            </Box>

        </Modal>

    )
}