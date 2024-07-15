import PageWrapper from "@/components/container/page-wrapper";
import { FeatureSection } from "@/components/homepage/features";
import HeroSection from "@/components/homepage/hero";

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex flex-col max-w-[70rem]">
        <HeroSection />
        <FeatureSection />
      </div>
    </PageWrapper>
  );
}
