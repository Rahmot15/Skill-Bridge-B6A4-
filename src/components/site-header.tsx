import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { userService } from "@/services/user.service"
import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export async function SiteHeader() {
  const { data } = await userService.getSession()
  const user = data?.user

  const initials = user?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "U"

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-zinc-100 bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">

        {/* Sidebar toggle */}
        <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors" />

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 bg-zinc-200"
        />

        {/* Page title */}
        <h1 className="text-sm font-semibold text-zinc-800">Dashboard</h1>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">

          {/* Notification bell — yellow dot for unread */}
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors">
            <Bell size={16} />
            {/* Yellow dot → attention/alert color */}
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-yellow-400" />
          </button>

          {/* User avatar */}
          <div className="relative">
            <Avatar className="h-8 w-8 rounded-lg">
              {user?.image && (
                // Image থাকলে → emerald ring
                <AvatarImage
                  src={user.image}
                  alt={user.name}
                  className="rounded-lg ring-2 ring-emerald-100"
                />
              )}
              {/* Fallback → yellow gradient (accent color) */}
              <AvatarFallback className="rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-400 text-[11px] font-bold text-zinc-800">
                {initials}
              </AvatarFallback>
            </Avatar>
            {/* Online dot → emerald */}
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-white bg-emerald-400" />
          </div>

        </div>
      </div>
    </header>
  )
}
