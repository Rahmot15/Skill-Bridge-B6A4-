// app/find-tutors/page.tsx
"use client";

import { useState } from "react";
import { Search, Users, Star, MapPin, Clock, DollarSign, ChevronRight, X, BookOpen } from "lucide-react";

// Sample tutor data
const tutorsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/avatars/sarah.jpg",
    rating: 4.8,
    reviews: 156,
    location: "New York, USA",
    hourlyRate: 60,
    skills: ["Web Development", "React", "JavaScript", "Node.js"],
    bio: "Full-stack developer with 8+ years of experience. I love teaching and helping students build real-world projects.",
    experience: "8 years",
    education: "BS in Computer Science from MIT",
    languages: ["English", "Spanish"],
    availability: "Mon-Fri, 9am-6pm EST",
    totalStudents: 245,
    completedSessions: 567
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/avatars/michael.jpg",
    rating: 4.9,
    reviews: 203,
    location: "San Francisco, USA",
    hourlyRate: 75,
    skills: ["Data Science", "Python", "Machine Learning", "AI"],
    bio: "Data scientist passionate about making complex concepts simple. I've worked with Fortune 500 companies.",
    experience: "10 years",
    education: "PhD in Data Science from Stanford",
    languages: ["English", "Mandarin"],
    availability: "Tue-Sat, 10am-7pm PST",
    totalStudents: 389,
    completedSessions: 823
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "/avatars/emma.jpg",
    rating: 4.7,
    reviews: 124,
    location: "London, UK",
    hourlyRate: 55,
    skills: ["UI/UX Design", "Figma", "Adobe XD", "Prototyping"],
    bio: "Designer with a passion for creating intuitive user experiences. I teach design thinking and practical tools.",
    experience: "6 years",
    education: "BFA in Design from RISD",
    languages: ["English", "Portuguese"],
    availability: "Tue-Sun, 11am-7pm CST",
    totalStudents: 312,
    completedSessions: 689
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/avatars/david.jpg",
    rating: 4.6,
    reviews: 87,
    location: "Seattle, USA",
    hourlyRate: 50,
    skills: ["Java", "Spring Boot", "Microservices", "AWS"],
    bio: "Backend architect with expertise in enterprise applications. I focus on practical, real-world coding skills.",
    experience: "12 years",
    education: "MS in Software Engineering from UW",
    languages: ["English", "Korean"],
    availability: "Mon-Fri, 8am-5pm PST",
    totalStudents: 145,
    completedSessions: 378
  },
  {
    id: 5,
    name: "Aisha Patel",
    avatar: "/avatars/aisha.jpg",
    rating: 4.9,
    reviews: 203,
    location: "London, UK",
    hourlyRate: 55,
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media"],
    bio: "Marketing strategist who has helped brands grow their online presence. I teach practical marketing skills that deliver results.",
    experience: "9 years",
    education: "MBA from LBS",
    languages: ["English", "Hindi", "Gujarati"],
    availability: "Mon-Sat, 9am-6pm GMT",
    totalStudents: 423,
    completedSessions: 892
  },
  {
    id: 6,
    name: "James Wilson",
    avatar: "/avatars/james.jpg",
    rating: 4.5,
    reviews: 64,
    location: "Chicago, USA",
    hourlyRate: 42,
    skills: ["Photography", "Photoshop", "Lightroom", "Video Editing"],
    bio: "Professional photographer and videographer. I help students master the technical and creative aspects of visual storytelling.",
    experience: "7 years",
    education: "BFA in Photography from SAIC",
    languages: ["English", "French"],
    availability: "Wed-Sun, 10am-7pm CST",
    totalStudents: 98,
    completedSessions: 234
  }
];

