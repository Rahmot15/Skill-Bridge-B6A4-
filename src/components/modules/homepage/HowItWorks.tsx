"use client";

import { UserPlus, Search, Calendar, GraduationCap, Award, TrendingUp } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Account",
      description: "Sign up as a learner or tutor in just a few clicks. It's quick, easy, and free to get started.",
      color: "from-[#2f27ce] to-[#443dff]",
    },
    {
      icon: Search,
      title: "Find Perfect Tutor",
      description: "Browse tutors by skill, rating, and price. View detailed profiles and read reviews from other students.",
      color: "from-[#443dff] to-[#2f27ce]",
    },
    {
      icon: Calendar,
      title: "Book a Session",
      description: "Select your preferred skill, date, and time. Send a booking request and get confirmed by your tutor.",
      color: "from-[#2f27ce] to-[#443dff]",
    },
    {
      icon: GraduationCap,
      title: "Start Learning",
      description: "Join your session and learn from expert tutors. Track your progress and achieve your learning goals.",
      color: "from-[#443dff] to-[#2f27ce]",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#dddbff]/50 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#2f27ce]">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#040316] mb-3">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-lg text-[#040316]/60 max-w-2xl mx-auto">
            Learning with SkillBridge is easy. Follow these steps to connect with expert tutors and start your journey.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                {/* Connector Line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#dddbff] to-transparent"></div>
                )}

                {/* Card */}
                <div className="relative bg-white border border-[#dddbff]/50 rounded-xl p-6 hover:border-[#2f27ce]/30 hover:shadow-lg transition-all duration-200">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-[#2f27ce] to-[#443dff] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-[#040316] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#040316]/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-[#fbfbfe] rounded-xl border border-[#dddbff]/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="text-3xl font-black bg-gradient-to-r from-[#2f27ce] to-[#443dff] bg-clip-text text-transparent">
                5000+
              </div>
              <TrendingUp className="w-5 h-5 text-[#2f27ce]" />
            </div>
            <p className="text-sm font-medium text-[#040316]/70">Expert Tutors</p>
          </div>

          <div className="text-center p-6 bg-[#fbfbfe] rounded-xl border border-[#dddbff]/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="text-3xl font-black bg-gradient-to-r from-[#2f27ce] to-[#443dff] bg-clip-text text-transparent">
                50+
              </div>
              <Award className="w-5 h-5 text-[#2f27ce]" />
            </div>
            <p className="text-sm font-medium text-[#040316]/70">Skills Available</p>
          </div>

          <div className="text-center p-6 bg-[#fbfbfe] rounded-xl border border-[#dddbff]/50 col-span-2 md:col-span-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="text-3xl font-black bg-gradient-to-r from-[#2f27ce] to-[#443dff] bg-clip-text text-transparent">
                10k+
              </div>
              <GraduationCap className="w-5 h-5 text-[#2f27ce]" />
            </div>
            <p className="text-sm font-medium text-[#040316]/70">Happy Learners</p>
          </div>
        </div>
      </div>
    </section>
  );
}
