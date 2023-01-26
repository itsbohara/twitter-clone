export default function SearchNotFound({ query }) {
  return (
    <div className="flex flex-col text-center mt-4">
      <h2 className="text-lg font-bold">No results for &quot;{query}&quot;</h2>
      <p className="text-sm text-slate-500">Try searching for something else</p>
    </div>
  );
}
