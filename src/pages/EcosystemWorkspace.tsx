import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  LogOut,
  Leaf,
  Activity,
  TrendingUp,
  Timer,
  Play,
  Pause,
  RefreshCw,
  Eye,
  Shield,
  Users,
  Microscope,
  BarChart3,
  MapPin,
  Droplets,
  Thermometer,
  Zap
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

// Mock data for demonstration
const mockSoilData = {
  regions: [
    { id: "pod-a1", name: "Pod A1 - Forest Edge", ph: 6.8, moisture: 32, carbon: 4.2, status: "healthy" },
    { id: "pod-a2", name: "Pod A2 - Creek Valley", ph: 7.1, moisture: 28, carbon: 3.8, status: "improving" },
    { id: "pod-b1", name: "Pod B1 - Hill Slope", ph: 6.5, moisture: 24, carbon: 3.1, status: "healing" }
  ],
  sensors: [
    { id: "sensor-001", type: "pH", value: 6.8, location: "Pod A1", lastUpdate: "2 minutes ago" },
    { id: "sensor-002", type: "Moisture", value: 32, location: "Pod A1", lastUpdate: "1 minute ago" },
    { id: "sensor-003", type: "Carbon", value: 4.2, location: "Pod A1", lastUpdate: "3 minutes ago" }
  ]
};

const mockAIModels = [
  { id: "fungal-net-v2", name: "Fungal Network Restoration v2", description: "Advanced mycelial network regeneration", status: "ready" },
  { id: "soil-carbon-pred", name: "Soil Carbon Predictor", description: "Carbon sequestration forecasting", status: "training" },
  { id: "biodiversity-optimizer", name: "Biodiversity Optimizer", description: "Species reintroduction planning", status: "ready" }
];

const mockKPIs = {
  hectares_restored: 1247000,
  biodiversity_index: 0.84,
  carbon_sequestered: 15600,
  projects_active: 23,
  communities_engaged: 156
};

const mockTimeline = [
  { date: "2025-07-25", event: "Pod A1 Soil Inoculation", user: "Dr. Nova", status: "completed", verified: true },
  { date: "2025-07-24", event: "Spore Density Analysis", user: "AI System", status: "completed", verified: true },
  { date: "2025-07-23", event: "Mycorrhizal Mapping", user: "Field Team", status: "completed", verified: false },
  { date: "2025-07-22", event: "Baseline pH Measurement", user: "Dr. Nova", status: "completed", verified: true }
];

