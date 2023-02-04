import LoginWithGoogleButton from "@ui/auth/LoginWithGoogle";
import Button from "@ui/Button";
import Link from "next/link";

export default function TwitterAuth() {
  return (
    <>
      <div className="login-panel mt-3 flex flex-col gap-y-2">
        <h2 className="text-xl font-bold">Welcome to Twitter Clone</h2>
        <Button href="/auth/login" intent="outline" center>
          <span>Login</span>
        </Button>

        <LoginWithGoogleButton />
      </div>

      <hr className="mt-4" />
      <div className="new-to-panel my-3 flex flex-col gap-y-2">
        <h2 className="text-xl font-bold">New to Twitter?</h2>
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
    </>
  );
}
