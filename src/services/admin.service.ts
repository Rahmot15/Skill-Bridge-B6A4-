import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const adminService = {
  async getUsers() {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/admin/users`, {
      next: { revalidate: 60 },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.json();
  },

  async getBookings() {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/admin/bookings`, {
      next: { revalidate: 60 },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.json();
  },

  async getCategories() {
    const res = await fetch(`${API_URL}/api/categories`, {
      next: { revalidate: 60 },
    });

    return res.json();
  },

  async getAllBookings() {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/admin/bookings`, {
      next: { revalidate: 60 },
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
