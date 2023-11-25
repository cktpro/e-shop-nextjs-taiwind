import React from "react";
import PropTypes from "prop-types";

import WishList from "@/components/wishList";

import { axiosServer } from "@/helper/axios/axiosServer";

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
    const wishList = await axiosServer.get("/products?page=3&pageSize=4");

    return {
      props: {
        wishList: wishList?.data?.payload || [],
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
