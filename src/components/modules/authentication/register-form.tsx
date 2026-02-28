"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: window.location.origin,
        fetchOptions: {
          credentials: "include",
        },
      });
    } catch (error) {
      toast.error("Social login failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const res = await authClient.signUp.email({
        name,
        email,
        password,
        fetchOptions: { credentials: "include" },
      });

      if (res?.error) throw new Error(res.error.message);

      toast.success("Account created successfully!");
      router.push("/check-email");
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Registration failed";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#fbfbfe] flex items-center justify-center px-4 sm:px-6 lg:px-8  relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-[#dddbff] rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-1/3 left-20 w-40 h-40 bg-[#443dff] rounded-full blur-3xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-32 right-1/4 w-36 h-36 bg-[#2f27ce] rounded-full blur-3xl opacity-30 animate-pulse delay-150"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-[#dddbff] rounded-full blur-2xl opacity-25 animate-pulse"></div>
      </div>

      {/* Register Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-[#2f27ce]/10 p-8 border border-[#dddbff]/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2f27ce] to-[#443dff] rounded-2xl mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#040316] mb-2">
              Create Account
            </h1>
            <p className="text-[#040316]/60">
              Join us today and get started for free
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              <Label htmlFor="name" className="text-[#040316] font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2f27ce]/60" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10 h-12 border-[#dddbff] focus:border-[#2f27ce] focus:ring-[#2f27ce]/20 rounded-xl transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <Label htmlFor="email" className="text-[#040316] font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2f27ce]/60" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-12 border-[#dddbff] focus:border-[#2f27ce] focus:ring-[#2f27ce]/20 rounded-xl transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <Label htmlFor="password" className="text-[#040316] font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2f27ce]/60" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="pl-10 pr-10 h-12 border-[#dddbff] focus:border-[#2f27ce] focus:ring-[#2f27ce]/20 rounded-xl transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2f27ce]/60 hover:text-[#2f27ce] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-250">
              <Label
                htmlFor="confirmPassword"
                className="text-[#040316] font-medium"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2f27ce]/60" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 h-12 border-[#dddbff] focus:border-[#2f27ce] focus:ring-[#2f27ce]/20 rounded-xl transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2f27ce]/60 hover:text-[#2f27ce] transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Checkbox
                id="terms"
                className="border-[#2f27ce] data-[state=checked]:bg-[#2f27ce] mt-1"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm text-[#040316]/70 cursor-pointer select-none leading-relaxed"
              >
                I agree to the{" "}
                <Link
                  href=""
                  className="text-[#2f27ce] hover:text-[#443dff] font-medium transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href=""
                  className="text-[#2f27ce] hover:text-[#443dff] font-medium transition-colors"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#2f27ce] to-[#443dff] hover:from-[#443dff] hover:to-[#2f27ce] text-white font-semibold rounded-xl shadow-lg shadow-[#2f27ce]/30  hover:shadow-xl hover:shadow-[#443dff]/40 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-350"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
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

          {/* Sign In Link */}
          <p className="text-center text-sm text-[#040316]/60 mt-6 animate-in fade-in duration-700 delay-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#2f27ce] hover:text-[#443dff] transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
