import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Award, 
  Star, 
  TrendingUp,
  Trophy,
  Target,
  Gift,
  ChevronRight
} from 'lucide-react';

const ecoRanks = [
  { 
    level: 'Ocean Guardian', 
    minPoints: 2000, 
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    description: 'Elite environmental protector',
    users: 15
  },
  { 
    level: 'Marine Expert', 
    minPoints: 1500, 
    color: 'bg-gradient-to-r from-blue-400 to-blue-600',
    description: 'Advanced conservation specialist',
    users: 42
  },
  { 
    level: 'Reef Protector', 
    minPoints: 1000, 
    color: 'bg-gradient-to-r from-green-400 to-green-600',
    description: 'Experienced conservationist',
    users: 128
  },
  { 
    level: 'Wave Watcher', 
    minPoints: 500, 
    color: 'bg-gradient-to-r from-teal-400 to-teal-600',
    description: 'Active contributor',
    users: 387
  },
  { 
    level: 'Tide Explorer', 
    minPoints: 100, 
    color: 'bg-gradient-to-r from-cyan-300 to-cyan-400',
    description: 'Getting started',
    users: 712
  }
];

const badges = [
  { 
    name: 'Data Pioneer', 
    description: 'First to report from a new site',
    rarity: 'Rare',
    earned: true,
    icon: Target
  },
  { 
    name: 'Consistency Champion', 
    description: '30 days of consecutive reporting',
    rarity: 'Epic',
    earned: true,
    icon: Star
  },
  { 
    name: 'Community Builder', 
    description: 'Helped 10 new users get started',
    rarity: 'Legendary',
    earned: false,
    icon: Users
  },
  { 
    name: 'Impact Maximizer', 
    description: 'Contributed to 1000+ tons CO₂ captured',
    rarity: 'Ultra Rare',
    earned: false,
    icon: TrendingUp
  }
];

const rewards = [
  {
    name: 'Eco Workshop Access',
    cost: 500,
    description: 'Exclusive access to monthly conservation workshops',
    available: true,
    type: 'Education'
  },
  {
    name: 'Field Research Kit',
    cost: 1000,
    description: 'Professional tools for environmental data collection',
    available: true,
    type: 'Equipment'
  },
  {
    name: 'Conservation Certificate',
    cost: 1500,
    description: 'Official certification of environmental contribution',
    available: false,
    type: 'Recognition'
  },
  {
    name: 'Expedition Invitation',
    cost: 2000,
    description: 'Join researchers on marine conservation expedition',
    available: true,
    type: 'Experience'
  }
];

const currentUser = {
  rank: 'Marine Expert',
  points: 1847,
  nextRank: 'Ocean Guardian',
  pointsToNext: 153,
  badges: 12,
  contributions: 47
};

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'Common': return 'bg-muted/10 text-muted-foreground';
    case 'Rare': return 'bg-primary/10 text-primary';
    case 'Epic': return 'bg-secondary/10 text-secondary';
    case 'Legendary': return 'bg-warning/10 text-warning';
    case 'Ultra Rare': return 'bg-destructive/10 text-destructive';
    default: return 'bg-muted/10 text-muted-foreground';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Education': return 'bg-info/10 text-info';
    case 'Equipment': return 'bg-secondary/10 text-secondary';
    case 'Recognition': return 'bg-warning/10 text-warning';
    case 'Experience': return 'bg-success/10 text-success';
    default: return 'bg-muted/10 text-muted-foreground';
  }
};

export default function Community() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-ocean rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Community Hub</h1>
              <p className="text-muted-foreground">
                Connect, compete, and celebrate environmental impact together
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Profile & Progress */}
          <div className="lg:col-span-1">
            <Card className="shadow-card mb-6">
              <CardHeader>
                <CardTitle>Your EcoRank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{currentUser.rank}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{currentUser.points} points</p>
                  
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-ocean h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentUser.points % 500) / 500) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {currentUser.pointsToNext} points to {currentUser.nextRank}
                  </p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Badges Earned:</span>
                    <span className="font-medium">{currentUser.badges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contributions:</span>
                    <span className="font-medium">{currentUser.contributions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* EcoRank Levels */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>EcoRank System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ecoRanks.map((rank, index) => (
                    <div key={rank.level} className="flex items-center gap-3 p-2 rounded-lg hover:bg-eco-blue/20 transition-colors">
                      <div className={`w-8 h-8 rounded-full ${rank.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm">{rank.level}</h4>
                        <p className="text-xs text-muted-foreground">{rank.description}</p>
                        <p className="text-xs text-muted-foreground">{rank.minPoints}+ points • {rank.users} users</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Badges */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Achievement Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {badges.map((badge) => (
                    <div key={badge.name} className={`border rounded-lg p-4 transition-all duration-200 ${
                      badge.earned 
                        ? 'bg-success/5 border-success/20 hover:bg-success/10' 
                        : 'bg-muted/20 border-muted hover:bg-muted/30'
                    }`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          badge.earned ? 'bg-success/20' : 'bg-muted/40'
                        }`}>
                          <badge.icon className={`w-5 h-5 ${
                            badge.earned ? 'text-success' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div>
                          <h4 className={`font-medium ${
                            badge.earned ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {badge.name}
                          </h4>
                          <Badge className={getRarityColor(badge.rarity)}>
                            {badge.rarity}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {badge.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rewards Store */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Rewards Store
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rewards.map((reward) => (
                    <div key={reward.name} className="border rounded-lg p-4 hover:bg-eco-blue/20 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{reward.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{reward.description}</p>
                          <Badge className={getTypeColor(reward.type)}>
                            {reward.type}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground mb-1">
                            {reward.cost}
                          </div>
                          <div className="text-xs text-muted-foreground mb-2">points</div>
                          <Button 
                            size="sm" 
                            disabled={!reward.available || currentUser.points < reward.cost}
                            className="shadow-eco disabled:shadow-none"
                          >
                            {currentUser.points >= reward.cost ? 'Redeem' : 'Not enough points'}
                          </Button>
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