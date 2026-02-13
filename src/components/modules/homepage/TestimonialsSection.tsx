"use client";

import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Web Developer",
      rating: 5,
      image: "/testimonials/alex.jpg",
      text: "SkillBridge helped me transition from design to full-stack development. My tutor was patient and the sessions were incredibly valuable!",
      skill: "React & Node.js",
    },
    {
      name: "Maria Garcia",
      role: "Marketing Manager",
      rating: 5,
      image: "/testimonials/maria.jpg",
      text: "I learned digital marketing strategies that actually work. The booking process was seamless and my tutor was highly professional.",
      skill: "Digital Marketing",
    },
    {
      name: "James Chen",
      role: "UX Designer",
      rating: 5,
      image: "/testimonials/james.jpg",
      text: "The quality of tutors on this platform is outstanding. I've improved my Figma skills tremendously in just a few weeks.",
      skill: "UI/UX Design",
    },
    {
      name: "Sarah Williams",
      role: "Data Analyst",
      rating: 5,
      image: "/testimonials/sarah.jpg",
      text: "Found an amazing Python tutor who helped me master machine learning. Highly recommend SkillBridge to anyone looking to upskill!",
      skill: "Python & ML",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#dddbff]/50 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#2f27ce]">Student Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#040316] mb-3">
            What Our Students Say
          </h2>
          <p className="text-lg text-[#040316]/60 max-w-2xl mx-auto">
            Join thousands of learners who have achieved their goals with SkillBridge tutors.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#fbfbfe] border border-[#dddbff]/50 rounded-xl p-6 hover:border-[#2f27ce]/30 hover:shadow-lg transition-all duration-200 group"
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-[#2f27ce] to-[#443dff] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Quote className="w-5 h-5 text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-sm text-[#040316]/70 mb-4 leading-relaxed">
                {testimonial.text}
              </p>

              {/* Skill Badge */}
              <div className="mb-4">
                <span className="px-3 py-1 text-xs font-medium bg-[#dddbff]/50 text-[#2f27ce] rounded-full">
                  {testimonial.skill}
                </span>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#dddbff]/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2f27ce] to-[#443dff] flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-[#040316] text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-[#040316]/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-br from-[#2f27ce] to-[#443dff] text-white rounded-2xl p-8 max-w-3xl">
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-bold mb-2">Ready to Start Learning?</h3>
              <p className="text-white/90">
                Join our community and find the perfect tutor today!
              </p>
            </div>
            <button className="px-8 py-3 bg-white text-[#2f27ce] font-semibold rounded-lg hover:scale-105 transition-transform whitespace-nowrap">
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
