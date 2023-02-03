import SearchResultTabs from "@sections/search/SearchTabs";
import Nav from "@ui/Nav";
import Search from "@ui/Search";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function SearchPage() {
  const { query, push } = useRouter();
  useEffect(() => {
    if (!query["q"]) push("/explore");
  }, []);

  return (
    <>
      <Head>
        <title>{query["q"]} | Search / Twitter Clone</title>
      </Head>

      <div className="min-h-screen flex max-w-7xl mx-auto xl:grid xl:grid-cols-10 gap-5">
        <Nav />

        <main className="col-span-5 w-full border-x border-slate-200">
          <div className="sticky top-0 z-20 bg-white/75">
            <div className="px-2">
              <Search />
            </div>
          </div>
          {/* <div className="sticky px-2"></div> */}
          {/* <Header title="Home" /> */}
          <SearchResultTabs query={query["q"]} />
        </main>
      </div>
    </>
  );
}
