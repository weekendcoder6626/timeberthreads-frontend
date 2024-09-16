import { useParams } from "react-router-dom"
import { getProductDetailedAPI } from "../../api/product.api";
import { useState, useEffect, ChangeEventHandler } from "react";
import { isErrorResponse } from "../../api/resources/resources";
import { triggerNotification } from "../triggerNotification";
import { Divider, Grid, Group, Stack, Text, Image, Center, useMantineColorScheme, Rating, ActionIcon, Button, Flex, Tabs, Avatar, Badge, Progress, Textarea } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { ProductDetailedType, ProductOverviewType } from "../../types/DBTypes/Product.type";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addProductToWishListThunk } from "../../store/thunks/user/wishlist/addProductToWishList.thunk";
import { removeProductFromWishListThunk } from "../../store/thunks/user/wishlist/removeProductFromWishList.thunk";

interface ProductTabsProps {
    product: ProductDetailedType,
    ratingSplit: { [rating: number]: number }
}

function ProductTabs({ product, ratingSplit }: ProductTabsProps) {

    const [activeTab, setActiveTab] = useState<string | null>("description");

    const [rating, setRating] = useState(0);
    // const [readOnly, setReadOnly] = useState(false);

    const [review, setReview] = useState("");

    const setReviewHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) => {

        setReview(e.target.value);

    }

    const submitHandler = () => {

        console.log(rating, review);

    }

    return (
        <Tabs h={"100%"} w={"100%"} value={activeTab} onChange={setActiveTab}>
            <Tabs.List w={"100%"} mb={50}>

                <Tabs.Tab value="description">Description</Tabs.Tab>
                <Tabs.Tab value="reviews">Reviews</Tabs.Tab>

            </Tabs.List>

            <Tabs.Panel h={"100%"} w={"100%"} m={-20} value="description">

                <Stack mx={20}>

                    <Text component="h1" fw={600} fz={30} mb={-10} mt={-20}>Features</Text>

                    {
                        <ul>

                            {product.productFeatures?.map((feature, idx) => (
                                <li key={idx} style={{ marginBottom: 10 }}>{feature}</li>
                            ))}

                        </ul>
                    }

                </Stack>

            </Tabs.Panel>

            <Tabs.Panel h={"100%"} w={"100%"} m={-10} value="reviews">

                <Stack mx={20}>

                    <Text component="h1" fw={600} fz={30} mb={-10} mt={-20}>Customer Feedback</Text>

                    <Stack>

                        {
                            Object.keys(ratingSplit).map((rating, idx) => {

                                const r = parseFloat(rating);

                                return (

                                    <Group key={idx}>

                                        <Progress w={{ base: 100, md: 200 }} value={ratingSplit[r]} />

                                        <Rating value={r} fractions={2} readOnly my={10} />

                                        <Text>{ratingSplit[r]}%</Text>

                                    </Group>

                                )
                            })
                        }

                    </Stack>

                    <Divider />

                    <Text component="h1" fw={600} fz={25} mb={10}>Reviews</Text>

                    {
                        product.reviews?.map((review, idx) => (

                            <Stack key={idx}>

                                <Flex gap={14} direction={{ base: "column", md: "row" }} align="flex-start">
                                    <Avatar src={review.profilePic} />
                                    <Stack gap={0}>
                                        <Text component="h1">{review.username}</Text>
                                        <Rating value={review.rating} fractions={2} readOnly my={10} />
                                        <Text>{review.review}</Text>
                                    </Stack>
                                </Flex>

                                <Divider my={20} />

                            </Stack>

                        ))
                    }

                    <Text fw={600} fz={25} mt={-10}>Write a review</Text>

                    <Stack gap={0}>

                        <Group>

                            <Rating value={rating} onChange={setRating} fractions={2} my={10} />

                            <Text>({rating})</Text>

                        </Group>

                        <Stack w={{ base: "100%", md: 500 }} gap={13}>

                            <Textarea
                                placeholder="Your review"
                                label="Write a review"
                                w={"100%"}
                                autosize
                                minRows={2}
                                value={review}
                                onChange={setReviewHandler}
                                variant="default"
                            />

                            <Button w={100} onClick={submitHandler}>Submit</Button>

                        </Stack>

                    </Stack>

                </Stack>

            </Tabs.Panel>
        </Tabs>
    )
}

