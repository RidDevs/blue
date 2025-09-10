import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MapPin, 
  Calendar, 
  Award,
  TrendingUp,
  FileText,
  Camera,
  Settings,
  Edit3
} from 'lucide-react';

const userProfile = {
  name: 'Dr. Marina Santos',
  email: 'marina.santos@bluecarbon.org',
  location: 'Marine Research Institute, Costa Rica',
  joinDate: 'January 2024',
  ecoRank: 'Ocean Guardian',
  points: 2847,
  avatar: '/api/placeholder/120/120'
};

const userStats = [
  { label: 'Reports Submitted', value: '47', icon: FileText },
  { label: 'CO₂ Verified', value: '1,284 tons', icon: TrendingUp },
  { label: 'Sites Monitored', value: '12', icon: MapPin },
  { label: 'Photos Uploaded', value: '156', icon: Camera }
];

const recentActivity = [
  {
    id: 1,
    type: 'report',
    title: 'Mangrove Site Assessment',
    description: 'Submitted field report for Mangrove Bay restoration area',
    date: '2 days ago',
    status: 'Verified'
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Milestone Reached',
    description: 'Earned "Data Pioneer" badge for discovering new monitoring site',
    date: '1 week ago',
    status: 'Completed'
  },
  {
    id: 3,
    type: 'contribution',
    title: 'Carbon Measurement',
    description: 'Contributed to verification of 145 tons CO₂ sequestration',
    date: '1 week ago',
    status: 'Verified'
  },
  {
    id: 4,
    type: 'community',
    title: 'Community Help',
    description: 'Assisted 3 new users with their first data submissions',
    date: '2 weeks ago',
    status: 'Completed'
  }
];

const earnedBadges = [
  { name: 'Ocean Guardian', rarity: 'Legendary', earned: '2024-01-15' },
  { name: 'Data Pioneer', rarity: 'Rare', earned: '2024-01-20' },
  { name: 'Consistency Champion', rarity: 'Epic', earned: '2024-01-25' },
  { name: 'Community Builder', rarity: 'Epic', earned: '2024-02-01' },
  { name: 'Research Expert', rarity: 'Rare', earned: '2024-02-10' },
  { name: 'Field Specialist', rarity: 'Common', earned: '2024-02-15' }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'report': return FileText;
    case 'achievement': return Award;
    case 'contribution': return TrendingUp;
    case 'community': return User;
    default: return FileText;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Verified': return 'bg-success/10 text-success';
    case 'Completed': return 'bg-primary/10 text-primary';
    case 'Pending': return 'bg-warning/10 text-warning';
    default: return 'bg-muted/10 text-muted-foreground';
  }
};

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'Common': return 'bg-muted/10 text-muted-foreground';
    case 'Rare': return 'bg-primary/10 text-primary';
    case 'Epic': return 'bg-secondary/10 text-secondary';
    case 'Legendary': return 'bg-warning/10 text-warning';
    default: return 'bg-muted/10 text-muted-foreground';
  }
};

export default function Profile() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Profile</h1>
                <p className="text-muted-foreground">
                  Manage your account and track your environmental impact
                </p>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="shadow-card mb-6">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{userProfile.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{userProfile.email}</p>
                  <Badge className="bg-gradient-ocean text-white">
                    {userProfile.ecoRank}
                  </Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{userProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined {userProfile.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{userProfile.points} total points</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4 shadow-eco">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Impact Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <stat.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                      </div>
                      <span className="font-medium text-foreground">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-eco-blue/20 rounded-lg hover:bg-eco-blue/30 transition-colors">
                        <div className="w-8 h-8 bg-gradient-eco rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-4 h-4 text-secondary-dark" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{activity.date}</span>
                            <Badge className={getStatusColor(activity.status)}>
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Earned Badges */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Earned Badges ({earnedBadges.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {earnedBadges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-success/5 border border-success/20 rounded-lg">
                      <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-success" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground">{badge.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={getRarityColor(badge.rarity)}>
                            {badge.rarity}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{badge.earned}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}