import { rem, Menu } from "@mantine/core";
import { IconUser, IconSettings, IconSearch, IconArrowsLeftRight, IconTrash, IconHeart, IconShoppingBag } from "@tabler/icons-react";
import { PropsWithChildren } from "react";
import { useAppDispatch } from "../../store/hooks";
import { logoutThunk } from "../../store/thunks/user/auth/logout.thunk";
import { useNavigate } from "react-router-dom";
// import { logout } from "../../store/slices/user/userSlice";

export const userContextMenuItems = [
    {
      name: "Profile",
      path: "/profile",
      icon: <IconUser style={{ width: rem(14), height: rem(14) }} />
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <IconSettings style={{ width: rem(14), height: rem(14) }} />
    },
    {
      name: "Search",
      path: "/search",
      icon: <IconSearch style={{ width: rem(14), height: rem(14) }} />
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: <IconHeart style={{ width: rem(14), height: rem(14) }} />
    },
    {
      name: "Cart",
      path: "/cart",
      icon: <IconShoppingBag style={{ width: rem(14), height: rem(14) }} />
    }
  ]
  
export default function UserContextMenu({ children }: PropsWithChildren) {
  
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
  
    const logoutHandler = () => {
  
      dispatch(logoutThunk());
    }
  
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          {children}
        </Menu.Target>
  
        <Menu.Dropdown>
  
          {
            userContextMenuItems.map((item, idx) => (
              <Menu.Item onClick={() => navigate(item.path)} key={idx} leftSection={item.icon}>
                {item.name}
              </Menu.Item>
            ))
          }
  
          <Menu.Divider />
  
          <Menu.Item onClick={logoutHandler}
            leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
          >
            Log out
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          >
            Delete my account
          </Menu.Item>
  
        </Menu.Dropdown>
      </Menu>
    );
  }