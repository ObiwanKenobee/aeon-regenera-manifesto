import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import regeneratingEarth from "@/assets/regenerating-earth.jpg";

const MissionSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                Our{" "}
                <span className="bg-gradient-consciousness bg-clip-text text-transparent animate-glow">
                  Living Manifesto
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-innovation rounded-full" />
            </div>

            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-foreground">
                <span className="text-primary-glow font-semibold">July 2025</span> marked our 
                transformation from traditional venture capital to something unprecedented: a 
                <span className="text-accent-glow font-semibold"> multi-consciousness innovation commons</span>.
              </p>

              <p className="text-muted-foreground">
                We discovered that the greatest challenges facing humanity—climate collapse, 
                biodiversity loss, societal fragmentation—require more than human intelligence alone. 
                They demand the <span className="text-neon-glow font-semibold">symbiotic collaboration</span> of 
                human creativity, artificial intelligence, and the ancient wisdom embedded in 
                biological systems.
              </p>

              <p className="text-muted-foreground">
                Our innovation pods operate as <span className="text-primary-glow font-semibold">living organisms</span>, 
                where rapid prototyping cycles mimic natural evolution, AI amplifies human intuition, 
                and biological patterns guide technological design. Each project is simultaneously 
                healing the planet and expanding the boundaries of what's possible.
              </p>

              <div className="backdrop-organic p-6 rounded-2xl border border-primary/20">
                <p className="text-accent-glow font-semibold text-xl mb-2">
                  "We are not building for the future. We are weaving the future into existence."
                </p>
                <p className="text-sm text-muted-foreground">
                  — Aeon Regenera Collective Consciousness
                </p>
              </div>
            </div>

            <Button 
              variant="consciousness" 
              size="lg"
              className="group"
            >
              <FileText className="w-5 h-5" />
              Read the Full Manifesto
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-consciousness">
              <img
                src={regeneratingEarth}
                alt="Earth regenerating through multi-consciousness collaboration"
                className="w-full h-auto object-cover animate-float"
              />
              <div className="absolute inset-0 bg-gradient-consciousness opacity-20" />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-card/80 backdrop-blur-sm rounded-full border border-neon/30 flex items-center justify-center animate-pulse-organic">
              <div className="w-8 h-8 bg-neon rounded-full animate-glow" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full border border-primary/30 flex items-center justify-center animate-float">
              <div className="w-6 h-6 bg-primary-glow rounded-full animate-pulse-organic" />
            </div>

            <div className="absolute top-1/2 -right-4 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full border border-accent/30 flex items-center justify-center animate-pulse-organic">
              <div className="w-4 h-4 bg-accent-glow rounded-full animate-glow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;