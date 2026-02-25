"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,
      });
    } catch (error) {
      toast.error("Social login failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setIsLoading(true);

      const res = await authClient.signIn.email({
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res);
      const session = await authClient.getSession();
      console.log("SESSION:", session.data);

      toast.success("Login successful!");

      router.push("/");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#fbfbfe] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#dddbff] rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-40 h-40 bg-[#443dff] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-[#2f27ce] rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-[#dddbff]/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2f27ce] to-[#443dff] rounded-2xl mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#040316] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#040316]/60">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2f27ce]/60" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2f27ce]/60" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2f27ce]/60 hover:text-[#2f27ce] transition-colors"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="border-[#2f27ce] data-[state=checked]:bg-[#2f27ce]"
                />
                <label htmlFor="remember" className="text-sm">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-[#2f27ce]">
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#2f27ce] to-[#443dff] hover:from-[#443dff] hover:to-[#2f27ce] text-white font-semibold rounded-xl shadow-lg shadow-[#2f27ce]/30  hover:shadow-xl hover:shadow-[#443dff]/40 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-350"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6 animate-in fade-in duration-700 delay-400">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#dddbff]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#040316]/60">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Register Buttons */}
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            {/* GOOGLE */}
            <Button
              type="button"
              onClick={() => handleSocialLogin("google")}
              variant="outline"
              className="h-12 border-[#e5e7eb] hover:bg-gray-50 hover:border-[#4285F4] transition-all rounded-xl flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <FcGoogle size={22} />
              Google
            </Button>

            {/* GITHUB */}
            <Button
              type="button"
              onClick={() => handleSocialLogin("github")}
              variant="outline"
              className="h-12 border-[#e5e7eb] hover:bg-gray-50 hover:border-black transition-all rounded-xl flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <FaGithub size={20} className="text-black" />
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#2f27ce] font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
