import Search from "@ui/Search";
import Panel from "@ui/Panel";
import PanelItemTrends from "@ui/PanelItemTrends";
import Header from "@ui/Header";
import Button from "../components/Button";
import Link from "next/link";
import Footer from "@ui/Footer";
export default function GuestHome() {
  return (
    <>
      <main className="col-span-5 w-full border-x border-slate-200">
        <div className="px-4">
          <Search />
        </div>

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

      <aside className="col-span-3 hidden xl:flex flex-col w-[350px]">
        <div className="sticky top-0">
          <div className="new-to-panel mt-3 flex flex-col gap-y-2">
            <h2 className="text-xl font-bold">Welcome to Twitter Clone</h2>
            <Button href="/auth/login" intent="outline" center>
              <span>Login</span>
            </Button>
          </div>

          <hr className="mt-4" />

          <div className="new-to-panel mt-3 flex flex-col gap-y-2">
            <h2 className="text-xl font-bold">New to Twitter Clone?</h2>
            <p className="text-xs text-slate-700 font-medium">
              Sign up now to get your own personalized timeline!
            </p>

            <Button href="/auth/register" center>
              <span>Create account</span>
            </Button>

            <p className="text-xs text-slate-700 font-medium">
              By signing up, you agree to the
              <Link href="/legal/terms" className="text-[#1da1f2]">
                &nbsp;Terms of Service &nbsp;
              </Link>
              and
              <Link href="/legal/privacy" className="text-[#1da1f2]">
                {" "}
                Privacy Policy
              </Link>
              , including Cookie Use.
            </p>
          </div>
          <Footer />
        </div>
      </aside>
    </>
  );
}
