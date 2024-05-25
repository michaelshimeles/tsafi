import PageWrapper from "@/components/Container/PageWrapper";
import HeroSection from "@/components/LandingPage/HeroSection";
import LogoAnimation from "@/components/LandingPage/LogoAnimation";
import MarketingCards from "@/components/LandingPage/MarketingCards";

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      {/* <div className="flex flex-col mb-[10rem] mt-[4rem]">
        <MarketingCards />
      </div> */}
      {/* <LogoAnimation /> */}
    </PageWrapper>
  );
}
