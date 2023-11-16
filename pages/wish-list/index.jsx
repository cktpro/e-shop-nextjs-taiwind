import React from "react";
import PropTypes from "prop-types";

import WishList from "@/components/wishList";

import { axiosUser } from "@/helper/axios";

function WhishListPage(props) {
  const { wishList } = props;

  return <WishList wishList={wishList} />;
}

export default WhishListPage;

WhishListPage.propTypes = {
  wishList: PropTypes.instanceOf(Array).isRequired,
};

export async function getServerSideProps() {
  try {
    const wishList = await axiosUser.get("https://fakestoreapi.com/products?limit=4");

    // const wishList = await axiosUser.get("https://api.escuelajs.co/api/v1/products/?offset=10&limit=4");

    return {
      props: {
        wishList: wishList?.data || [],
      },

      // revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    return {
      // notFound: true,
      wishList: [],
    };
  }
}
