import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const adminService = {
  async getUsers() {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/admin/users`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.json();
  },

  async getBookings() {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/admin/bookings`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.json();
  },

  async getCategories() {
    const res = await fetch(`${API_URL}/api/categories`, {
      cache: "no-store",
    });

    return res.json();
  },

  async getAllBookings() {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/admin/bookings`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.json();
  },

  async createCategory(payload: { title: string; description: string }) {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/categories`, {
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
