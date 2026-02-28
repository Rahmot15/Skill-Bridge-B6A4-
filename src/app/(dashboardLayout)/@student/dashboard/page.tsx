import StudentDashboard from "@/components/modules/Dashboard/Student/StudentDashboard";
import { getBookings } from "@/services/bookings.service";

export default async function StudentDashboardPage() {
  const res = await getBookings();
  const bookings = res?.data || [];

  return <StudentDashboard bookings={bookings} />;
}
