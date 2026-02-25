"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users, CheckCircle2, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

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

interface TutorCardProps {
  tutor: TutorProfile;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="group border border-[#dddbff]/50 hover:border-[#2f27ce]/30 hover:shadow-xl transition-all duration-300 bg-white">
      <CardContent className="p-5">
        {/* Top Row */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <Avatar className="w-16 h-16 object-cover border-2 border-[#dddbff]">
              <AvatarImage src={tutor.user.image || undefined} alt={tutor.user.name} />
              <AvatarFallback className="bg-gradient-to-br from-[#2f27ce] to-[#443dff] text-white font-bold text-lg">
                {tutor.user.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            {tutor.verified && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#040316] text-lg truncate mb-1">
              {tutor.user.name}
            </h3>
            <p className="text-sm text-[#040316]/60 truncate mb-2">{tutor.title}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{tutor.rating || "New"}</span>
                {tutor.totalReviews > 0 && (
                  <span className="text-[#040316]/40">({tutor.totalReviews})</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-[#040316]/60">
                <Users className="w-4 h-4" />
                <span>{tutor.totalStudents}</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-black text-[#2f27ce]">${tutor.hourlyRate}</div>
            <div className="text-xs text-[#040316]/50">/hour</div>
          </div>
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tutor.languages.slice(0, 3).map((lang) => (
            <Badge
              key={lang}
              variant="secondary"
              className="bg-[#dddbff]/50 text-[#2f27ce] text-xs px-2 py-0.5"
            >
              {lang}
            </Badge>
          ))}
        </div>

        {/* Bio */}
        <p className="text-sm text-[#040316]/70 line-clamp-2 mb-4 leading-relaxed">
          {tutor.bio}
        </p>

        {/* Button */}
        <Link href={`/find-tutors/${tutor.id}`}>
          <Button
            className="w-full bg-[#2f27ce] hover:bg-[#443dff] text-white group-hover:shadow-lg transition-all"
          >
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
