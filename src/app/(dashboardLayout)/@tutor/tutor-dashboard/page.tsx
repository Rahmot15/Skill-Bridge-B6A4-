import TutorDashboard from "@/components/modules/Dashboard/Tutor/TutorDashboard";
import { tutorService } from "@/services/tutor.service";

export default async function TutorDashboardPage() {
  const profileRes = await tutorService.getMyProfile();
  const bookingRes = await tutorService.getTutorBookings();

  const tutor = profileRes?.data;
  const bookings = bookingRes?.success ? bookingRes.data : [];

  if (!tutor) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold text-red-500">
          Tutor profile not found
        </h2>
      </div>
    );
  }

  return <TutorDashboard tutor={tutor} bookings={bookings} />;
}
