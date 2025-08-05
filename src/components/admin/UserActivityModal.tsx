
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, MapPin, User } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  branch: string;
  zone: string;
  region: string;
  status: string;
  lastLogin: string;
  createdAt: string;
}

interface UserActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const mockActivityLogs = [
  { id: 1, action: 'Login', timestamp: '2024-01-15 09:30:00', details: 'Successful login from Mumbai office' },
  { id: 2, action: 'Lead Created', timestamp: '2024-01-15 10:15:00', details: 'Created lead for Raj Patel - Home Loan' },
  { id: 3, action: 'Customer Visit', timestamp: '2024-01-15 11:30:00', details: 'Visited customer at Andheri East' },
  { id: 4, action: 'Report Generated', timestamp: '2024-01-15 14:45:00', details: 'Daily activity report submitted' },
  { id: 5, action: 'Logout', timestamp: '2024-01-15 18:00:00', details: 'Logout from mobile app' }
];

const UserActivityModal: React.FC<UserActivityModalProps> = ({ isOpen, onClose, user }) => {
  const getRoleDisplay = (role: string) => {
    const roleMap = {
      'sales_executive': 'Field Sales Officer',
      'relationship_manager': 'Relationship Manager',
      'supervisor': 'Branch Manager',
      'inbound_agent': 'Contact Center Agent',
      'admin': 'System Administrator'
    };
    return roleMap[role as keyof typeof roleMap] || role;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>User Activity - {user.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-medium">{user.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Role</div>
                  <div className="font-medium">{getRoleDisplay(user.role)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Last Login</div>
                  <div className="font-medium">{user.lastLogin}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{user.branch}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Zone: </span>
                  <span className="font-medium">{user.zone}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Region: </span>
                  <span className="font-medium">{user.region}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivityLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <Clock className="h-4 w-4 text-gray-400 mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{log.action}</div>
                        <div className="text-sm text-gray-500">{log.timestamp}</div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{log.details}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary (This Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-teal-600">24</div>
                  <div className="text-sm text-gray-600">Leads Created</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <div className="text-sm text-gray-600">Customer Visits</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Conversions</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <div className="text-sm text-gray-600">Target Achievement</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserActivityModal;
