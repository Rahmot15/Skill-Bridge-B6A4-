"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, RefreshCcw } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fbfbfe] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-[#dddbff] rounded-full blur-3xl opacity-50 animate-pulse"></div>
          </div>
          <h1 className="relative text-[180px] sm:text-[240px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#2f27ce] via-[#443dff] to-[#2f27ce] leading-none animate-gradient">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#040316]">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-[#040316]/70 max-w-md mx-auto">
            The page youre looking for seems to have wandered off into
            thedigital void. Dont worry, well help you find your way back!
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#443dff] rounded-lg opacity-20 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-[#2f27ce] rounded-full opacity-20 animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-[#dddbff] rounded-lg opacity-30 animate-float-slow"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
          <Link href="/">
            <Button
              size="lg"
              className="bg-[#2f27ce] hover:bg-[#443dff] text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-[#2f27ce]/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#443dff]/30"
            >
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="p-3 border-2 border-[#2f27ce] text-[#2f27ce] rounded-xl hover:bg-[#dddbff] transition-all hover:scale-105"
          >
            <RefreshCcw className="h-6 w-6" />
          </button>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center font-semibold text-[#2f27ce] hover:text-[#443dff] transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
