import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  LogOut, 
  User, 
  Leaf, 
  Microscope, 
  Zap, 
  Building, 
  Shield,
  Brain,
  Network,
  Fingerprint,
  Globe
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const workspaces = [
  {
    id: "ecosystem",
    title: "🌿 Ecosystem Healing",
    description: "Soil regeneration, biodiversity metrics, AI restoration models",
    access: "MycoGrid Pod Teams + Auditors",
    icon: Leaf,
    color: "accent",
    features: ["Live soil data", "AI restoration models", "Impact KPIs", "Restoration tracking"]
  },
  {
    id: "longevity",
    title: "🧬 Human Longevity Lab",
    description: "Organ scaffolds, regenerative medicine, patient protocols",
    access: "RegeneraLimb Guilds + Clinicians",
    icon: Microscope,
    color: "primary",
    features: ["Organ blueprints", "Patient logs", "Treatment protocols", "Research data"]
  },
  {
    id: "energy",
    title: "⚡ Energy Consciousness Grid",
    description: "Quantum solar output, carbon credits, energy distribution",
    access: "HelioCore Engineers + Cooperatives", 
    icon: Zap,
    color: "neon",
    features: ["Solar output", "Carbon credits", "Grid optimization", "Energy trading"]
  },
  {
    id: "habitat",
    title: "🏙️ Habitat Design Nodes",
    description: "City growth metrics, self-repair systems, biome integration",
    access: "Skygrid Architects + Biome AI",
    icon: Building,
    color: "innovation",
    features: ["Growth metrics", "Self-repair status", "Biome data", "Design patterns"]
  }
];

const Dashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }
      
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed Out",
        description: "Successfully disconnected from regenerative workspace.",
      });
    } catch (error) {
      toast({
        title: "Sign Out Error",
        description: "There was an issue signing out.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-organic flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Initializing regenerative workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-organic">
      {/* Header */}
      <header className="border-b border-primary/20 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-heading font-bold">
                <span className="bg-gradient-consciousness bg-clip-text text-transparent">
                  Regenerative Dashboard
                </span>
              </h1>
              <Badge variant="secondary" className="bg-primary/10 text-primary-glow">
                Multi-Consciousness Access
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Security Status */}
        <Card className="backdrop-organic border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-glow" />
              Authentication Status
            </CardTitle>
            <CardDescription>
              Multi-layered security verification for regenerative access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <Globe className="w-5 h-5 text-primary-glow" />
                <div>
                  <div className="font-semibold text-sm">Global Identity</div>
                  <div className="text-xs text-muted-foreground">Verified</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
                <Fingerprint className="w-5 h-5 text-accent-glow" />
                <div>
                  <div className="font-semibold text-sm">Biometric Layer</div>
                  <div className="text-xs text-muted-foreground">Ready</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-neon/5 border border-neon/20">
                <Brain className="w-5 h-5 text-neon-glow" />
                <div>
                  <div className="font-semibold text-sm">Cognitive Consent</div>
                  <div className="text-xs text-muted-foreground">Enabled</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-innovation/5 border border-innovation/20">
                <Network className="w-5 h-5 text-innovation-glow" />
                <div>
                  <div className="font-semibold text-sm">Commons License</div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workspace Access */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-heading font-bold">
              Regenerative Workspaces
            </h2>
            <p className="text-muted-foreground">
              Access your authorized multi-consciousness collaboration environments
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {workspaces.map((workspace) => {
              const IconComponent = workspace.icon;
              
              return (
                <Card
                  key={workspace.id}
                  className={`backdrop-organic border-${workspace.color}/20 hover:border-${workspace.color}/50 transition-all duration-300 hover:scale-102 cursor-pointer group`}
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-${workspace.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className={`w-6 h-6 text-${workspace.color}-glow`} />
                      </div>
                      <Badge className={`bg-${workspace.color}/10 text-${workspace.color}-glow border-${workspace.color}/30`}>
                        {workspace.access.split(' ')[0]}
                      </Badge>
                    </div>
                    
                    <div>
                      <CardTitle className="text-xl font-heading group-hover:text-primary-glow transition-colors">
                        {workspace.title}
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        {workspace.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-muted-foreground">
                        Access Level: {workspace.access}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {workspace.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full bg-${workspace.color}-glow`} />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      variant={workspace.color === 'neon' ? 'neon' : 'consciousness'} 
                      className="w-full group"
                      onClick={() => {
                        if (workspace.id === 'ecosystem') {
                          navigate('/workspace/ecosystem');
                        } else {
                          toast({
                            title: "Coming Soon",
                            description: `${workspace.title} workspace is being developed.`,
                          });
                        }
                      }}
                    >
                      Enter Workspace
                      <Network className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Future Features Notice */}
        <Card className="backdrop-organic border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-heading font-semibold">
                🚀 Expanding Multi-Consciousness Framework
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Advanced biometric authentication, neural interface integration, and AI co-access protocols are being developed. 
                Your current access layer will seamlessly upgrade as new security and collaboration features become available.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;