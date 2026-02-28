import AdminBookings from "@/components/modules/Dashboard/Admin/AdminBookings";
import { adminService } from "@/services/admin.service";

export default async function AdminBookingsPage() {
  const res = await adminService.getAllBookings();
  const bookings = res?.data || [];

  return <AdminBookings bookings={bookings} />;
}
