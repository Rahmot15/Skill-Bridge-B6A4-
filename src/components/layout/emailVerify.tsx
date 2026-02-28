"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Mail, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EmailVerifyPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        await authClient.verifyEmail({
          query: {
            token,
          },
        });

        setStatus("success");

        // Wait for cookie to be set
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbfbfe] via-[#f8f7ff] to-[#f5f3ff] flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-[#dddbff] rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-[#443dff] rounded-full blur-3xl opacity-20 animate-pulse delay-75"></div>
      </div>

      <Card className="relative w-full max-w-md p-8 border-[#dddbff]/50 shadow-2xl bg-white/90 backdrop-blur-sm">
        {/* VERIFYING STATE */}
        {status === "verifying" && (
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-[#2f27ce] to-[#443dff] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Mail className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-32 h-32 text-[#2f27ce] animate-spin opacity-30" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#040316] mb-2">
                Verifying Your Email
              </h2>
              <p className="text-[#040316]/60">
                Please wait while we verify your email address...
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-[#2f27ce] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#2f27ce] rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-[#2f27ce] rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle2 className="w-12 h-12 text-white animate-in zoom-in duration-500" />
              </div>
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            </div>

            <div>
              <h2 className="text-3xl font-black text-[#040316] mb-3">
                Email Verified! 🎉
              </h2>
              <p className="text-lg text-[#040316]/70 mb-2">
                Your email has been successfully verified.
              </p>
              <p className="text-sm text-[#040316]/50">
                Redirecting you to the homepage...
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium">
              <span>Redirecting</span>
              <ArrowRight className="w-4 h-4 animate-bounce-horizontal" />
            </div>

            <div className="pt-4">
              <div className="h-1.5 bg-[#f5f3ff] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full animate-progress"></div>
              </div>
            </div>

            <style jsx>{`
              @keyframes progress {
                from {
                  width: 0%;
                }
                to {
                  width: 100%;
                }
              }
              .animate-progress {
                animation: progress 2s ease-in-out forwards;
              }
              @keyframes bounce-horizontal {
                0%,
                100% {
                  transform: translateX(0);
                }
                50% {
                  transform: translateX(4px);
                }
              }
              .animate-bounce-horizontal {
                animation: bounce-horizontal 1s ease-in-out infinite;
              }
            `}</style>
          </div>
        )}

        {/* ERROR STATE */}
        {status === "error" && (
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <XCircle className="w-12 h-12 text-white animate-in zoom-in duration-500" />
              </div>
              <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#040316] mb-3">
                Verification Failed
              </h2>
              <p className="text-[#040316]/70 mb-2">
                We couldnt verify your email address.
              </p>
              <p className="text-sm text-[#040316]/60">
                The verification link may have expired or is invalid.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm text-red-800">
                <strong>Common issues:</strong>
              </p>
              <ul className="text-xs text-red-700 mt-2 space-y-1 text-left list-disc list-inside">
                <li>Link has expired (valid for 24 hours)</li>
                <li>Link has already been used</li>
                <li>Invalid verification token</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="flex-1 border-[#dddbff] hover:bg-[#dddbff]/30"
                >
                  Go to Login
                </Button>
              </Link>

              <Link href="/register">
                <Button className="flex-1 bg-[#2f27ce] hover:bg-[#443dff] text-white">
                  Register Again
                </Button>
              </Link>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="text-sm text-[#2f27ce] hover:text-[#443dff] font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* SkillBridge Logo at Bottom */}
        <div className="mt-8 pt-6 border-t border-[#dddbff]/30 text-center">
          <h3 className="text-xl font-black bg-gradient-to-r from-[#2f27ce] to-[#443dff] bg-clip-text text-transparent">
            SkillBridge
          </h3>
          <p className="text-xs text-[#040316]/50 mt-1">
            Connect. Learn. Grow.
          </p>
        </div>
      </Card>
    </div>
  );
}
