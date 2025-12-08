import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeatureBadges from "@/components/home/FeatureBadges";
import StatementSection from "@/components/home/StatementSection";
import ProductsSection from "@/components/home/ProductsSection";
import EcoFriendlySection from "@/components/home/EcoFriendlySection";
import SocialProofSection from "@/components/home/SocialProofSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import InstagramSection from "@/components/home/InstagramSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeatureBadges />
        <StatementSection />
        <ProductsSection />
        <EcoFriendlySection />
        <SocialProofSection />
        <TestimonialSection />
        <InstagramSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
