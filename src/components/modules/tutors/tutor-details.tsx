"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Star,
  Clock,
  Globe,
  BookOpen,
  Users,
  CheckCircle2,
  ChevronRight,
  CalendarDays,
  MessageSquare,
  Award,
  Zap,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import TutorReviewsSection from "./tutor-card";
import TutorBookingSection from "./booking-form";

// ─── Types ──────────────────────────────────────────────────────────────────

interface TutorProfile {
  id: string;
  userId: string;
  title: string;
  bio: string;
  education: string;
  experienceYears: number;
  hourlyRate: number;
  availability: string;
  rating: number;
  totalReviews: number;
  totalStudents: number;
  completedSessions: number;
  languages: string[];
  verified: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

type Tab = "details" | "reviews" | "booking";

// ─── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="stat-card group">
      <div className="stat-icon">{icon}</div>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}

// ─── Skill Tag ──────────────────────────────────────────────────────────────

function SkillTag({ name }: { name: string }) {
  return <span className="skill-tag">{name}</span>;
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function TutorDetailsContent({ id }: { id: string }) {
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("details");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [tutorRes, skillsRes] = await Promise.all([
          fetch(`/api/tutors/${id}`),
          fetch(`/api/tutors/${id}/skills`).catch(() => null),
        ]);

        if (!tutorRes.ok) throw new Error("Tutor not found");
        const tutorData = await tutorRes.json();
        setTutor(tutorData.data ?? tutorData);

        if (skillsRes && skillsRes.ok) {
          const skillsData = await skillsRes.json();
          setSkills(skillsData.data ?? skillsData ?? []);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (error || !tutor) return <ErrorScreen error={error} />;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "details", label: "Details", icon: <BookOpen size={16} /> },
    { key: "reviews", label: "Reviews", icon: <MessageSquare size={16} /> },
    { key: "booking", label: "Book Session", icon: <CalendarDays size={16} /> },
  ];

  return (
    <>
      <style>{`
        :root {
          --ink: #0f0e17;
          --surface: #fafaf8;
          --card: #ffffff;
          --muted: #6b7280;
          --accent-1: #e8521a;   /* warm coral-orange */
          --accent-2: #1a7ae8;   /* electric blue */
          --accent-3: #f5c842;   /* golden yellow */
          --accent-glow: rgba(232, 82, 26, 0.15);
          --border: #e5e5e0;
          --radius: 16px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--surface);
          color: var(--ink);
        }

        .page-wrapper {
          min-height: 100vh;
          background: var(--surface);
        }

        /* Hero / Header */
        .hero-section {
          position: relative;
          background: var(--ink);
          overflow: hidden;
          padding: 0 0 0 0;
        }

        .hero-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .hero-accent {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,82,26,0.18) 0%, transparent 70%);
          top: -200px;
          right: -100px;
          pointer-events: none;
        }

        .hero-accent-2 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(26,122,232,0.12) 0%, transparent 70%);
          bottom: -100px;
          left: -50px;
          pointer-events: none;
        }

        .hero-inner {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px 0;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          text-decoration: none;
          transition: color 0.2s;
          margin-bottom: 32px;
        }

        .back-btn:hover { color: #fff; }

        .hero-card {
          display: flex;
          gap: 32px;
          align-items: flex-start;
          padding-bottom: 0;
        }

        /* Avatar */
        .avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .avatar-ring {
          width: 108px;
          height: 108px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
          padding: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #1e1d2e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: 700;
          color: #fff;
          overflow: hidden;
        }

        .verified-badge {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 24px;
          height: 24px;
          background: var(--accent-1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--ink);
        }

        /* Hero info */
        .hero-info { flex: 1; }

        .tutor-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.5px;
        }

        .tutor-title {
          font-size: 16px;
          color: var(--accent-1);
          margin-top: 6px;
          font-weight: 500;
        }

        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
        }

        .lang-chip {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.8);
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 13px;
        }

        .rate-badge {
          background: var(--accent-3);
          color: var(--ink);
          padding: 4px 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
        }

        /* Stats strip */
        .stats-strip {
          display: flex;
          gap: 0;
          margin-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .stat-card {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 24px;
          border-right: 1px solid rgba(255,255,255,0.08);
          transition: background 0.2s;
        }

        .stat-card:last-child { border-right: none; }
        .stat-card:hover { background: rgba(255,255,255,0.03); }

        .stat-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(232,82,26,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-1);
          flex-shrink: 0;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          font-family: 'Syne', sans-serif;
        }

        .stat-label {
          font-size: 12px;
          color: rgba(255,255,255,0.45);
          margin-top: 1px;
        }

        /* Tab Bar */
        .tab-bar-outer {
          background: var(--ink);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .tab-bar {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          gap: 0;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 28px;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.4);
          font-size: 14px;
          font-weight: 500;
          position: relative;
          transition: color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .tab-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent-1);
          transform: scaleX(0);
          transition: transform 0.25s ease;
        }

        .tab-btn.active {
          color: #fff;
        }

        .tab-btn.active::after {
          transform: scaleX(1);
        }

        .tab-btn:hover:not(.active) { color: rgba(255,255,255,0.7); }

        /* Main Content */
        .main-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        /* Details Grid */
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 32px;
        }

        @media (max-width: 768px) {
          .details-grid { grid-template-columns: 1fr; }
          .stats-strip { flex-wrap: wrap; }
          .stat-card { min-width: 50%; }
          .hero-card { flex-direction: column; }
        }

        /* Section Card */
        .section-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px;
          margin-bottom: 20px;
        }

        .section-card:last-child { margin-bottom: 0; }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-title-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-1);
          flex-shrink: 0;
        }

        /* Bio */
        .bio-text {
          font-size: 15px;
          line-height: 1.75;
          color: #374151;
        }

        /* Skills */
        .skills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          background: linear-gradient(135deg, rgba(232,82,26,0.08), rgba(26,122,232,0.08));
          border: 1px solid rgba(232,82,26,0.2);
          color: var(--ink);
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .skill-tag:hover {
          background: var(--accent-1);
          color: #fff;
          border-color: var(--accent-1);
        }

        /* Info Grid */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .info-item {
          background: #f9f9f7;
          border-radius: 12px;
          padding: 14px 16px;
          border: 1px solid var(--border);
        }

        .info-item-label {
          font-size: 11px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 4px;
          font-weight: 600;
        }

        .info-item-value {
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
        }

        /* Sidebar sticky card */
        .booking-sidebar {
          position: sticky;
          top: 80px;
        }

        .booking-cta-card {
          background: var(--ink);
          border-radius: var(--radius);
          padding: 28px;
          position: relative;
          overflow: hidden;
        }

        .booking-cta-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(232,82,26,0.2), transparent 60%);
          pointer-events: none;
        }

        .cta-rate {
          font-family: 'Syne', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #fff;
        }

        .cta-rate span {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
        }

        .cta-avail {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          margin: 12px 0 24px;
        }

        .cta-avail-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          box-shadow: 0 0 8px #22c55e;
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background: var(--accent-1);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
        }

        .btn-primary:hover {
          background: #d14415;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(232,82,26,0.3);
        }

        .btn-secondary {
          width: 100%;
          padding: 14px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }

        /* Features list */
        .feature-list {
          margin-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
        }

        .feature-item svg { color: var(--accent-3); flex-shrink: 0; }

        /* Loading */
        .loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--ink);
          flex-direction: column;
          gap: 16px;
        }

        .spinner {
          width: 48px;
          height: 48px;
          border: 3px solid rgba(255,255,255,0.1);
          border-top-color: var(--accent-1);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .loading-text {
          color: rgba(255,255,255,0.4);
          font-size: 14px;
        }
      `}</style>

      {/* Font imports via link injection */}
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="page-wrapper">
        {/* ── Hero ─────────────────────────────── */}
        <div className="hero-section">
          <div className="hero-noise" />
          <div className="hero-accent" />
          <div className="hero-accent-2" />

          <div className="hero-inner">
            <Link href="/tutors" className="back-btn">
              <ArrowLeft size={16} />
              Back to Tutors
            </Link>

            <div className="hero-card">
              <div className="avatar-wrap">
                <div className="avatar-ring">
                  <div className="avatar-inner">
                    {tutor.user.image ? (
                      <Image
                        src={tutor.user.image}
                        alt={tutor.user.name}
                        width={102}
                        height={102}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : (
                      tutor.user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                </div>
                {tutor.verified && (
                  <div className="verified-badge">
                    <CheckCircle2 size={12} color="#fff" />
                  </div>
                )}
              </div>

              <div className="hero-info">
                <h1 className="tutor-name">{tutor.user.name}</h1>
                <p className="tutor-title">{tutor.title}</p>
                <div className="hero-tags">
                  <span className="rate-badge">${tutor.hourlyRate}/hr</span>
                  {tutor.languages.map((lang) => (
                    <span key={lang} className="lang-chip">
                      {lang}
                    </span>
                  ))}
                  {tutor.verified && (
                    <span className="lang-chip" style={{ color: "#22c55e", borderColor: "rgba(34,197,94,0.3)" }}>
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="stats-strip">
              <StatCard
                icon={<Star size={16} />}
                label="Rating"
                value={tutor.rating > 0 ? tutor.rating.toFixed(1) : "New"}
              />
              <StatCard
                icon={<MessageSquare size={16} />}
                label="Reviews"
                value={tutor.totalReviews}
              />
              <StatCard
                icon={<Users size={16} />}
                label="Students"
                value={tutor.totalStudents}
              />
              <StatCard
                icon={<Zap size={16} />}
                label="Sessions"
                value={tutor.completedSessions}
              />
            </div>
          </div>
        </div>

        {/* ── Tab Bar ───────────────────────────── */}
        <div className="tab-bar-outer">
          <div className="tab-bar">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ───────────────────────── */}
        <div className="main-content">
          {activeTab === "details" && (
            <div className="details-grid">
              {/* Left Column */}
              <div>
                {/* Bio */}
                <div className="section-card">
                  <h2 className="section-title">
                    <span className="section-title-dot" />
                    About
                  </h2>
                  <p className="bio-text">{tutor.bio}</p>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                  <div className="section-card">
                    <h2 className="section-title">
                      <span className="section-title-dot" />
                      Skills & Expertise
                    </h2>
                    <div className="skills-wrap">
                      {skills.map((skill) => (
                        <SkillTag key={skill} name={skill} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Info */}
                <div className="section-card">
                  <h2 className="section-title">
                    <span className="section-title-dot" />
                    Quick Info
                  </h2>
                  <div className="info-grid">
                    <div className="info-item">
                      <p className="info-item-label">Education</p>
                      <p className="info-item-value">{tutor.education}</p>
                    </div>
                    <div className="info-item">
                      <p className="info-item-label">Experience</p>
                      <p className="info-item-value">{tutor.experienceYears} Years</p>
                    </div>
                    <div className="info-item">
                      <p className="info-item-label">Availability</p>
                      <p className="info-item-value" style={{ fontSize: "13px" }}>
                        {tutor.availability}
                      </p>
                    </div>
                    <div className="info-item">
                      <p className="info-item-label">Languages</p>
                      <p className="info-item-value">{tutor.languages.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="booking-sidebar">
                <div className="booking-cta-card">
                  <div className="cta-rate">
                    ${tutor.hourlyRate}
                    <span> / hour</span>
                  </div>
                  <div className="cta-avail">
                    <span className="cta-avail-dot" />
                    {tutor.availability}
                  </div>

                  <button className="btn-primary" onClick={() => setActiveTab("booking")}>
                    <CalendarDays size={16} />
                    Book a Session
                  </button>
                  <button className="btn-secondary">
                    <MessageSquare size={16} />
                    Send Message
                  </button>

                  <div className="feature-list">
                    <div className="feature-item">
                      <CheckCircle2 size={14} />
                      Free cancellation up to 24hrs
                    </div>
                    <div className="feature-item">
                      <CheckCircle2 size={14} />
                      Money-back guarantee
                    </div>
                    <div className="feature-item">
                      <CheckCircle2 size={14} />
                      Instant booking confirmation
                    </div>
                    <div className="feature-item">
                      <Award size={14} />
                      {tutor.experienceYears}+ years of experience
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <TutorReviewsSection tutorId={tutor.id} totalReviews={tutor.totalReviews} rating={tutor.rating} />
          )}

          {activeTab === "booking" && (
            <TutorBookingSection tutor={tutor} />
          )}
        </div>
      </div>
    </>
  );
}

// ─── Loading Screen ──────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <>
      <style>{`
        :root { --accent-1: #e8521a; --ink: #0f0e17; }
        .loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--ink);
          flex-direction: column;
          gap: 16px;
        }
        .spinner {
          width: 48px; height: 48px;
          border: 3px solid rgba(255,255,255,0.1);
          border-top-color: var(--accent-1);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-text { color: rgba(255,255,255,0.4); font-size: 14px; font-family: sans-serif; }
      `}</style>
      <div className="loading-screen">
        <div className="spinner" />
        <p className="loading-text">Loading tutor profile...</p>
      </div>
    </>
  );
}

function ErrorScreen({ error }: { error: string | null }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f0e17" }}>
      <div style={{ textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>Oops!</h2>
        <p style={{ color: "rgba(255,255,255,0.5)" }}>{error ?? "Tutor not found"}</p>
        <Link href="/tutors" style={{ color: "#e8521a", marginTop: "16px", display: "inline-block" }}>
          ← Back to Tutors
        </Link>
      </div>
    </div>
  );
}
