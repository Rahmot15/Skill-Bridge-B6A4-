"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, GraduationCap, TrendingUp, Award } from "lucide-react";

interface Category {
  id: string | number;
  title: string;
  description?: string;
}

interface Tutor {
  bio?: string;
  completedSessions?: number;
  totalStudents?: number;
  experienceYears?: number;
  education?: string;
  availability?: string;
  languages?: string[];
}

interface TutorDetailsTabProps {
  tutor: Tutor;
  categories: Category[];
}

export default function TutorDetailsTab({ tutor, categories }: TutorDetailsTabProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* About */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-white/90">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-linear-to-b from-[#2f27ce] to-[#443dff] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#040316]">About</h2>
          </div>
          <p className="text-[#040316]/75 leading-relaxed text-lg">
            {tutor?.bio || "No bio available"}
          </p>
        </Card>

        {/* Categories/Skills */}
        {Array.isArray(categories) && categories.length > 0 && (
          <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-white/90">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-8 bg-linear-to-b from-[#6366f1] to-[#8b5cf6] rounded-full"></div>
              <h2 className="text-2xl font-bold text-[#040316]">Teaching Categories</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-linear-to-br from-[#f5f3ff] to-[#faf9ff] border border-[#dddbff]/50 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-[#2f27ce] to-[#443dff]"></div>
                    <div>
                      <p className="font-semibold text-[#040316]">{category.title}</p>
                      {category?.description && (
                        <p className="text-xs text-[#040316]/60 mt-0.5">{category.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Stats */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-linear-to-br from-white to-[#faf9ff]\">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-linear-to-b from-amber-500 to-orange-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#040316]">Achievements</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#040316]">{tutor?.completedSessions ?? 0}+</p>
                <p className="text-sm text-[#040316]/60">Sessions Completed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#040316]">{tutor?.totalStudents ?? 0}+</p>
                <p className="text-sm text-[#040316]/60">Students Taught</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Quick Info */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-linear-to-br from-white via-[#faf9ff] to-white">
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
                {tutor?.experienceYears ?? 'Not specified'} {tutor?.experienceYears ? 'years' : ''}
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
                {tutor?.education || 'Not specified'}
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

        {/* Availability */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-linear-to-br from-[#faf9ff] to-white">
          <h3 className="font-bold text-lg mb-3 text-[#040316]">Availability</h3>
          <p className="text-sm text-[#040316]/75 leading-relaxed">
            {tutor?.availability || 'Availability to be confirmed'}
          </p>
        </Card>

        {/* Languages */}
        <Card className="p-6 border-[#dddbff]/50 shadow-lg bg-linear-to-br from-white to-[#faf9ff]">
          <h3 className="font-bold text-lg mb-3 text-[#040316]">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(tutor?.languages) && tutor.languages.length > 0 ? (
              tutor.languages.map((lang: string) => (
                <Badge
                  key={lang}
                  className="bg-[#e0e7ff] text-[#2f27ce] hover:bg-[#2f27ce] hover:text-white transition-colors"
                >
                  {lang}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-[#040316]/60">No languages specified</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
