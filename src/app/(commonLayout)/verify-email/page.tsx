import EmailVerifyPage from "@/components/layout/emailVerify";
import { Suspense } from "react";

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerifyPage />
    </Suspense>
  );
}
