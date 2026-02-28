import StudentProfile from "@/components/modules/Dashboard/Student/StudentProfile";
import { getServerSession } from "@/lib/getServerSession";

export default async function StudentProfilePage() {
  const data = await getServerSession();

  if (!data) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold text-red-500">
          Failed to load profile
        </h2>
        <p className="text-sm text-zinc-500">
          Please login again.
        </p>
      </div>
    );
  }

  return <StudentProfile user={data.user} />;
}
