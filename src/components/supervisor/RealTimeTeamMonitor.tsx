
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Phone, 
  MapPin, 
  Clock, 
  Target, 
  TrendingUp,
  Users,
  CheckCircle 
} from 'lucide-react';

interface TeamMemberActivity {
  id: string;
  name: string;
  status: 'active' | 'on_call' | 'in_meeting' | 'available' | 'offline';
  currentActivity: string;
  location: string;
  lastSeen: string;
  dailyStats: {
    calls: number;
    meetings: number;
    leads: number;
    tasks: number;
  };
  performance: {
    target: number;
    achieved: number;
    percentage: number;
  };
}

const RealTimeTeamMonitor = () => {
  const [teamData, setTeamData] = useState<TeamMemberActivity[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      status: 'on_call',
      currentActivity: 'Client call with Tech Solutions Ltd',
      location: 'Field - Andheri',
      lastSeen: 'Active now',
      dailyStats: { calls: 8, meetings: 3, leads: 5, tasks: 12 },
      performance: { target: 50000, achieved: 38000, percentage: 76 }
    },
    {
      id: '2',
      name: 'Anjali Patel',
      status: 'active',
      currentActivity: 'Preparing loan documentation',
      location: 'Branch Office',
      lastSeen: 'Active now',
      dailyStats: { calls: 6, meetings: 2, leads: 3, tasks: 8 },
      performance: { target: 45000, achieved: 41000, percentage: 91 }
    },
    {
      id: '3',
      name: 'Vikash Kumar',
      status: 'in_meeting',
      currentActivity: 'Team standup meeting',
      location: 'Branch Office',
      lastSeen: 'Active now',
      dailyStats: { calls: 4, meetings: 4, leads: 2, tasks: 6 },
      performance: { target: 40000, achieved: 28000, percentage: 70 }
    },
    {
      id: '4',
      name: 'Priya Singh',
      status: 'available',
      currentActivity: 'Available for tasks',
      location: 'Field - Bandra',
      lastSeen: '2 min ago',
      dailyStats: { calls: 5, meetings: 1, leads: 4, tasks: 9 },
      performance: { target: 42000, achieved: 35000, percentage: 83 }
    }
  ]);

  const [refreshTime, setRefreshTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
      // Simulate real-time updates
      setTeamData(prev => prev.map(member => ({
        ...member,
        lastSeen: member.status === 'active' || member.status === 'on_call' || member.status === 'in_meeting' 
          ? 'Active now' 
          : `${Math.floor(Math.random() * 10) + 1} min ago`
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on_call': return 'bg-blue-100 text-blue-800';
      case 'in_meeting': return 'bg-purple-100 text-purple-800';
      case 'available': return 'bg-gray-100 text-gray-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_call': return <Phone size={12} />;
      case 'in_meeting': return <Users size={12} />;
      case 'active': return <Activity size={12} />;
      default: return <Clock size={12} />;
    }
  };

  const totalStats = teamData.reduce((acc, member) => ({
    calls: acc.calls + member.dailyStats.calls,
    meetings: acc.meetings + member.dailyStats.meetings,
    leads: acc.leads + member.dailyStats.leads,
    tasks: acc.tasks + member.dailyStats.tasks,
    totalTarget: acc.totalTarget + member.performance.target,
    totalAchieved: acc.totalAchieved + member.performance.achieved
  }), { calls: 0, meetings: 0, leads: 0, tasks: 0, totalTarget: 0, totalAchieved: 0 });

  const overallPerformance = Math.round((totalStats.totalAchieved / totalStats.totalTarget) * 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Real-Time Team Monitor</h2>
        <div className="text-sm text-gray-500">
          Last updated: {refreshTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Team Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Calls</p>
                <p className="text-2xl font-bold">{totalStats.calls}</p>
              </div>
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Meetings</p>
                <p className="text-2xl font-bold">{totalStats.meetings}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Leads</p>
                <p className="text-2xl font-bold">{totalStats.leads}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasks Done</p>
                <p className="text-2xl font-bold">{totalStats.tasks}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Team Performance</p>
                <p className="text-2xl font-bold">{overallPerformance}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Real-time Status */}
      <Card>
        <CardHeader>
          <CardTitle>Team Activity Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamData.map((member) => (
              <div key={member.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-teal-100 text-teal-700">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{member.name}</h4>
                        <Badge className={getStatusColor(member.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(member.status)}
                            <span>{member.status.replace('_', ' ')}</span>
                          </div>
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{member.currentActivity}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {member.location}
                        </span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {member.lastSeen}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right min-w-0">
                    <div className="text-sm font-medium mb-2">
                      Daily Performance: {member.performance.percentage}%
                    </div>
                    <Progress value={member.performance.percentage} className="w-24 h-2 mb-2" />
                    <div className="text-xs text-gray-500">
                      ₹{(member.performance.achieved / 1000).toFixed(0)}k / ₹{(member.performance.target / 1000).toFixed(0)}k
                    </div>
                  </div>
                </div>

                {/* Daily Stats */}
                <div className="grid grid-cols-4 gap-4 mt-4 pt-3 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{member.dailyStats.calls}</div>
                    <div className="text-xs text-gray-600">Calls</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{member.dailyStats.meetings}</div>
                    <div className="text-xs text-gray-600">Meetings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{member.dailyStats.leads}</div>
                    <div className="text-xs text-gray-600">Leads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{member.dailyStats.tasks}</div>
                    <div className="text-xs text-gray-600">Tasks</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeTeamMonitor;
