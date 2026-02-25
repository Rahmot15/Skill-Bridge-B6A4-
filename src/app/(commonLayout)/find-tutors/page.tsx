"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TutorCard from "@/components/modules/tutors/tutor-card";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
}

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
  user: User;
}

export default function FindTutorsPage() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTutors = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/tutors`;
        const response = await fetch(url);
        const data = await response.json();
        setTutors(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setTutors([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTutors();
  }, []);

  const filteredTutors = useMemo(() => {
    if (!search.trim()) return tutors;

    const searchLower = search.toLowerCase();

    return tutors.filter((tutor) => {
      return (
        tutor.user.name.toLowerCase().includes(searchLower) ||
        tutor.title.toLowerCase().includes(searchLower) ||
        tutor.bio.toLowerCase().includes(searchLower) ||
        tutor.languages.some((lang) =>
          lang.toLowerCase().includes(searchLower)
        )
      );
    });
  }, [search, tutors]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fbfbfe] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2f27ce] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#040316]/60">Loading tutors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfe]">
      {/* Header */}
      <div className="bg-white border-b border-[#dddbff]/30 sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#040316]">Find Tutors</h1>
              <p className="text-sm text-[#040316]/60 mt-1">
                {filteredTutors.length}{" "}
                {filteredTutors.length === 1 ? "tutor" : "tutors"} available
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#040316]/40" />
              <Input
                placeholder="Search tutors, skills, languages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 border-[#dddbff] focus:border-[#2f27ce] focus:ring-[#2f27ce]/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tutors Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#dddbff]/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#2f27ce]" />
            </div>
            <h3 className="text-lg font-semibold text-[#040316] mb-2">
              No tutors found
            </h3>
            <p className="text-[#040316]/60">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
