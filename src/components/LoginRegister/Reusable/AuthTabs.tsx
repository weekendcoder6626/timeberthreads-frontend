import { Tabs, Center } from "@mantine/core"
import { useState } from "react"
import Login from "../Login"
import Register from "../Register"

type Props = {
    fromModal?: boolean,
    closeModal?: () => void
}

export default function AuthTabs({ fromModal = false, closeModal }: Props) {

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
                        <Login fromModal={fromModal} closeModal={closeModal} />
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