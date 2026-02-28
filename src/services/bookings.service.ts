import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export async function getBookings() {
  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/api/bookings`, {
    next: { revalidate: 60 },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.json();
}
