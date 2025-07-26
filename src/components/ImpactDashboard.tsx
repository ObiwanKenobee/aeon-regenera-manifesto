import { Badge } from "@/components/ui/badge";
import { Leaf, Zap, Users, Globe, TreePine, Droplets } from "lucide-react";
import { useEffect, useState } from "react";

interface Metric {
  id: string;
  icon: any;
  value: number;
  target: number;
  unit: string;
  label: string;
  color: string;
  description: string;
}

const metrics: Metric[] = [
  {
    id: "ecosystems",
    icon: TreePine,
    value: 0,
    target: 1200000,
    unit: "acres",
    label: "Ecosystems Healed",
    color: "primary",
    description: "Soil restored, biodiversity recovered"
  },
  {
    id: "carbon",
    icon: Leaf,
    value: 0,
    target: 850,
    unit: "kt CO₂",
    label: "Carbon Absorbed",
    color: "success",
    description: "Atmospheric carbon removed"
  },
  {
    id: "innovations",
    icon: Zap,
    value: 0,
    target: 47,
    unit: "",
    label: "Innovations Launched",
    color: "neon",
    description: "Live regenerative technologies"
  },
  {
    id: "communities",
    icon: Users,
    value: 0,
    target: 1250000,
    unit: "",
    label: "Lives Touched",
    color: "accent",
    description: "Communities engaged and supported"
  },
  {
    id: "energy",
    icon: Zap,
    value: 0,
    target: 420,
    unit: "GWh",
    label: "Clean Energy Generated",
    color: "warning",
    description: "Renewable energy produced"
  },
  {
    id: "water",
    icon: Droplets,
    value: 0,
    target: 85,
    unit: "M liters",
    label: "Water Restored",
    color: "accent",
    description: "Clean water systems created"
  }
];

const ImpactDashboard = () => {
  const [animatedMetrics, setAnimatedMetrics] = useState(metrics);

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

        setAnimatedMetrics(metrics.map(metric => ({
          ...metric,
          value: Math.floor(metric.target * easeProgress)
        })));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return timer;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('impact-dashboard');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const formatNumber = (num: number, unit: string) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <section id="impact-dashboard" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Planetary{" "}
            <span className="bg-gradient-innovation bg-clip-text text-transparent animate-glow">
              Impact
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time metrics showing the regenerative impact of our multi-consciousness innovation pods. 
            Every number represents life restored, communities empowered, and futures made possible.
          </p>
          <div className="w-24 h-1 bg-gradient-consciousness rounded-full mx-auto" />
        </div>

        {/* Global Status */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 backdrop-organic p-4 rounded-2xl">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse-organic" />
            <span className="text-sm font-heading">
              <span className="text-success">ACTIVE:</span> 12 pods regenerating across 6 continents
            </span>
            <Globe className="w-4 h-4 text-accent-glow animate-float" />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animatedMetrics.map((metric) => {
            const IconComponent = metric.icon;
            const percentage = (metric.value / metric.target) * 100;
            
            return (
              <div
                key={metric.id}
                className="backdrop-organic border border-primary/20 rounded-3xl p-8 group hover:shadow-glow transition-all duration-500 hover:scale-105"
              >
                <div className="space-y-6">
                  {/* Icon and Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-${metric.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-7 h-7 text-${metric.color === 'success' ? 'primary' : metric.color}-glow`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      LIVE
                    </Badge>
                  </div>

                  {/* Main Value */}
                  <div className="space-y-2">
                    <div className="text-4xl font-heading font-bold">
                      <span className={`text-${metric.color === 'success' ? 'primary' : metric.color}-glow animate-glow`}>
                        {formatNumber(metric.value, metric.unit)}
                      </span>
                      <span className="text-lg text-muted-foreground ml-1">
                        {metric.unit}
                      </span>
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      {metric.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {metric.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{Math.round(percentage)}%</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-${metric.color === 'success' ? 'primary' : metric.color} to-${metric.color === 'success' ? 'primary' : metric.color}-glow transition-all duration-1000 ease-out`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Message */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto backdrop-organic p-8 rounded-3xl border border-primary/20">
            <p className="text-lg text-accent-glow font-semibold mb-2">
              "Every metric represents countless lives touched, ecosystems healed, and possibilities unlocked."
            </p>
            <p className="text-sm text-muted-foreground">
              Our impact compounds exponentially as each innovation pod creates ripple effects across communities and ecosystems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactDashboard;