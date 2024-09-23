import { ActionIcon, Button, Center, Divider, Group, Modal, Space, Stack, TextInput, Title, Text } from '@mantine/core'
import classes from './LoginRegister.module.css'
import { IconAt, IconEye, IconEyeClosed } from '@tabler/icons-react';
import { useState } from 'react';
import { GoogleButton } from '../HOButtons/GoogleButton';
import { EmailSuggestions } from './Reusable/EmailSuggestions';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, isEmail } from '@mantine/form';
// import { login } from '../../store/slices/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginThunk } from '../../store/thunks/user/auth/login.thunk';
import { useDisclosure } from '@mantine/hooks';
import { getLocalCart, setLocalCart } from '../../cache/cart/localCart';
import { updateCartThunk } from '../../store/thunks/user/cart/updateCart.thunk';
import { updateCartState } from '../../store/slices/user/userSlice';

type Props = {
    fromModal?: boolean,
    closeModal?: () => void
}

export default function Login({ fromModal = false, closeModal }: Props) {

    const [opened, { open: openCartModal, close: closeCartModal }] = useDisclosure();

    const dispatch = useAppDispatch()

    const [viewPassword, setViewPassword] = useState(false);

    const setEmailSuggestion = (sug: string) => {
        form.setFieldValue('email', (prevValue) => prevValue + sug)
    }

    const userLoading = useAppSelector((state) => state.user.userLoading);

    // const nav = useNavigate();
    // const scheme = useMantineColorScheme();

    const InputProps = {
        wrapperProps: {
            className: classes.input,
        },

        radius: 10

    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (v) => {
                const errorEmail = isEmail("Invalid email")(v);

                const errorReq = v.length === 0 ? "Required field" : null;

                return errorReq || errorEmail;
            },
            password: (v) => {
                const errorReq = v.length === 0 ? "Required field" : null;

                return errorReq;
            },
        },
    });

    const navigate = useNavigate();

    const cartSyncHandler = async () => {

        const cart = getLocalCart()

        if (cart) {

            await dispatch(updateCartThunk({ cart }));

            dispatch(updateCartState(cart));

            setLocalCart(cart);

        }

        doFinalAction();

    }

    const doFinalAction = () => {

        if (fromModal)
            closeModal!();
        else
            navigate("/home");

    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        form.onSubmit((v) => {

            if (form.isValid()) {

                const { email, password } = v;
                dispatch(loginThunk({ email, password })).then(async (result) => {

                    if (result.meta.requestStatus === 'fulfilled') {

                        if (getLocalCart())
                            openCartModal();

                        else {

                            doFinalAction();

                        }

                    }


                });
            }

        })();

    }

    return (

        <>

            <Modal opened={opened} onClose={closeCartModal} title="Do you want to sync your current cart?">

                <Text mb={20} mt={-3} c={"yellow"} fw={100} size='xs'>Warning: This will overwrite any cart items you already have in your account.</Text>

                <Group>

                    <Button onClick={cartSyncHandler}>Yes</Button>
                    <Button onClick={doFinalAction}>No</Button>

                </Group>

            </Modal>

            <Stack w={"85%"} h={"100%"} px={"lg"} align='center'>
                <form style={{ width: "100%" }} onSubmit={(e) => submitHandler(e)}>
                    <Center w={"100%"}>
                        <Title className={classes.heading} order={1}>Login</Title>
                    </Center>
                    <Space h="md" />
                    <TextInput autoComplete='username' withAsterisk {...form.getInputProps("email")} key={form.key("email")} w={"100%"} {...InputProps} label="Email Address" placeholder="Enter your email address" rightSection={
                        <EmailSuggestions appendSuggestion={setEmailSuggestion}>
                            <ActionIcon variant='transparent' size='input-sm' style={{ borderRadius: "0 10px 10px 0" }}>
                                <IconAt />
                            </ActionIcon>
                        </EmailSuggestions>
                    } />

                    <TextInput withAsterisk {...form.getInputProps("password")} key={form.key("password")} w={"100%"} {...InputProps}
                        type={viewPassword ? "text" : 'password'} label="Password" placeholder="Password" rightSection={
                            <ActionIcon variant='transparent' size='input-sm' style={{ borderRadius: "0 10px 10px 0" }} onClick={() => setViewPassword((prev) => !prev)}>
                                {viewPassword ? <IconEye /> : <IconEyeClosed />}
                            </ActionIcon>
                        } />

                    <Space h="md" />

                    <Stack w={"100%"} gap={'xl'}>

                        <Button loading={userLoading} loaderProps={{ type: 'dots' }} type='submit' size='xs' variant='filled'>
                            Login
                        </Button>

                        <Divider label="Or" labelPosition='center' />

                        <GoogleButton />

                    </Stack>
                </form>

                <Link to={"/forgot-password"}>
                    Forgot Password?
                </Link>

            </Stack>

        </>

    )
}
