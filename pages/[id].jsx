import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import ProductDetails from "@/components/productDetails";

import { axiosUser } from "@/helper/axios";

function ProductDetailPage(props) {
  const { product, relatedItem } = props;

  const router = useRouter();

  useEffect(() => {
    if (Object.keys(product).length === 0) {
      router.push("/not-found");
    }
  }, [product, router]);

  if (Object.keys(product).length === 0 || relatedItem.length === 0) {
    return null;
  }

  return <ProductDetails product={product} relatedItem={relatedItem} />;
}

export default ProductDetailPage;

ProductDetailPage.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  relatedItem: PropTypes.instanceOf(Array).isRequired,
};

export async function getServerSideProps(req) {
  try {
    const { params } = req;

    const [response, relatedItem] = await Promise.all([
      axiosUser.get(`https://fakestoreapi.com/products/${params.id}`),
      axiosUser.get("https://fakestoreapi.com/products?limit=4"),
    ]);

    // const [response, relatedItem] = await Promise.all([
    //   axiosUser.get(`https://api.escuelajs.co/api/v1/products/${params.id}`),
    //   axiosUser.get("https://api.escuelajs.co/api/v1/products/?offset=10&limit=4"),
    // ]);

    return {
      props: {
        product: response.data || {},
        relatedItem: relatedItem.data || [],
      },
    };
  } catch (error) {
    return {
      // notFound: true,
      props: {
        product: {},
        relatedItem: [],
      },
    };
  }
}
