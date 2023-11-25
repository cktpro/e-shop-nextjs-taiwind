import React from "react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import PropTypes from "prop-types";

import Layout from "@/components/layout";
import RouterLoader from "@/components/loader/routerLoader";

import "@/styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>E-Shop | specializes in technology sales</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <SessionProvider session={session} refetchOnWindowFocus={false} refetchWhenOffline={false}>
        <RouterLoader />
        <Layout>
          {getLayout(<Component {...pageProps} />)}
          {/* <Component {...pageProps} /> */}
        </Layout>
        {/* {getLayout(<Component {...pageProps} />)} */}
      </SessionProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.instanceOf(Object).isRequired,
  pageProps: PropTypes.instanceOf(Object).isRequired,
};
