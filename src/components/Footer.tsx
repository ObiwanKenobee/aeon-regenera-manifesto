import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  BookOpen, 
  Twitter, 
  Linkedin, 
  Github,
  Globe,
  Brain,
  Cpu,
  Heart
} from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [mode, setMode] = useState<'human' | 'ai'>('human');

  const toggleMode = () => {
    const newMode = mode === 'human' ? 'ai' : 'human';
    setMode(newMode);
    
    // Apply mode class to document body
    document.body.className = document.body.className.replace(/\b(human-mode|ai-mode)\b/g, '');
    document.body.classList.add(`${newMode}-mode`);
  };

  const links = {
    manifesto: [
      { label: "Full Manifesto", href: "#manifesto" },
      { label: "Innovation Principles", href: "#principles" },
      { label: "Regenerative Philosophy", href: "#philosophy" },
      { label: "Multi-Consciousness Theory", href: "#theory" }
    ],
    research: [
      { label: "Research Library", href: "#research" },
      { label: "Case Studies", href: "#cases" },
      { label: "Pod Documentation", href: "#docs" },
      { label: "Methodology Papers", href: "#papers" }
    ],
    connect: [
      { label: "Partner Portal", href: "#partners" },
      { label: "Innovator Network", href: "#network" },
      { label: "Investment Opportunities", href: "#invest" },
      { label: "Community Forum", href: "#forum" }
    ]
  };

  return (
    <footer className="bg-card/50 border-t border-primary/20 py-16 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-consciousness" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-heading font-bold bg-gradient-innovation bg-clip-text text-transparent">
                Aeon Regenera
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Pioneering the future through multi-consciousness innovation, 
                where human creativity, AI intelligence, and biological wisdom 
                converge to heal our planet and extend human potential.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-glow animate-pulse-organic" />
              </div>
              <span className="text-sm text-muted-foreground">
                With love for all consciousness
              </span>
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-foreground">Manifesto</h4>
            <ul className="space-y-3">
              {links.manifesto.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary-glow transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-foreground">Research</h4>
            <ul className="space-y-3">
              {links.research.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent-glow transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-foreground">Connect</h4>
            <ul className="space-y-3">
              {links.connect.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-neon-glow transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12">
          {[
            { icon: Twitter, href: "#twitter", label: "Twitter" },
            { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
            { icon: Github, href: "#github", label: "GitHub" },
            { icon: FileText, href: "#blog", label: "Blog" },
            { icon: BookOpen, href: "#docs", label: "Documentation" }
          ].map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-full bg-card/80 border border-primary/20 flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 group"
                aria-label={social.label}
              >
                <IconComponent className="w-4 h-4 text-muted-foreground group-hover:text-primary-glow transition-colors" />
              </a>
            );
          })}
        </div>

        {/* Mode Toggle & Bottom Bar */}
        <div className="border-t border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2025 Aeon Regenera</span>
              <span>•</span>
              <a href="#privacy" className="hover:text-primary-glow transition-colors">Privacy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-primary-glow transition-colors">Terms</a>
            </div>

            {/* Language & Mode Controls */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <select className="bg-transparent text-sm text-muted-foreground border-none focus:outline-none cursor-pointer">
                  <option>English</option>
                  <option>Español</option>
                  <option>Français</option>
                  <option>中文</option>
                </select>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">
                  Easter Egg
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMode}
                  className="group flex items-center gap-2 transition-all duration-500"
                >
                  {mode === 'human' ? (
                    <>
                      <Brain className="w-4 h-4 text-primary-glow" />
                      <span className="text-xs">Human Mode</span>
                      <div className="text-xs opacity-60">→ AI</div>
                    </>
                  ) : (
                    <>
                      <Cpu className="w-4 h-4 text-accent-glow" />
                      <span className="text-xs">AI Mode</span>
                      <div className="text-xs opacity-60">→ Human</div>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-organic" />
            <span>All systems regenerating • Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;