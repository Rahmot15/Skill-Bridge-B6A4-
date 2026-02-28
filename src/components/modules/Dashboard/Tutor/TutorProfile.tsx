"use client";

import { useState } from "react";
import {
  Briefcase, GraduationCap, Clock, DollarSign,
  Globe, Save, FileText, Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ─── Type ─────────────────────────────────────────────────────────────────────

type Tutor = {
  title: string;
  bio: string;
  education: string;
  experienceYears: number;
  hourlyRate: number;
  availability: string;
  languages: string[];
};

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, icon: Icon, children, accent }: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
  accent?: "emerald" | "yellow";
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-zinc-400">
        <span className={cn(
          "flex h-5 w-5 items-center justify-center rounded-md",
          accent === "yellow"  ? "bg-yellow-100 text-yellow-600" :
          accent === "emerald" ? "bg-emerald-100 text-emerald-600" :
          "bg-zinc-100 text-zinc-400"
        )}>
          <Icon size={11} />
        </span>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-[13px] text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition";

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function TutorProfile({ tutor }: { tutor: Tutor }) {
  const [form, setForm] = useState({
    title:           tutor.title           || "",
    bio:             tutor.bio             || "",
    education:       tutor.education       || "",
    experienceYears: tutor.experienceYears || 0,
    hourlyRate:      tutor.hourlyRate      || 0,
    availability:    tutor.availability    || "",
    languages:       tutor.languages?.join(", ") || "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    setLoading(true);
    try {
      const payload = {
        ...form,
        experienceYears: Number(form.experienceYears),
        hourlyRate:      Number(form.hourlyRate),
        languages:       form.languages.split(",").map((l) => l.trim()).filter(Boolean),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/tutors/profile`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      if (data?.success) {
        // ── Success toast → emerald feel ──
        toast.success("Profile updated!", {
          description: "Your tutor profile has been saved successfully.",
        });
      } else {
        toast.error("Update failed", {
          description: data?.message || "Something went wrong. Please try again.",
        });
      }
    } catch {
      toast.error("Network error", {
        description: "Could not reach the server. Check your connection.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-zinc-50 p-6">
        <div className="space-y-6">

          {/* ── Page header ── */}
          <div className="flex items-end justify-between">
            <div>
              {/* yellow label → tutor portal accent */}
              <p className="text-[11px] font-semibold uppercase tracking-widest text-yellow-600">
                Tutor Portal
              </p>
              <h1 className="mt-1 text-[26px] font-bold tracking-tight text-zinc-900">
                My Profile
              </h1>
            </div>
            <button
              onClick={handleSave}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-60 transition"
            >
              <Save size={14} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* ── Left column ── */}
            <div className="space-y-5">

              {/* Professional info card */}
              <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-50 pb-3">
                  {/* yellow icon → tutor accent */}
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-50">
                    <Briefcase size={13} className="text-yellow-600" />
                  </div>
                  <h3 className="text-[13px] font-bold text-zinc-800">Professional Info</h3>
                </div>

                <Field label="Job Title" icon={Briefcase} accent="yellow">
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Mobile App Developer"
                    className={inputCls}
                  />
                </Field>

                <Field label="Bio" icon={FileText}>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Tell students about yourself..."
                    rows={4}
                    className={cn(inputCls, "resize-none")}
                  />
                </Field>

                <Field label="Education" icon={GraduationCap} accent="emerald">
                  <input
                    name="education"
                    value={form.education}
                    onChange={handleChange}
                    placeholder="e.g. Diploma in Computer Engineering"
                    className={inputCls}
                  />
                </Field>
              </div>

            </div>

            {/* ── Right column ── */}
            <div className="space-y-5">

              {/* Rates & experience card */}
              <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-50 pb-3">
                  {/* emerald icon → positive/money */}
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                    <Sparkles size={13} className="text-emerald-600" />
                  </div>
                  <h3 className="text-[13px] font-bold text-zinc-800">Rates & Experience</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Experience (yrs)" icon={Briefcase} accent="yellow">
                    <input
                      name="experienceYears"
                      type="number"
                      value={form.experienceYears}
                      onChange={handleChange}
                      placeholder="4"
                      className={inputCls}
                    />
                  </Field>

                  {/* Hourly rate → emerald (money/positive) */}
                  <Field label="Hourly Rate ($)" icon={DollarSign} accent="emerald">
                    <input
                      name="hourlyRate"
                      type="number"
                      value={form.hourlyRate}
                      onChange={handleChange}
                      placeholder="50"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Availability" icon={Clock} accent="emerald">
                  <input
                    name="availability"
                    value={form.availability}
                    onChange={handleChange}
                    placeholder="e.g. Mon-Fri 6pm-9pm"
                    className={inputCls}
                  />
                </Field>

                <Field label="Languages" icon={Globe}>
                  <input
                    name="languages"
                    value={form.languages}
                    onChange={handleChange}
                    placeholder="English, Bangla"
                    className={inputCls}
                  />
                  <p className="text-[11px] text-zinc-400">Comma separated</p>
                </Field>
              </div>

              {/* Preview card — live preview of key info */}
              <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-yellow-600">
                  Live Preview
                </p>
                <p className="text-[15px] font-bold text-zinc-800">{form.title || "Your title"}</p>
                <p className="text-[12px] text-zinc-500 line-clamp-2">{form.bio || "Your bio will appear here..."}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {/* Language pills → emerald */}
                  {form.languages
                    .split(",")
                    .map((l) => l.trim())
                    .filter(Boolean)
                    .map((lang) => (
                      <span key={lang} className="rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                        {lang}
                      </span>
                    ))}
                </div>
                <div className="flex items-center gap-4 pt-1 text-[12px] text-zinc-500">
                  {form.hourlyRate > 0 && (
                    <span className="font-semibold text-emerald-700">${form.hourlyRate}/hr</span>
                  )}
                  {form.experienceYears > 0 && (
                    <span>{form.experienceYears} yrs exp</span>
                  )}
                  {form.availability && (
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {form.availability}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
