"use client";

import { useEffect, useState } from "react";
import { Star, ThumbsUp } from "lucide-react";

interface Review {
  id: string;
  studentName: string;
  studentImage?: string | null;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Props {
  tutorId: string;
  totalReviews: number;
  rating: number;
}

export default function TutorReviewsSection({ tutorId, totalReviews, rating }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/tutors/${tutorId}/reviews`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data.data ?? data ?? []);
        }
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [tutorId]);

  const ratingBars = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.floor(r.rating) === star).length;
    const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, pct };
  });

  return (
    <>
      <style>{`
        .reviews-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 768px) { .reviews-grid { grid-template-columns: 1fr; } }

        .rating-summary {
          background: #0f0e17;
          border-radius: 16px;
          padding: 28px;
          text-align: center;
          position: sticky;
          top: 80px;
        }

        .big-rating {
          font-size: 64px;
          font-weight: 800;
          color: #fff;
          font-family: 'Syne', sans-serif;
          line-height: 1;
        }

        .stars-row {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin: 10px 0 4px;
        }

        .rating-count {
          color: rgba(255,255,255,0.4);
          font-size: 13px;
        }

        .rating-bars {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
        }

        .rating-bar-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }

        .rating-bar-track {
          flex: 1;
          height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
          overflow: hidden;
        }

        .rating-bar-fill {
          height: 100%;
          background: #e8521a;
          border-radius: 999px;
          transition: width 0.5s ease;
        }

        .review-card {
          background: #fff;
          border: 1px solid #e5e5e0;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 16px;
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .review-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .review-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .reviewer-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e8521a, #1a7ae8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #fff;
          font-size: 16px;
          flex-shrink: 0;
        }

        .reviewer-name {
          font-weight: 600;
          color: #0f0e17;
          font-size: 15px;
        }

        .reviewer-date {
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }

        .review-stars {
          display: flex;
          gap: 2px;
          margin-bottom: 10px;
        }

        .review-text {
          font-size: 14px;
          line-height: 1.7;
          color: #374151;
        }

        .empty-reviews {
          text-align: center;
          padding: 80px 24px;
          color: #6b7280;
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          background: #f3f4f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="reviews-grid">
        {/* Rating Summary */}
        <div className="rating-summary">
          <div className="big-rating">{rating > 0 ? rating.toFixed(1) : "—"}</div>
          <div className="stars-row">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={18}
                fill={s <= Math.round(rating) ? "#f5c842" : "none"}
                color={s <= Math.round(rating) ? "#f5c842" : "#d1d5db"}
              />
            ))}
          </div>
          <p className="rating-count">{totalReviews} reviews</p>

          <div className="rating-bars">
            {ratingBars.map(({ star, count, pct }) => (
              <div key={star} className="rating-bar-row">
                <span style={{ width: "12px", textAlign: "right" }}>{star}</span>
                <Star size={10} fill="#f5c842" color="#f5c842" />
                <div className="rating-bar-track">
                  <div className="rating-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <span style={{ width: "20px" }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div>
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="review-card">
                <div className="review-header">
                  <div className="skeleton" style={{ width: 44, height: 44, borderRadius: "50%" }} />
                  <div>
                    <div className="skeleton" style={{ width: 120, height: 14, marginBottom: 6 }} />
                    <div className="skeleton" style={{ width: 80, height: 10 }} />
                  </div>
                </div>
                <div className="skeleton" style={{ width: "100%", height: 60 }} />
              </div>
            ))
          ) : reviews.length === 0 ? (
            <div className="empty-reviews">
              <div className="empty-icon">
                <Star size={24} color="#d1d5db" />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px", color: "#374151" }}>
                No reviews yet
              </h3>
              <p style={{ fontSize: "14px" }}>Be the first to review this tutor after a session.</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-avatar">
                    {review.studentImage ? (
                      <img src={review.studentImage} alt={review.studentName} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      review.studentName?.charAt(0)?.toUpperCase() ?? "S"
                    )}
                  </div>
                  <div>
                    <p className="reviewer-name">{review.studentName}</p>
                    <p className="reviewer-date">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill={s <= review.rating ? "#f5c842" : "none"}
                        color={s <= review.rating ? "#f5c842" : "#d1d5db"}
                      />
                    ))}
                  </div>
                </div>
                <div className="review-stars" />
                <p className="review-text">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
