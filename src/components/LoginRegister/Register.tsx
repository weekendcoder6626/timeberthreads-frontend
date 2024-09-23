import { ActionIcon, Button, Center, Space, Stack, TextInput, Title } from '@mantine/core'
import classes from './LoginRegister.module.css'
import { IconAt, IconEye, IconEyeClosed } from '@tabler/icons-react';
import { FormEvent, useState } from 'react';
import { EmailSuggestions } from './Reusable/EmailSuggestions';

import { useForm, isEmail } from '@mantine/form';
// import { register } from '../../store/slices/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerThunk } from '../../store/thunks/user/auth/register.thunk';

const initialValues = {
    username: '',
    email: '',
    phNumber: '',
    password: '',
    confirmPassword: ''
};

export default function Register() {

    const dispatch = useAppDispatch();

    const userLoading = useAppSelector((state) => state.user.userLoading);

    const [viewPassword, setViewPassword] = useState(false);

    const setEmailSuggestion = (sug: string) => {
        form.setFieldValue('email', (prevValue) => prevValue + sug)
    }

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
        initialValues,
        validate: {
            username: (v) => {

                const errorReq = v && v.length === 0 ? "Required field" : null;

                return errorReq;

            },
            email: (v) => {

                const errorEmail = isEmail("Invalid email")(v);

                const errorReq = v && v.length === 0 ? "Required field" : null;

                return errorReq || errorEmail;

            },
            phNumber: (v) => {

                const errorReq = v && v.length === 0 ? "Required field" : null;

                return errorReq;

            },
            password: (v) => {

                const errorLength = v && v.length > 6 ? null : "Has to be more than 6 characters";

                const errorReq = v && v.length === 0 ? "Required field" : null;

                return errorReq || errorLength;

            },
            confirmPassword: (v, vs) => {

                const errorMatch = v === vs.password ? null : "Password not matching";

                const errorReq = v && v.length === 0 ? "Required field" : null;

                return errorReq || errorMatch;

            },
        },
    });

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        form.onSubmit(console.log)();

        if (form.isValid()) {

            const { email, password, username, phNumber } = form.getValues();

            dispatch(registerThunk({ email, password, username, phNumber })).then((result) => {

                if (result.meta.requestStatus === "fulfilled") {

                    form.reset();
                    
                }

            });
        }
    }

    return (

        <Stack w={"85%"} h={"100%"} px={"lg"}>
            <Center w={"100%"}>
                <Title className={classes.heading} order={1}>Get Started!!</Title>
            </Center>
            <Space h="md" />

            <form style={{ width: "100%" }} onSubmit={submitHandler}>
                <TextInput withAsterisk {...form.getInputProps("username")} key={form.key("username")} {...InputProps} label="Username" placeholder="Enter your username" />

                <TextInput autoComplete='username' withAsterisk {...form.getInputProps("email")} key={form.key("email")} label="Email Address" placeholder="Enter your email address" rightSection={
                    <EmailSuggestions appendSuggestion={setEmailSuggestion}>
                        <ActionIcon variant='transparent' size='input-sm' style={{ borderRadius: "0 10px 10px 0" }}>
                            <IconAt />
                        </ActionIcon>
                    </EmailSuggestions>
                } />

                <TextInput withAsterisk {...form.getInputProps("phNumber")} key={form.key("phNumber")} {...InputProps} label="Phone number" type='number' placeholder="Enter your phone number" />

                <TextInput withAsterisk {...form.getInputProps("password")} key={form.key("password")} {...InputProps}
                    type={viewPassword ? "text" : 'password'} label="Password" placeholder="Password" rightSection={
                        <ActionIcon variant='transparent' size='input-sm' style={{ borderRadius: "0 10px 10px 0" }} onClick={() => setViewPassword((prev) => !prev)}>
                            {viewPassword ? <IconEye /> : <IconEyeClosed />}
                        </ActionIcon>
                    } />

                <TextInput withAsterisk {...form.getInputProps("confirmPassword")} key={form.key("confirmPassword")} {...InputProps}
                    type={viewPassword ? "text" : 'password'} label="Confirm Password" placeholder="Confirm Password" rightSection={
                        <ActionIcon variant='transparent' size='input-sm' style={{ borderRadius: "0 10px 10px 0" }} onClick={() => setViewPassword((prev) => !prev)}>
                            {viewPassword ? <IconEye /> : <IconEyeClosed />}
                        </ActionIcon>
                    } />

                <Space h="md" />

                <Button loading={userLoading} loaderProps={{ type: "dots" }} w={"100%"} my={20} type='submit' size='xs' variant='filled'>Register</Button>

            </form >


        </Stack>

    )
}
