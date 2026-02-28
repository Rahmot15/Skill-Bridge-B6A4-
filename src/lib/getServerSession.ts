import { cookies } from "next/headers";

export async function getServerSession() {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/session`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return res.json();
}
