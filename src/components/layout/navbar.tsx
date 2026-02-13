"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

export const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Find Tutors", url: "/find-tutors" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign Up", url: "/register" },
  },
  className,
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-50 bg-white border-b border-[#dddbff]/30 backdrop-blur-md", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-black bg-gradient-to-r from-[#2f27ce] to-[#443dff] bg-clip-text text-transparent">
              SkillBridge
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-sm font-medium text-[#040316]/70 hover:text-[#2f27ce] transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href={auth.login.url}>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#040316] hover:text-[#2f27ce] hover:bg-[#dddbff]/30"
              >
                {auth.login.title}
              </Button>
            </Link>
            <Link href={auth.signup.url}>
              <Button
                size="sm"
                className="bg-[#2f27ce] hover:bg-[#443dff] text-white"
              >
                {auth.signup.title}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#dddbff]/30 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-[#040316]" />
            ) : (
              <Menu className="h-5 w-5 text-[#040316]" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#dddbff]/30">
            <div className="flex flex-col gap-4">
              {/* Mobile Menu Items */}
              {menu.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-[#040316]/70 hover:text-[#2f27ce] transition-colors py-2"
                >
                  {item.title}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-2 pt-4 border-t border-[#dddbff]/30">
                <Link href={auth.login.url} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-[#dddbff] text-[#040316] hover:bg-[#dddbff]/30"
                  >
                    {auth.login.title}
                  </Button>
                </Link>
                <Link href={auth.signup.url} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    className="w-full bg-[#2f27ce] hover:bg-[#443dff] text-white"
                  >
                    {auth.signup.title}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
