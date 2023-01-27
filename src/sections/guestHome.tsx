import Search from "@ui/Search";
import Panel from "@ui/Panel";
import PanelItemTrends from "@ui/PanelItemTrends";
import Header from "@ui/Header";
import Button from "../components/Button";
import Link from "next/link";
import Footer from "@ui/Footer";
import TwitterAuth from "./home/TwitterAuth";
import useScreenWidth from "../hooks/useScreenWidth";
export default function GuestHome() {
  const { isDesktop } = useScreenWidth();
  return (
    <>
      <main className="col-span-5 w-full border-x border-slate-200">
        <div className="px-4">
          <Search />
        </div>

        {isDesktop && (
          <div className="px-4 pb-2">
            <TwitterAuth />
          </div>
        )}

        <Panel title="Trends for you " href="/">
          <PanelItemTrends
            title="Next JS"
            category="Development"
            stat="57.5K"
          />
          <PanelItemTrends
            title="Next JS"
            category="Development"
            stat="57.5K"
          />
          <PanelItemTrends title="Figma" category="Design" stat="107.5K" />
          <PanelItemTrends title="Webflow" category="Design" stat="127.5K" />
          <PanelItemTrends
            title="Tailwind CSS"
            category="Development"
            stat="87.5K"
          />
          <PanelItemTrends title="Vercel" category="Development" stat="27.5K" />
        </Panel>

        <Header title="Entertainment" />
        <Header title="Sports" />
      </main>

      {!isDesktop && (
        <aside className="col-span-3 hidden xl:flex flex-col w-[350px]">
          <div className="sticky top-0">

            <TwitterAuth />
            <Footer />
          </div>
        </aside>
      )}
    </>
  );
}
