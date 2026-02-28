import AdminUsers from "@/components/modules/Dashboard/Admin/AdminUsers";
import { adminService } from "@/services/admin.service";

export default async function AdminUsersPage() {
  const res = await adminService.getUsers();
  const users = res?.data || [];

  return <AdminUsers users={users} />;
}
