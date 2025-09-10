import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Upload, 
  CheckCircle, 
  Clock, 
  FileText,
  Calendar,
  User,
  ExternalLink
} from 'lucide-react';

const verificationUploads = [
  {
    id: 1,
    title: 'Mangrove Restoration Site A',
    type: 'Field Report',
    status: 'Verified',
    uploadDate: '2024-01-15',
    verificationDate: '2024-01-16',
    contributor: 'Dr. Marina Santos',
    blockchainHash: '0x742d35...8f9a1b',
    co2Impact: '145 tons',
    size: '2.3 MB'
  },
  {
    id: 2,
    title: 'Seagrass Carbon Measurement',
    type: 'Scientific Data',
    status: 'Pending',
    uploadDate: '2024-01-14',
    verificationDate: null,
    contributor: 'James Chen',
    blockchainHash: null,
    co2Impact: '98 tons',
    size: '1.8 MB'
  },
  {
    id: 3,
    title: 'Coral Reef Monitoring',
    type: 'Photo Evidence',
    status: 'Verified',
    uploadDate: '2024-01-13',
    verificationDate: '2024-01-14',
    contributor: 'Sarah Williams',
    blockchainHash: '0x923c45...7d2e8c',
    co2Impact: '203 tons',
    size: '4.1 MB'
  },
  {
    id: 4,
    title: 'Blue Carbon Assessment',
    type: 'Research Paper',
    status: 'Under Review',
    uploadDate: '2024-01-12',
    verificationDate: null,
    contributor: 'Miguel Rodriguez',
    blockchainHash: null,
    co2Impact: '156 tons',
    size: '3.7 MB'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Verified':
      return 'bg-success/10 text-success';
    case 'Pending':
      return 'bg-warning/10 text-warning';
    case 'Under Review':
      return 'bg-info/10 text-info';
    default:
      return 'bg-muted/10 text-muted-foreground';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Verified':
      return <CheckCircle className="w-4 h-4" />;
    case 'Pending':
    case 'Under Review':
      return <Clock className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

export default function BlueProof() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-ocean rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">BlueProof Transparency</h1>
              <p className="text-muted-foreground">
                Blockchain-verified environmental data with full transparency
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">847</div>
              <div className="text-sm text-muted-foreground">Verified Reports</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">24</div>
              <div className="text-sm text-muted-foreground">Under Review</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Blockchain Secured</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">2.4M</div>
              <div className="text-sm text-muted-foreground">CO₂ Verified (tons)</div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Submit New Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-eco-blue/20 hover:bg-eco-blue/30 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Upload Environmental Data
              </h3>
              <p className="text-muted-foreground mb-4">
                Submit field reports, research data, or photographic evidence for blockchain verification
              </p>
              <Button className="shadow-eco">
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Verification History */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Verification History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {verificationUploads.map((upload) => (
                <div key={upload.id} className="border rounded-lg p-4 hover:bg-eco-blue/20 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{upload.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {upload.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {upload.contributor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {upload.uploadDate}
                        </span>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(upload.status)} flex items-center gap-1`}>
                      {getStatusIcon(upload.status)}
                      {upload.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">CO₂ Impact:</span>
                      <div className="font-medium text-foreground">{upload.co2Impact}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">File Size:</span>
                      <div className="font-medium text-foreground">{upload.size}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Verified:</span>
                      <div className="font-medium text-foreground">
                        {upload.verificationDate || 'Pending'}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Blockchain:</span>
                      <div className="font-medium text-foreground">
                        {upload.blockchainHash ? (
                          <Button variant="ghost" size="sm" className="h-auto p-0 text-primary hover:text-primary-dark">
                            {upload.blockchainHash}
                            <ExternalLink className="ml-1 w-3 h-3" />
                          </Button>
                        ) : (
                          'Not yet recorded'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}