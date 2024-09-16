import { Center, MantineStyleProp, Paper, Tabs, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { FC, useState } from 'react';
import Login from './Login';
import Register from './Register';

function AuthTabs() {

    const [activeTab, setActiveTab] = useState<string | null>("login")

    return (
        <Tabs h={"100%"} w={"100%"} value={activeTab} onChange={setActiveTab}>
            <Tabs.List grow w={"100%"} mb={50}>

                <Tabs.Tab value="login">Login</Tabs.Tab>
                <Tabs.Tab value="register">Register</Tabs.Tab>

            </Tabs.List>

            <Center h={"100%"} px={"5%"}>
                <Tabs.Panel h={"100%"} w={"100%"} value="login">
                    <Center h={"100%"} w={"100%"}>
                        <Login />
                    </Center>
                </Tabs.Panel>
                <Tabs.Panel h={"100%"} w={"100%"} value="register">
                    <Center h={"100%"}>
                        <Register />
                    </Center>
                </Tabs.Panel>
            </Center>
        </Tabs>
    )
}


interface LoginRegisterProps { }

const LoginRegister: FC<LoginRegisterProps> = () => {

    const theme = useMantineTheme();

    // const nav = useNavigate();
    const scheme = useMantineColorScheme()

    const paperStyle: MantineStyleProp = {
        // backgroundColor: scheme.colorScheme === "dark" ? "#0c0c0c" : "#FFF",
        backgroundColor: scheme.colorScheme === "dark" ? theme.colors.darkModeBG[0] : theme.white,
        boxShadow: scheme.colorScheme === "light" ? "1px 1px 10px #767676" : "0.2px 1px 20px #080808",
        overflow: "hidden",
        position: "relative",
        transition: "all 500ms"
        // filter: "blur(1px)"
    };


    return (
        <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
            <Center w={"50%"} h={"100%"} visibleFrom='lg'>
                
                <Paper h={"90%"} w={"100%"} mx={60} style={paperStyle}>
                    <AuthTabs />
                </Paper>

            </Center>

            <Center h={"100%"} w={"100%"} hiddenFrom='lg'>

                <AuthTabs />

            </Center>
        </div>
    );
}

export default LoginRegister;