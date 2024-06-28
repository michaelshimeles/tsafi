import PageWrapper from "@/components/Container/PageWrapper";
import HeroSection from "@/components/LandingPage/HeroSection";
import { RocketIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
    </PageWrapper>
  );
}
