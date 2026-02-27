import { userService } from "@/services/user.service"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import StudentDashboard from "./@student/dashboard/page"
import AdminDashboard from "./@admin/admin-dashboard/page"
import TutorDashboard from "./@tutor/tutor-dashboard/page"

export default async function DashboardLayout() {

  const { data } = await userService.getSession()
  const role = data?.user?.role

  if (!role) {
    return <div>Unauthorized</div>
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" user={data.user} />

      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-1 flex-col">

          {/* ADMIN */}
          {role === "ADMIN" && (
            <>
              <AdminDashboard/>
            </>
          )}

          {/* STUDENT */}
          {role === "STUDENT" && (
            <>
              <StudentDashboard/>
            </>
          )}

          {/* TUTOR */}
          {role === "TUTOR" && (
            <>
              <TutorDashboard/>
            </>
          )}

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
