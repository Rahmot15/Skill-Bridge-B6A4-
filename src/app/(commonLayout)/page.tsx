import HeroBanner from "@/components/modules/homepage/bannar";
import CategoriesSection from "@/components/modules/homepage/CategoriesSection";
import HowItWorksSection from "@/components/modules/homepage/HowItWorks";
import TestimonialsSection from "@/components/modules/homepage/TestimonialsSection";
import TopTutorsSection from "@/components/modules/homepage/TopTutorsSection";

export default function Home() {
  return (
    <div className="">
      <HeroBanner/>
      <TopTutorsSection/>
      <HowItWorksSection/>
      <CategoriesSection/>
      <TestimonialsSection/>
    </div>
  );
}
