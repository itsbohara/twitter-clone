import Head from "next/head";
import Nav from "@ui/Nav";
import PageNotFound from "../components/NotFound";
export default function Page404() {
  return (
    <>
      <Head>
        <title>Page not found | Twitter Clone</title>
        <meta name="description" content="Page not found | Twitter Clone" />
      </Head>
      <div className="min-h-screen flex max-w-7xl mx-auto xl:grid xl:grid-cols-10 gap-5">
        <Nav />
        <main className="col-span-5  flex-1 w-full flex-col">
          <PageNotFound />
        </main>
      </div>
    </>
  );
}
