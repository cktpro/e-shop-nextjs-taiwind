import React from "react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import PropTypes from "prop-types";

import Layout from "@/components/layout";
import RouterLoader from "@/components/loader/routerLoader";

import "@/styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Exclusive</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <SessionProvider session={session} refetchOnWindowFocus={false} refetchWhenOffline={false}>
        <RouterLoader />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.instanceOf(Object).isRequired,
  pageProps: PropTypes.instanceOf(Object).isRequired,
};