const EcosystemWorkspace = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userRole, setUserRole] = useState<'team' | 'auditor'>('team'); // Mock role assignment
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState("fungal-net-v2");
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("soil-data");
  const navigate = useNavigate();

  useEffect(() => {
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
    await supabase.auth.signOut();
  };

  const runSimulation = () => {
    setSimulationRunning(true);
    setTimeout(() => {
      setSimulationRunning(false);
      toast({
        title: "Simulation Complete",
        description: "Restoration forecast generated successfully",
      });
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-organic flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading ecosystem workspace...</p>
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
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <div className="flex items-center gap-2">
                <Leaf className="w-6 h-6 text-accent-glow" />
                <h1 className="text-2xl font-heading font-bold">
                  <span className="bg-gradient-consciousness bg-clip-text text-transparent">
                    Ecosystem Healing
                  </span>
                </h1>
              </div>
              <Badge variant="secondary" className="bg-accent/10 text-accent-glow">
                MycoGrid Pod Teams + Auditors
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className={`${userRole === 'team' ? 'bg-primary/10 text-primary-glow' : 'bg-muted/50 text-muted-foreground'}`}>
                {userRole === 'team' ? (
                  <>
                    <Users className="w-3 h-3 mr-1" />
                    Team Member
                  </>
                ) : (
                  <>
                    <Shield className="w-3 h-3 mr-1" />
                    Auditor
                  </>
                )}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
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

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="soil-data" className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Live Soil Data
            </TabsTrigger>
            <TabsTrigger value="ai-models" className="flex items-center gap-2">
              <Microscope className="w-4 h-4" />
              AI Models
            </TabsTrigger>
            <TabsTrigger value="impact-kpis" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Impact KPIs
            </TabsTrigger>
            <TabsTrigger value="restoration-tracking" className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Restoration Tracking
            </TabsTrigger>
          </TabsList>

          {/* Live Soil Data Panel */}
          <TabsContent value="soil-data" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Interactive Soil Health Map */}
              <Card className="backdrop-organic border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent-glow" />
                    Soil Health Map
                  </CardTitle>
                  <CardDescription>
                    Real-time ecosystem monitoring across pod regions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSoilData.regions.map((region) => (
                      <div key={region.id} className="p-4 rounded-lg bg-muted/20 border border-accent/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{region.name}</h4>
                          <Badge className={`${
                            region.status === 'healthy' ? 'bg-green-500/10 text-green-400' :
                            region.status === 'improving' ? 'bg-yellow-500/10 text-yellow-400' :
                            'bg-blue-500/10 text-blue-400'
                          }`}>
                            {region.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Thermometer className="w-4 h-4 text-red-400" />
                            pH: {region.ph}
                          </div>
                          <div className="flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-blue-400" />
                            {region.moisture}%
                          </div>
                          <div className="flex items-center gap-2">
                            <Leaf className="w-4 h-4 text-green-400" />
                            {region.carbon}% C
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Real-time Sensor Feed */}
              <Card className="backdrop-organic border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-accent-glow" />
                    Live Sensor Feed
                  </CardTitle>
                  <CardDescription>
                    IoT soil probes and drone data streams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockSoilData.sensors.map((sensor) => (
                      <div key={sensor.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-accent/20">
                        <div>
                          <div className="font-semibold">{sensor.type}</div>
                          <div className="text-sm text-muted-foreground">{sensor.location}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-accent-glow">{sensor.value}{sensor.type === 'pH' ? '' : sensor.type === 'Moisture' ? '%' : '% C'}</div>
                          <div className="text-xs text-muted-foreground">{sensor.lastUpdate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {userRole === 'team' && (
                    <Button className="w-full mt-4" variant="consciousness">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Sensors
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Restoration Models */}
          <TabsContent value="ai-models" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="backdrop-organic border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Microscope className="w-5 h-5 text-primary-glow" />
                    Model Selection
                  </CardTitle>
                  <CardDescription>
                    Choose AI model for restoration simulation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAIModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {mockAIModels.map((model) => (
                    model.id === selectedModel && (
                      <div key={model.id} className="p-4 rounded-lg bg-muted/20 border border-primary/20">
                        <h4 className="font-semibold mb-2">{model.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{model.description}</p>
                        <Badge className={`${
                          model.status === 'ready' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {model.status}
                        </Badge>
                      </div>
                    )
                  ))}

                  {userRole === 'team' && (
                    <div className="flex gap-2">
                      <Button 
                        onClick={runSimulation} 
                        disabled={simulationRunning}
                        className="flex-1"
                        variant="consciousness"
                      >
                        {simulationRunning ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Run Simulation
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="backdrop-organic border-primary/20">
                <CardHeader>
                  <CardTitle>Restoration Forecast</CardTitle>
                  <CardDescription>
                    AI-generated ecosystem recovery predictions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">Carbon Sequestration</span>
                        <span className="text-green-400 font-bold">+15.2 t/ha/year</span>
                      </div>
                      <div className="w-full bg-green-500/10 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">Biodiversity Recovery</span>
                        <span className="text-blue-400 font-bold">+32% in 18 months</span>
                      </div>
                      <div className="w-full bg-blue-500/10 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full w-1/2"></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">Soil Health Index</span>
                        <span className="text-purple-400 font-bold">0.84 → 0.94</span>
                      </div>
                      <div className="w-full bg-purple-500/10 rounded-full h-2">
                        <div className="bg-purple-400 h-2 rounded-full w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Impact KPIs */}
          <TabsContent value="impact-kpis" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="backdrop-organic border-innovation/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Hectares Restored</p>
                      <p className="text-2xl font-bold text-innovation-glow">
                        {(mockKPIs.hectares_restored / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <Leaf className="w-8 h-8 text-innovation-glow" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-organic border-neon/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Biodiversity Index</p>
                      <p className="text-2xl font-bold text-neon-glow">{mockKPIs.biodiversity_index}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-neon-glow" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-organic border-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">CO₂ Sequestered (tons)</p>
                      <p className="text-2xl font-bold text-accent-glow">
                        {(mockKPIs.carbon_sequestered / 1000).toFixed(1)}K
                      </p>
                    </div>
                    <Zap className="w-8 h-8 text-accent-glow" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-organic border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Projects</p>
                      <p className="text-2xl font-bold text-primary-glow">{mockKPIs.projects_active}</p>
                    </div>
                    <Activity className="w-8 h-8 text-primary-glow" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-organic border-consciousness/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Communities Engaged</p>
                      <p className="text-2xl font-bold text-consciousness-glow">{mockKPIs.communities_engaged}</p>
                    </div>
                    <Users className="w-8 h-8 text-consciousness-glow" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Restoration Tracking */}
          <TabsContent value="restoration-tracking" className="space-y-6">
            <Card className="backdrop-organic border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-primary-glow" />
                  Project Timeline & Activity Log
                </CardTitle>
                <CardDescription>
                  Track restoration progress and audit verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTimeline.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/20 border border-primary/20">
                      <div className="flex-shrink-0 w-3 h-3 rounded-full bg-primary-glow"></div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{item.event}</h4>
                          <div className="flex items-center gap-2">
                            {item.verified && (
                              <Badge className="bg-green-500/10 text-green-400">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {userRole === 'auditor' && (
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3 mr-1" />
                                Review
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.date} • {item.user} • {item.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EcosystemWorkspace;