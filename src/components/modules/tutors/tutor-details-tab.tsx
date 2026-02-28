"use client";

import {
  Clock,
  GraduationCap,
  TrendingUp,
  Award,
  BookOpen,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string | number;
  title: string;
  description?: string;
}
interface Tutor {
  bio?: string;
  completedSessions?: number;
  totalStudents?: number;
  experienceYears?: number;
  education?: string;
  availability?: string;
  languages?: string[];
}

export default function TutorDetailsTab({
  tutor,
  categories,
}: {
  tutor: Tutor;
  categories: Category[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* ── Left (2/3) ── */}
      <div className="space-y-5 lg:col-span-2">
        {/* About */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600" />
            <h2 className="text-[16px] font-bold text-zinc-900">About</h2>
          </div>
          <p className="text-[14px] leading-relaxed text-zinc-600">
            {tutor?.bio || "No bio available."}
          </p>
        </div>

        {/* Achievement stats */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            {/* yellow accent → achievements */}
            <span className="h-5 w-1 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-500" />
            <h2 className="text-[16px] font-bold text-zinc-900">
              Achievements
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: Award,
                label: "Sessions Completed",
                value: `${tutor?.completedSessions ?? 0}+`,
                accent: "yellow",
              },
              {
                icon: TrendingUp,
                label: "Students Taught",
                value: `${tutor?.totalStudents ?? 0}+`,
                accent: "emerald",
              },
            ].map(({ icon: Icon, label, value, accent }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-3 rounded-xl p-4",
                  accent === "yellow"
                    ? "bg-yellow-50 border border-yellow-100"
                    : "bg-emerald-50 border border-emerald-100",
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    accent === "yellow"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-emerald-100 text-emerald-600",
                  )}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div
                    className={cn(
                      "text-[20px] font-black leading-none",
                      accent === "yellow"
                        ? "text-yellow-700"
                        : "text-emerald-700",
                    )}
                  >
                    {value}
                  </div>
                  <div className="mt-0.5 text-[11px] text-zinc-400">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        {Array.isArray(categories) && categories.length > 0 && (
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600" />
              <h2 className="text-[16px] font-bold text-zinc-900">
                Teaching Categories
              </h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {categories.map((cat, i) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-4 hover:border-emerald-100 hover:bg-emerald-50/50 transition-colors"
                >
                  <span
                    className={cn(
                      "h-2.5 w-2.5 shrink-0 rounded-full",
                      i % 2 === 0 ? "bg-emerald-400" : "bg-yellow-400",
                    )}
                  />
                  <div>
                    <p className="text-[13px] font-semibold text-zinc-800">
                      {cat.title}
                    </p>
                    {cat.description && (
                      <p className="mt-0.5 text-[11px] text-zinc-400">
                        {cat.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Sidebar (1/3) ── */}
      <div className="space-y-5">
        {/* Quick info */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-[13px] font-bold text-zinc-800">
            Quick Info
          </h3>
          <div className="space-y-4">
            {[
              {
                icon: Clock,
                label: "Experience",
                value: tutor?.experienceYears
                  ? `${tutor.experienceYears} years`
                  : "Not specified",
                accent: "yellow",
              },
              {
                icon: GraduationCap,
                label: "Education",
                value: tutor?.education || "Not specified",
                accent: "emerald",
              },
              {
                icon: TrendingUp,
                label: "Response Time",
                value: "Within 2 hours",
                accent: "emerald",
              },
            ].map(({ icon: Icon, label, value, accent }) => (
              <div key={label} className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    accent === "yellow"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-emerald-50 text-emerald-600",
                  )}
                >
                  <Icon size={14} />
                </div>
                <div>
                  <p className="text-[11px] text-zinc-400">{label}</p>
                  <p className="text-[13px] font-semibold text-zinc-700">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Clock size={13} className="text-emerald-600" />
            <h3 className="text-[13px] font-bold text-emerald-800">
              Availability
            </h3>
          </div>
          <p className="text-[13px] text-emerald-700">
            {tutor?.availability || "Flexible — contact tutor"}
          </p>
        </div>

        {/* Languages */}
        <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Globe size={13} className="text-zinc-400" />
            <h3 className="text-[13px] font-bold text-zinc-800">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Array.isArray(tutor?.languages) && tutor.languages.length > 0 ? (
              tutor.languages.map((lang: string) => (
                <span
                  key={lang}
                  className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700 ring-1 ring-emerald-100"
                >
                  {lang}
                </span>
              ))
            ) : (
              <p className="text-[12px] text-zinc-400">
                No languages specified
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
