"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, GraduationCap, TrendingUp, Award } from "lucide-react";

interface Tutor {
  bio?: string;
  experienceYears?: number;
  education?: string;
  availability?: string;
  languages?: string[];
}

interface TutorDetailsTabProps {
  tutor: Tutor;
}

// Dummy skills data
const dummySkills = [
  { id: 1, name: "React", level: "Expert" },
  { id: 2, name: "Node.js", level: "Advanced" },
  { id: 3, name: "TypeScript", level: "Expert" },
  { id: 4, name: "Next.js", level: "Advanced" },
  { id: 5, name: "PostgreSQL", level: "Intermediate" },
  { id: 6, name: "AWS", level: "Advanced" },
];

export default function TutorDetailsTab({ tutor }: TutorDetailsTabProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* About Section */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-white/90 backdrop-blur">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-[#2f27ce] to-[#443dff] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#040316]">About Me</h2>
          </div>
          <p className="text-[#040316]/75 leading-relaxed text-lg">
            {tutor?.bio || "Experienced tutor passionate about teaching and helping students achieve their learning goals. I specialize in making complex topics easy to understand through practical examples and hands-on practice."}
          </p>
        </Card>

        {/* Skills Section */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-white/90 backdrop-blur">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-8 bg-gradient-to-b from-[#6366f1] to-[#8b5cf6] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#040316]">Skills & Expertise</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {dummySkills.map((skill) => (
              <div
                key={skill.id}
                className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-[#f5f3ff] to-[#faf9ff] border border-[#dddbff]/50 hover:shadow-md hover:border-[#2f27ce]/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#443dff]"></div>
                  <span className="font-semibold text-[#040316]">{skill.name}</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-[#dddbff]/50 text-[#2f27ce] text-xs group-hover:bg-[#2f27ce] group-hover:text-white transition-colors"
                >
                  {skill.level}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements Section */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-gradient-to-br from-white to-[#faf9ff]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#040316]">Achievements</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-[#040316]/75">Top 5% instructor on SkillBridge</p>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-[#040316]/75">500+ successful learning sessions completed</p>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-[#040316]/75">95% student satisfaction rate</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Quick Info Card */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-gradient-to-br from-white via-[#faf9ff] to-white">
          <h3 className="font-bold text-lg mb-5 text-[#040316]">Quick Info</h3>
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#e0e7ff] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#2f27ce]" />
                </div>
                <span className="text-sm font-medium text-[#040316]/70">Experience</span>
              </div>
              <p className="font-bold text-[#040316] pl-10 text-lg">
                {tutor?.experienceYears || 5} years
              </p>
            </div>

            <Separator className="bg-[#dddbff]/40" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#f3e8ff] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#6366f1]" />
                </div>
                <span className="text-sm font-medium text-[#040316]/70">Education</span>
              </div>
              <p className="text-sm text-[#040316]/80 pl-10 leading-relaxed">
                {tutor?.education || "Master's Degree in Computer Science"}
              </p>
            </div>

            <Separator className="bg-[#dddbff]/40" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#d1fae5] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-sm font-medium text-[#040316]/70">Response Time</span>
              </div>
              <p className="text-sm font-semibold text-emerald-600 pl-10">
                Within 2 hours
              </p>
            </div>
          </div>
        </Card>

        {/* Availability Card */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-gradient-to-br from-[#faf9ff] to-white">
          <h3 className="font-bold text-lg mb-3 text-[#040316]">Availability</h3>
          <div className="space-y-2">
            <p className="text-sm text-[#040316]/75 leading-relaxed">
              {tutor?.availability || "Monday - Friday"}
            </p>
            <p className="text-sm text-[#040316]/75 leading-relaxed">
              9:00 AM - 6:00 PM EST
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#dddbff]/40">
            <p className="text-xs text-[#040316]/50">
              Flexible scheduling available for different time zones
            </p>
          </div>
        </Card>

        {/* Languages Card */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-gradient-to-br from-white to-[#faf9ff]">
          <h3 className="font-bold text-lg mb-3 text-[#040316]">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {(tutor?.languages || ["English", "Spanish"]).map((lang: string) => (
              <Badge
                key={lang}
                className="bg-[#e0e7ff] text-[#2f27ce] hover:bg-[#2f27ce] hover:text-white transition-colors"
              >
                {lang}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
