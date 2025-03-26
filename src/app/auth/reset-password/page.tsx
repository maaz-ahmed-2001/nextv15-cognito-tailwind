import ResetPasswordForm from "@/components/ui/auth/reset-password-form";
import React from "react";

const ResetPasswordPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="w-full max-w-md p-6 border border-black/[.08] dark:border-white/[.145] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
