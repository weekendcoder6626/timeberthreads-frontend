import {
  Group,
  Button,
  Text,
  Box,
  Burger,
  Title,
  Avatar,
  ActionIcon,
  MantineSize,
  Tooltip,
  Indicator,
  Center,
} from '@mantine/core';
import {
  IconMoon,
  IconShoppingBag,
  IconSun,
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';

import { useMantineColorScheme } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { navRoutes } from '../navRoutes';

import UserContextMenu from '../UserContextMenu';

export function HeaderMegaMenu({ drawerOpened, disclosure, breakpoint }: {
  drawerOpened: boolean, disclosure: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  }, breakpoint: MantineSize
}) {

  const isLoggedIn = useAppSelector((state) => state.user.loggedIn);
  const username = useAppSelector((state) => state.user.username);
  const profilePic = useAppSelector((state) => state.user.profilePic);
  const userLoading = useAppSelector((state) => state.user.userLoading);
  const cart = useAppSelector((state) => state.user.cart);

  const totalCartLength = cart?.reduce((result, item) => (result + item.quantity), 0);

  const navigate = useNavigate();

  const { toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const endItem = (
    !isLoggedIn ?
      <Button variant='filled' onClick={() => navigate("/auth")}>
        <Text size="xs" className={classes.loginReg}>
          Login/Register
        </Text>
      </Button>
      :
      <UserContextMenu>

        <Tooltip label={username}>

          <Button visibleFrom={breakpoint} variant='transparent' p={6} h={"100%"} leftSection={
            <Avatar src={profilePic} variant='transparent' size={"md"}>
            </Avatar>
          } />

        </Tooltip>

      </UserContextMenu>
  );

  return (
    <Box style={{ position: 'sticky' }}>
      <div className={classes.header}>
        <Group justify="space-between" h="100%">

          <Title order={2} className={classes.logoTitle} onClick={() => navigate("/home")}>TimberThreads</Title>

          <Group h="100%" gap={0} visibleFrom={breakpoint}>
            {
              navRoutes.map((route, idx) => (

                <Link key={idx} to={route.path} className={classes.link}>
                  {route.display}
                </Link>

              ))
            }
          </Group>

          <Group>

            <ActionIcon visibleFrom={breakpoint} onClick={toggleColorScheme} variant='transparent'>

              <IconMoon className={classes.moon} />
              <IconSun className={classes.sun} />

            </ActionIcon>

            <Indicator disabled={!cart || cart.length === 0} label={
              cart && <Center>

                <Text style={{cursor: "pointer"}} fz={8}>{totalCartLength}</Text>

              </Center>
            } position='bottom-end' offset={8} size={13} onClick={() => navigate("/cart")}>
              
              <ActionIcon onClick={() => navigate("/cart")} variant='transparent'>


                <IconShoppingBag />

              </ActionIcon>

            </Indicator>

            <Group visibleFrom={breakpoint}>
              {
                !userLoading ? endItem : <Button loading variant='transparent' />
              }
            </Group>

            <Burger opened={drawerOpened} onClick={disclosure.toggle} hiddenFrom={breakpoint} />

          </Group>


        </Group>
      </div>
    </Box >
  );
}