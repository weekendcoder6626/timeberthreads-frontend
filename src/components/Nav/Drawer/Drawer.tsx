import { Avatar, Box, Button, Collapse, Divider, Group, rem, ScrollArea, Stack, Text, useMantineColorScheme } from '@mantine/core'
import classes from './Drawer.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { navRoutes } from '../navRoutes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { userContextMenuItems } from '../UserContextMenu'
import { IconArrowsLeftRight, IconChevronDown, IconChevronUp, IconTrash } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { logoutThunk } from '../../../store/thunks/user/auth/logout.thunk'
// import { logout } from '../../../store/slices/user/userSlice'

export default function Drawer({ disclosure }: {
  disclosure: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  }
}) {

  const scheme = useMantineColorScheme();

  const navigate = useNavigate();

  const isLoggedIn = useAppSelector((state) => state.user.loggedIn);
  const username = useAppSelector((state) => state.user.username);
  const userLoading = useAppSelector((state) => state.user.userLoading);

  const [opened, collapseDisclosure] = useDisclosure(false);

  const dispatch = useAppDispatch();

  const logoutHandler = () => {

    dispatch(logoutThunk());
    disclosure.close();
  }

  return (
    <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">

      {
        navRoutes.map((route, idx) => (

          <Link key={idx} onClick={disclosure.close} to={route.path} className={classes.link}>
            {route.display}
          </Link>

        ))
      }
      <Divider my="sm" />

      <Group justify="center" grow>
        {
          !isLoggedIn ?

            <Button mx={10} variant='filled' onClick={() => { disclosure.close(); navigate("/auth"); }}>
              <Text size="xs" className={classes.loginReg}>
                Login/Register
              </Text>
            </Button>

            :
            !userLoading &&
            <>

              <Button fullWidth variant='transparent' onClick={() => collapseDisclosure.toggle()} leftSection={
                <Avatar variant='transparent' radius="xl" />
              }
                rightSection={
                  opened ? <IconChevronDown /> : <IconChevronUp />
                }>
                {username}
              </Button>

            </>
        }
      </Group>

      <Collapse in={opened && isLoggedIn}>

        <Divider my="sm" />

        {
          userContextMenuItems.map((item, idx) => (

            <Box key={idx}>

              <Button variant='transparent' onClick={() => { disclosure.close(); navigate(item.path); }} className={classes.link}
                leftSection={item.icon}>

                {item.name}
              </Button>


            </Box>

          ))
        }

        <Divider my="sm" />

        <Stack>

          <Button variant='transparent' onClick={logoutHandler}
            c={scheme.colorScheme === "dark" ? "white" : "black"}
            leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
          >
            Log out
          </Button>

          <Button variant='transparent'
            color="red"
            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          >
            Delete my account
          </Button>

        </Stack>

        <Divider my="sm" />

      </Collapse>

    </ScrollArea>
  )
}
