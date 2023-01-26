import Nav from "@ui/Nav";
import Search from "@ui/Search";
import Head from "next/head";
export default function Explore() {
  return (
    <>
      <Head>
        <title>Explore | Twitter Clone</title>
      </Head>

      <div className="min-h-screen flex max-w-7xl mx-auto xl:grid xl:grid-cols-10 gap-5">
        <Nav />

        <main className="col-span-5 w-full border-x border-slate-200">
          <div className="sticky px-2 top-0">
            <Search />
          </div>
          {/* <div className="sticky px-2"></div> */}
          {/* <Header title="Home" /> */}
        </main>
      </div>
    </>
  );
}
