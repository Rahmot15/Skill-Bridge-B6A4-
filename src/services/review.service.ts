"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const reviewService = {
  async createReview(payload: {
    tutorId: string;
    bookingId: string;
    rating: number;
    comment: string;
  }) {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  },
};
