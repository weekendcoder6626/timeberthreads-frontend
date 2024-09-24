import { useParams } from "react-router-dom"
import { addReviewAPI, getProductDetailedAPI, removeReviewAPI } from "../../api/product.api";
import { useState, useEffect, ChangeEvent } from "react";
import { isErrorResponse } from "../../api/resources/resources";
import { triggerNotification } from "../triggerNotification";
import { Divider, Grid, Group, Stack, Text, Image, Center, useMantineColorScheme, Rating, Button, Flex, Tabs, Avatar, Badge, Progress, Textarea, Menu } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconDotsVertical, IconTrashFilled, IconUser } from "@tabler/icons-react";
import { ProductDetailedType } from "../../types/DBTypes/Product.type";
import { useAppSelector } from "../../store/hooks";
import { Review } from "../../types/DBTypes/Review.type";
import AuthModal from "../LoginRegister/Reusable/AuthModal";
import { useDisclosure } from "@mantine/hooks";
import AddToCartButton from "../HOButtons/AddToCartButton";
import AddToWishlistButton from "../HOButtons/AddToWishlistButton";

interface ProductTabsProps {
    product: ProductDetailedType,
    ratingSplit: { [rating: number]: number },
    addReviewHandler: (review: Review) => Promise<void>,
    removeReviewHandler: (review: Review) => Promise<void>,
    reviewLoading: boolean,
}

function ProductTabs({ product, ratingSplit, addReviewHandler, removeReviewHandler, reviewLoading }: ProductTabsProps) {

    const [activeTab, setActiveTab] = useState<string | null>("description");

    const [rating, setRating] = useState(0);

    const [review, setReview] = useState("");

    const email = useAppSelector((state) => state.user.email);

    const loggedIn = useAppSelector((state) => state.user.loggedIn);

    const setReviewHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    }

    const submitAddHandler = async (review: Review) => {

        if (product.reviews?.findIndex((rev) => rev.email === email) !== -1) {
            triggerNotification("You have already posted a review for this product!");
            return;
        }

        if (loggedIn) {
            setRating(0);
            setReview("");
        }

        await addReviewHandler(review);

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

                                        <Text>{(ratingSplit[r]).toFixed(2)}%</Text>

                                    </Group>

                                )
                            })
                        }

                    </Stack>

                    <Divider />

                    <Text component="h1" fw={600} fz={25} mb={10}>Reviews</Text>

                    {
                        !!product.reviews && product.reviews.length > 0 ?
                            product.reviews.map((review, idx) => (

                                <Stack key={idx}>

                                    <Flex gap={14} direction={{ base: "column", md: "row" }} align="flex-start">
                                        <Avatar src={review.profilePic} />
                                        <Stack gap={0}>
                                            <Group gap={-10}>

                                                <Text component="h1" c={review.email === email ? "brand" : ""}>{review.username}</Text>

                                                <Menu shadow="md" width={200}>
                                                    <Menu.Target>
                                                        <IconDotsVertical cursor={"pointer"} size={17}  />
                                                    </Menu.Target>

                                                    <Menu.Dropdown>

                                                        <Menu.Item leftSection={
                                                            <IconUser size={17} />
                                                        }>
                                                            Go to Profile
                                                        </Menu.Item>

                                                        {review.email === email && <Menu.Item onClick={(() => removeReviewHandler({
                                                            email,
                                                            rating: review.rating,
                                                        }))} color="red" leftSection={
                                                            <IconTrashFilled size={17} />
                                                        }>
                                                            Delete review
                                                        </Menu.Item>}

                                                    </Menu.Dropdown>
                                                </Menu>

                                            </Group>


                                            <Rating value={review.rating} fractions={2} readOnly my={10} />
                                            <Text>{review.review}</Text>
                                        </Stack>
                                    </Flex>


                                    <Divider my={20} />

                                </Stack>

                            ))

                            :

                            <Stack>

                                <Text fw={200} mt={-15}>No reviews!</Text>

                                <Divider my={20} />

                            </Stack>
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
                                onChange={(e) => setReviewHandler(e)}
                                variant="default"
                            />

                            {!reviewLoading
                                ?
                                <Button w={100} disabled={rating === 0} onClick={(() => submitAddHandler({
                                    email,
                                    rating,
                                    review
                                }))}>
                                    Submit
                                </Button>
                                :
                                <Button variant="transparent" loading />}

                        </Stack>

                    </Stack>

                </Stack>

            </Tabs.Panel>
        </Tabs>
    )
}

