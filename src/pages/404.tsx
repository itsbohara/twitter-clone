import Head from "next/head";
import Nav from "@ui/Nav";
import Button from "@ui/Button";
export default function Loading() {
  return (
    <>
      <Head>
        <title>Page not found | Twitter Clone</title>
        <meta name="description" content="Page not found | Twitter Clone" />
      </Head>
      <div className="min-h-screen flex max-w-7xl mx-auto xl:grid xl:grid-cols-10 gap-5">
        <Nav />
        <main className="col-span-5  flex-1 w-full flex-col">
          <div className=" h-full mt-7 text-center">
            <p className=" text-slate-700 font-medium mb-4">
              Hmm...this page doesn’t exist. Try searching for something else.
            </p>
            <Button href="/search" intent="main" center>
              <span>Search</span>
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}
