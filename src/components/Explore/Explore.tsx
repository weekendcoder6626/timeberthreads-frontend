import { useEffect, useState } from "react"
import { getAllProductsOverviewAPI } from "../../api/product.api";
import { isErrorResponse } from "../../api/resources/resources";
import { triggerNotification } from "../triggerNotification";

import { useNavigate } from "react-router-dom";
import { ProductOverviewType } from "../../types/DBTypes/Product.type";
import ProductList from "../ProductList/ProductList";

export default function Explore() {

  const navigate = useNavigate();

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
        triggerNotification(e?.message);
        seterror(true);

      }

    })();

    return () => controller.abort();

  }, []);

  const clickHandler = (productID: string) => {

    navigate("/product/" + productID);

  }

  return (

    <ProductList products={products} loading={loading} error={error} clickHandler={clickHandler} />

  )
}