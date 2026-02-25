"use client";

import { Menu, X, LogOut, ChevronDown, LayoutDashboard, User, BookOpen } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
  menu?: MenuItem[];
}

export const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Find Tutors", url: "/find-tutors" },
  ],
  className,
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* Get session */
  const { data: session, isPending } = authClient.useSession();

  /* Logout */
  const handleLogout = async () => {
    await authClient.signOut();
    window.location.reload();
  };

  const userName  = session?.user?.name  ?? "User";
  const userEmail = session?.user?.email ?? "";
  const userImage = session?.user?.image ?? "https://unsplash.com/photos/man-in-black-button-up-shirt-ZHvM3XIOHoE";
  const initials  = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-indigo-100/60 bg-white/80 backdrop-blur-xl shadow-sm shadow-indigo-100/40",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-200 group-hover:shadow-lg group-hover:shadow-indigo-300 transition-shadow duration-300">
              <BookOpen className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-violet-600 to-indigo-500 bg-clip-text text-transparent select-none">
              SkillBridge
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-1">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-700 rounded-xl hover:bg-indigo-50 transition-all duration-200"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* ── Desktop Auth ── */}
          <div className="hidden lg:flex items-center gap-3">
            {isPending ? (
              /* Skeleton */
              <div className="w-36 h-9 rounded-full bg-slate-100 animate-pulse" />
            ) : session?.user ? (

              /* ── Profile Dropdown ── */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/60 hover:bg-indigo-100/70 hover:border-indigo-200 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1">
                    <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                      <AvatarImage src={userImage} alt={userName} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold text-slate-700 max-w-[110px] truncate">
                      {userName}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" strokeWidth={2.5} />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={10}
                  className="w-64 rounded-2xl border border-indigo-100/80 bg-white p-1.5 shadow-xl shadow-indigo-100/60"
                >
                  {/* User info card inside dropdown */}
                  <div className="flex items-center gap-3 px-3 py-3 mb-1 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/60">
                    <Avatar className="w-11 h-11 border-2 border-white shadow-md">
                      <AvatarImage src={userImage} alt={userName} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{userName}</p>
                      <p className="text-xs text-slate-500 truncate">{userEmail}</p>
                      <Badge className="mt-1 h-4 px-1.5 text-[10px] bg-indigo-100 text-indigo-700 border-0 hover:bg-indigo-100">
                        Student
                      </Badge>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-indigo-50 my-1" />

                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 focus:bg-indigo-50 focus:text-indigo-700 transition-colors"
                    >
                      <User className="w-4 h-4 text-indigo-400" />
                      <span className="text-sm font-medium">My Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 focus:bg-indigo-50 focus:text-indigo-700 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                      <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-indigo-50 my-1" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 active:scale-[0.98]"
              >
                Login
              </Link>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* ── Mobile Menu ── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-indigo-100/60">
            <div className="flex flex-col gap-1">
              {menu.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-colors"
                >
                  {item.title}
                </Link>
              ))}

              {/* Mobile Auth */}
              <div className="pt-3 mt-2 border-t border-indigo-100/60 space-y-1">
                {session?.user ? (
                  <>
                    {/* Profile card */}
                    <div className="flex items-center gap-3 px-3 py-3 mb-1 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/60">
                      <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                        <AvatarImage src={userImage} alt={userName} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm font-bold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{userName}</p>
                        <p className="text-xs text-slate-500 truncate">{userEmail}</p>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
                    >
                      <User className="w-4 h-4 text-indigo-400" />
                      My Profile
                    </Link>

                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                      Dashboard
                    </Link>

                    <button
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-5 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md shadow-indigo-200 active:scale-[0.98] transition-all"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
