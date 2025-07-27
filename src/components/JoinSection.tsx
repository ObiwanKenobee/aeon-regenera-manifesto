import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Handshake, 
  Lightbulb, 
  DollarSign, 
  Mail,
  User,
  Building
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const joinOptions = [
  {
    id: "partner",
    icon: Handshake,
    title: "Partner with Us",
    description: "Collaborate on regenerative innovations that scale your impact",
    color: "primary",
    benefits: ["Co-develop solutions", "Access our network", "Shared resources", "Joint ventures"],
    cta: "Start Partnership",
    badge: "Enterprise"
  },
  {
    id: "innovator",
    icon: Lightbulb,
    title: "Join as Innovator",
    description: "Contribute your genius to multi-consciousness innovation pods",
    color: "accent",
    benefits: ["Pod membership", "AI collaboration", "Research access", "Global community"],
    cta: "Apply to Innovate",
    badge: "Creators"
  },
  {
    id: "investor",
    icon: DollarSign,
    title: "Invest in Regeneration",
    description: "Fund breakthrough technologies that heal the planet and expand human potential",
    color: "neon",
    benefits: ["Regenerative returns", "Impact measurement", "Portfolio diversity", "Exclusive access"],
    cta: "Explore Investment",
    badge: "Capital"
  }
];

const JoinSection = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    interest: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-24 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Join the{" "}
            <span className="bg-gradient-consciousness bg-clip-text text-transparent animate-glow">
              Movement
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Become part of the regenerative revolution. Whether you're an innovator, partner, or investor, 
            there's a place for you in our multi-consciousness ecosystem.
          </p>
          <div className="w-24 h-1 bg-gradient-innovation rounded-full mx-auto" />
        </div>

        {/* Join Options */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {joinOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedOption === option.id;
            
            return (
              <Card
                key={option.id}
                className={`backdrop-organic border transition-all duration-500 cursor-pointer group ${
                  isSelected 
                    ? `border-${option.color} shadow-glow scale-105` 
                    : `border-primary/20 hover:border-${option.color}/50 hover:scale-102`
                }`}
                onClick={() => setSelectedOption(isSelected ? null : option.id)}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-${option.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-6 h-6 text-${option.color}-glow`} />
                    </div>
                    <Badge className={`bg-${option.color}/10 text-${option.color}-glow border-${option.color}/30`}>
                      {option.badge}
                    </Badge>
                  </div>
                  
                  <div>
                    <CardTitle className="text-xl font-heading group-hover:text-primary-glow transition-colors">
                      {option.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {option.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {option.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full bg-${option.color}-glow`} />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                    {isSelected && (
                    <Button 
                      variant={option.color === 'neon' ? 'neon' : 'consciousness'} 
                      className="w-full group animate-fade-in"
                      onClick={() => navigate('/auth')}
                    >
                      {option.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Smart Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-organic border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading">
                Start Your Regenerative Journey
              </CardTitle>
              <CardDescription>
                Our AI assistant will help match you with the perfect opportunity
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Name
                  </label>
                  <Input
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Organization (Optional)
                </label>
                <Input
                  placeholder="Company, institution, or collective"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  What draws you to regenerative innovation?
                </label>
                <textarea
                  className="w-full min-h-[100px] p-3 rounded-xl border border-input bg-background/50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Share your passion, expertise, or vision for planetary regeneration..."
                  value={formData.interest}
                  onChange={(e) => handleInputChange('interest', e.target.value)}
                />
              </div>

              <Button 
                variant="regenerative" 
                size="lg" 
                className="w-full group"
                disabled={!formData.name || !formData.email}
                onClick={() => navigate('/auth')}
              >
                <Lightbulb className="w-5 h-5" />
                Connect with Our AI Matchmaker
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Our AI will analyze your profile and suggest the best collaboration opportunities within 24 hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;