import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const tutorService = {
  async getMyProfile() {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/tutors/me`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.json();
  },

  async updateAvailability(availability: string) {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/tutors/availability`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ availability }),
    });

    return res.json();
  },

  async updateProfile(payload: {
    title?: string;
    bio?: string;
    education?: string;
    experienceYears?: number;
    hourlyRate?: number;
    languages?: string[];
  }) {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/tutors/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  },

  async getTutorBookings() {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/bookings/tutor`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.json();
  },
};
