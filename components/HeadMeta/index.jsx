import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

function HeadMeta(props) {
  const { title } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="E-shop kinh doanh điện thoại,laptop,tablet, phụ kiện với giá siêu tốt, bảo hành chính hãng và phục vụ chuyên nghiệp."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}

export default HeadMeta;
HeadMeta.propTypes = {
  title: PropTypes.string.isRequired,
};
