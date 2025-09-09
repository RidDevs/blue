import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Leaf, 
  FileCheck, 
  Users, 
  MapPin, 
  Camera,
  Award,
  ChevronRight
} from 'lucide-react';

const dashboardCards = [
  {
    title: 'CO₂ Captured',
    value: '2,847',
    unit: 'tons this month',
    change: '+12.5%',
    icon: TrendingUp,
    color: 'text-success'
  },
  {
    title: 'Mangroves Planted',
    value: '15,429',
    unit: 'trees protected',
    change: '+8.2%',
    icon: Leaf,
    color: 'text-secondary'
  },
  {
    title: 'Verified Reports',
    value: '847',
    unit: 'this quarter',
    change: '+15.3%',
    icon: FileCheck,
    color: 'text-primary'
  },
  {
    title: 'Contributors',
    value: '1,284',
    unit: 'active users',
    change: '+22.1%',
    icon: Users,
    color: 'text-info'
  }
];

const mapLocations = [
  { 
    id: 1, 
    name: 'Mangrove Bay', 
    status: 'Active', 
    co2: '145 tons',
    contributors: 12,
    image: '/api/placeholder/120/80'
  },
  { 
    id: 2, 
    name: 'Coral Reef Delta', 
    status: 'Monitoring', 
    co2: '98 tons',
    contributors: 8,
    image: '/api/placeholder/120/80'
  },
  { 
    id: 3, 
    name: 'Seagrass Meadow', 
    status: 'Verified', 
    co2: '203 tons',
    contributors: 15,
    image: '/api/placeholder/120/80'
  }
];

const leaderboard = [
  { rank: 1, name: 'Marina Santos', points: 2847, badge: 'Ocean Guardian', level: 'Expert' },
  { rank: 2, name: 'Dr. James Chen', points: 2341, badge: 'Data Scientist', level: 'Expert' },
  { rank: 3, name: 'Sarah Williams', points: 1923, badge: 'Field Researcher', level: 'Advanced' },
  { rank: 4, name: 'Miguel Rodriguez', points: 1756, badge: 'Community Leader', level: 'Advanced' },
  { rank: 5, name: 'Emma Thompson', points: 1432, badge: 'Conservationist', level: 'Intermediate' }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">MRV Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor, Report, and Verify blue carbon ecosystem impact in real-time
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card) => (
            <Card key={card.title} className="shadow-card hover:shadow-eco transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {card.value}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{card.unit}</span>
                  <Badge variant="secondary" className="text-success bg-success/10">
                    {card.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Map Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Active Monitoring Sites
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Map Placeholder with pins */}
                <div className="relative h-64 bg-gradient-eco rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-secondary-dark mx-auto mb-2" />
                    <p className="text-secondary-dark font-medium">Interactive Map</p>
                    <p className="text-secondary-dark/70 text-sm">Click pins to view site details</p>
                  </div>
                </div>

                {/* Location Cards */}
                <div className="space-y-3">
                  {mapLocations.map((location) => (
                    <div key={location.id} className="flex items-center justify-between p-3 bg-eco-blue/30 rounded-lg hover:bg-eco-blue/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-eco-mint rounded flex items-center justify-center">
                          <Camera className="w-4 h-4 text-secondary-dark" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{location.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {location.status}
                            </Badge>
                            <span>•</span>
                            <span>{location.co2} captured</span>
                            <span>•</span>
                            <span>{location.contributors} contributors</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Impact Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-3 bg-card hover:bg-eco-blue/30 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          user.rank === 1 ? 'bg-gradient-ocean text-white' :
                          user.rank === 2 ? 'bg-secondary text-secondary-foreground' :
                          user.rank === 3 ? 'bg-warning text-warning-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {user.rank}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm">{user.name}</h4>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs">
                              {user.badge}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-foreground">{user.points}</div>
                        <div className="text-xs text-muted-foreground">{user.level}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-primary">
                  View Full Rankings
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}