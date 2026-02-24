"use client";

import { useState } from "react";
import { CalendarDays, Clock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

interface TutorProfile {
  id: string;
  hourlyRate: number;
  availability: string;
  user: { name: string };
}

interface Props {
  tutor: TutorProfile;
}

const HOURS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export default function TutorBookingSection({ tutor }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<"1h" | "2h">("1h");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const totalRate = sessionType === "1h" ? tutor.hourlyRate : tutor.hourlyRate * 2;

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDate(null);
    setSelectedTime(null);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDate(null);
    setSelectedTime(null);
  }

  function isPast(day: number) {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  }

  async function handleBooking() {
    if (!selectedDate || !selectedTime) return;
    setSubmitting(true);
    try {
      // POST to booking API
      await fetch(`/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tutorId: tutor.id,
          date: `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`,
          time: selectedTime,
          duration: sessionType === "1h" ? 60 : 120,
        }),
      });
      setSubmitted(true);
    } catch {
      alert("Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div style={{
        textAlign: "center",
        padding: "80px 24px",
        maxWidth: "480px",
        margin: "0 auto",
      }}>
        <div style={{
          width: 80, height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #e8521a, #f5c842)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
        }}>
          <CheckCircle2 size={40} color="#fff" />
        </div>
        <h2 style={{ fontSize: "28px", fontWeight: 800, fontFamily: "Syne, sans-serif", marginBottom: "12px" }}>
          Booking Confirmed!
        </h2>
        <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
          Your session with <strong>{tutor.user.name}</strong> on{" "}
          <strong>{MONTHS[month]} {selectedDate}, {year}</strong> at{" "}
          <strong>{selectedTime}</strong> has been requested. You ll receive a confirmation shortly.
        </p>
        <button
          onClick={() => { setSubmitted(false); setSelectedDate(null); setSelectedTime(null); }}
          style={{
            marginTop: "24px",
            padding: "12px 28px",
            background: "#0f0e17",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "15px",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          Book Another Session
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .booking-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 768px) { .booking-layout { grid-template-columns: 1fr; } }

        .booking-card {
          background: #fff;
          border: 1px solid #e5e5e0;
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 20px;
        }

        .booking-card:last-child { margin-bottom: 0; }

        .booking-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0f0e17;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .booking-title-icon {
          width: 32px; height: 32px;
          background: rgba(232,82,26,0.1);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #e8521a;
        }

        /* Calendar */
        .cal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .cal-nav {
          width: 36px; height: 36px;
          background: #f9f9f7;
          border: 1px solid #e5e5e0;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cal-nav:hover { background: #0f0e17; color: #fff; }

        .cal-month {
          font-weight: 700;
          font-size: 16px;
          color: #0f0e17;
        }

        .cal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .cal-day-name {
          text-align: center;
          font-size: 11px;
          color: #9ca3af;
          font-weight: 600;
          text-transform: uppercase;
          padding: 8px 0;
        }

        .cal-day {
          text-align: center;
          padding: 10px 4px;
          border-radius: 10px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.15s;
          font-weight: 500;
          color: #374151;
          border: 2px solid transparent;
        }

        .cal-day:hover:not(.past):not(.empty) {
          background: rgba(232,82,26,0.1);
          color: #e8521a;
        }

        .cal-day.selected {
          background: #e8521a;
          color: #fff;
          border-color: #e8521a;
        }

        .cal-day.past {
          color: #d1d5db;
          cursor: not-allowed;
        }

        .cal-day.today {
          border-color: #e8521a;
          color: #e8521a;
          font-weight: 700;
        }

        .cal-day.today.selected {
          color: #fff;
        }

        /* Time slots */
        .time-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        @media (max-width: 480px) { .time-grid { grid-template-columns: repeat(2, 1fr); } }

        .time-slot {
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #e5e5e0;
          text-align: center;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s;
          font-weight: 500;
          color: #374151;
          background: #f9f9f7;
        }

        .time-slot:hover { border-color: #e8521a; color: #e8521a; background: rgba(232,82,26,0.05); }

        .time-slot.selected {
          background: #e8521a;
          color: #fff;
          border-color: #e8521a;
        }

        /* Session type */
        .session-type-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .session-option {
          padding: 16px;
          border-radius: 12px;
          border: 2px solid #e5e5e0;
          cursor: pointer;
          transition: all 0.2s;
          background: #f9f9f7;
        }

        .session-option.selected {
          border-color: #e8521a;
          background: rgba(232,82,26,0.04);
        }

        .session-option-title {
          font-weight: 700;
          font-size: 15px;
          color: #0f0e17;
          margin-bottom: 4px;
        }

        .session-option-price {
          font-size: 20px;
          font-weight: 800;
          color: #e8521a;
          font-family: 'Syne', sans-serif;
        }

        .session-option-desc {
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        /* Summary card */
        .summary-card {
          background: #0f0e17;
          border-radius: 16px;
          padding: 28px;
          position: sticky;
          top: 80px;
          overflow: hidden;
        }

        .summary-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(232,82,26,0.15), transparent 60%);
          pointer-events: none;
        }

        .summary-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 20px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-size: 14px;
        }

        .summary-row:last-of-type { border-bottom: none; }

        .summary-label { color: rgba(255,255,255,0.5); }
        .summary-value { color: #fff; font-weight: 600; }

        .summary-total {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.12);
        }

        .summary-total-label {
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          align-self: flex-end;
        }

        .summary-total-value {
          font-size: 32px;
          font-weight: 800;
          color: #fff;
          font-family: 'Syne', sans-serif;
        }

        .book-btn {
          width: 100%;
          margin-top: 20px;
          padding: 16px;
          background: #e8521a;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .book-btn:hover:not(:disabled) {
          background: #d14415;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(232,82,26,0.35);
        }

        .book-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .placeholder-hint {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          text-align: center;
          margin-top: 12px;
        }
      `}</style>

      <div className="booking-layout">
        {/* Left: Calendar + Time + Session Type */}
        <div>
          {/* Calendar */}
          <div className="booking-card">
            <h2 className="booking-title">
              <span className="booking-title-icon"><CalendarDays size={16} /></span>
              Pick a Date
            </h2>

            <div className="cal-header">
              <button className="cal-nav" onClick={prevMonth}><ChevronLeft size={16} /></button>
              <span className="cal-month">{MONTHS[month]} {year}</span>
              <button className="cal-nav" onClick={nextMonth}><ChevronRight size={16} /></button>
            </div>

            <div className="cal-grid">
              {DAYS.map((d) => <div key={d} className="cal-day-name">{d}</div>)}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`e-${i}`} className="cal-day empty" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                const past = isPast(day);
                let cls = "cal-day";
                if (past) cls += " past";
                if (isToday) cls += " today";
                if (selectedDate === day) cls += " selected";
                return (
                  <div
                    key={day}
                    className={cls}
                    onClick={() => { if (!past) { setSelectedDate(day); setSelectedTime(null); } }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="booking-card">
              <h2 className="booking-title">
                <span className="booking-title-icon"><Clock size={16} /></span>
                Choose a Time
              </h2>
              <div className="time-grid">
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className={`time-slot ${selectedTime === h ? "selected" : ""}`}
                    onClick={() => setSelectedTime(h)}
                  >
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Session Type */}
          {selectedDate && selectedTime && (
            <div className="booking-card">
              <h2 className="booking-title">Session Duration</h2>
              <div className="session-type-grid">
                <div
                  className={`session-option ${sessionType === "1h" ? "selected" : ""}`}
                  onClick={() => setSessionType("1h")}
                >
                  <p className="session-option-title">Standard</p>
                  <p className="session-option-price">${tutor.hourlyRate}</p>
                  <p className="session-option-desc">1 hour session</p>
                </div>
                <div
                  className={`session-option ${sessionType === "2h" ? "selected" : ""}`}
                  onClick={() => setSessionType("2h")}
                >
                  <p className="session-option-title">Extended</p>
                  <p className="session-option-price">${tutor.hourlyRate * 2}</p>
                  <p className="session-option-desc">2 hour session</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div>
          <div className="summary-card">
            <h2 className="summary-title">Booking Summary</h2>

            <div className="summary-row">
              <span className="summary-label">Tutor</span>
              <span className="summary-value">{tutor.user.name}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Date</span>
              <span className="summary-value">
                {selectedDate ? `${MONTHS[month].slice(0, 3)} ${selectedDate}, ${year}` : "—"}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Time</span>
              <span className="summary-value">{selectedTime ?? "—"}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Duration</span>
              <span className="summary-value">{sessionType === "1h" ? "1 hour" : "2 hours"}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Rate</span>
              <span className="summary-value">${tutor.hourlyRate}/hr</span>
            </div>

            <div className="summary-total">
              <span className="summary-total-label">Total</span>
              <span className="summary-total-value">${totalRate}</span>
            </div>

            <button
              className="book-btn"
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || submitting}
            >
              {submitting ? "Booking..." : "Confirm Booking"}
              {!submitting && <CheckCircle2 size={18} />}
            </button>

            {(!selectedDate || !selectedTime) && (
              <p className="placeholder-hint">
                {!selectedDate ? "Select a date to continue" : "Select a time slot"}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
