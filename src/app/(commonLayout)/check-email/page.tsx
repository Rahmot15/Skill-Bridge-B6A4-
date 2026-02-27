import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbfbfe] to-[#f5f3ff] flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-[#2f27ce] to-[#443dff] rounded-full flex items-center justify-center mx-auto shadow-lg">
          <Mail className="w-10 h-10 text-white" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-[#040316]">
            Check Your Email
          </h1>
          <p className="text-[#040316]/60">
            We ve sent a verification link to your email.
          </p>
        </div>

        {/* Button */}
        <Link href="/login">
          <Button
            size="lg"
            className="bg-[#2f27ce] hover:bg-[#443dff] text-white"
          >
            Go to Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
