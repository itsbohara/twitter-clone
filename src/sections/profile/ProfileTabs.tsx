import * as TabsPrimitive from "@radix-ui/react-tabs";
import cx from "classnames";
import TweetForm from "@ui/TweetForm";
import Feed from "@ui/Feed";
import UserTweets from "./UserTweets";

const ProfileTabs = ({ username }) => (
  <TabsPrimitive.Root className="TabsRoot" defaultValue="tab1">
    <TabsPrimitive.List className="TabsList flex w-full bg-white border-b border-b-slate-200">
      <TabsPrimitive.Trigger
        value="tab1"
        className={cx(
          "TabsTrigger group hover:bg-slate-100",
          "radix-state-active:bg-red-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-green-500 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-900 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800",
          "px-6 max-md:px-4 font-semibold text-slate-500",
          "focus:radix-state-active:border-b-red",
          "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        )}
      >
        <div className="py-4 relative h-full ">
          <div>Tweets</div>
          <span className="h-1 w-full bg-transparent absolute left-0 bottom-0 rounded-full"></span>
        </div>
      </TabsPrimitive.Trigger>
      <TabsPrimitive.Trigger
        value="tab2"
        className={cx(
          "TabsTrigger group hover:bg-slate-100",
          "radix-state-active:bg-red-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-green-500 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-900 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800",
          "px-6 max-md:px-4 font-semibold text-slate-500",
          "focus:radix-state-active:border-b-red",
          "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        )}
      >
        <div className="py-4 relative h-full ">
          <div>Tweets & replies</div>
          <span className="h-1 w-full bg-transparent absolute left-0 bottom-0 rounded-full"></span>
        </div>
      </TabsPrimitive.Trigger>
      <TabsPrimitive.Trigger
        value="media"
        className={cx(
          "TabsTrigger group hover:bg-slate-100",
          "radix-state-active:bg-red-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-green-500 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-900 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800",
          "px-6 max-md:px-4 font-semibold text-slate-500",
          "focus:radix-state-active:border-b-red",
          "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        )}
      >
        <div className="py-4 relative h-full ">
          <div>Media</div>
          <span className="h-1 w-full bg-transparent absolute left-0 bottom-0 rounded-full"></span>
        </div>
      </TabsPrimitive.Trigger>
      <TabsPrimitive.Trigger
        value="likesTab"
        className={cx(
          "TabsTrigger group hover:bg-slate-100",
          "radix-state-active:bg-red-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-green-500 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-900 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800",
          "px-6 max-md:px-4 font-semibold text-slate-500",
          "focus:radix-state-active:border-b-red",
          "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        )}
      >
        <div className="py-4 relative h-full ">
          <div>Likes</div>
          <span className="h-1 w-full bg-transparent absolute left-0 bottom-0 rounded-full"></span>
        </div>
      </TabsPrimitive.Trigger>
    </TabsPrimitive.List>
    <TabsPrimitive.Content value="tab1" className="TabsContent ">
      <UserTweets username={username} />
    </TabsPrimitive.Content>
    <TabsPrimitive.Content value="tab2" className="TabsContent ">
      tweets & replies tab
    </TabsPrimitive.Content>
    <TabsPrimitive.Content value="media" className="TabsContent ">
      media tab
    </TabsPrimitive.Content>
    <TabsPrimitive.Content value="likesTab" className="TabsContent ">
      likes tab
    </TabsPrimitive.Content>
  </TabsPrimitive.Root>
);

export default ProfileTabs;
