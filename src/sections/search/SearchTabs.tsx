import * as TabsPrimitive from "@radix-ui/react-tabs";
import cx from "classnames";
import SearchResults from "./SearchResults";

const tabs = [
  { key: "top", name: "Top" },
  { key: "latest", name: "Latest" },
  { key: "people", name: "People" },
  { key: "photos", name: "Photos" },
  { key: "videos", name: "Videos" },
];

const SearchResultTabs = ({ query }) => (
  <TabsPrimitive.Root className="TabsRoot" defaultValue="people">
    <TabsPrimitive.List className="TabsList flex w-full bg-white border-b border-b-slate-200">
      {tabs.map((tab, i) => (
        <>
          <TabsPrimitive.Trigger
            value={tab.key}
            className={cx(
              "TabsTrigger group hover:bg-slate-100",
              "radix-state-active:bg-red-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-green-500 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-900 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800",
              "px-6 max-md:px-4 font-semibold text-slate-500",
              "focus:radix-state-active:border-b-red",
              "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            )}
          >
            <div className="py-4 relative h-full ">
              <div>{tab.name}</div>
              <span className="h-1 w-full bg-transparent absolute left-0 bottom-0 rounded-full"></span>
            </div>
          </TabsPrimitive.Trigger>
        </>
      ))}
    </TabsPrimitive.List>

    {tabs.map((tab, i) => (
      <>
        <TabsPrimitive.Content value={tab.key} className="TabsContent ">
          <SearchResults tabKey={tab.key} query={query} />
        </TabsPrimitive.Content>
      </>
    ))}
  </TabsPrimitive.Root>
);

export default SearchResultTabs;
