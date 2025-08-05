
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Users, 
  IndianRupee, 
  Target,
  Building,
  CreditCard,
  Shield,
  AlertTriangle
} from 'lucide-react';

const ExecutiveDashboard = () => {
  const kpis = [
    { 
      title: 'Total Assets Under Management', 
      value: '₹2,847 Cr', 
      subtitle: 'Current portfolio value', 
      trend: { value: '18% YoY growth', isPositive: true }, 
      icon: <IndianRupee size={20} /> 
    },
    { 
      title: 'Customer Base', 
      value: '125,847', 
      subtitle: 'Active customers', 
      trend: { value: '12% monthly growth', isPositive: true }, 
      icon: <Users size={20} /> 
    },
    { 
      title: 'Revenue (Monthly)', 
      value: '₹45.2 Cr', 
      subtitle: 'Current month revenue', 
      trend: { value: '8% above target', isPositive: true }, 
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: 'Branch Network', 
      value: '247', 
      subtitle: 'Active branches', 
      trend: { value: '5 new this quarter', isPositive: true }, 
      icon: <Building size={20} /> 
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 38.5, target: 40, loans: 22.1, deposits: 16.4 },
    { month: 'Feb', revenue: 42.1, target: 41, loans: 24.8, deposits: 17.3 },
    { month: 'Mar', revenue: 39.8, target: 42, loans: 23.2, deposits: 16.6 },
    { month: 'Apr', revenue: 46.3, target: 43, loans: 26.9, deposits: 19.4 },
    { month: 'May', revenue: 48.7, target: 44, loans: 28.3, deposits: 20.4 },
    { month: 'Jun', revenue: 45.2, target: 45, loans: 26.1, deposits: 19.1 },
  ];

  const productMixData = [
    { name: 'Personal Loans', value: 35, color: '#14b8a6' },
    { name: 'Home Loans', value: 28, color: '#3b82f6' },
    { name: 'Business Loans', value: 18, color: '#f59e0b' },
    { name: 'Credit Cards', value: 12, color: '#ef4444' },
    { name: 'Others', value: 7, color: '#8b5cf6' },
  ];

  const riskMetrics = [
    { category: 'Low Risk', value: 68, color: '#10b981' },
    { category: 'Medium Risk', value: 25, color: '#f59e0b' },
    { category: 'High Risk', value: 7, color: '#ef4444' },
  ];

  const branchPerformance = [
    { region: 'North', branches: 65, revenue: 12.5, growth: 15 },
    { region: 'South', branches: 72, revenue: 15.8, growth: 22 },
    { region: 'East', branches: 58, revenue: 9.2, growth: 8 },
    { region: 'West', branches: 52, revenue: 7.7, growth: 18 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-gray-600">Strategic overview and key performance indicators</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <DashboardCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            subtitle={kpi.subtitle}
            icon={kpi.icon}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* Revenue and Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends (₹ Crores)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="loans" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="deposits" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Mix Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productMixData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {productMixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk and Branch Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Risk Portfolio Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskMetrics.map((risk, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: risk.color }}
                    ></div>
                    <span className="text-sm font-medium">{risk.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{risk.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {branchPerformance.map((region, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{region.region} Region</div>
                    <div className="text-sm text-green-600">+{region.growth}%</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Branches: </span>
                      <span className="font-medium">{region.branches}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Revenue: </span>
                      <span className="font-medium">₹{region.revenue}Cr</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Executive Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="text-green-600">✓</div>
              <div>
                <div className="font-medium">Q2 Revenue Target Achieved</div>
                <div className="text-sm text-gray-600">108% of quarterly target completed</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="text-yellow-600">⚠</div>
              <div>
                <div className="font-medium">Risk Portfolio Review Required</div>
                <div className="text-sm text-gray-600">High-risk loans increased by 2% this month</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="text-blue-600">ℹ</div>
              <div>
                <div className="font-medium">New Branch Expansion Opportunity</div>
                <div className="text-sm text-gray-600">Market analysis shows potential in Tier-2 cities</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveDashboard;
