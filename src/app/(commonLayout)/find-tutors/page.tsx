import FindTutorsClient from "@/components/modules/Find-Tutors/FindTutorsClient";
import { tutorPublicService } from "@/services/tutorPublic.Service";

export default async function FindTutorsPage() {
  const tutors = await tutorPublicService.getAllTutors();

  return <FindTutorsClient tutors={tutors} />;
}
