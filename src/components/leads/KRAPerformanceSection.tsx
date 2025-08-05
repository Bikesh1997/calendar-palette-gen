import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Target, AlertTriangle, Lightbulb } from 'lucide-react';

const KRAPerformanceSection = () => {
  // Sample data for different time periods
  const dailyData = [
    { period: 'Mon', target: 5, achieved: 4, calls: 15, conversions: 2 },
    { period: 'Tue', target: 5, achieved: 6, calls: 18, conversions: 3 },
    { period: 'Wed', target: 5, achieved: 3, calls: 12, conversions: 1 },
    { period: 'Thu', target: 5, achieved: 7, calls: 20, conversions: 4 },
    { period: 'Fri', target: 5, achieved: 5, calls: 16, conversions: 2 },
    { period: 'Sat', target: 3, achieved: 2, calls: 8, conversions: 1 },
    { period: 'Sun', target: 2, achieved: 3, calls: 10, conversions: 2 }
  ];

  const weeklyData = [
    { period: 'Week 1', target: 30, achieved: 28, calls: 95, conversions: 12 },
    { period: 'Week 2', target: 30, achieved: 32, calls: 105, conversions: 15 },
    { period: 'Week 3', target: 30, achieved: 25, calls: 85, conversions: 10 },
    { period: 'Week 4', target: 30, achieved: 35, calls: 115, conversions: 18 }
  ];

  const monthlyData = [
    { period: 'Jan', target: 120, achieved: 115, calls: 380, conversions: 50 },
    { period: 'Feb', target: 120, achieved: 128, calls: 420, conversions: 58 },
    { period: 'Mar', target: 120, achieved: 105, calls: 350, conversions: 42 },
    { period: 'Apr', target: 120, achieved: 132, calls: 440, conversions: 62 },
    { period: 'May', target: 120, achieved: 98, calls: 320, conversions: 38 },
    { period: 'Jun', target: 120, achieved: 118, calls: 390, conversions: 52 }
  ];

  // Performance analysis
  const currentPerformance = {
    overall: 87, // percentage
    calls: 92,
    conversions: 78,
    followUps: 65,
    customerVisits: 89
  };

  const underperformanceAreas = [
    {
      area: 'Lead Follow-ups',
      current: 65,
      target: 85,
      suggestion: 'Set daily reminders for pending follow-ups and prioritize leads older than 3 days'
    },
    {
      area: 'Conversion Rate',
      current: 78,
      target: 90,
      suggestion: 'Focus on qualifying leads better and improve product knowledge for objection handling'
    }
  ];

  // Earnings simulation
  const earningsData = {
    currentMonthly: 45000,
    targetMonthly: 60000,
    projectedMonthly: 52000,
    incentiveRate: 0.02,
    bonusThreshold: 90
  };

  const getPerformanceColor = (value: number, target: number = 85) => {
    const percentage = (value / target) * 100;
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">KRA & Performance</h2>
          <p className="text-sm text-gray-600">Track your performance against targets</p>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Performance</p>
                <p className="text-2xl font-bold">{currentPerformance.overall}%</p>
              </div>
              <div className={`p-2 rounded-full ${getPerformanceColor(currentPerformance.overall)}`}>
                <Target className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Call Performance</p>
                <p className="text-2xl font-bold">{currentPerformance.calls}%</p>
              </div>
              <div className={`p-2 rounded-full ${getPerformanceColor(currentPerformance.calls)}`}>
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversions</p>
                <p className="text-2xl font-bold">{currentPerformance.conversions}%</p>
              </div>
              <div className={`p-2 rounded-full ${getPerformanceColor(currentPerformance.conversions)}`}>
                <Target className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Follow-ups</p>
                <p className="text-2xl font-bold">{currentPerformance.followUps}%</p>
              </div>
              <div className={`p-2 rounded-full ${getPerformanceColor(currentPerformance.followUps)}`}>
                <TrendingDown className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2} name="Target" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="achieved" stroke="#0d9488" strokeWidth={2} name="Achieved" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="target" fill="#e2e8f0" name="Target" />
                  <Bar dataKey="achieved" fill="#0d9488" name="Achieved" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2} name="Target" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="achieved" stroke="#0d9488" strokeWidth={2} name="Achieved" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Underperformance Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Areas for Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {underperformanceAreas.map((area, index) => (
              <div key={index} className="border rounded-lg p-4 bg-orange-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{area.area}</h4>
                  <Badge variant="destructive">
                    {area.current}% / {area.target}%
                  </Badge>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{area.suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KRAPerformanceSection;
