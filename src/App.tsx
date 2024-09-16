import "@mantine/core/styles.css";

import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./main.css"
import AppRoutes from "./AppRoutes";
import { useEffect } from "react";
import { isLoggedIn } from "./store/auth";
// import { refreshUserState, setUserState } from "./store/slices/user/userSlice";
import { Notifications } from "@mantine/notifications";
import { useAppDispatch } from "./store/hooks";
import { refreshUserStateThunk } from "./store/thunks/user/refreshUserState.thunk";
import { setUserState } from "./store/slices/user/userSlice";


export default function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {

    let abort: (reason?: string) => void;

    if(isLoggedIn()) {

      const retVal = dispatch(refreshUserStateThunk());

      abort = retVal.abort;

    } else {

      dispatch(setUserState({userLoading: false}));
    }

    return () => {
      abort();
    }
  }, [])

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">

      <Notifications position="bottom-center"/>
      <AppRoutes />

    </MantineProvider>
  )
}