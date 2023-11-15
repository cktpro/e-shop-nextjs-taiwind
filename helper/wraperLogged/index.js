// withAuth.js
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const withAuth = (WrappedComponent) => {
  function Wrapper(props) {
    const router = useRouter();

    const { data: session, status } = useSession();
    useEffect(() => {
      console.log("««««« session »»»»»", session);
      if (status === "authenticated") router.push("/");
    }, [router, session, status]);

    return <WrappedComponent {...props} />;
  }

  return Wrapper;
};

export default withAuth;
