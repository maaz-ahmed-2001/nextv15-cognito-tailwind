import SignUpForm from "@/components/ui/auth/signup-form";

export default function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="w-full max-w-md p-6 border border-black/[.08] dark:border-white/[.145] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <SignUpForm />
      </div>
    </div>
  );
}
