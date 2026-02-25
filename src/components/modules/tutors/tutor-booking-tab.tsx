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
import { Calendar, DollarSign, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Tutor {
  userId?: string;
  user?: {
    name?: string;
  };
  hourlyRate?: number;
}

interface Category {
  id: string;
  title: string;
  description?: string;
}

interface TutorBookingTabProps {
  tutor: Tutor;
  categories: Category[];
}

export default function TutorBookingTab({ tutor, categories }: TutorBookingTabProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/bookings`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tutorId: tutor?.userId,
          categoryId: selectedCategory,
          date: new Date(bookingDate).toISOString(),
          message: message || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const responseData = await response.json();
      // Handle both direct response and wrapped {success, data} response
      const bookingData = responseData?.data ?? responseData;

      toast.success("Booking Request Sent!", {
        description: `Your session request with ${tutor?.user?.name || "the tutor"} has been sent successfully.`,
      });

      // Reset form
      setSelectedCategory("");
      setBookingDate("");
      setMessage("");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Booking Failed", {
        description: "Failed to send booking request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Booking Form */}
      <div className="lg:col-span-2">
        <Card className="p-8 border-[#dddbff]/50 shadow-xl bg-white/90">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#040316] mb-2">Book a Session</h2>
            <p className="text-[#040316]/70">
              Schedule a learning session with {tutor?.user?.name || "the tutor"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block text-[#040316]">
                Select Category
              </Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                <SelectTrigger className="h-14 text-base border-[#dddbff] focus:border-[#2f27ce] focus:ring-[#2f27ce]/20">
                  <SelectValue placeholder="Choose a category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="text-base">
                      {category.title}
                      {category.description && (
                        <span className="text-xs text-[#040316]/60"> - {category.description}</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div>
              <Label className="text-base font-semibold mb-3 flex items-center gap-2 text-[#040316]">
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

            {/* Message */}
            <div>
              <Label className="text-base font-semibold mb-3 block text-[#040316]">
                Message{" "}
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
            {selectedCategory && (
              <div className="bg-linear-to-r from-[#f5f3ff] via-[#faf9ff] to-[#f5f3ff] rounded-xl p-5 flex justify-between items-center border border-[#dddbff]/50">
                <div>
                  <p className="text-sm text-[#040316]/60 mb-1">Estimated Cost</p>
                  <p className="text-lg font-semibold text-[#040316]">
                    {categories.find((c) => c.id === selectedCategory)?.title}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-[#2f27ce]">${tutor?.hourlyRate ?? 0}</p>
                  <p className="text-sm text-[#040316]/60">/hour</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full h-16 text-lg font-bold bg-linear-to-r from-[#2f27ce] to-[#443dff] hover:from-[#443dff] hover:to-[#2f27ce] shadow-xl hover:shadow-2xl transition-all"
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
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-linear-to-br from-white to-[#faf9ff]">
          <h3 className="font-bold text-lg mb-4 text-[#040316]">Booking Information</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#e0e7ff] flex items-center justify-center shrink-0">
                <DollarSign className="w-4 h-4 text-[#2f27ce]" />
              </div>
              <div>
                <p className="font-semibold text-[#040316] mb-1">Flexible Pricing</p>
                <p className="text-[#040316]/70">
                  ${tutor?.hourlyRate ?? 0}/hour. Discounts available for bulk sessions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#d1fae5] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="font-semibold text-[#040316] mb-1">Quick Response</p>
                <p className="text-[#040316]/70">Tutors typically respond within 2 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#fef3c7] flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-[#040316] mb-1">Free Cancellation</p>
                <p className="text-[#040316]/70">Cancel up to 24 hours before session starts</p>
              </div>
            </div>
          </div>
        </Card>

        {/* How it Works */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-linear-to-br from-[#faf9ff] to-white">
          <h3 className="font-bold text-lg mb-4 text-[#040316]">How It Works</h3>
          <div className="space-y-4">
            {[
              { step: 1, title: "Submit Request", desc: "Fill out the booking form" },
              { step: 2, title: "Get Confirmation", desc: "Tutor reviews and confirms" },
              { step: 3, title: "Start Learning", desc: "Join session and achieve goals" },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#2f27ce] to-[#443dff] flex items-center justify-center shrink-0 text-white text-sm font-bold">
                  {step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#040316]">{title}</p>
                  <p className="text-xs text-[#040316]/60 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Important Note */}
        <Card className="p-5 border-amber-200 bg-amber-50/50 shadow-md">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">Important Note</p>
              <p className="text-xs text-amber-800/80 leading-relaxed">
                Your booking request will be sent to the tutor for review. Payment is only
                required after the tutor confirms your session.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