export default function FindTutorsPage() {
  const [selectedTutor, setSelectedTutor] = useState(tutorsData[0]);
  const [bookingSkill, setBookingSkill] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", {
      tutorId: selectedTutor.id,
      skill: bookingSkill,
      date: bookingDate,
      time: bookingTime,
      message: bookingMessage
    });

    setBookingSkill("");
    setBookingDate("");
    setBookingTime("");
    setBookingMessage("");
    setIsBookingOpen(false);

    alert("Booking request sent successfully!");
  };

  const filteredTutors = tutorsData.filter(tutor =>
    tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#fbfbfe]">
      {/* Header with Search */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-black text-[#040316]">
                Find Tutors
              </h1>
              <div className="flex items-center gap-6 text-sm">
                <span className="font-medium text-gray-600">
                  5k+ Expert Tutors
                </span>
                <span className="font-medium text-gray-600">
                  10k+ Happy Learners
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2f27ce]/60" />
                <input
                  placeholder="Search tutors or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-80 pl-12 h-12 rounded-xl bg-[#f3f0ff] border border-[#dddbff] text-[#040316] outline-none"
                />
              </div>
              <button className="h-12 px-6 bg-gradient-to-r from-[#2f27ce] to-[#443dff] text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition flex items-center gap-2">
                <Users className="h-4 w-4" />
                Become Tutor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tutors Section */}
      <section className="py-12 bg-[#fbfbfe]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2f27ce] to-[#443dff] flex items-center justify-center text-white font-bold text-xl">
                      {tutor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#040316]">
                        {tutor.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-600">
                          {tutor.rating}
                        </span>
                        <span className="ml-1 text-sm text-gray-500">
                          ({tutor.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {tutor.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      ${tutor.hourlyRate}/hour
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {tutor.availability}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutor.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-[#f0f7ff] text-[#2f27ce]"
                      >
                        {skill}
                      </span>
                    ))}
                    {tutor.skills.length > 3 && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                        +{tutor.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  <p className="text-sm mb-4 text-gray-600 line-clamp-2">
                    {tutor.bio}
                  </p>

                  <button
                    onClick={() => {
                      setSelectedTutor(tutor);
                      setIsProfileOpen(true);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-[#2f27ce] to-[#443dff] text-white font-semibold rounded-xl hover:scale-105 transition flex items-center justify-center gap-2"
                  >
                    View Profile
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl bg-white">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2f27ce] to-[#443dff] flex items-center justify-center text-white font-bold text-2xl">
                    {selectedTutor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-[#040316]">
                      {selectedTutor.name}
                    </h2>
                    <div className="flex items-center mt-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-gray-600">
                        {selectedTutor.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({selectedTutor.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <X className="h-6 w-6 text-[#040316]" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <MapPin className="h-5 w-5 text-[#2f27ce]" />
                    <span className="font-medium text-[#040316]">
                      Location
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {selectedTutor.location}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <DollarSign className="h-5 w-5 text-[#2f27ce]" />
                    <span className="font-medium text-[#040316]">
                      Hourly Rate
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    ${selectedTutor.hourlyRate}/hour
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="h-5 w-5 text-[#2f27ce]" />
                    <span className="font-medium text-[#040316]">
                      Availability
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {selectedTutor.availability}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <BookOpen className="h-5 w-5 text-[#2f27ce]" />
                    <span className="font-medium text-[#040316]">
                      Experience
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {selectedTutor.experience}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 text-[#040316]">
                  About
                </h3>
                <p className="text-gray-600">
                  {selectedTutor.bio}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 text-[#040316]">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTutor.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-sm font-medium rounded-full bg-[#f0f7ff] text-[#2f27ce]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="px-6 py-3 rounded-xl font-medium transition bg-gray-100 text-[#040316] hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsBookingOpen(true);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#2f27ce] to-[#443dff] text-white font-semibold rounded-xl hover:scale-105 transition"
                >
                  Book a Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl shadow-2xl p-8 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#040316]">
                Book a Session
              </h2>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="h-6 w-6 text-[#040316]" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#040316]">
                  Select Skill
                </label>
                <select
                  value={bookingSkill}
                  onChange={(e) => setBookingSkill(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border bg-gray-50 border-gray-200 text-[#040316] focus:outline-none focus:ring-2 focus:ring-[#2f27ce]"
                >
                  <option value="">Choose a skill to learn</option>
                  {selectedTutor.skills.map((skill, index) => (
                    <option key={index} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#040316]">
                    Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border bg-gray-50 border-gray-200 text-[#040316] focus:outline-none focus:ring-2 focus:ring-[#2f27ce]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#040316]">
                    Time
                  </label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border bg-gray-50 border-gray-200 text-[#040316] focus:outline-none focus:ring-2 focus:ring-[#2f27ce]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[#040316]">
                  Message (Optional)
                </label>
                <textarea
                  placeholder="Tell the tutor what you'd like to learn..."
                  value={bookingMessage}
                  onChange={(e) => setBookingMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border bg-gray-50 border-gray-200 text-[#040316] focus:outline-none focus:ring-2 focus:ring-[#2f27ce]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="px-6 py-3 rounded-xl font-medium transition bg-gray-100 text-[#040316] hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#2f27ce] to-[#443dff] text-white font-semibold rounded-xl hover:scale-105 transition"
                >
                  Send Booking Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
