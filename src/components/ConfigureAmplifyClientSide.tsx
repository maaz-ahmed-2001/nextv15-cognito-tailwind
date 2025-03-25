"use client";
import { Amplify } from "aws-amplify";
import { authConfig } from "@/lib/amplify-config";

// Only configure Amplify on the client side
Amplify.configure({ Auth: authConfig }, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}
