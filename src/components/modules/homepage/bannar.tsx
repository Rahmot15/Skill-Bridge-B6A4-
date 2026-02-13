"use client";
import { Search, ArrowRight, Users, GraduationCap, Sparkles } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] bg-[#fbfbfe] overflow-hidden flex items-center">

      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-[55%] h-full bg-[#f3f0ff] -z-10 rounded-l-[120px] opacity-70 translate-x-12" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-[#f0f7ff] -z-10 rounded-full blur-[120px] opacity-80" />

      {/* Wavy SVG */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <svg
          className="absolute top-0 right-0 w-2/3 h-full opacity-40"
          viewBox="0 0 800 800"
          fill="none"
        >
          <path
            d="M800 0C600 100 700 300 500 400C300 500 400 700 200 800H800V0Z"
            fill="#e0e7ff"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">

          {/* LEFT */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-6 duration-700">

            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur px-5 py-2.5 rounded-full shadow-lg border border-[#dddbff]">

              <span className="text-sm font-semibold text-[#040316]">
                Connect. Learn. Grow.
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#040316] leading-tight">
                Find Your Perfect
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2f27ce] via-[#443dff] to-[#2f27ce]">
                  Tutor Today
                </span>
              </h1>
              <p className="text-xl text-[#040316]/70 max-w-xl leading-relaxed">
                SkillBridge connects learners with experienced tutors.
                Explore tutors, book sessions, and master new skills.
              </p>
            </div>

            {/* Search */}
            <div className="max-w-xl">
              <div className="flex flex-col sm:flex-row gap-3 bg-white/90 backdrop-blur p-2 rounded-2xl shadow-2xl border border-[#dddbff]">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2f27ce]/60" />
                  <input
                    placeholder="Search for skills or tutors..."
                    className="w-full pl-12 h-14 bg-transparent outline-none text-[#040316]"
                  />
                </div>
                <button className="h-14 px-8 bg-gradient-to-r from-[#2f27ce] to-[#443dff] text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition flex items-center gap-2">
                  Search
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="h-14 px-8 bg-[#2f27ce] text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Browse Tutors
              </button>
              <button className="h-14 px-8 border-2 border-[#2f27ce] text-[#2f27ce] rounded-xl hover:scale-105 transition flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Become a Tutor
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 pt-6">
              <div>
                <p className="text-3xl font-black text-[#2f27ce]">5k+</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Expert Tutors
                </p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#2f27ce]">10k+</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Happy Learners
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT (BIGGER IMAGE) */}
          <div className="relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-6 duration-700">

            <div className="relative w-full max-w-[650px] xl:max-w-[720px] aspect-[4/3] lg:aspect-square flex items-center justify-center lg:translate-x-10">

              {/* Platform */}
              <div className="absolute bottom-[8%] w-[92%] h-[38%] bg-white/40 backdrop-blur rounded-[42px] -z-10 shadow-xl border border-white/60" />

              {/* Image */}
              <img
                src="/asdf.svg"
                alt="SkillBridge Illustration"
                className="w-full h-auto object-contain drop-shadow-2xl scale-110 lg:scale-115 animate-float"
              />

              {/* Floating Card */}
              <div className="absolute top-[18%] -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-3 animate-float-delayed">
                <div className="w-10 h-10 rounded-full bg-[#f0f7ff] flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#2f27ce]" />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#040316]">Live Now</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Class 101
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />

    </section>
  );
}
