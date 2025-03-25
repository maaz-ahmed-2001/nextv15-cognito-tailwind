import ForgetPasswordForm from "@/components/ui/auth/forget-password-form";
import React from "react";

const ForgetPasswordPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="w-full max-w-md p-6 border border-black/[.08] dark:border-white/[.145] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Forget Password</h2>
        <ForgetPasswordForm />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
