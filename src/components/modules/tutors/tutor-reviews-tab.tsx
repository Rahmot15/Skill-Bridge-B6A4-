"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface TutorReviewsTabProps {
  tutor: {
    totalReviews?: number;
    rating?: number;
  };
}

// Dummy reviews data
const dummyReviews = [
  {
    id: 1,
    studentName: "Alex Johnson",
    studentAvatar: null,
    rating: 5,
    comment: "Absolutely amazing tutor! Sarah helped me understand React hooks and state management in just a few sessions. Her teaching style is clear and patient.",
    createdAt: "2026-02-15",
    course: "React Development",
  },
  {
    id: 2,
    studentName: "Maria Garcia",
    studentAvatar: null,
    rating: 5,
    comment: "Best investment I've made in my career! The sessions were well-structured and practical. I'm now confident building full-stack applications.",
    createdAt: "2026-02-10",
    course: "Full Stack Development",
  },
  {
    id: 3,
    studentName: "David Chen",
    studentAvatar: null,
    rating: 4,
    comment: "Great tutor with deep knowledge. Sometimes moves a bit fast, but overall an excellent learning experience. Highly recommend!",
    createdAt: "2026-02-05",
    course: "TypeScript Basics",
  },
  {
    id: 4,
    studentName: "Emma Wilson",
    studentAvatar: null,
    rating: 5,
    comment: "Sarah is patient, knowledgeable, and explains complex concepts in simple terms. She helped me land my first developer job!",
    createdAt: "2026-01-28",
    course: "Web Development",
  },
  {
    id: 5,
    studentName: "James Smith",
    studentAvatar: null,
    rating: 5,
    comment: "Excellent teaching methodology. The real-world examples and projects helped me understand not just the 'how' but also the 'why' behind concepts.",
    createdAt: "2026-01-20",
    course: "Node.js & Express",
  },
];

const ratingBreakdown = [
  { stars: 5, percentage: 85, count: 204 },
  { stars: 4, percentage: 10, count: 24 },
  { stars: 3, percentage: 3, count: 7 },
  { stars: 2, percentage: 1, count: 2 },
  { stars: 1, percentage: 1, count: 1 },
];

export default function TutorReviewsTab({ tutor }: TutorReviewsTabProps) {
  const totalReviews = tutor?.totalReviews || 238;
  const averageRating = tutor?.rating || 4.9;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Reviews List */}
      <div className="lg:col-span-2 space-y-4">
        {dummyReviews.map((review) => (
          <Card
            key={review.id}
            className="p-6 border-[#dddbff]/50 shadow-lg bg-white/90 backdrop-blur hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <Avatar className="w-12 h-12 flex-shrink-0">
                <AvatarImage src={review.studentAvatar || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-[#2f27ce] to-[#443dff] text-white font-semibold">
                  {review.studentName.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-[#040316]">{review.studentName}</h4>
                    <p className="text-xs text-[#040316]/50">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#f5f3ff] px-2.5 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-[#040316]">{review.rating}</span>
                  </div>
                </div>

                {/* Course Badge */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-[#e0e7ff] text-[#2f27ce] text-xs font-medium rounded-full">
                    {review.course}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-[#040316]/75 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Sidebar - Rating Breakdown */}
      <div className="space-y-6">
        {/* Overall Rating */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-gradient-to-br from-white to-[#faf9ff]">
          <div className="text-center mb-6">
            <div className="text-6xl font-black text-[#040316] mb-2">
              {averageRating}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-[#040316]/60">
              Based on {totalReviews} reviews
            </p>
          </div>

          <div className="pt-6 border-t border-[#dddbff]/40">
            <h3 className="font-bold text-lg mb-4 text-[#040316]">Rating Breakdown</h3>
            <div className="space-y-3">
              {ratingBreakdown.map(({ stars, percentage, count }) => (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 min-w-[65px]">
                    <span className="text-sm font-medium text-[#040316]">{stars}</span>
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress
                    value={percentage}
                    className="flex-1 h-2.5 bg-[#f5f3ff]"
                  />
                  <span className="text-xs text-[#040316]/50 min-w-[35px] text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Review Stats */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-gradient-to-br from-[#faf9ff] to-white">
          <h3 className="font-bold text-lg mb-4 text-[#040316]">Review Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#040316]/70">Total Reviews</span>
              <span className="font-bold text-[#040316]">{totalReviews}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#040316]/70">5-Star Reviews</span>
              <span className="font-bold text-emerald-600">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#040316]/70">Verified Reviews</span>
              <span className="font-bold text-[#2f27ce]">100%</span>
            </div>
          </div>
        </Card>

        {/* Student Testimonial Highlight */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-gradient-to-br from-[#2f27ce] to-[#443dff] text-white">
          <div className="flex items-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            ))}
          </div>
          <p className="text-white/95 italic mb-4 leading-relaxed">
            One of the best tutors I ve ever had. Patient, knowledgeable, and truly cares about student success.
          </p>
          <p className="text-sm text-white/75">— Featured Review</p>
        </Card>
      </div>
    </div>
  );
}
