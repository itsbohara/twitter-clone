import { useEffect, useState } from "react";
import http from "@/client/axios";
import SearchNotFound from "./NotFound";
import SearchUserItem from "./UserItem";
export default function SearchResults({ tabKey, query }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>([]);
  useEffect(() => {
    const searchByQuery = async () => {
      try {
        const res = await http.get(`/user/q/${query}`);
        setResult(res.data);
      } catch (error) {}
      setLoading(false);
    };
    if (tabKey === "people") searchByQuery();
  }, []);
  if (tabKey !== "people") return <p>Search logic not implemented!</p>;
  if (loading) return <p>Loading…</p>;

  const isNotFound = result.length === 0;
  return (
    <>
      {result.map((user, i) => (
        <SearchUserItem
          key={user?.id}
          id={user?.id}
          profile={user?.profile}
          name={user?.name}
          username={user?.username}
          following={user?.following}
        />
      ))}
      {isNotFound && <SearchNotFound query={query} />}
    </>
  );
}
