"use client";

import { useFormStatus } from "react-dom";
import { handleSignIn } from "@/lib/cognito-actions";
import Link from "next/link";
import { useActionState } from "react";
import Button from "../Button";
import { AllRoutesEnum } from "@/lib/enums";

export default function ForgetPasswordForm() {
  const [errorMessage, dispatch, loading] = useActionState(
    handleSignIn,
    undefined
  );

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <p>Enter your email address to reset your password</p>
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
        </div>
        <Button className="mx-auto w-full mt-5" loading={loading}>
          Reset Password
        </Button>
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
