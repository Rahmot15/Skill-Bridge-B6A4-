"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, DollarSign, CheckCircle2, AlertCircle } from "lucide-react";

interface Tutor {
  user?: {
    name?: string;
  };
  hourlyRate?: number;
}

interface TutorBookingTabProps {
  tutor: Tutor;
}

// Dummy skills for booking
const availableSkills = [
  "React Development",
  "Node.js & Express",
  "TypeScript Basics",
  "Full Stack Development",
  "Next.js",
  "Database Design",
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

export default function TutorBookingTab({ tutor }: TutorBookingTabProps) {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setSelectedSkill("");
      setBookingDate("");
      setBookingTime("");
      setMessage("");
    }, 3000);
  };

  if (submitted) {
    return (
      <Card className="p-12 border-[#dddbff]/50 shadow-xl bg-white/90 backdrop-blur text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[#040316] mb-3">Booking Request Sent!</h2>
        <p className="text-lg text-[#040316]/70 mb-2">
          Your session request has been sent to{" "}
          <span className="font-semibold text-[#2f27ce]">{tutor?.user?.name || "the tutor"}</span>
        </p>
        <p className="text-sm text-[#040316]/60">
          You ll receive a confirmation email once the tutor accepts your request.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Booking Form */}
      <div className="lg:col-span-2">
        <Card className="p-8 border-[#dddbff]/50 shadow-xl bg-white/90 backdrop-blur">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#040316] mb-2">Book a Session</h2>
            <p className="text-[#040316]/70">
              Schedule a learning session with {tutor?.user?.name || "this tutor"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skill Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block text-[#040316]">
                Select Skill to Learn
              </Label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill} required>
                <SelectTrigger className="h-14 text-base border-[#dddbff] focus:border-[#2f27ce] focus:ring-[#2f27ce]/20">
                  <SelectValue placeholder="Choose a skill..." />
                </SelectTrigger>
                <SelectContent>
                  {availableSkills.map((skill) => (
                    <SelectItem key={skill} value={skill} className="text-base">
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date & Time Grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label className="text-base font-semibold mb-3 block text-[#040316] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#2f27ce]" />
                  Preferred Date
                </Label>
                <Input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="h-14 text-base border-[#dddbff] focus:border-[#2f27ce] focus:ring-[#2f27ce]/20"
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block text-[#040316] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2f27ce]" />
                  Preferred Time
                </Label>
                <Select value={bookingTime} onValueChange={setBookingTime} required>
                  <SelectTrigger className="h-14 text-base border-[#dddbff] focus:border-[#2f27ce] focus:ring-[#2f27ce]/20">
                    <SelectValue placeholder="Select time..." />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time} className="text-base">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div>
              <Label className="text-base font-semibold mb-3 block text-[#040316]">
                Additional Message{" "}
                <span className="text-[#040316]/50 font-normal text-sm">(Optional)</span>
              </Label>
              <Textarea
                placeholder="Tell the tutor what you'd like to focus on, your current level, or any specific goals..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="resize-none border-[#dddbff] focus:border-[#2f27ce] focus:ring-[#2f27ce]/20 text-base"
              />
            </div>

            {/* Price Preview */}
            {selectedSkill && (
              <div className="bg-gradient-to-r from-[#f5f3ff] via-[#faf9ff] to-[#f5f3ff] rounded-xl p-5 flex justify-between items-center border border-[#dddbff]/50">
                <div>
                  <p className="text-sm text-[#040316]/60 mb-1">Estimated Session Cost</p>
                  <p className="text-lg font-semibold text-[#040316]">{selectedSkill}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-[#2f27ce]">
                    ${tutor?.hourlyRate || 60}
                  </p>
                  <p className="text-sm text-[#040316]/60">/hour</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full h-16 text-lg font-bold bg-gradient-to-r from-[#2f27ce] to-[#443dff] hover:from-[#443dff] hover:to-[#2f27ce] shadow-xl hover:shadow-2xl transition-all"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending Request...
                </div>
              ) : (
                "Send Booking Request"
              )}
            </Button>
          </form>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Booking Info */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-gradient-to-br from-white to-[#faf9ff]">
          <h3 className="font-bold text-lg mb-4 text-[#040316]">Booking Information</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#e0e7ff] flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 text-[#2f27ce]" />
              </div>
              <div>
                <p className="font-semibold text-[#040316] mb-1">Flexible Pricing</p>
                <p className="text-[#040316]/70">
                  ${tutor?.hourlyRate || 60}/hour. Discounts available for bulk sessions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#d1fae5] flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="font-semibold text-[#040316] mb-1">Quick Response</p>
                <p className="text-[#040316]/70">
                  Tutors typically respond within 2 hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#fef3c7] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-[#040316] mb-1">Free Cancellation</p>
                <p className="text-[#040316]/70">
                  Cancel up to 24 hours before session starts
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* How it Works */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-gradient-to-br from-[#faf9ff] to-white">
          <h3 className="font-bold text-lg mb-4 text-[#040316]">How It Works</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2f27ce] to-[#443dff] flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                1
              </div>
              <div>
                <p className="text-sm font-semibold text-[#040316]">Submit Request</p>
                <p className="text-xs text-[#040316]/60 mt-0.5">
                  Fill out the booking form with your details
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2f27ce] to-[#443dff] flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                2
              </div>
              <div>
                <p className="text-sm font-semibold text-[#040316]">Get Confirmation</p>
                <p className="text-xs text-[#040316]/60 mt-0.5">
                  Tutor reviews and confirms your session
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2f27ce] to-[#443dff] flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                3
              </div>
              <div>
                <p className="text-sm font-semibold text-[#040316]">Start Learning</p>
                <p className="text-xs text-[#040316]/60 mt-0.5">
                  Join the session and achieve your goals
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Important Note */}
        <Card className="p-5 border-amber-200 bg-amber-50/50 shadow-md">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">Important Note</p>
              <p className="text-xs text-amber-800/80 leading-relaxed">
                Your booking request will be sent to the tutor for review. Payment is only required after the tutor confirms your session.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
