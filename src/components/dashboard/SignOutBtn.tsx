"use client";
import React, { useActionState } from "react";
import Button from "../ui/Button";
import { handleSignOut } from "@/lib/cognito-actions";
const SignOutBtn = () => {
  const [errorMessage, dispatch, loading] = useActionState(
    handleSignOut,
    undefined
  );
  return (
    <Button onClick={handleSignOut} loading={loading} className="mt-4">
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
