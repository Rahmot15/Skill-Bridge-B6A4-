"use client";

import Link from "next/link";
import { Code, Palette, TrendingUp, Camera, Music, Languages, Brain, Briefcase } from "lucide-react";

export default function CategoriesSection() {
  const categories = [
    {
      icon: Code,
      title: "Development",
      tutorCount: 1240,
      skills: ["Web Dev", "Mobile", "Backend"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Palette,
      title: "Design",
      tutorCount: 856,
      skills: ["UI/UX", "Graphic", "Animation"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: TrendingUp,
      title: "Marketing",
      tutorCount: 672,
      skills: ["SEO", "Social Media", "Content"],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Briefcase,
      title: "Business",
      tutorCount: 534,
      skills: ["Management", "Finance", "Strategy"],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Camera,
      title: "Photography",
      tutorCount: 423,
      skills: ["Portrait", "Landscape", "Editing"],
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      icon: Languages,
      title: "Languages",
      tutorCount: 789,
      skills: ["English", "Spanish", "French"],
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      icon: Brain,
      title: "Data Science",
      tutorCount: 612,
      skills: ["ML", "AI", "Analytics"],
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      icon: Music,
      title: "Music",
      tutorCount: 345,
      skills: ["Guitar", "Piano", "Vocal"],
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <section className="py-16 bg-[#fbfbfe]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-[#dddbff]/50 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#2f27ce]">Browse by Category</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#040316] mb-3">
            Explore Popular Skills
          </h2>
          <p className="text-lg text-[#040316]/60 max-w-2xl mx-auto">
            Choose from a wide range of categories and find the perfect tutor for your learning needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                href={`/tutors?category=${category.title.toLowerCase()}`}
                className="group"
              >
                <div className="bg-white border border-[#dddbff]/50 rounded-xl p-5 hover:border-[#2f27ce]/30 hover:shadow-lg transition-all duration-200">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-[#040316] mb-1 text-base">
                    {category.title}
                  </h3>

                  {/* Tutor Count */}
                  <p className="text-xs text-[#040316]/50 mb-3">
                    {category.tutorCount} tutors
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs font-medium bg-[#dddbff]/30 text-[#2f27ce] rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/categories">
            <button className="px-8 py-3 bg-white border-2 border-[#2f27ce] text-[#2f27ce] font-semibold rounded-lg hover:bg-[#dddbff]/30 transition-colors">
              View All Categories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
