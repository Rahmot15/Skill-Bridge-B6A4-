"use client";

import { Mail, Shield, Calendar, CheckCircle2, GraduationCap, Lock, Eye } from "lucide-react";

type UserType = {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  role: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

// ─── Role badge ───────────────────────────────────────────────────────────────

const roleMeta: Record<string, { cls: string; label: string }> = {
  STUDENT: { cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", label: "Student" },
  TUTOR:   { cls: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",   label: "Tutor"   },
  ADMIN:   { cls: "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200",        label: "Admin"   },
};

// ─── Info row ─────────────────────────────────────────────────────────────────

function InfoRow({ icon: Icon, label, value, accent }: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-50 last:border-0">
      <div className="flex items-center gap-3">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent ? "bg-emerald-50 text-emerald-500" : "bg-zinc-100 text-zinc-400"}`}>
          <Icon size={14} />
        </span>
        <span className="text-[13px] text-zinc-400 font-medium">{label}</span>
      </div>
      <span className="text-[13px] font-semibold text-zinc-700">{value}</span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function StudentProfile({ user }: { user: UserType }) {
  const meta = roleMeta[user.role] ?? roleMeta.STUDENT;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="space-y-5">

        {/* Page header */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
            Student Portal
          </p>
          <h1 className="mt-1 text-[26px] font-bold tracking-tight text-zinc-900">
            My Profile
          </h1>
        </div>

        {/* ── Hero card ── */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm">
          {/* Top emerald strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 to-emerald-500" />

          <div className="p-6">
            <div className="flex items-center gap-5">

              {/* Avatar */}
              <div className="relative shrink-0">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-20 w-20 rounded-2xl object-cover ring-2 ring-emerald-100"
                  />
                ) : (
                  // Fallback → yellow gradient (accent color)
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-400 text-xl font-bold text-zinc-800 ring-2 ring-yellow-100">
                    {initials}
                  </div>
                )}
                {/* Online dot → emerald */}
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-400" />
              </div>

              {/* Name + role */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-[20px] font-bold text-zinc-900 capitalize">{user.name}</h2>
                  {/* Role badge */}
                  <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-semibold ${meta.cls}`}>
                    {meta.label}
                  </span>
                </div>
                <p className="mt-1 text-[13px] text-zinc-400">{user.email}</p>

                {/* Email verified badge */}
                {user.emailVerified && (
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-600">
                    <CheckCircle2 size={11} />
                    Email Verified
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* ── Account info card ── */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                <GraduationCap size={14} className="text-emerald-600" />
              </div>
              <h3 className="text-[13px] font-bold text-zinc-800">Account Info</h3>
            </div>
            <div className="mt-3 divide-y divide-zinc-50">
              <InfoRow icon={Mail}     label="Email"   value={user.email}   accent />
              <InfoRow icon={Shield}   label="Role"    value={
                <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${meta.cls}`}>
                  {meta.label}
                </span>
              } />
              {user.createdAt && (
                <InfoRow icon={Calendar} label="Joined" accent
                  value={new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric",
                  })}
                />
              )}
              {user.updatedAt && (
                <InfoRow icon={Calendar} label="Last updated"
                  value={new Date(user.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric",
                  })}
                />
              )}
            </div>
          </div>

          {/* ── Account settings card ── */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
            <div className="mb-1 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-50">
                <Shield size={14} className="text-yellow-600" />
              </div>
              <h3 className="text-[13px] font-bold text-zinc-800">Account Settings</h3>
            </div>

            <div className="mt-3 space-y-3">
              {/* Profile visibility */}
              <div className="flex items-start gap-3 rounded-xl bg-zinc-50 p-4 hover:bg-zinc-100 transition-colors cursor-pointer">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Eye size={14} className="text-zinc-500" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-zinc-700">Profile Visibility</p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">Your profile is visible to tutors.</p>
                </div>
                {/* Yellow dot → attention/setting indicator */}
                <span className="ml-auto mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
              </div>

              {/* Security */}
              <div className="flex items-start gap-3 rounded-xl bg-zinc-50 p-4 hover:bg-zinc-100 transition-colors cursor-pointer">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Lock size={14} className="text-zinc-500" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-zinc-700">Security</p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">Manage password & authentication.</p>
                </div>
                {/* Emerald dot → secure/active */}
                <span className="ml-auto mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
