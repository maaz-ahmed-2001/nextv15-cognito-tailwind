"use client";
import Image from "next/image";
import SignOutBtn from "./dashboard/SignOutBtn";
import useUser from "@/hooks/useUser";

export default function Home() {
  const user = useUser();
  const { signInDetails: { loginId: email } = {}, username } = user || {};
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="flex flex-col gap-4 p-6 border border-black/[.08] dark:border-white/[.145] rounded-lg">
          <h1 className="text-2xl font-bold">
            Welcome to the Protected Home Page
          </h1>
          <p>You are logged in as {username}</p>
          {username && <p>Email: {email}</p>}

          <SignOutBtn />
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          AWS Amplify Auth Docs
        </a>
      </footer>
    </div>
  );
}
