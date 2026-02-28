import TutorProfile from "@/components/modules/Dashboard/Tutor/TutorProfile";
import { tutorService } from "@/services/tutor.service";
import { redirect } from "next/navigation";

export default async function TutorProfilePage() {
  const res = await tutorService.getMyProfile();
  const tutor = res?.data;

  if (!tutor) {
    // profile not created yet → redirect to create flow
    redirect("/tutor-dashboard/create-profile");
  }

  return <TutorProfile tutor={tutor} />;
}
