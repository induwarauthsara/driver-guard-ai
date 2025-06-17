import { Suspense } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import StatsSection from '@/components/landing/StatsSection';
import PricingSection from '@/components/landing/PricingSection';
import TeamSection from '@/components/landing/TeamSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import Navbar from '@/components/landing/Navbar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
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