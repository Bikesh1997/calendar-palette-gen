
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  Calendar, 
  Target, 
  TrendingUp, 
  Award 
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  joinDate: string;
  performance: number;
  targets: { monthly: number; achieved: number };
  lastActive: string;
}

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
}

const ViewDetailsModal = ({ isOpen, onClose, member }: ViewDetailsModalProps) => {
  if (!member) return null;

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const recentActivities = [
    { date: '2024-01-15', activity: 'Converted lead to customer', value: '₹2.5L' },
    { date: '2024-01-14', activity: 'Made 15 calls', value: '3 callbacks' },
    { date: '2024-01-13', activity: 'Updated 8 lead records', value: '100% complete' },
    { date: '2024-01-12', activity: 'Attended team meeting', value: 'Strategy session' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Team Member Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-teal-100 text-teal-700 text-lg">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
                <span className="text-sm text-gray-500">{member.department}</span>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{member.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">+91 98765 43210</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Join Date</p>
                        <p className="font-medium">{member.joinDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Award size={16} className="text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Last Active</p>
                        <p className="font-medium">{member.lastActive}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Target size={20} className="mx-auto text-blue-600 mb-2" />
                    <p className="text-sm text-gray-600">Monthly Target</p>
                    <p className="text-lg font-bold">₹{member.targets.monthly}L</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp size={20} className="mx-auto text-green-600 mb-2" />
                    <p className="text-sm text-gray-600">Achieved</p>
                    <p className="text-lg font-bold">₹{member.targets.achieved}L</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Award size={20} className="mx-auto text-purple-600 mb-2" />
                    <p className="text-sm text-gray-600">Performance</p>
                    <p className="text-lg font-bold">{member.performance}%</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Achievement Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-teal-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${(member.targets.achieved / member.targets.monthly) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round((member.targets.achieved / member.targets.monthly) * 100)}% of monthly target
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-4">
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{activity.activity}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                    <Badge variant="secondary">{activity.value}</Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end">
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsModal;
