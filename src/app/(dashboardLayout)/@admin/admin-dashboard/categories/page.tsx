import AdminCategories from "@/components/modules/Dashboard/Admin/AdminCategories";
import { adminService } from "@/services/admin.service";

export default async function AdminCategoriesPage() {
  const res = await adminService.getCategories();
  const categories = res?.data || [];

  return <AdminCategories categories={categories} />;
}