export default function ProductDetailed() {

    const params = useParams();

    const { colorScheme } = useMantineColorScheme();

    const [product, setProduct] = useState(null as ProductDetailedType | null);

    const [ratingSplit, setRatingSplit] = useState<{ [rating: string]: number }>({});

    const [loading, setLoading] = useState(true);
    const [error, seterror] = useState(false);

    const wishlist = useAppSelector((state) => state.user.wishlist);
    const wishlistLoading = useAppSelector((state) => state.user.wishlistLoading);

    const dispatch = useAppDispatch();

    const isWishlist = (productId: string) => !!wishlist && wishlist.findIndex((prod) => prod.productId === productId) !== -1;

    const wishListHandler = (product: ProductOverviewType) => {

        return () => {

            if(wishlistLoading)
                return;

            if (isWishlist(product.productId)) {

                dispatch(removeProductFromWishListThunk({ productId: product.productId }));

            } else {

                dispatch(addProductToWishListThunk({ product }));

            }

        }

    }

    useEffect(() => {

        const controller = new AbortController();

        (async () => {

            const response = await getProductDetailedAPI(params.id as string, controller.signal);

            if (isErrorResponse(response)) {

                triggerNotification(response.message);
                seterror(true);
                setProduct(null);

            }
            else {

                setProduct(response.payload as ProductDetailedType)
            }
        })();

        return () => controller.abort();

    }, []);

    useEffect(() => {

        if (!product)
            return;

        setTimeout(() => {
            setLoading(false);
        }, 500);

        const rating: { [rating: string]: number } = {};

        product?.reviews?.map((rev) => {

            if (!rating[rev.rating]) {

                rating[rev.rating] = 1;
                return;

            }

            rating[rev.rating]++;

        });

        Object.keys(rating).map((rate) => {

            const r = parseFloat(rate);

            const perc = r / (product.reviews?.length || 1);

            rating[r] = perc * 100;

        })

        setRatingSplit(rating);

    }, [product])

    return (
        <>
            {
                !loading && !error && product
                    ?
                    <Grid mt={'xl'} mx={{ base: 10, md: 100, xl: 200 }}>
                        <Grid.Col span={{ base: 12, lg: 6, xl: 6 }}>

                            <Carousel
                                withIndicators
                                loop
                                slideSize={"100%"}
                                height={300}
                                bg={colorScheme === "light" ? "gray.8" : "dark"}
                            >
                                {
                                    product.largeImage && product.largeImage[0]
                                        ?
                                        product.largeImage.map((img, idx) => (

                                            <Carousel.Slide key={idx}>

                                                <Center>

                                                    <Image
                                                        p={10}
                                                        // style={{ boxShadow: "#ff0000 0px 5px 15px;" }}
                                                        src={img}
                                                        w="100%"
                                                        fit="contain"
                                                        h="300"
                                                        radius={15}
                                                        alt={product.productName || 'Norway'}
                                                    />

                                                </Center>

                                            </Carousel.Slide>

                                        ))
                                        :
                                        <Carousel.Slide>

                                            <Center>

                                                <Image
                                                    src={'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
                                                    w="auto"
                                                    fit="contain"
                                                    h={300}
                                                    radius={10}
                                                    alt={'Norway'} />

                                            </Center>

                                        </Carousel.Slide>
                                }

                            </Carousel>

                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 6 }}>
                            <Stack>
                                <Stack gap={0}>

                                    <Text fw={500} style={{ fontSize: 30 }}>
                                        {product.productName}
                                    </Text>

                                    <Text fw={500} style={{ fontSize: 14, color: 'var(--mantine-color-brand-7)' }}>
                                        Seller: {product.sellerName}
                                    </Text>

                                    {product.featured === 1 && <Badge ml={-2} mt={10} size="xs">Featured</Badge>}

                                    <Rating value={product.rating} fractions={2} readOnly my={10} />

                                    <Flex mt={2} gap={10}>

                                        <Button miw={100} w={"20%"} style={{ fontSize: 12 }} h={35}>
                                            Add to cart
                                        </Button>

                                        <ActionIcon onClick={wishListHandler(product)} variant="transparent" radius={0} h={35} w={40}>
                                            {!isWishlist(product.productId) ? <IconHeart /> : <IconHeartFilled />}
                                        </ActionIcon>

                                    </Flex>

                                </Stack>

                                <Divider />

                                <Stack gap={10}>

                                    {product.discountPercent && product.discountPercent !== 0 ? <Text fw={400} style={{ fontSize: 17, color: colorScheme === "dark" ? "#fd9696" : "#ff5c5c" }}>-{product.discountPercent}% Offer</Text> : null}

                                    <Group gap={5}>

                                        <Text style={{ textDecoration: product.discountPercent && product.discountPercent !== 0 ? "line-through" : "none" }}>₹{product.price}</Text>

                                        {product.discountPercent && product.discountPercent !== 0 ? <Text>₹
                                            {
                                                parseFloat((product.price * ((100 - product.discountPercent) / 100)).toPrecision(5))
                                            }</Text> : null}

                                    </Group>

                                    <Text>
                                        {product.productDesc}
                                    </Text>
                                </Stack>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <ProductTabs product={product} ratingSplit={ratingSplit} />
                        </Grid.Col>
                    </Grid>
                    :
                    error ? <Center>Oops something went wrong</Center> : null
            }

        </>
    );
}