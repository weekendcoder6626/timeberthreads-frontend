import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Outlet } from 'react-router-dom';
import { HeaderMegaMenu } from './Nav/Header/HeaderMegaMenu';
import Drawer from './Nav/Drawer/Drawer';
import classes from './MainRoute.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
// import { setUserState } from '../store/slices/user/userSlice';
import { triggerNotification } from './triggerNotification';
import { setUserState } from '../store/slices/user/userSlice';

const headerBreakpoint = 'sm';

export default function MainRoute() {

  const [opened, disclosure] = useDisclosure();

  const message = useAppSelector((state) => state.user.message);

  const dispatch = useAppDispatch();

  useEffect(() => {

    if (!message) return;

    triggerNotification(message);

    dispatch(setUserState({ message: null }));

  }, [message])

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      padding="0"
    >
      <AppShell.Header className={classes.header}>
        <HeaderMegaMenu breakpoint={headerBreakpoint} drawerOpened={opened} disclosure={disclosure} />
      </AppShell.Header>

      <AppShell.Navbar p={"md"} hiddenFrom={headerBreakpoint}>
        <Drawer disclosure={disclosure}/>
      </AppShell.Navbar>

      <AppShell.Main className={classes.container}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
