"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

// Import tab components

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
  };
}

export default function TutorDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await fetch(`/api/tutors/${params.id}`);
        const data = await response.json();
        setTutor(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tutor:", error);
        setIsLoading(false);
      }
    };

    fetchTutorData();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fbfbfe] to-[#f5f3ff] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#2f27ce] border-t-transparent mx-auto mb-4"></div>
          <p className="text-[#040316]/60">Loading tutor details...</p>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fbfbfe] to-[#f5f3ff] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#040316] mb-4">Tutor not found</h2>
          <Button
            onClick={() => router.push("/tutors")}
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
    <div className="min-h-screen bg-gradient-to-br from-[#fbfbfe] via-[#f8f7ff] to-[#f5f3ff]">
      {/* Hero Header with Gradient */}
      <div className="bg-gradient-to-r from-[#2f27ce] via-[#443dff] to-[#6366f1] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push("/tutors")}
            className="text-white hover:bg-white/10 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tutors
          </Button>

          {/* Header Content */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: Profile Info */}
            <div className="flex flex-col sm:flex-row gap-6 flex-1">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl">
                  <AvatarImage src={tutor.user.image || undefined} />
                  <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-white/20 to-white/10 text-white">
                    {tutor.user.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {tutor.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-xl">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-black mb-2 tracking-tight">
                  {tutor.user.name}
                </h1>
                <p className="text-xl text-white/90 mb-4">{tutor.title}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                    <span className="font-bold">{tutor.rating || "New"}</span>
                    {tutor.totalReviews > 0 && (
                      <span className="text-white/75 text-sm">
                        ({tutor.totalReviews})
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{tutor.totalStudents} students</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Award className="w-4 h-4" />
                    <span className="font-medium">{tutor.completedSessions} sessions</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-2">
                  {tutor.languages.map((lang) => (
                    <Badge
                      key={lang}
                      className="bg-white/20 text-white border-white/30 hover:bg-white/25 transition-colors"
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Price Card */}
            <div className="lg:w-80 w-full">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center mb-5">
                  <div className="text-sm text-white/75 mb-1">Hourly Rate</div>
                  <div className="text-5xl font-black mb-1">${tutor.hourlyRate}</div>
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
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white border border-[#dddbff]/50 p-1.5 shadow-md inline-flex">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2f27ce] data-[state=active]:to-[#443dff] data-[state=active]:text-white px-6 transition-all"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Details
            </TabsTrigger>

            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2f27ce] data-[state=active]:to-[#443dff] data-[state=active]:text-white px-6 transition-all"
            >
              <Star className="w-4 h-4 mr-2" />
              Reviews ({tutor.totalReviews})
            </TabsTrigger>

            <TabsTrigger
              value="booking"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2f27ce] data-[state=active]:to-[#443dff] data-[state=active]:text-white px-6 transition-all"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Session
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-8">
            <TutorDetailsTab tutor={tutor} />
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <TutorReviewsTab tutor={tutor} />
          </TabsContent>

          <TabsContent value="booking" className="mt-8">
            <TutorBookingTab tutor={tutor} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
