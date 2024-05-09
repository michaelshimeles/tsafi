import PageWrapper from "@/components/Container/PageWrapper";
import BlogSample from "@/components/LandingPage/BlogSamples";
import Footer from "@/components/LandingPage/Footer";
import HeroSection from "@/components/LandingPage/HeroSection";
import MarketingCards from "@/components/LandingPage/MarketingCards";

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <div className="flex flex-col mb-[3rem] mt-[4rem]">
        <MarketingCards />
      </div>
      <BlogSample />
    </PageWrapper>
  );
}
