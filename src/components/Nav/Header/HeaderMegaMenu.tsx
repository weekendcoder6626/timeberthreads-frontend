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
} from '@mantine/core';
import {
  IconMoon,
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

  const navigate = useNavigate();

  const { toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

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

            <ActionIcon onClick={toggleColorScheme} variant='transparent'>

              <IconMoon className={classes.moon} />
              <IconSun className={classes.sun} />

            </ActionIcon>

            <Group visibleFrom={breakpoint}>
              {
                !isLoggedIn ? !userLoading && <Button variant='filled' onClick={() => navigate("/auth")}>
                  <Text size="xs" className={classes.loginReg}>
                    Login/Register
                  </Text>
                </Button>
                  :
                  !userLoading &&
                  <UserContextMenu>
                    <Button visibleFrom={breakpoint} variant='transparent' leftSection={
                      <Avatar src={profilePic} variant='transparent' radius="xl" />
                    }>
                      {username}
                    </Button>
                  </UserContextMenu>
              }
            </Group>

            <Burger opened={drawerOpened} onClick={disclosure.toggle} hiddenFrom={breakpoint} />

          </Group>


        </Group>
      </div>
    </Box>
  );
}