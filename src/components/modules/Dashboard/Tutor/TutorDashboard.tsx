"use client";

import {
  Users, Star, BookOpen, Calendar,
  Clock, CheckCircle2, XCircle, AlertCircle, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tutor = {
  totalStudents: number;
  completedSessions: number;
  rating: number;
  totalReviews: number;
};

type Booking = {
  id: string;
  date: string;
  status: string;
  student: { name: string; email: string };
  category: { title: string };
};

// ─── Status config ────────────────────────────────────────────────────────────

const statusConfig: Record<string, { label: string; icon: React.ElementType; cls: string; dot: string }> = {
  PENDING:  { label: "Pending",  icon: Clock,         cls: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",  dot: "bg-yellow-400"  },
  ACCEPTED: { label: "Accepted", icon: CheckCircle2,  cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", dot: "bg-emerald-400" },
  REJECTED: { label: "Rejected", icon: XCircle,       cls: "bg-red-50 text-red-600 ring-1 ring-red-200",           dot: "bg-red-400"     },
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, accent }: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  accent?: "emerald" | "yellow";
}) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border p-5 shadow-sm",
      accent === "emerald" ? "bg-emerald-50 border-emerald-100" :
      accent === "yellow"  ? "bg-yellow-50 border-yellow-100"  :
      "bg-white border-zinc-100"
    )}>
      {/* Background icon watermark */}
      <div className="absolute -right-3 -bottom-3 opacity-[0.07]">
        <Icon size={64} />
      </div>

      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl",
        accent === "emerald" ? "bg-emerald-100 text-emerald-600" :
        accent === "yellow"  ? "bg-yellow-100 text-yellow-600"  :
        "bg-zinc-100 text-zinc-500"
      )}>
        <Icon size={18} />
      </div>

      <div className="mt-3">
        <div className={cn(
          "text-[28px] font-bold leading-none",
          accent === "emerald" ? "text-emerald-700" :
          accent === "yellow"  ? "text-yellow-700"  :
          "text-zinc-800"
        )}>
          {value}
        </div>
        <div className="mt-1 text-[12px] font-medium text-zinc-400">{label}</div>
      </div>
    </div>
  );
}

// ─── Booking Row ──────────────────────────────────────────────────────────────

function BookingRow({ b }: { b: Booking }) {
  const status = statusConfig[b.status] ?? {
    label: b.status,
    icon: AlertCircle,
    cls: "bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200",
    dot: "bg-zinc-400",
  };
  const StatusIcon = status.icon;

  // Avatar initials
  const initials = b.student?.name
    ?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) ?? "?";

  return (
    <div className="group flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-zinc-50 transition-colors">
      {/* Avatar — yellow gradient for student */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-400 text-[12px] font-bold text-zinc-800">
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-zinc-800 truncate">
          {b.student?.name}
        </p>
        <p className="text-[11px] text-zinc-400 truncate">{b.category?.title}</p>
      </div>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-[12px] text-zinc-400 shrink-0">
        <Calendar size={11} />
        {new Date(b.date).toLocaleDateString("en-US", {
          month: "short", day: "numeric",
        })}
      </div>

      {/* Status badge */}
      <span className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold shrink-0",
        status.cls
      )}>
        <StatusIcon size={10} strokeWidth={2.5} />
        {status.label}
      </span>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyBookings() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
        <BookOpen size={20} className="text-zinc-400" />
      </div>
      <p className="mt-3 text-[13px] font-semibold text-zinc-700">No sessions yet</p>
      <p className="mt-1 text-[12px] text-zinc-400">Bookings from students will appear here.</p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function TutorDashboard({ tutor, bookings }: {
  tutor: Tutor;
  bookings: Booking[];
}) {
  const pending  = bookings.filter((b) => b.status === "PENDING").length;
  const accepted = bookings.filter((b) => b.status === "ACCEPTED").length;

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="space-y-6">

        {/* ── Header ── */}
        <div className="flex items-end justify-between">
          <div>
            {/* yellow label → tutor portal */}
            <p className="text-[11px] font-semibold uppercase tracking-widest text-yellow-600">
              Tutor Portal
            </p>
            <h1 className="mt-1 text-[26px] font-bold tracking-tight text-zinc-900">
              Dashboard
            </h1>
          </div>
          {bookings.length > 0 && (
            <div className="flex items-center gap-2">
              {pending > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-[12px] font-semibold text-yellow-700">
                  <Clock size={12} />
                  {pending} Pending
                </span>
              )}
              {accepted > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[12px] font-semibold text-emerald-700">
                  <CheckCircle2 size={12} />
                  {accepted} Accepted
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard icon={Users}    label="Total Students"     value={tutor.totalStudents}    accent="emerald" />
          <StatCard icon={BookOpen} label="Completed Sessions" value={tutor.completedSessions} />
          {/* Rating → yellow (attention/quality) */}
          <StatCard icon={Star}     label="Rating"             value={tutor.rating || "—"}    accent="yellow" />
          <StatCard icon={TrendingUp} label="Total Reviews"    value={tutor.totalReviews} />
        </div>

        {/* ── Sessions table ── */}
        <div className="rounded-2xl border border-zinc-100 bg-white shadow-sm">
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-zinc-50 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                <Calendar size={13} className="text-emerald-600" />
              </div>
              <h2 className="text-[13px] font-bold text-zinc-800">Upcoming Sessions</h2>
            </div>
            {bookings.length > 0 && (
              <span className="text-[12px] text-zinc-400">{bookings.length} total</span>
            )}
          </div>

          {/* Rows */}
          <div className="px-3 py-2">
            {bookings.length === 0 ? (
              <EmptyBookings />
            ) : (
              <div className="divide-y divide-zinc-50">
                {bookings.slice(0, 8).map((b) => (
                  <BookingRow key={b.id} b={b} />
                ))}
              </div>
            )}
          </div>

          {/* Footer — show more */}
          {bookings.length > 8 && (
            <div className="border-t border-zinc-50 px-5 py-3">
              <button className="text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 transition">
                View all {bookings.length} sessions →
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
