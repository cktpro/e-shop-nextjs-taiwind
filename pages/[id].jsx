import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import ProductDetails from "@/components/productDetails";

import { axiosServer } from "@/helper/axios/axiosServer";

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

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta content={product.description} name="description" key="desc" />
        <meta content={product.name} property="og:title" />
        <meta content={product.description} property="og:description" />
        <meta content={product.image.location} property="og:image" />
      </Head>

      <section>
        <ProductDetails product={product} relatedItem={relatedItem} />;
      </section>
    </>
  );
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
      axiosServer.get(`/products/${params.id}`),
      axiosServer.get("/products?page=2&pageSize=4"),
    ]);

    return {
      props: {
        product: response.data.payload || {},
        relatedItem: relatedItem.data.payload || [],
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
