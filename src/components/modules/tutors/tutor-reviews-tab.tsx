"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  student: {
    id: string;
    name: string;
    image: string | null;
  };
}

interface Tutor {
  id: string;
  name: string;
  rating: number | null;
  totalReviews: number;
}

interface TutorReviewsTabProps {
  tutor: Tutor;
  reviews: Review[];
}

export default function TutorReviewsTab({ tutor, reviews }: TutorReviewsTabProps) {
  // Calculate rating breakdown
  const ratingCounts = [0, 0, 0, 0, 0]; // Index 0 = 1 star, Index 4 = 5 stars
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  const totalReviews = tutor.totalReviews || reviews.length;
  const averageRating = tutor.rating || 0;

  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: ratingCounts[stars - 1],
    percentage: totalReviews > 0 ? (ratingCounts[stars - 1] / totalReviews) * 100 : 0,
  }));

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Reviews List */}
      <div className="lg:col-span-2 space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card
              key={review.id}
              className="p-6 border-[#dddbff]/50 shadow-lg bg-white/90 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarImage src={review.student.image || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-[#2f27ce] to-[#443dff] text-white font-semibold">
                    {review.student.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-[#040316]">{review.student.name}</h4>
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

                  {/* Comment */}
                  <p className="text-[#040316]/75 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-16 text-center border-[#dddbff]/50 shadow-lg">
            <Star className="w-16 h-16 text-[#dddbff] mx-auto mb-4" />
            <p className="text-xl font-semibold text-[#040316] mb-2">No reviews yet</p>
            <p className="text-[#040316]/60">Be the first to leave a review!</p>
          </Card>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Overall Rating */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-gradient-to-br from-white to-[#faf9ff]">
          <div className="text-center mb-6">
            <div className="text-6xl font-black text-[#040316] mb-2">
              {averageRating > 0 ? averageRating.toFixed(1) : "New"}
            </div>
            {averageRating > 0 && (
              <>
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
                  Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                </p>
              </>
            )}
          </div>

          {totalReviews > 0 && (
            <div className="pt-6 border-t border-[#dddbff]/40">
              <h3 className="font-bold text-lg mb-4 text-[#040316]">Rating Breakdown</h3>
              <div className="space-y-3">
                {ratingBreakdown.map(({ stars, percentage, count }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 min-w-[65px]">
                      <span className="text-sm font-medium text-[#040316]">{stars}</span>
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <Progress value={percentage} className="flex-1 h-2.5 bg-[#f5f3ff]" />
                    <span className="text-xs text-[#040316]/50 min-w-[35px] text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Review Stats */}
        {totalReviews > 0 && (
          <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-gradient-to-br from-[#faf9ff] to-white">
            <h3 className="font-bold text-lg mb-4 text-[#040316]">Review Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#040316]/70">Total Reviews</span>
                <span className="font-bold text-[#040316]">{totalReviews}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#040316]/70">5-Star Reviews</span>
                <span className="font-bold text-emerald-600">
                  {totalReviews > 0
                    ? Math.round((ratingCounts[4] / totalReviews) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#040316]/70">Average Rating</span>
                <span className="font-bold text-[#2f27ce]">
                  {averageRating > 0 ? averageRating.toFixed(1) : "N/A"}
                </span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
