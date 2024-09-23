import { useEffect, useState } from "react"
import { getAllProductsOverviewAPI } from "../../api/product.api";
import { isErrorResponse } from "../../api/resources/resources";
import { triggerNotification } from "../triggerNotification";
import { Button, Card, Grid, Group, Text, Skeleton, Center, Rating, Flex, Box, useMantineTheme, Stack, Badge } from "@mantine/core";

import classes from './Explore.module.css'
import { useNavigate } from "react-router-dom";
import { ProductOverviewType } from "../../types/DBTypes/Product.type";
import AddToCartButton from "../HOButtons/AddToCartButton";
import AddToWishlistButton from '../HOButtons/AddToWishlistButton'

const numberSkeleton = 4;
const skeletonArray = Array(numberSkeleton).fill(0);

export default function Explore() {

  const navigate = useNavigate();

  const theme = useMantineTheme();

  const [products, setProducts] = useState([] as ProductOverviewType[]);

  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {

    const controller = new AbortController();

    (async () => {

      try {

        setLoading(true);

        const response = await getAllProductsOverviewAPI(controller.signal);

        if (isErrorResponse(response))
          throw new Error(response.message);

        setProducts(response.payload as ProductOverviewType[])
        setLoading(false)

      } catch (e: any) {

        setProducts([]);
        triggerNotification(e?.message || "Some error occured");
        seterror(true);

      }

    })();

    return () => controller.abort();

  }, []);

  const detailedViewHandler = (productID: string) => {

    return () => navigate("/product/" + productID);

  }

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
                onClick={detailedViewHandler(product.productId)}
                src={product.smallImage || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
                height={"160px"}
                style={{
                  objectFit: "contain",
                  borderRadius: 20,
                  cursor: "pointer"
                }}
                alt={product.productName || 'Norway'}
              />

              <Stack gap={0} ml={{ base: 0, md: 20 }} mt={{ base: 20, md: 0 }}>

                <Stack onClick={detailedViewHandler(product.productId)} className={classes.productLink} justify="space-between" align="flex-start" mb="xs" gap={0}>

                  <Text fw={500}>{product.productName}</Text>
                  <Text size="sm" style={{ color: 'var(--mantine-color-brand-7)' }} fw={500}>Seller: {product.sellerName}</Text>
                  {product.featured === 1 && <Badge ml={-2} mt={10} size="xs">Featured</Badge>}

                </Stack>

                <Flex direction={"row"} gap={5} style={{ cursor: "pointer" }} onClick={detailedViewHandler(product.productId)}>

                  <Text style={{ textDecoration: onSale ? "line-through" : "none" }}>₹{product.price}</Text>

                  {onSale ? <Text>₹{
                    parseFloat((product.price * ((100 - product.discountPercent) / 100)).toPrecision(5))
                  }</Text> : <Text>&zwnj;</Text>}

                </Flex>

                <Rating value={product.rating} fractions={2} readOnly my={10} />

                <Flex mt={2} gap={10}>

                  <AddToCartButton product={product} />

                  <AddToWishlistButton product={product} />

                </Flex>

              </Stack >

            </Flex>

            <Card.Section pt={20}>

              {onSale ?
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

      </Grid> :
        <div>Oops! Some error occured</div>
      }

    </Stack>

  )
}