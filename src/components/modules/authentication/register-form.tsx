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

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

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

      await authClient.signUp.email({
        name,
        email,
        password,
      });

      toast.success("Account created successfully!");
      router.push("/check-email");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      toast.error(errorMessage);
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
                  href="/terms"
                  className="text-[#2f27ce] hover:text-[#443dff] font-medium transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
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
              className="w-full h-12 bg-gradient-to-r from-[#2f27ce] to-[#443dff] hover:from-[#443dff] hover:to-[#2f27ce] text-white font-semibold rounded-xl shadow-lg shadow-[#2f27ce]/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#443dff]/40 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-350"
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
            <Button
              type="button"
              variant="outline"
              className="h-12 border-[#dddbff] hover:bg-[#dddbff]/30 hover:border-[#2f27ce] transition-all rounded-xl group"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 border-[#dddbff] hover:bg-[#dddbff]/30 hover:border-[#2f27ce] transition-all rounded-xl group"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
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
