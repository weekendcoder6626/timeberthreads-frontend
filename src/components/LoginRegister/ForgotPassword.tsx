import { ActionIcon, Button, Center, Space, Stack, TextInput, Title } from '@mantine/core'
import classes from './LoginRegister.module.css'
import { IconAt } from '@tabler/icons-react';
import { useState } from 'react';
import { EmailSuggestions } from './Reusable/EmailSuggestions';

// TODO Implement forgot password
export default function ForgotPassword() {

    const [email, setEmail] = useState("")

    const setEmailSuggestion = (sug: string) => {
        setEmail((prev) => prev + sug)
    }

    // const nav = useNavigate();
    // const scheme = useMantineColorScheme();

    const InputProps = {
        wrapperProps: {
            className: classes.input,
        },

        radius: 10

    }


    return (

        <Center h={"100%"} w={"100%"}>

            <Stack w={"85%"} h={"100%"} px={"lg"} maw={700} align='center'>
                <Center w={"100%"} pt={50}>
                    <Title className={classes.heading} order={1}>Forgot Password</Title>
                </Center>
                <Space h="md" />
                <form style={{width: "100%"}} onSubmit={() => console.log("yes")}>
                    <TextInput w={"100%"} {...InputProps} label=" Address" placeholder="Enter your email address" value={email} onChange={(v) => setEmail(v.target.value)} rightSection={
                        <EmailSuggestions appendSuggestion={setEmailSuggestion}>
                            <ActionIcon variant='transparent' size='input-sm' style={{ borderRadius: "0 10px 10px 0" }}>
                                <IconAt />
                            </ActionIcon>
                        </EmailSuggestions>
                    } />

                    <Space h="md" />

                    <Stack w={"100%"} gap={'xl'}>

                        <Button type='submit' size='xs' variant='filled'>Send Reset Password Link</Button>

                    </Stack>
                </form>

            </Stack>

        </Center>

    )
}