export default function ProductDetailed() {

    const params = useParams();

    const [authModalOpened, { open: authModalOpen, close: authModalClose }] = useDisclosure();

    const { colorScheme } = useMantineColorScheme();

    const [product, setProduct] = useState(null as ProductDetailedType | null);

    const [ratingSplit, setRatingSplit] = useState<{ [rating: string]: number }>({});

    const [loading, setLoading] = useState(true);
    const [error, seterror] = useState(false);

    const loggedIn = useAppSelector((state) => state.user.loggedIn);

    const [reviewLoading, setReviewLoading] = useState(false);

    useEffect(() => {

        const controller = new AbortController();

        (async () => {

            try {

                setLoading(true);

                const response = await getProductDetailedAPI(params.id as string, controller.signal);

                if (isErrorResponse(response))
                    throw new Error(response.message);

                setProduct(response.payload as ProductDetailedType);
                setLoading(false);

            } catch (e: any) {

                triggerNotification(e?.message || "Some error occured");
                seterror(true);
                setProduct(null);

            }
        })();

        return () => controller.abort();

    }, []);

    useEffect(() => {

        if (!product)
            return;

        const ratingCalc: { [rating: string]: number } = {};

        product?.reviews?.forEach((rev) => {

            if (!ratingCalc[rev.rating]) {

                ratingCalc[rev.rating] = 1;
                return;

            }

            ratingCalc[rev.rating]++;

        });

        Object.keys(ratingCalc).forEach((rate) => {

            const r = ratingCalc[parseFloat(rate)];

            const perc = r / (product.reviews?.length || 1);

            ratingCalc[rate] = perc * 100;

        });

        setRatingSplit(ratingCalc);

    }, [product]);

    const addReviewHandler = async (review: Review) => {

        try {

            if (reviewLoading)
                return;

            if (!loggedIn) {

                authModalOpen();
                return;

            }

            setReviewLoading(true);

            const res = await addReviewAPI(product!.productId, review);

            if (isErrorResponse(res)) {

                throw new Error(res.message);

            }

            setProduct((prev) => ({
                ...prev!,
                reviews: res.payload.reviews,
                rating: res.payload.rating
            }));

            setReviewLoading(false);

            triggerNotification("Review added");

        } catch (e: any) {

            setReviewLoading(false);
            triggerNotification(e?.message || "Some error occurred");

        }

    }

    const removeReviewHandler = async (review: Review) => {

        try {

            if (reviewLoading)
                return;

            if (!loggedIn) {

                authModalOpen();
                return;

            }


            setReviewLoading(true);

            const res = await removeReviewAPI(product!.productId, review.email);

            if (isErrorResponse(res)) {

                throw new Error(res.message);

            }

            setProduct((prev) => ({
                ...prev!,
                reviews: res.payload.reviews,
                rating: res.payload.rating
            }))

            setReviewLoading(false);

            triggerNotification("Review removed");

        } catch (e: any) {

            setReviewLoading(false);
            triggerNotification(e?.message || "Some error occurred");

        }

    }

    return (
        <>

            <AuthModal modalProps={
                {
                    opened: authModalOpened,
                    onClose: authModalClose,
                }
            } />

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

                                        <AddToCartButton product={product} />

                                        <AddToWishlistButton product={product} />

                                    </Flex>

                                </Stack>

                                <Divider />

                                <Stack gap={10}>

                                    {product.discountPercent && product.discountPercent !== 0 ? <Text fw={400} style={{ fontSize: 17, color: colorScheme === "dark" ? "#fd9696" : "#ff5c5c" }}>-{product.discountPercent}% Offer</Text> : null}

                                    <Group gap={5}>

                                        <Text style={{ textDecoration: product.discountPercent && product.discountPercent !== 0 ? "line-through" : "none" }}>₹{product.price}</Text>

                                        {product.discountPercent && product.discountPercent !== 0 ? <Text>₹
                                            {
                                                parseFloat((product.price * ((100 - product.discountPercent) / 100)).toFixed(2))
                                            }</Text> : null}

                                    </Group>

                                    <Text>
                                        {product.productDesc}
                                    </Text>
                                </Stack>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <ProductTabs product={product} ratingSplit={ratingSplit} addReviewHandler={addReviewHandler} removeReviewHandler={removeReviewHandler} reviewLoading={reviewLoading} />
                        </Grid.Col>
                    </Grid>
                    :
                    error ? <Center>Oops something went wrong</Center> : null
            }

        </>
    );
}