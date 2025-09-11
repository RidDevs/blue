import { ArrowRight, Leaf, Waves, Globe, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-mangroves.jpg';

const stats = [
  { name: 'CO₂ Captured', value: '2.4M', unit: 'tons', icon: TrendingUp },
  { name: 'Mangroves Protected', value: '15.2K', unit: 'hectares', icon: Leaf },
  { name: 'Verified Reports', value: '847', unit: 'reports', icon: Globe },
  { name: 'Contributors', value: '1.2K', unit: 'users', icon: Waves },
];

const features = [
  {
    title: 'Monitor & Report',
    description: 'Track carbon sequestration with precision using satellite data and field verification.',
    icon: BarChart3,
    href: '/dashboard'
  },
  {
    title: 'Blockchain Verification',
    description: 'Transparent, tamper-proof verification of all environmental data and contributions.',
    icon: Shield,
    href: '/blueproof'
  },
  {
    title: 'Learn & Grow',
    description: 'Interactive education about blue carbon ecosystems and conservation practices.',  
    icon: BookOpen,
    href: '/learn'
  },
  {
    title: 'Community Impact',
    description: 'Join a global community of conservationists making a measurable difference.',
    icon: Users,
    href: '/community'
  }
];

// Import the icons we need
import { BarChart3, Shield, BookOpen, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Monitoring Blue Carbon
              <span className="block bg-gradient-ocean bg-clip-text text-transparent">
                for Our Planet
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Track, verify, and celebrate marine ecosystem restoration with transparent, 
              blockchain-verified carbon monitoring and reporting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-eco">
                <Link to="/dashboard">
                  View Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/learn">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.name} className="shadow-card hover:shadow-eco transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.unit}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.name}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-eco-blue/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Carbon Monitoring
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with community engagement 
              to create transparent, verifiable environmental impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="shadow-card hover:shadow-float transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-gradient-eco rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-secondary-dark" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm mb-4">
                    {feature.description}
                  </p>
                  <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary-dark">
                    <Link to={feature.href}>
                      Explore
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}