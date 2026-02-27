"use client";

import {
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    image?: string;
  };
}) {
  const { isMobile } = useSidebar();

  // Avatar initials fallback — নামের প্রথম দুই অক্ষর
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-zinc-100 hover:bg-zinc-50 transition-colors"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user.image && (
                    // Image থাকলে → emerald ring
                    <AvatarImage
                      src={user.image}
                      alt={user.name}
                      className="rounded-lg ring-2 ring-emerald-100"
                    />
                  )}
                  {/* Image না থাকলে → yellow gradient fallback (accent color) */}
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-400 text-[11px] font-bold text-zinc-800">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {/* Online dot → emerald */}
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-white bg-emerald-400" />
              </div>

              {/* Name & email */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-zinc-800">{user.name}</span>
                <span className="truncate text-xs text-zinc-400">{user.email}</span>
              </div>

              <IconDotsVertical className="ml-auto size-4 text-zinc-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Dropdown */}
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border border-zinc-100 shadow-md"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user.image && <AvatarImage src={user.image} alt={user.name} />}
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-400 text-[11px] font-bold text-zinc-800">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-sm leading-tight">
                  <span className="truncate font-semibold text-zinc-800">{user.name}</span>
                  <span className="truncate text-xs text-zinc-400">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuGroup>
              <DropdownMenuItem className="text-zinc-600 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">
                <IconUserCircle className="mr-2 size-4" />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuItem className="text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">
              <IconLogout className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
