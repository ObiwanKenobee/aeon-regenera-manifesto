import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Globe } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Organic digital networks"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-organic opacity-60" />
        <div className="absolute inset-0 bg-background/20" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-neon rounded-full animate-pulse-organic opacity-60" />
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-primary-glow rounded-full animate-float opacity-80" />
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-accent-glow rounded-full animate-pulse-organic opacity-40" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-neon-glow rounded-full animate-float opacity-90" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8 animate-float">
          {/* Tagline */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-neon animate-pulse-organic" />
            <span className="text-sm font-heading uppercase tracking-wider text-accent-glow">
              Multi-Consciousness Innovation
            </span>
            <Sparkles className="w-5 h-5 text-neon animate-pulse-organic" />
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-heading font-bold leading-tight animate-glow">
            <span className="bg-gradient-innovation bg-clip-text text-transparent">
              Beyond Capital.
            </span>
            <br />
            <span className="text-foreground">
              Toward Regeneration.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-body">
            We are pioneering a{" "}
            <span className="text-accent-glow font-semibold">multi-consciousness innovation commons</span>{" "}
            to heal Earth and extend human potential through the symbiosis of{" "}
            <span className="text-primary-glow font-semibold">human creativity</span>,{" "}
            <span className="text-accent-glow font-semibold">AI intelligence</span>, and{" "}
            <span className="text-neon-glow font-semibold">biological wisdom</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              variant="regenerative" 
              size="xl"
              className="group"
            >
              <Globe className="w-5 h-5" />
              Join the Movement
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="consciousness" 
              size="xl"
              className="group"
            >
              <Sparkles className="w-5 h-5" />
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm">
            <div className="backdrop-organic rounded-2xl p-4">
              <div className="text-2xl font-heading font-bold text-primary-glow animate-glow">12+</div>
              <div className="text-muted-foreground">Innovation Pods</div>
            </div>
            <div className="backdrop-organic rounded-2xl p-4">
              <div className="text-2xl font-heading font-bold text-accent-glow animate-glow">1.2M</div>
              <div className="text-muted-foreground">Acres Restored</div>
            </div>
            <div className="backdrop-organic rounded-2xl p-4">
              <div className="text-2xl font-heading font-bold text-neon-glow animate-glow">∞</div>
              <div className="text-muted-foreground">Potential Unlocked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-primary-glow rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-glow rounded-full animate-pulse-organic mt-2" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;