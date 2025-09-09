import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Shield, 
  BookOpen, 
  Users, 
  User,
  Waves,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'MRV Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'BlueProof', href: '/blueproof', icon: Shield },
  { name: 'Learn', href: '/learn', icon: BookOpen },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Profile', href: '/profile', icon: User },
];

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b shadow-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Blue Carbon MRV</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-eco'
                        : 'text-muted-foreground hover:text-foreground hover:bg-eco-blue/50'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-card/95 backdrop-blur-sm">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-eco-blue/50'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </div>
  );
}