import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { IntroVideo } from "@/components/IntroVideo";
import { PageRevealController } from "@/components/PageRevealController";
import { Hero } from "@/components/sections/Hero";
import { BannerMarquee } from "@/components/sections/BannerMarquee";
import { Pain } from "@/components/sections/Pain";
import { Cockpit } from "@/components/sections/Cockpit";
import { Results } from "@/components/sections/Results";
import { PersonaCards } from "@/components/sections/PersonaCards";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <IntroVideo />
      <Header />
      <PageRevealController />
      <main className="relative isolate">
        <Hero />
        <BannerMarquee />
        <Pain />
        <Cockpit />
        <Results />
        <PersonaCards />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
