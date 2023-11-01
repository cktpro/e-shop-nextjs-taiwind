import React from "react";
import axios from "axios";
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

export default function Home({ products, bestSelling }) {
  return (
    <main className="subpixel-antialiased">
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
    const response = await axios.get("https://fakestoreapi.com/products");
    const bestSelling = await axios.get("https://fakestoreapi.com/products?limit=4");

    return {
      props: {
        products: response.data,
        bestSelling: bestSelling.data,
      },

      // revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
