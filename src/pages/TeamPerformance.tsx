import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Users,
  IndianRupee,
  Calendar,
  MapPin,
  UserCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingDown,
  Zap
} from 'lucide-react';

const TeamPerformance = () => {
  const teamPerformanceData = [
    { name: 'Pune', target: 15, achieved: 12, conversion: 32, calls: 95 },
    { name: 'Mumbai', target: 12, achieved: 11, conversion: 28, calls: 78 },
    { name: 'Delhi', target: 14, achieved: 8, conversion: 18, calls: 65 },
    { name: 'Bangalore', target: 18, achieved: 17, conversion: 35, calls: 102 }
  ];

  const monthlyTrends = [
    { month: 'Jan', teamTarget: 59, teamAchieved: 52, avgConversion: 28 },
    { month: 'Feb', teamTarget: 61, teamAchieved: 58, avgConversion: 31 },
    { month: 'Mar', teamTarget: 63, teamAchieved: 59, avgConversion: 29 },
    { month: 'Apr', teamTarget: 65, teamAchieved: 62, avgConversion: 33 },
    { month: 'May', teamTarget: 67, teamAchieved: 48, avgConversion: 28 },
    { month: 'Jun', teamTarget: 69, teamAchieved: 48, avgConversion: 29 }
  ];

  const productPerformance = [
    { product: 'Personal Loans', value: 18.5, color: '#14b8a6' },
    { product: 'Home Loans', value: 12.3, color: '#3b82f6' },
    { product: 'Business Loans', value: 8.7, color: '#f59e0b' },
    { product: 'Credit Cards', value: 5.2, color: '#ef4444' },
    { product: 'Others', value: 3.3, color: '#8b5cf6' }
  ];

  const teamMembers = [
    {
      id: '1',
      name: 'Pune Branch',
      position: 'Regional Branch',
      target: 15,
      achieved: 12,
      conversion: 32,
      rank: 2,
      improvement: '+5%'
    },
    {
      id: '2',
      name: 'Mumbai Branch',
      position: 'Metropolitan Branch',
      target: 12,
      achieved: 11,
      conversion: 28,
      rank: 3,
      improvement: '+8%'
    },
    {
      id: '3',
      name: 'Delhi Branch',
      position: 'Capital Branch',
      target: 14,
      achieved: 8,
      conversion: 18,
      rank: 4,
      improvement: '-3%'
    },
    {
      id: '4',
      name: 'Bangalore Branch',
      position: 'Tech Hub Branch',
      target: 18,
      achieved: 17,
      conversion: 35,
      rank: 1,
      improvement: '+12%'
    }
  ];

  // Direct Reports Summary Data
  const directReports = [
    {
      id: '1',
      name: 'Rahul Sharma',
      role: 'FSO',
      customersVisitedToday: 8,
      leadsConverted: 3,
      pendingTasks: 2,
      status: 'active',
      performance: 92,
      lastLogin: '9:15 AM',
      kraProgress: 75
    },
    {
      id: '2',
      name: 'Priya Patel',
      role: 'RO',
      customersVisitedToday: 12,
      leadsConverted: 5,
      pendingTasks: 1,
      status: 'active',
      performance: 88,
      lastLogin: '8:45 AM',
      kraProgress: 82
    },
    {
      id: '3',
      name: 'Anita Singh',
      role: 'FSO',
      customersVisitedToday: 0,
      leadsConverted: 0,
      pendingTasks: 7,
      status: 'inactive',
      performance: 45,
      lastLogin: 'Yesterday',
      kraProgress: 40
    },
    {
      id: '4',
      name: 'Ravi Kumar',
      role: 'RO',
      customersVisitedToday: 6,
      leadsConverted: 2,
      pendingTasks: 8,
      status: 'active',
      performance: 65,
      lastLogin: '10:30 AM',
      kraProgress: 55
    }
  ];

  // Smart Nudges for Managers
  const smartNudges = [
    {
      id: '1',
      type: 'urgent',
      message: 'Ravi has 7-day-old leads pending – consider realignment',
      action: 'Review Leads',
      member: 'Ravi Kumar'
    },
    {
      id: '2',
      type: 'warning',
      message: 'Anita missed login today – check attendance',
      action: 'Check Attendance',
      member: 'Anita Singh'
    },
    {
      id: '3',
      type: 'info',
      message: 'Priya is exceeding targets – consider bonus recognition',
      action: 'Send Recognition',
      member: 'Priya Patel'
    },
    {
      id: '4',
      type: 'urgent',
      message: 'Rahul has pending customer follow-ups from 3 days ago',
      action: 'Schedule Follow-up',
      member: 'Rahul Sharma'
    }
  ];

  // Team KRA Overview
  const teamKraOverview = [
    { member: 'Rahul Sharma', target: 100, achieved: 75, projected: 85, gap: 15 },
    { member: 'Priya Patel', target: 100, achieved: 82, projected: 95, gap: 5 },
    { member: 'Anita Singh', target: 100, achieved: 40, projected: 50, gap: 50 },
    { member: 'Ravi Kumar', target: 100, achieved: 55, projected: 70, gap: 30 }
  ];

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return 'text-green-600 bg-green-100';
    if (performance >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getNudgeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getNudgeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'warning': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'info': return <Zap className="h-4 w-4 text-blue-600" />;
      default: return <Zap className="h-4 w-4 text-gray-600" />;
    }
  };

  const teamKpis = [
    {
      title: 'Team Target',
      value: '₹59L',
      subtitle: 'Monthly collective target',
      trend: { value: '8% above last month', isPositive: true },
      icon: <Target size={20} />
    },
    {
      title: 'Team Achievement',
      value: '₹48L',
      subtitle: 'Current month revenue',
      trend: { value: '81% of target', isPositive: true },
      icon: <TrendingUp size={20} />
    },
    {
      title: 'Average Conversion',
      value: '28.25%',
      subtitle: 'Team conversion rate',
      trend: { value: '3% improvement', isPositive: true },
      icon: <Award size={20} />
    },
    {
      title: 'Top Performer',
      value: 'Bangalore Branch',
      subtitle: '94% target achievement',
      trend: { value: 'Leading this month', isPositive: true },
      icon: <Users size={20} />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
          <p className="text-gray-600">Team performance metrics and analytics</p>
        </div>
      </div>

      {/* Team KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamKpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-teal-100 rounded-lg">
                  {kpi.icon}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  kpi.trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {kpi.trend.value}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-sm text-gray-500">{kpi.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5  gap-1 h-auto">
          <TabsTrigger value="summary" className="text-xs sm:text-sm px-2 py-2" >Team Summary</TabsTrigger>
          <TabsTrigger value="heatmap" className="text-xs sm:text-sm px-2 py-2" >Performance Heatmap</TabsTrigger>
          <TabsTrigger value="kra-overview" className="text-xs sm:text-sm px-2 py-2" >KRA Overview</TabsTrigger>
          <TabsTrigger value="nudges" className="text-xs sm:text-sm px-2 py-2" >Smart Nudges</TabsTrigger>
          <TabsTrigger value="trends" className="text-xs sm:text-sm px-2 py-2" >Monthly Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Direct Reports Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {directReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-teal-100 text-teal-700">
                            {report.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{report.name}</h4>
                          <p className="text-sm text-gray-500">{report.role}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <MapPin className="h-3 w-3 text-blue-600" />
                          <span className="text-blue-600 font-medium">Visits</span>
                        </div>
                        <div className="text-lg font-bold text-blue-700">{report.customersVisitedToday}</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-green-600 font-medium">Converted</span>
                        </div>
                        <div className="text-lg font-bold text-green-700">{report.leadsConverted}</div>
                      </div>
                      <div className="text-center p-2 bg-orange-50 rounded">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="h-3 w-3 text-orange-600" />
                          <span className="text-orange-600 font-medium">Pending</span>
                        </div>
                        <div className="text-lg font-bold text-orange-700">{report.pendingTasks}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-500">
                      Last login: {report.lastLogin}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Heatmap / Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
  <div className="space-y-4">
    {directReports
      .sort((a, b) => b.performance - a.performance)
      .map((member, index) => (
        <div
          key={member.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition"
        >
          {/* Left Section: Rank + Avatar + Name */}
          <div className="flex items-center space-x-4 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                index === 0
                  ? 'bg-yellow-100 text-yellow-800'
                  : index === 1
                  ? 'bg-gray-100 text-gray-800'
                  : index === 2
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              #{index + 1}
            </div>

            <Avatar className="h-12 w-12 shrink-0">
              <AvatarFallback className="bg-teal-100 text-teal-700">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div>
              <h4 className="font-medium">{member.name}</h4>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center w-full sm:w-auto">
            <div>
              <p className="text-sm text-gray-600">Performance</p>
              <div className={`px-3 py-1 rounded-full font-bold ${getPerformanceColor(member.performance)}`}>
                {member.performance}%
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Visits Today</p>
              <p className="font-bold text-blue-600">{member.customersVisitedToday}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Conversions</p>
              <p className="font-bold text-green-600">{member.leadsConverted}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Follow-ups</p>
              <p className={`font-bold ${member.pendingTasks > 5 ? 'text-red-600' : 'text-gray-900'}`}>
                {member.pendingTasks}
              </p>
            </div>
          </div>
        </div>
      ))}
  </div>
