"use client";

import { handleSendEmailVerificationCode } from "@/lib/cognito-actions";
import { startTransition, useActionState } from "react";
import Button from "../Button";
import { getEmailFromQueryParams } from "@/utils/common";

export default function SendVerificationCode() {
  const email = getEmailFromQueryParams("email");
  const [response, dispatch, loading] = useActionState(
    handleSendEmailVerificationCode,
    {
      message: "",
      errorMessage: "",
    }
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("email", email || "");
    startTransition(() => {
      dispatch(formData);
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Button
        className="mt-4 w-full"
        aria-disabled={loading}
        // formAction={dispatch}
        loading={loading}
      >
        Resend Verification Code{" "}
        {/* <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" /> */}
      </Button>
      <div
        className="flex justify-center h-8 items-center space-x-1 w-full"
        aria-live="polite"
        aria-atomic="true"
      >
        {response?.errorMessage && (
          <>
            {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
            <p className="text-sm text-red-500">{response.errorMessage}</p>
          </>
        )}
        {response?.message && (
          <p className="text-sm text-green-500">{response.message}</p>
        )}
      </div>
    </form>
  );
}
