import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import ProductDetails from "@/components/productDetails";

function ProductDetailPage(props) {
  const { product, relatedItem } = props;

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

    const response = await axios.get(`https://fakestoreapi.com/products/${params.id}`);

    const relatedItem = await axios.get("https://fakestoreapi.com/products?limit=4");

    return {
      props: {
        product: response.data,
        relatedItem: relatedItem.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
