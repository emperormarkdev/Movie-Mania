import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import RateCard from "@/components/RateCard";
import SocialLinks from "@/components/SocialLinks";
import PostingGuidelines from "@/components/PostingGuidelines";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <RateCard />
        <SocialLinks />
        <PostingGuidelines />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