</CardContent>
</Card>
        </TabsContent>

        <TabsContent value="kra-overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>KRA Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamKraOverview.map((member, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">{member.member}</h4>
                      <Badge variant={member.gap <= 10 ? 'default' : member.gap <= 30 ? 'secondary' : 'destructive'}>
                        Gap: {member.gap}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Target: </span>
                        <span className="font-medium">{member.target}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Achieved: </span>
                        <span className="font-medium text-blue-600">{member.achieved}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Projected: </span>
                        <span className="font-medium text-green-600">{member.projected}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Earnings: </span>
                        <span className="font-medium">₹{(member.achieved * 500).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{member.achieved}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-teal-600 h-2 rounded-full" 
                          style={{ width: `${member.achieved}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nudges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Smart Nudges for Managers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {smartNudges.map((nudge) => (
                  <div key={nudge.id} className={`p-4 border-l-4 rounded-lg ${getNudgeColor(nudge.type)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getNudgeIcon(nudge.type)}
                        <div>
                          <div className="font-medium">{nudge.message}</div>
                          <div className="text-sm text-gray-600">Related to: {nudge.member}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        {nudge.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="teamTarget" stroke="#8884d8" strokeWidth={2} name="Team Target" />
                  <Line type="monotone" dataKey="teamAchieved" stroke="#14b8a6" strokeWidth={2} name="Team Achieved" />
                  <Line type="monotone" dataKey="avgConversion" stroke="#f59e0b" strokeWidth={2} name="Avg Conversion %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamPerformance;
