import StudentBookings from "@/components/modules/Dashboard/Student/StudentBookings";
import { getBookings } from "@/services/bookings.service";

export default async function Page() {
  const res = await getBookings();

  const bookings = res?.success ? res.data : [];

  return <StudentBookings bookings={bookings} />;
}
