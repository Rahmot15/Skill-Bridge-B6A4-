"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Icon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-0.5">
        <SidebarMenu>
          {items.map((item) => {
            const active = pathname === item.url;
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.title}>
                <Link
                  href={item.url}
                  className={cn(
                    // base styles
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 w-full",
                    active
                      // active → emerald tint background + emerald text
                      ? "bg-emerald-50 text-emerald-700"
                      // idle → zinc text, hover এ light gray
                      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
                  )}
                >
                  {/* Active left bar → emerald vertical indicator */}
                  {active && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-emerald-500" />
                  )}

                  {/* Icon box */}
                  {Icon && (
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-150",
                        active
                          // active icon box → soft emerald
                          ? "bg-emerald-100 text-emerald-600"
                          // idle icon box → zinc, hover darker
                          : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200 group-hover:text-zinc-600"
                      )}
                    >
                      <Icon size={16} stroke={active ? 2.5 : 2} />
                    </span>
                  )}

                  <span className="flex-1 leading-none">{item.title}</span>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
