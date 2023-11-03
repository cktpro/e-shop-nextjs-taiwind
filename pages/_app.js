import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import Layout from "@/components/layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Exclusive</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.instanceOf(Object).isRequired,
  pageProps: PropTypes.instanceOf(Object).isRequired,
};
