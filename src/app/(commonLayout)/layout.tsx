import Footers from "@/components/modules/HomePages/Footers";
import { Navbar } from "@/components/layout/navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-72px)]">
        {children}
      </div>
      <Footers />
    </div>
  );
}
