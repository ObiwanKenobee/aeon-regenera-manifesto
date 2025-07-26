import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import InnovationPods from "@/components/InnovationPods";
import MultiConsciousness from "@/components/MultiConsciousness";
import ImpactDashboard from "@/components/ImpactDashboard";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MissionSection />
      <InnovationPods />
      <MultiConsciousness />
      <ImpactDashboard />
      <JoinSection />
      <Footer />
    </div>
  );
};

export default Index;
