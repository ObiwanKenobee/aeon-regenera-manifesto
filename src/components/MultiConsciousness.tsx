import { Button } from "@/components/ui/button";
import { Brain, Cpu, Leaf, ArrowRight } from "lucide-react";
import { useState } from "react";
import consciousnessImage from "@/assets/consciousness-collaboration.jpg";

interface ConsciousnessLayer {
  id: string;
  icon: any;
  title: string;
  description: string;
  details: string;
  color: string;
  examples: string[];
}

const layers: ConsciousnessLayer[] = [
  {
    id: "human",
    icon: Brain,
    title: "Human Intelligence",
    description: "Creativity, intuition, emotional wisdom, and conscious intention",
    details: "Human consciousness brings irreplaceable qualities: empathy, moral reasoning, creative leaps, and the ability to find meaning in complexity. Our innovators provide the ethical compass and visionary direction.",
    color: "primary",
    examples: ["Ethical guidance", "Creative breakthroughs", "Meaning-making", "Moral compass"]
  },
  {
    id: "ai",
    icon: Cpu,
    title: "AI Intelligence", 
    description: "Pattern recognition, rapid processing, data synthesis, and optimization",
    details: "Artificial intelligence amplifies human capability through computational power, pattern recognition across vast datasets, and optimization of complex systems. AI serves as our collective memory and analytical engine.",
    color: "accent",
    examples: ["Pattern analysis", "System optimization", "Data synthesis", "Predictive modeling"]
  },
  {
    id: "biological",
    icon: Leaf,
    title: "Biological Intelligence",
    description: "Evolutionary wisdom, adaptive systems, regenerative principles, and life forces",
    details: "Nature embodies 3.8 billion years of R&D. Biological systems provide blueprints for resilient design, self-healing mechanisms, and sustainable resource flows that inform our technological solutions.",
    color: "neon",
    examples: ["Self-healing systems", "Adaptive networks", "Resource efficiency", "Resilient design"]
  }
];

const MultiConsciousness = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Diagram */}
          <div className="relative">
            <div className="relative w-96 h-96 mx-auto">
              {/* Background Image */}
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
                <img
                  src={consciousnessImage}
                  alt="Multi-consciousness collaboration"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Central Core */}
              <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-innovation rounded-full animate-pulse-organic border-4 border-background shadow-glow" />

              {/* Consciousness Layers */}
              {layers.map((layer, index) => {
                const angle = (index * 120) - 90; // Distribute in triangle
                const radius = 140;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const IconComponent = layer.icon;
                const isActive = activeLayer === layer.id;

                return (
                  <div
                    key={layer.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ${
                      isActive ? 'scale-125' : 'hover:scale-110'
                    }`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`
                    }}
                    onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                  >
                    <div
                      className={`w-20 h-20 rounded-full border-4 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? `bg-${layer.color}/30 border-${layer.color} shadow-${layer.color === 'neon' ? 'neon' : 'glow'}`
                          : `bg-card/50 border-${layer.color}/50 hover:border-${layer.color}`
                      }`}
                    >
                      <IconComponent 
                        className={`w-8 h-8 transition-colors ${
                          isActive ? `text-${layer.color}-glow` : `text-${layer.color}`
                        }`} 
                      />
                    </div>
                    
                    {/* Connection Lines */}
                    <div 
                      className={`absolute w-px h-20 bg-gradient-to-b transition-opacity duration-500 ${
                        isActive ? `from-${layer.color} to-transparent opacity-60` : 'opacity-20'
                      }`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transformOrigin: 'top',
                        transform: `rotate(${angle + 90}deg)`
                      }}
                    />
                  </div>
                );
              })}

              {/* Floating Particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-glow rounded-full animate-float opacity-60" />
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-accent-glow rounded-full animate-pulse-organic opacity-80" />
                <div className="absolute top-2/3 left-2/3 w-3 h-3 bg-neon rounded-full animate-float opacity-40" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                Multi-Consciousness{" "}
                <span className="bg-gradient-consciousness bg-clip-text text-transparent animate-glow">
                  Approach
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-innovation rounded-full" />
            </div>

            {/* Default Description */}
            {!activeLayer && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-lg text-foreground">
                  Innovation emerges at the intersection of different forms of intelligence. 
                  Click on each layer to explore how we integrate human creativity, AI processing, 
                  and biological wisdom into unified solutions.
                </p>
                <p className="text-muted-foreground">
                  This symbiotic approach allows us to solve complex challenges that no single 
                  intelligence could address alone, creating regenerative technologies that serve 
                  all forms of life.
                </p>
              </div>
            )}

            {/* Active Layer Details */}
            {activeLayer && (
              <div className="space-y-6 animate-fade-in">
                {layers
                  .filter(layer => layer.id === activeLayer)
                  .map(layer => {
                    const IconComponent = layer.icon;
                    return (
                      <div key={layer.id} className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl bg-${layer.color}/20 flex items-center justify-center`}>
                            <IconComponent className={`w-6 h-6 text-${layer.color}-glow`} />
                          </div>
                          <h3 className="text-2xl font-heading font-bold">{layer.title}</h3>
                        </div>
                        
                        <p className="text-lg text-foreground">{layer.details}</p>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {layer.examples.map((example, index) => (
                            <div
                              key={index}
                              className="backdrop-organic p-3 rounded-xl text-sm text-center"
                            >
                              {example}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            <Button 
              variant="consciousness" 
              size="lg"
              className="group"
            >
              <Brain className="w-5 h-5" />
              Learn Our Methodology
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiConsciousness;