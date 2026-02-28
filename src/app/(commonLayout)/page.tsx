import Courses from "@/components/modules/HomePages/Courses";
import CTA from "@/components/modules/HomePages/CTA";
import FeaturedTutors from "@/components/modules/HomePages/featured-tutors";
import Features from "@/components/modules/HomePages/Features";
import Hero from "@/components/modules/HomePages/Hero";
import Pricing from "@/components/modules/HomePages/Pricing";
import Testimonials from "@/components/modules/HomePages/Testimonials";

  export default async function Home() {
  return (
    <div className="">
      {/* <HeroBanner/> */}
      <Hero/>
      <FeaturedTutors />
      {/* <TopTutorsSection/> */}
      <Features/>
      {/* <HowItWorksSection/> */}
      <Courses/>
      {/* <CategoriesSection/> */}
      <Pricing/>
      {/* <TestimonialsSection/> */}
      <Testimonials/>
      <CTA/>
    </div>
  );
}
