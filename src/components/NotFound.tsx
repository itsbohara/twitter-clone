import Button from "./Button";

export default function PageNotFound() {
  return (
    <div className="h-full mt-7 text-center">
      <p className=" text-slate-700 font-medium mb-4">
        Hmm...this page doesn’t exist. Try searching for something else.
      </p>
      <Button href="/search" intent="main" center>
        <span>Search</span>
      </Button>
    </div>
  );
}
