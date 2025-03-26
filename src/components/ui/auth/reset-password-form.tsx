"use client";

import { handleResetPasswordConfirmation } from "@/lib/cognito-actions";
import Link from "next/link";
import { useActionState } from "react";
import Button from "../Button";
import { AllRoutesEnum } from "@/lib/enums";
import { useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { getEmailFromQueryParams } from "@/utils/common";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const email = getEmailFromQueryParams("email");
  const code = searchParams.get("code") || "";
  const [passwordError, setPasswordError] = useState("");
  const [isPending, startTransition] = useTransition();

  const [errorMessage, dispatch] = useActionState(
    handleResetPasswordConfirmation,
    undefined
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Check if passwords match
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return; // Prevent form submission
    } else {
      setPasswordError("");
    }

    // Add email and code to the form data
    formData.append("email", email || "");
    formData.append("code", code);

    // Continue with form submission inside a transition
    startTransition(() => {
      dispatch(formData);
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <p>
          Enter the verification code sent to your email and your new password
        </p>
        <div className="w-full">
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              New Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter new password"
                required
                minLength={6}
              />
            </div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Enter new password"
                required
                minLength={6}
              />
            </div>
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
          </div>
        </div>
        <Button className="mx-auto w-full mt-5" loading={isPending}>
          Reset Password
        </Button>
        <div className="flex justify-center items-center gap-1 mt-4">
          <Link href={AllRoutesEnum.LOGIN} className="cursor-pointer font-bold">
            Back to Login
          </Link>
        </div>
        <div className="flex h-8 items-end space-x-1">
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
