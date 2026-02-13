"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Award, ArrowRight } from "lucide-react";

const topTutors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Full Stack Developer",
    rating: 4.9,
    reviews: 234,
    students: 567,
    hourlyRate: 60,
    skills: ["React", "Node.js", "TypeScript"],
    verified: true,
    image: "/tutors/sarah.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Data Scientist",
    rating: 5.0,
    reviews: 189,
    students: 423,
    hourlyRate: 75,
    skills: ["Python", "ML", "AI"],
    verified: true,
    image: "/tutors/michael.jpg",
  },
  {
    id: 3,
    name: "Emma Wilson",
    title: "UI/UX Designer",
    rating: 4.8,
    reviews: 156,
    students: 389,
    hourlyRate: 55,
    skills: ["Figma", "UI Design", "Prototyping"],
    verified: true,
    image: "/tutors/emma.jpg",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Marketing Expert",
    rating: 4.7,
    reviews: 142,
    students: 312,
    hourlyRate: 50,
    skills: ["SEO", "Social Media", "Content"],
    verified: true,
    image: "/tutors/david.jpg",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    title: "Mobile Developer",
    rating: 4.9,
    reviews: 167,
    students: 445,
    hourlyRate: 65,
    skills: ["React Native", "Flutter", "iOS"],
    verified: true,
    image: "/tutors/lisa.jpg",
  },
  {
    id: 6,
    name: "James Martinez",
    title: "Product Manager",
    rating: 4.8,
    reviews: 128,
    students: 289,
    hourlyRate: 70,
    skills: ["Strategy", "Agile", "Product"],
    verified: true,
    image: "/tutors/james.jpg",
  },
];

export default function TopTutorsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#dddbff]/50 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4 text-[#2f27ce]" />
            <span className="text-sm font-semibold text-[#2f27ce]">Top Rated</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#040316] mb-3">
            Meet Our Top Tutors
          </h2>
          <p className="text-lg text-[#040316]/60 max-w-2xl mx-auto">
            Learn from the best. Our top-rated tutors are ready to help you achieve your goals.
          </p>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {topTutors.map((tutor) => (
            <Card
              key={tutor.id}
              className="group border-[#dddbff]/50 hover:border-[#2f27ce]/30 hover:shadow-lg transition-all duration-200"
            >
              <CardContent className="p-5">
                {/* Avatar & Name */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2f27ce] to-[#443dff] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {tutor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-semibold text-[#040316] truncate">
                          {tutor.name}
                        </h3>
                        {tutor.verified && (
                          <Badge
                            variant="secondary"
                            className="bg-[#2f27ce] text-white px-1.5 py-0 text-xs h-5"
                          >
                            ✓
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-[#040316]/60 truncate">{tutor.title}</p>
                    </div>
                  </div>
                </div>

                {/* Rating & Students */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#dddbff]/30">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-[#040316]">
                      {tutor.rating}
                    </span>
                    <span className="text-xs text-[#040316]/50">
                      ({tutor.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#040316]/60">
                    <Users className="w-3.5 h-3.5" />
                    <span>{tutor.students} students</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-[#dddbff]/50 text-[#2f27ce] hover:bg-[#dddbff] text-xs px-2 py-0.5"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-[#2f27ce]">
                    ${tutor.hourlyRate}/hr
                  </div>
                  <Link href={`/tutors/${tutor.id}`}>
                    <Button
                      size="sm"
                      className="bg-[#2f27ce] hover:bg-[#443dff] text-white text-xs h-8"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/tutors">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#2f27ce] text-[#2f27ce] hover:bg-[#dddbff]/30 group"
            >
              View All Tutors
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
