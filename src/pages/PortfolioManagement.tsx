import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  IndianRupee, 
  PieChart as PieChartIcon,
  BarChart3,
  Target,
  Calendar,
  Users,
  CreditCard,
  Building,
  Shield,
  AlertTriangle,
  UserPlus,
  Heart,
  Star,
  Activity
} from 'lucide-react';

const PortfolioManagement = () => {
  const portfolioKpis = [
    { 
      title: 'Total Portfolio Value', 
      value: '₹2,847 Cr', 
      subtitle: 'Gross loan portfolio', 
      trend: { value: '12% YoY growth', isPositive: true }, 
      icon: <IndianRupee size={20} /> 
    },
    { 
      title: 'Active Accounts', 
      value: '125,847', 
      subtitle: 'Total loan accounts', 
      trend: { value: '8.5% increase', isPositive: true }, 
      icon: <Users size={20} /> 
    },
    { 
      title: 'Portfolio Yield', 
      value: '18.2%', 
      subtitle: 'Weighted average yield', 
      trend: { value: '0.5% improvement', isPositive: true }, 
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: 'Disbursements MTD', 
      value: '₹145 Cr', 
      subtitle: 'Month to date', 
      trend: { value: '15% above target', isPositive: true }, 
      icon: <Target size={20} /> 
    },
  ];

  const productPortfolio = [
    { product: 'Home Loans', outstanding: 996, percentage: 35.0, yield: 9.2, count: 12800 },
    { product: 'Two Wheeler Loan', outstanding: 798, percentage: 28.1, yield: 15.8, count: 45200 },
    { product: 'MSME Loan', outstanding: 512, percentage: 18.0, yield: 16.8, count: 28500 },
    { product: 'Gold Loan', outstanding: 312, percentage: 11.0, yield: 14.2, count: 18200 },
    { product: 'Micro Loan', outstanding: 142, percentage: 5.0, yield: 18.5, count: 15600 },
    { product: 'Agri. Loans', outstanding: 87, percentage: 2.9, yield: 13.8, count: 5547 },
  ];

  const portfolioTrends = [
    { month: 'Jan', outstanding: 2650, disbursements: 125, collections: 145, growth: 2.1 },
    { month: 'Feb', outstanding: 2698, disbursements: 132, collections: 142, growth: 1.8 },
    { month: 'Mar', outstanding: 2745, disbursements: 128, collections: 148, growth: 1.7 },
    { month: 'Apr', outstanding: 2782, disbursements: 135, collections: 152, growth: 1.3 },
    { month: 'May', outstanding: 2821, disbursements: 142, collections: 155, growth: 1.4 },
    { month: 'Jun', outstanding: 2847, disbursements: 145, collections: 158, growth: 0.9 },
  ];

  const tenorDistribution = [
    { tenor: '0-12 months', amount: 425, color: '#ef4444' },
    { tenor: '1-2 years', amount: 568, color: '#f59e0b' },
    { tenor: '2-3 years', amount: 612, color: '#eab308' },
    { tenor: '3-5 years', amount: 754, color: '#22c55e' },
    { tenor: '5+ years', amount: 488, color: '#14b8a6' },
  ];

  const rateDistribution = [
    { range: '8-12%', amount: 312, accounts: 8500 },
    { range: '12-16%', amount: 568, accounts: 15200 },
    { range: '16-20%', amount: 985, accounts: 45800 },
    { range: '20-24%', amount: 742, accounts: 38200 },
    { range: '24%+', amount: 240, accounts: 18147 },
  ];

  const topPerformers = [
    { branch: 'Mumbai Central', portfolio: 145, growth: 22.5, yield: 19.8 },
    { branch: 'Delhi CP', portfolio: 132, growth: 18.3, yield: 18.9 },
    { branch: 'Bangalore HSR', portfolio: 128, growth: 20.1, yield: 19.2 },
    { branch: 'Pune FC Road', portfolio: 115, growth: 16.8, yield: 18.7 },
    { branch: 'Chennai T Nagar', portfolio: 108, growth: 19.4, yield: 19.1 },
  ];

  // Executive Dashboard Data
  const executiveKpis = [
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
    { name: 'Home Loans', value: 35, color: '#14b8a6' },
    { name: 'Two Wheeler Loan', value: 28, color: '#3b82f6' },
    { name: 'MSME Loan', value: 18, color: '#f59e0b' },
    { name: 'Gold Loan', value: 11, color: '#ef4444' },
    { name: 'Others', value: 8, color: '#8b5cf6' },
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

  // Customer Analytics Data
  const customerKpis = [
    { 
      title: 'Customer Acquisition', 
      value: '2,847', 
      subtitle: 'New customers this month', 
      trend: { value: '23% increase', isPositive: true }, 
      icon: <UserPlus size={20} /> 
    },
    { 
      title: 'Customer Retention', 
      value: '94.2%', 
      subtitle: 'Annual retention rate', 
      trend: { value: '2.1% improvement', isPositive: true }, 
      icon: <Heart size={20} /> 
    },
    { 
      title: 'Avg. Customer Value', 
      value: '₹3.2L', 
      subtitle: 'Per customer annually', 
      trend: { value: '15% growth', isPositive: true }, 
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: 'Customer Satisfaction', 
      value: '4.6/5', 
      subtitle: 'Average rating', 
      trend: { value: '0.3 points up', isPositive: true }, 
      icon: <Star size={20} /> 
    },
  ];

  const customerSegments = [
    { segment: 'Premium', count: 12500, value: 850, color: '#10b981' },
    { segment: 'Gold', count: 28300, value: 425, color: '#f59e0b' },
    { segment: 'Silver', count: 45200, value: 220, color: '#6b7280' },
    { segment: 'Basic', count: 39800, value: 85, color: '#ef4444' },
  ];

  const ageDistribution = [
    { ageGroup: '18-25', count: 15400, percentage: 15.2 },
    { ageGroup: '26-35', count: 28900, percentage: 28.5 },
    { ageGroup: '36-45', count: 32200, percentage: 31.8 },
    { ageGroup: '46-55', count: 18700, percentage: 18.4 },
    { ageGroup: '55+', count: 6100, percentage: 6.1 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio & Analytics</h1>
          <p className="text-gray-600">Comprehensive portfolio management and analytics dashboard</p>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="portfolio" className="text-xs sm:text-sm px-2 py-2">Portfolio Management</TabsTrigger>
          <TabsTrigger value="executive" className="text-xs sm:text-sm px-2 py-2">Executive Dashboard</TabsTrigger>
          <TabsTrigger value="customer-analytics" className="text-xs sm:text-sm px-2 py-2">Customer Analytics</TabsTrigger>
        </TabsList>


        <TabsContent value="portfolio" className="space-y-6">
          {/* Portfolio KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioKpis.map((kpi, index) => (
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

          {/* Portfolio Analytics Sub-tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
              <TabsTrigger value="products">Product Mix</TabsTrigger>
              <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
              <TabsTrigger value="performance">Branch Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Growth Trends (₹ Crores)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={portfolioTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="outstanding" stackId="1" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="disbursements" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tenor Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={tenorDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="amount"
                          label={({ tenor, amount }) => `${tenor}: ₹${amount}Cr`}
                        >
                          {tenorDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Portfolio Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {productPortfolio.map((product, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">{product.product}</h3>
                          <Badge variant="outline">{product.percentage}% of portfolio</Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Outstanding: </span>
                            <span className="font-medium">₹{product.outstanding}Cr</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Yield: </span>
                            <span className="font-medium">{product.yield}%</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Accounts: </span>
                            <span className="font-medium">{product.count.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Avg Size: </span>
                            <span className="font-medium">₹{Math.round((product.outstanding * 10000000) / product.count / 1000)}K</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interest Rate Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={rateDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [
                        name === 'amount' ? `₹${value}Cr` : `${value} accounts`,
                        name === 'amount' ? 'Outstanding Amount' : 'Number of Accounts'
                      ]} />
                      <Bar dataKey="amount" fill="#14b8a6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Branches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((branch, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <span className="text-teal-700 font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <div className="font-medium">{branch.branch}</div>
                            <div className="text-sm text-gray-600">Portfolio: ₹{branch.portfolio}Cr</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">
                            <span className="text-green-600">+{branch.growth}%</span> growth
                          </div>
                          <div className="text-sm text-gray-600">{branch.yield}% yield</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="executive" className="space-y-6">
          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {executiveKpis.map((kpi, index) => (
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
        </TabsContent>

        <TabsContent value="customer-analytics" className="space-y-6">
          {/* Customer KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerKpis.map((kpi, index) => (
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

          {/* Customer Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments by Value</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={customerSegments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'count' ? `${value} customers` : `₹${value}K avg value`,
                      name === 'count' ? 'Customer Count' : 'Average Value'
                    ]} />
                    <Bar dataKey="count" fill="#14b8a6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ageDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ ageGroup, percentage }) => `${ageGroup}: ${percentage}%`}
                    >
                      {ageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioManagement;
