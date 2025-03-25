import LoginForm from "@/components/ui/auth/login-form";

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="w-full max-w-md p-6 border border-black/[.08] dark:border-white/[.145] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}
