import ConfirmSignUpForm from "@/components/ui/auth/confirm-signup-form";

export default function ConfirmSignup() {
  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="w-full max-w-md p-6 border border-black/[.08] dark:border-white/[.145] rounded-lg shadow-md">
        <ConfirmSignUpForm />
      </div>
    </div>
  );
}
