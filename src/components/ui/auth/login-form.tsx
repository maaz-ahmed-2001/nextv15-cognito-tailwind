"use client";

import { handleConfirmSignUp, handleSignIn } from "@/lib/cognito-actions";
import Link from "next/link";
import { startTransition, useActionState, useEffect } from "react";
import Button from "../Button";
import { AllRoutesEnum } from "@/lib/enums";
import { getEmailFromQueryParams } from "@/utils/common";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = getEmailFromQueryParams("email");
  const code = searchParams.get("code");

  const [errorMessage, dispatch, loading] = useActionState(
    handleSignIn,
    undefined
  );

  useEffect(() => {
    if (email && code) {
      const confirmEmail = async () => {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("code", code);

        startTransition(async () => {
          try {
            await handleConfirmSignUp(undefined, formData);
            router.replace(`${AllRoutesEnum.LOGIN}?email=${email}`);
          } catch (error) {
            console.error("Email confirmation failed:", error);
          }
        });
      };

      confirmEmail();
    }
  }, [email, code]);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              {/* <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              {/* <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Link
            href={AllRoutesEnum.FORGET_PASSWORD}
            className="text-sm font-bold"
          >
            Forgot Password
          </Link>
        </div>
        <Button className="mx-auto w-full mt-5" loading={loading}>
          Log in
        </Button>
        <div className="flex justify-center items-center gap-1 mt-2">
          Don't have an account?
          <Link
            href={AllRoutesEnum.SIGNUP}
            className="cursor-pointer font-bold"
          >
            Sign up
          </Link>
        </div>
        <div className="flex h-8 items-end space-x-1">
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
