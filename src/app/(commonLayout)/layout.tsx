import Footer from "@/components/layout/footer";
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
      <Footer />
    </div>
  );
}
