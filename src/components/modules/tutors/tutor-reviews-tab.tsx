"use client";

import { Star, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  student: { name: string; image: string | null };
}

export default function TutorReviewsTab({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50">
          <MessageSquare size={22} className="text-yellow-500" />
        </div>
        <p className="mt-4 text-[14px] font-semibold text-zinc-700">
          No reviews yet
        </p>
        <p className="mt-1 text-[12px] text-zinc-400">
          Be the first to leave a review after your session.
        </p>
      </div>
    );
  }

  // Average rating
  const avg = (
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="space-y-5">
      {/* Summary bar */}
      <div className="flex items-center gap-5 rounded-2xl border border-yellow-100 bg-yellow-50 px-6 py-4">
        <div className="text-center">
          <div className="text-[36px] font-black text-yellow-600 leading-none">
            {avg}
          </div>
          <div className="mt-1 flex justify-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={12}
                className={cn(
                  "fill-current",
                  s <= Math.round(Number(avg))
                    ? "text-yellow-400"
                    : "text-zinc-200",
                )}
              />
            ))}
          </div>
          <div className="mt-1 text-[11px] text-yellow-600">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Rating bars */}
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const pct = reviews.length
              ? Math.round((count / reviews.length) * 100)
              : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="w-4 text-right text-[11px] font-semibold text-zinc-500">
                  {star}
                </span>
                <Star
                  size={10}
                  className="shrink-0 fill-yellow-400 text-yellow-400"
                />
                <div className="flex-1 h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-yellow-400 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-6 text-[10px] text-zinc-400">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-3">
        {reviews.map((review) => {
          const initials = review.student.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          return (
            <div
              key={review.id}
              className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                {/* Avatar — emerald for students */}
                <div className="shrink-0">
                  {review.student.image ? (
                    <img
                      src={review.student.image}
                      alt={review.student.name}
                      className="h-10 w-10 rounded-xl object-cover ring-2 ring-emerald-100"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-300 to-emerald-400 text-[12px] font-bold text-white">
                      {initials}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[13px] font-bold text-zinc-800">
                      {review.student.name}
                    </p>
                    <span className="text-[11px] text-zinc-400">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Stars — yellow */}
                  <div className="mt-1 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        className={cn(
                          "fill-current",
                          s <= review.rating
                            ? "text-yellow-400"
                            : "text-zinc-200",
                        )}
                      />
                    ))}
                  </div>

                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
