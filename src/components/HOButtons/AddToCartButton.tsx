import { useDebouncedCallback } from "@mantine/hooks";
import { Cart } from "../../types/DBTypes/Cart.type";
import { ProductOverviewType } from "../../types/DBTypes/Product.type"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Button, Group, ActionIcon, Text } from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { updateCartState } from "../../store/slices/user/userSlice";
import { cartUpdate } from "../../cache/cart/cartUpdate";

type Props = {
  product: ProductOverviewType
}
export default function AddToCartButton({ product }: Props) {

  const cart = useAppSelector((state) => state.user.cart);

  const dispatch = useAppDispatch();

  const debouncedCartUpdate = useDebouncedCallback(cartUpdate, 500);

  const isInCart = (product: ProductOverviewType) => {

    return cart && cart.length   > 0 && cart.findIndex((item) => product.productId === item.product.productId) !== -1;
  }

  const cartHandler = (product: ProductOverviewType, mode: "add" | "subtract") => {

    const idx = cart?.findIndex((item) => item.product.productId === product.productId);

    let newCart: Cart;

    switch (mode) {

      case "add":

        if (cart && idx !== -1) {

          newCart = cart!.map((item, itemIdx) => itemIdx === idx ? { ...item, quantity: item.quantity + 1 } : item);

        } else {

          newCart = cart ? [...cart, { product, quantity: 1 }] : [{ product, quantity: 1 }];

        }

        break;

      case "subtract":

        newCart = cart!.reduce((result, element) => {

          if (element.product.productId === product.productId) {

            if (element.quantity > 1)
              result.push({ ...element, quantity: element.quantity - 1 })

            return result;

          }

          result.push(element);

          return result;

        }, [] as Cart);

        break;

    }

    dispatch(updateCartState(newCart));

    debouncedCartUpdate(newCart, dispatch);

  }

  return (
    <>

      {!isInCart(product) ?
        <Button onClick={() => cartHandler(product, "add")} miw={100} w={"20%"} style={{ fontSize: 12 }} h={35}>
          Add to cart
        </Button>
        :
        <Group>

          <ActionIcon onClick={() => cartHandler(product, "add")}>
            <IconPlus />
          </ActionIcon>

          <Text>{cart![cart!.findIndex((item) => item.product.productId === product.productId)].quantity}</Text>

          <ActionIcon onClick={() => cartHandler(product, "subtract")}>
            <IconMinus />
          </ActionIcon>

        </Group>}

    </>
  )
}