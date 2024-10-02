import { Grid, Card, Skeleton, Group, Button, Flex, Stack, Badge, Rating, Box, Center, Text, useMantineTheme, Title, Divider } from '@mantine/core';
import AddToCartButton from '../HOButtons/AddToCartButton';
import AddToWishlistButton from '../HOButtons/AddToWishlistButton';
import classes from './ProductList.module.css';
import { ProductOverviewType } from '../../types/DBTypes/Product.type';
import CheckoutButton from '../HOButtons/CheckoutButton';
import { useAppSelector } from '../../store/hooks';

const numberSkeleton = 4;
const skeletonArray = Array(numberSkeleton).fill(0);

type ListMode = "feed" | "wishlist" | "cart"

type Props = {

    products: ProductOverviewType[];
    loading: boolean,
    error: boolean,
    clickHandler: (productId: string) => void,
    mode?: ListMode

}

export default function ProductList({ products, loading, error, mode = "feed", clickHandler }: Props) {

    const theme = useMantineTheme();

    const cart =  mode === "cart" ? useAppSelector((state) => state.user.cart) : null;

    const totalPricePerProduct = cart?.map((item) => ({
        productId: item.product.productId,
        price: item.product.price * item.quantity
    }));

    const totalDiscountedPricePerProduct = cart?.map((item) => ({
        productId: item.product.productId,
        price: !!item.product.discountPercent && item.product.discountPercent !== 0 ?
            parseFloat((item.product.price * ((100 - item.product.discountPercent) / 100) * item.quantity).toFixed(2))  : item.product.price * item.quantity
    }))

    const deliveryCharge = 70;

    const itemsPrice = totalPricePerProduct?.reduce((result, item) => result + item.price, 0) || 0;
    const discountedItemsPrice = totalDiscountedPricePerProduct?.reduce((result, item) => result + item.price, 0) || 0;

    // Skeleton
    const skeleton =
        (
            skeletonArray.map((_, idx) => (

                <Grid.Col key={idx} span={12}>

                    <Card shadow="sm" padding="lg" radius="md" className={classes.card} withBorder>

                        <Card.Section mb={20}>

                            <Skeleton h={160} />

                        </Card.Section>

                        <Group justify="space-between" mb="xs">

                            <Skeleton w={100} h={20} />

                            <Skeleton w={70} h={20} radius={20} />

                        </Group>

                        <Group>

                            <Skeleton w={40} h={16} />

                        </Group>

                        <Skeleton w={120} h={16} mt={10} />

                        <Button disabled fullWidth mt="md" radius="md">
                            Add to cart
                        </Button>

                    </Card>

                </Grid.Col>

            ))
        );

    const MainCard = (
        products && products.map((product, idx) => {

            const onSale = !!product.discountPercent && product.discountPercent !== 0;

            return (

                <Grid.Col key={idx} span={12}>

                    <Card shadow="sm" padding="lg" radius="md" className={classes.card} withBorder>

                        <Flex direction={{ base: "column", sm: "row" }}>

                            <img
                                onClick={() => clickHandler(product.productId)}
                                src={product.smallImage || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
                                height={"160px"}
                                width={"160px"}
                                style={{
                                    objectFit: "contain",
                                    borderRadius: 20,
                                    cursor: "pointer"
                                }}
                                alt={product.productName || 'Norway'}
                            />

                            <Stack gap={0} ml={{ base: 0, sm: 20 }} mt={{ base: 20, md: 0 }}>

                                <Stack onClick={() => clickHandler(product.productId)} className={classes.productLink} justify="space-between" align="flex-start" mb="xs" gap={0}>

                                    <Text fw={500}>{product.productName}</Text>
                                    <Text size="sm" style={{ color: 'var(--mantine-color-brand-7)' }} fw={500}>Seller: {product.sellerName}</Text>
                                    {product.featured === 1 && mode !== "cart" && <Badge ml={-2} mt={10} size="xs">Featured</Badge>}

                                </Stack>

                                <Flex direction={"row"} gap={5} style={{ cursor: "pointer" }} onClick={() => clickHandler(product.productId)}>

                                    {
                                        mode !== "cart"
                                            ?
                                            <>

                                                <Text style={{ textDecoration: onSale ? "line-through" : "none" }}>₹{product.price}</Text>

                                                {onSale ? <Text>{
                                                    "₹" + parseFloat((product.price * ((100 - product.discountPercent) / 100)).toFixed(2))
                                                }</Text> : <Text>&zwnj;</Text>}

                                            </>
                                            :
                                            <>

                                                <Text style={{ textDecoration: onSale ? "line-through" : "none" }}>₹{(totalPricePerProduct?.filter((item) => item.productId === product.productId)[0]?.price)?.toFixed(2)}</Text>

                                                {onSale ? <Text>{
                                                    "₹" + (totalDiscountedPricePerProduct?.filter((item) => item.productId === product.productId)[0]?.price)?.toFixed(2)
                                                }</Text> : <Text>&zwnj;</Text>}

                                            </>
                                    }

                                </Flex>

                                <Rating value={product.rating} fractions={2} readOnly my={10} />

                                <Flex mt={2} gap={10}>

                                    <AddToCartButton product={product} />

                                    {mode !== "cart" ? <AddToWishlistButton product={product} /> : null}

                                </Flex>

                            </Stack >

                        </Flex>

                        <Card.Section pt={20}>

                            {onSale && mode !== "cart" ?
                                <Box w={"100%"} h={20} bg={theme.colors.brand[(theme.primaryShade as number) - 2]}>

                                    <Center pt={2}>

                                        <Text style={{ fontSize: 10 }} c={"#E9E9E9"}>

                                            On Sale

                                        </Text>

                                    </Center>

                                </Box>
                                :
                                null}

                        </Card.Section>

                    </Card>

                </Grid.Col>

            )
        })
    )

    return (

        <Stack mt={'xl'} mx={{ base: 10, md: 100, xl: 300 }}>

            {!error ? <Grid>

                {loading ? skeleton : MainCard}

                {mode === "cart" &&

                    <Grid.Col span={12} >

                        <Center>

                            <Card w={{ base: "100%", md: "50%" }} shadow="lg" radius={0} padding="lg" className={classes.card} withBorder>

                                <Card.Section>
                                    <Center py={6}>

                                        <Title fz={"h3"}>Order summary</Title>

                                    </Center>

                                    <Divider />

                                </Card.Section>

                                <Stack pt={8} align='center' gap={8}>

                                    <Group gap={8}>

                                        <Text>Items:</Text>
                                        <Text>₹{
                                            (discountedItemsPrice).toFixed(2)
                                        }</Text>

                                    </Group>

                                    <Group gap={8}>

                                        <Text>Delivery:</Text>
                                        <Text>₹70</Text>

                                    </Group>

                                    <Group gap={8}>

                                        <Text>Total:</Text>
                                        <Text>₹{
                                            (discountedItemsPrice + deliveryCharge).toFixed(2)
                                        }</Text>

                                    </Group>

                                    <Group gap={8}>

                                        <Text>You saved ₹{(itemsPrice - discountedItemsPrice).toFixed(2)} in this order</Text>

                                    </Group>

                                </Stack>

                                <Card.Section pt={10}>

                                    <CheckoutButton disabled={loading} />

                                </Card.Section>

                            </Card>

                        </Center>

                    </Grid.Col>

                }

            </Grid> :
                <div>Oops! Some error occured</div>
            }

        </Stack>

    )
}