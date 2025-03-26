"use client";

import { handleConfirmSignUp } from "@/lib/cognito-actions";
import SendVerificationCode from "./send-verification-code-form";
import { useActionState } from "react";
import { getEmailFromQueryParams } from "@/utils/common";

export default function ConfirmSignUpForm() {
  const email = getEmailFromQueryParams("email") || "your email";
  return (
    <div className="space-y-3">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className="text-2xl text-center mb-3">Confirm your account.</h1>
        <p className="text-center">
          Please check your email. We've sent a verification link to {email}.
        </p>
        <div className="flex h-8 items-end space-x-1">
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          ></div>
        </div>
        <p className="text-center">Didn't receive the verification link?</p>
        <SendVerificationCode />
      </div>
    </div>
  );
}
