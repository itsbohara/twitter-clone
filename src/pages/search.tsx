import SearchResultTabs from "@sections/search/SearchTabs";
import Nav from "@ui/Nav";
import Search from "@ui/Search";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "@hook/useAuth";
import Loading from "@ui/Loading";
export default function SearchPage() {
  const { query, push, isReady } = useRouter();
  const { isInitialized } = useAuth();
  const searchTerm = query["q"];
  useEffect(() => {
    if (!isReady) return;
    if (!searchTerm) push("/explore");
  }, []);
  const readyForSearching = isReady && isInitialized;
  const title = `${isReady ? `${searchTerm} -` : ""} Search / Twitter Clone`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="min-h-screen flex max-w-7xl mx-auto xl:grid xl:grid-cols-10 gap-5 max-sm:pb-4">
        <Nav />

        <main className="col-span-5 w-full border-x border-slate-200">
          <div className="sticky top-0 z-20 bg-white/75">
            <div className="px-2">
              <Search />
            </div>
          </div>
          {/* <div className="sticky px-2"></div> */}
          {/* <Header title="Home" /> */}
          {!readyForSearching && <Loading />}
          {readyForSearching && <SearchResultTabs query={searchTerm} />}
        </main>
      </div>
    </>
  );
}
