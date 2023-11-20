import React, { useEffect } from "react";
import PropTypes from "prop-types";

import BestSelling from "@/components/bestSelling";
import CategoriesBrowse from "@/components/categoriesBrowse";
import FlashSale from "@/components/flashSale";
import NewArrival from "@/components/newArrival";
import OurProducts from "@/components/ourProducts";
import SaleHunter from "@/components/saleHunter";
import Services from "@/components/services";
import Slider from "@/components/slider";

import { categories } from "@/data/categoriesItems.jsx";
import { axiosServer } from "@/helper/axios/axiosServer";
import useKeySuggest from "@/store/keySuggest/useKeySuggest";

export default function Home({ products, bestSelling }) {
  const addKeySuggest = useKeySuggest((state) => state.addKeySuggest);

  useEffect(() => {
    if (products?.length > 0) {
      addKeySuggest(products);
    }
  }, [addKeySuggest, products]);

  return (
    <main className="">
      <section>
        <Slider />
      </section>

      <section>
        <FlashSale products={products} />
      </section>

      <section>
        <CategoriesBrowse categories={categories} />
      </section>

      <section>
        <BestSelling bestSelling={bestSelling} />
      </section>

      <section>
        <SaleHunter />
      </section>

      <section>
        <OurProducts products={products} />
      </section>

      <section>
        <NewArrival />
      </section>

      <section>
        <Services />
      </section>
    </main>
  );
}

Home.propTypes = {
  products: PropTypes.instanceOf(Array).isRequired,
  bestSelling: PropTypes.instanceOf(Array).isRequired,
};

export async function getServerSideProps() {
  try {
    const [response, bestSelling] = await Promise.all([
      axiosServer.get("https://fakestoreapi.com/products"),
      axiosServer.get("https://fakestoreapi.com/products?limit=4"),
    ]);

    // const [response, bestSelling] = await Promise.all([
    //   axiosServer.get("https://api.escuelajs.co/api/v1/products/?limit=20"),
    //   axiosServer.get("https://api.escuelajs.co/api/v1/products/?limit=4"),
    // ]);

    return {
      props: {
        products: response.data || [],
        bestSelling: bestSelling.data || [],
      },

      // revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    return {
      // notFound: true,
      props: {
        products: [],
        bestSelling: [],
      },
    };
  }
}
