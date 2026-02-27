import { userService } from "@/services/user.service"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type Role = "ADMIN" | "STUDENT" | "TUTOR"

export default async function DashboardLayout({
  admin,
  student,
  tutor,
}: {
  admin: React.ReactNode
  student: React.ReactNode
  tutor: React.ReactNode
}) {
  const { data } = await userService.getSession()

  const role = data?.user?.role as Role

  if (!role) {
    return <div>Unauthorized</div>
  }

  const roleUI = {
    ADMIN: admin,
    STUDENT: student,
    TUTOR: tutor,
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" user={data.user} />

      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-1 flex-col p-6">
          {roleUI[role]}
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}
