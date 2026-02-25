"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Users,
  Award,
  CheckCircle2,
  ArrowLeft,
  MessageCircle,
  BookOpen,
  Calendar,
} from "lucide-react";
import TutorDetailsTab from "@/components/modules/tutors/tutor-details-tab";
import TutorReviewsTab from "@/components/modules/tutors/tutor-reviews-tab";
import TutorBookingTab from "@/components/modules/tutors/tutor-booking-tab";

// Dynamic import Toaster to avoid hydration mismatch
const Toaster = dynamic(() => import("sonner").then((mod) => ({ default: mod.Toaster })), {
  ssr: false,
});

// Import tab components

interface Tutor {
  id: string;
  userId: string;
  name: string;
  user: {
    name: string;
    image?: string;
  };
  title: string;
  bio: string;
  experienceYears?: number;
  education?: string;
  availability?: string;
  rating: number | null;
  totalReviews: number;
  totalStudents: number;
  completedSessions: number;
  languages: string[];
  hourlyRate: number;
  verified: boolean;
}

interface Category {
  id: string;
  name: string;
  title: string;
  [key: string]: unknown;
}

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
  [key: string]: unknown;
}

export default function TutorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = useMemo(() => {
    if (!params?.id) return "";
    return typeof params.id === "string" ? params.id : params.id[0] || "";
  }, [params?.id]);
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
        if (!baseUrl) {
          console.error("Server base URL not configured");
          setIsLoading(false);
          return;
        }

        // Fetch tutor profile
        const tutorUrl = `${baseUrl}/api/tutors/${id}`;
        const tutorRes = await fetch(tutorUrl, { signal: controller.signal });

        if (!tutorRes.ok) throw new Error(`Failed to fetch tutor: ${tutorRes.status}`);
        const tutorResponse = await tutorRes.json();

        // Handle wrapped response {success: true, data: {...}}
        const tutorData = tutorResponse?.data ?? tutorResponse;

        if (!isMounted) return;
        setTutor(tutorData ?? null);

        // Fetch reviews if tutor has userId
        if (tutorData?.userId) {
          try {
            const reviewsUrl = `${baseUrl}/api/reviews/tutor/${tutorData.userId}`;
            const reviewsRes = await fetch(reviewsUrl, { signal: controller.signal });
            const reviewsResponse = reviewsRes.ok ? await reviewsRes.json() : { data: [] };
            const reviewsData = reviewsResponse?.data ?? reviewsResponse;
            if (isMounted) {
              setReviews(Array.isArray(reviewsData) ? reviewsData : []);
            }
          } catch (error) {
            if (error instanceof Error && error.name !== "AbortError") {
              console.error("Error fetching reviews:", error);
            }
            if (isMounted) setReviews([]);
          }
        }

        // Fetch categories
        try {
          const categoriesUrl = `${baseUrl}/api/categories`;
          const categoriesRes = await fetch(categoriesUrl, { signal: controller.signal });
          const categoriesResponse = categoriesRes.ok ? await categoriesRes.json() : { data: [] };
          const categoriesData = categoriesResponse?.data ?? categoriesResponse;
          if (isMounted) {
            setCategories(Array.isArray(categoriesData) ? categoriesData : []);
          }
        } catch (error) {
          if (error instanceof Error && error.name !== "AbortError") {
            console.error("Error fetching categories:", error);
          }
          if (isMounted) setCategories([]);
        }

        if (isMounted) setIsLoading(false);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching tutor:", error);
        }
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#fbfbfe] to-[#f5f3ff] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#2f27ce] border-t-transparent mx-auto mb-4"></div>
          <p className="text-[#040316]/60">Loading tutor details...</p>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#fbfbfe] to-[#f5f3ff] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#040316] mb-4">
            Tutor not found
          </h2>
          <Button
            onClick={() => router.push("/find-tutors")}
            className="bg-[#2f27ce] hover:bg-[#443dff]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tutors
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-linear-to-br from-[#fbfbfe] via-[#f8f7ff] to-[#f5f3ff]">
        {/* Hero Header */}
        <div className="bg-linear-to-r from-[#2f27ce] via-[#443dff] to-[#6366f1] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/find-tutors")}
              className="text-white hover:bg-white/10 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tutors
            </Button>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Profile Info */}
              <div className="flex flex-col sm:flex-row gap-6 flex-1">
                <div className="relative shrink-0">
                  <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl">
                    <AvatarImage src={tutor?.user?.image || undefined} />
                    <AvatarFallback className="text-4xl font-bold bg-linear-to-br from-white/20 to-white/10 text-white">
                      {tutor?.user?.name
                        ?.split(" ")
                        ?.map((n: string) => n?.[0])
                        ?.filter(Boolean)
                        ?.join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {tutor.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-xl">
                      <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h1 className="text-4xl font-black mb-2">
                    {tutor?.user?.name || "Tutor"}
                  </h1>
                  <p className="text-xl text-white/90 mb-4">{tutor?.title || "Experience Tutor"}</p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                      <span className="font-bold">{tutor?.rating ?? "New"}</span>
                      {(tutor?.totalReviews ?? 0) > 0 && (
                        <span className="text-white/75 text-sm">
                          ({tutor?.totalReviews})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">
                        {tutor?.totalStudents ?? 0} students
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Award className="w-4 h-4" />
                      <span className="font-medium">
                        {tutor?.completedSessions ?? 0} sessions
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(tutor?.languages) && tutor.languages.length > 0 ? (
                      tutor.languages.map((lang: string) => (
                        <Badge
                          key={lang}
                          className="bg-white/20 text-white border-white/30 hover:bg-white/25"
                        >
                          {lang}
                        </Badge>
                      ))
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Price Card */}
              <div className="lg:w-80 w-full">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                  <div className="text-center mb-5">
                    <div className="text-sm text-white/75 mb-1">
                      Hourly Rate
                    </div>
                    <div className="text-5xl font-black mb-1">
                      ${tutor?.hourlyRate ?? 0}
                    </div>
                    <div className="text-white/75 text-sm">/hour</div>
                  </div>

                  <Button
                    onClick={() => setActiveTab("booking")}
                    size="lg"
                    className="w-full bg-white text-[#2f27ce] hover:bg-white/90 font-bold shadow-xl mb-3 h-12"
                  >
                    Book a Session
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-transparent border-2 border-white/30 text-white hover:bg-white/10 h-12"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="bg-white border border-[#dddbff]/50 p-1.5 shadow-md inline-flex">
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-linear-to-r data-[state=active]:from-[#2f27ce] data-[state=active]:to-[#443dff] data-[state=active]:text-white px-6"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Details
              </TabsTrigger>

              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-linear-to-r data-[state=active]:from-[#2f27ce] data-[state=active]:to-[#443dff] data-[state=active]:text-white px-6"
              >
                <Star className="w-4 h-4 mr-2" />
                Reviews ({tutor?.totalReviews ?? 0})
              </TabsTrigger>

              <TabsTrigger
                value="booking"
                className="data-[state=active]:bg-linear-to-r data-[state=active]:from-[#2f27ce] data-[state=active]:to-[#443dff] data-[state=active]:text-white px-6"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Session
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <TutorDetailsTab tutor={tutor} categories={categories} />
            </TabsContent>

            <TabsContent value="reviews">
              <TutorReviewsTab tutor={tutor} reviews={reviews} />
            </TabsContent>

            <TabsContent value="booking">
              <TutorBookingTab tutor={tutor} categories={categories} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
