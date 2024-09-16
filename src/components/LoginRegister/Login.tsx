import { ActionIcon, Button, Center, Divider, Space, Stack, TextInput, Title } from '@mantine/core'
import classes from './LoginRegister.module.css'
import { IconAt, IconEye, IconEyeClosed } from '@tabler/icons-react';
import { FormEvent, useState } from 'react';
import { GoogleButton } from './GoogleButton';
import { EmailSuggestions } from './EmailSuggestions';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, isEmail } from '@mantine/form';
// import { login } from '../../store/slices/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginThunk } from '../../store/thunks/user/auth/login.thunk';

export default function Login() {

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

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        form.onSubmit((v) => {

            if (form.isValid()) {

                const { email, password } = v;
                dispatch(loginThunk({ email, password })).then((result) => {
                    if (result.meta.requestStatus === 'fulfilled')
                        navigate("/home")
                });
            }

        })();

    }

    return (

        <Stack w={"85%"} h={"100%"} px={"lg"} align='center'>
            <form style={{ width: "100%" }} onSubmit={submitHandler}>
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

    )
}
