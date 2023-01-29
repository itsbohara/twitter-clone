import AppLoading from "@ui/AppLoading";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Home() {
  const { push } = useRouter();
  useEffect(() => {
    // nav to home route
    push("/");
  }, []);
  return (
    <>
      <Head>
        <title>Home | Twitter Clone</title>
      </Head>
      <AppLoading />
    </>
  );
}
