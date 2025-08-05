
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Phone, 
  Mail,
  Calendar,
  Download
} from 'lucide-react';

const ComprehensiveAnalytics = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Sample data for different charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, target: 50000, leads: 120, conversions: 18 },
    { month: 'Feb', revenue: 52000, target: 50000, leads: 135, conversions: 22 },
    { month: 'Mar', revenue: 48000, target: 55000, leads: 128, conversions: 19 },
    { month: 'Apr', revenue: 61000, target: 55000, leads: 142, conversions: 28 },
    { month: 'May', revenue: 58000, target: 60000, leads: 156, conversions: 25 },
    { month: 'Jun', revenue: 65000, target: 60000, leads: 168, conversions: 32 }
  ];

  const performanceData = [
    { name: 'Rahul Sharma', calls: 85, meetings: 24, leads: 42, revenue: 185000, target: 200000 },
    { name: 'Anjali Patel', calls: 78, meetings: 28, leads: 38, revenue: 165000, target: 180000 },
    { name: 'Vikash Kumar', calls: 62, meetings: 18, leads: 29, revenue: 125000, target: 150000 },
    { name: 'Priya Singh', calls: 71, meetings: 22, leads: 35, revenue: 145000, target: 160000 }
  ];

  const leadSourceData = [
    { name: 'Referrals', value: 35, color: '#0088FE' },
    { name: 'Cold Calls', value: 28, color: '#00C49F' },
    { name: 'Digital Marketing', value: 22, color: '#FFBB28' },
    { name: 'Walk-ins', value: 15, color: '#FF8042' }
  ];

  const activityData = [
    { day: 'Mon', calls: 12, emails: 8, meetings: 3, tasks: 15 },
    { day: 'Tue', calls: 15, emails: 12, meetings: 5, tasks: 18 },
    { day: 'Wed', calls: 18, emails: 10, meetings: 4, tasks: 22 },
    { day: 'Thu', calls: 14, emails: 9, meetings: 6, tasks: 16 },
    { day: 'Fri', calls: 16, emails: 11, meetings: 7, tasks: 20 },
    { day: 'Sat', calls: 8, emails: 5, meetings: 2, tasks: 10 },
    { day: 'Sun', calls: 4, emails: 3, meetings: 1, tasks: 6 }
  ];

  const conversionFunnelData = [
    { stage: 'Leads', count: 1200, percentage: 100 },
    { stage: 'Qualified', count: 840, percentage: 70 },
    { stage: 'Proposal', count: 420, percentage: 35 },
    { stage: 'Negotiation', count: 252, percentage: 21 },
    { stage: 'Closed Won', count: 156, percentage: 13 }
  ];

  const keyMetrics = {
    totalRevenue: 485000,
    targetRevenue: 520000,
    totalLeads: 856,
    conversionRate: 18.2,
    avgDealSize: 28500,
    activePipeline: 2100000
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const exportReport = () => {
    // In a real app, this would generate and download a report
    console.log('Exporting comprehensive analytics report...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Comprehensive Analytics</h2>
          <p className="text-gray-600">Advanced insights and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="90days">90 Days</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportReport} variant="outline">
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-lg font-bold">₹{(keyMetrics.totalRevenue / 100000).toFixed(1)}L</p>
                <p className="text-xs text-green-600">+12.5% vs target</p>
              </div>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-lg font-bold">{keyMetrics.totalLeads}</p>
                <p className="text-xs text-blue-600">+8.3% this month</p>
              </div>
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-lg font-bold">{keyMetrics.conversionRate}%</p>
                <p className="text-xs text-green-600">+2.1% improvement</p>
              </div>
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Deal Size</p>
                <p className="text-lg font-bold">₹{(keyMetrics.avgDealSize / 1000).toFixed(0)}k</p>
                <p className="text-xs text-yellow-600">-3.2% vs last month</p>
              </div>
              <TrendingDown className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Pipeline</p>
                <p className="text-lg font-bold">₹{(keyMetrics.activePipeline / 100000).toFixed(1)}L</p>
                <p className="text-xs text-blue-600">156 active deals</p>
              </div>
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Performance</p>
                <p className="text-lg font-bold">93.2%</p>
                <p className="text-xs text-green-600">vs target</p>
              </div>
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="revenue">Revenue & Targets</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="leads">Lead Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity Trends</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Target Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#0ea5e9" name="Actual Revenue" />
                  <Bar dataKey="target" fill="#64748b" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Individual Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((member) => {
                  const percentage = Math.round((member.revenue / member.target) * 100);
                  return (
                    <div key={member.name} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <div className="flex space-x-4 text-sm text-gray-600">
                            <span>Calls: {member.calls}</span>
                            <span>Meetings: {member.meetings}</span>
                            <span>Leads: {member.leads}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getPerformanceColor(percentage)}`}>
                            {percentage}%
                          </div>
                          <div className="text-sm text-gray-600">
                            ₹{(member.revenue / 100000).toFixed(1)}L / ₹{(member.target / 100000).toFixed(1)}L
                          </div>
                        </div>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Generation Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={2} name="New Leads" />
                    <Line type="monotone" dataKey="conversions" stroke="#f59e0b" strokeWidth={2} name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="calls" fill="#3b82f6" name="Calls" />
                  <Bar dataKey="emails" fill="#10b981" name="Emails" />
                  <Bar dataKey="meetings" fill="#f59e0b" name="Meetings" />
                  <Bar dataKey="tasks" fill="#8b5cf6" name="Tasks" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnelData.map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{stage.stage}</span>
                      <div className="text-right">
                        <span className="text-lg font-bold">{stage.count}</span>
                        <span className="text-sm text-gray-600 ml-2">({stage.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium"
                        style={{ width: `${stage.percentage}%` }}
                      >
                        {stage.percentage}%
                      </div>
                    </div>
                    {index < conversionFunnelData.length - 1 && (
                      <div className="text-center text-xs text-gray-500 mt-1">
                        Drop: {conversionFunnelData[index].count - conversionFunnelData[index + 1].count} leads
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveAnalytics;
