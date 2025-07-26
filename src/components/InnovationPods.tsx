import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, TreePine, Building, Heart, Plus } from "lucide-react";
import { useState } from "react";

const pods = [
  {
    id: 1,
    icon: Heart,
    title: "RegeneraLimb",
    description: "Bioelectric regeneration technology that awakens the body's innate healing consciousness",
    status: "prototyping",
    domain: "Biomedical",
    impact: "10K+ lives restored",
    color: "primary",
    details: "Combining AI pattern recognition with bioelectric stimulation to trigger natural limb regeneration. Current trials show 300% faster healing rates."
  },
  {
    id: 2,
    icon: Building,
    title: "Skygrid Habitat",
    description: "Self-growing cities that breathe with their environment, adapting to climate and community needs",
    status: "live",
    domain: "Urban Planning",
    impact: "5 cities transformed",
    color: "accent",
    details: "Living architecture powered by mycelium networks and AI urban planning. Each building grows organically while optimizing energy and social flow."
  },
  {
    id: 3,
    icon: Zap,
    title: "HelioCore",
    description: "Quantum solar arrays that dance with the sun's rhythms, maximizing energy harvest",
    status: "idea",
    domain: "Energy",
    impact: "Carbon negative in 2 years",
    color: "neon",
    details: "AI-guided quantum dots that track solar patterns and weather systems, achieving 95% efficiency through biomimetic design."
  },
  {
    id: 4,
    icon: TreePine,
    title: "NeuralForest",
    description: "Reforestation through AI-guided ecosystem consciousness, restoring biodiversity at scale",
    status: "prototyping",
    domain: "Ecology",
    impact: "2M trees planted",
    color: "success",
    details: "Machine learning algorithms that understand forest communication networks, optimizing species placement for maximum ecosystem resilience."
  }
];

const statusColors = {
  idea: "bg-muted text-muted-foreground",
  prototyping: "bg-accent/20 text-accent",
  live: "bg-primary/20 text-primary-glow"
};

const InnovationPods = () => {
  const [hoveredPod, setHoveredPod] = useState<number | null>(null);

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Innovation{" "}
            <span className="bg-gradient-innovation bg-clip-text text-transparent animate-glow">
              Pods
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Living laboratories where human creativity, AI intelligence, and biological wisdom 
            converge to solve humanity's greatest challenges through rapid innovation cycles.
          </p>
          <div className="w-24 h-1 bg-gradient-consciousness rounded-full mx-auto" />
        </div>

        {/* Pods Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {pods.map((pod) => {
            const IconComponent = pod.icon;
            const isHovered = hoveredPod === pod.id;
            
            return (
              <Card
                key={pod.id}
                className={`backdrop-organic border-primary/20 transition-all duration-500 cursor-pointer group ${
                  isHovered ? 'shadow-glow scale-105 border-primary/40' : 'shadow-organic'
                }`}
                onMouseEnter={() => setHoveredPod(pod.id)}
                onMouseLeave={() => setHoveredPod(null)}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-${pod.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-6 h-6 text-${pod.color}-glow`} />
                    </div>
                    <Badge className={statusColors[pod.status as keyof typeof statusColors]}>
                      {pod.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <CardTitle className="text-2xl font-heading group-hover:text-primary-glow transition-colors">
                      {pod.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {pod.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {isHovered && (
                    <div className="text-sm text-muted-foreground animate-fade-in">
                      {pod.details}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-accent-glow font-semibold">{pod.domain}</span>
                    <span className="text-neon-glow font-semibold">{pod.impact}</span>
                  </div>

                  {isHovered && (
                    <div className="flex gap-3 pt-2 animate-fade-in">
                      <Button variant="outline" size="sm" className="flex-1">
                        Learn More
                      </Button>
                      <Button variant="neon" size="sm" className="group">
                        Support
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            variant="consciousness" 
            size="lg"
            className="group"
          >
            <Plus className="w-5 h-5" />
            Propose Your Pod
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InnovationPods;