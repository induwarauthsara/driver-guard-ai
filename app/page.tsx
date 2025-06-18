import { Suspense } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import StatsSection from '@/components/landing/StatsSection';
import PricingSection from '@/components/landing/PricingSectionNew';
import TeamSection from '@/components/landing/TeamSectionNew';
import ContactSection from '@/components/landing/ContactSectionNew';
import Footer from '@/components/landing/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <PricingSection />
        <TeamSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </main>
  );
}