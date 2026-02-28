import AdminDashboard from "@/components/modules/Dashboard/Admin/AdminDashboard";
import { adminService } from "@/services/admin.service";

export default async function AdminDashboardPage() {
  const usersRes = await adminService.getUsers();
  const bookingsRes = await adminService.getBookings();
  const categoriesRes = await adminService.getCategories();

  const users = usersRes?.data || [];
  const bookings = bookingsRes?.data || [];
  const categories = categoriesRes?.data || [];

  const stats = {
    totalUsers: users.length,
    totalTutors: users.filter((u: any) => u.role === "TUTOR").length,
    totalStudents: users.filter((u: any) => u.role === "STUDENT").length,
    totalBookings: bookings.length,
    totalCategories: categories.length,
  };

  return <AdminDashboard stats={stats} />;
}
