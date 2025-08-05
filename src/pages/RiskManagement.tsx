
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import DashboardCard from '@/components/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  AlertTriangle, 
  TrendingDown,
  FileText,
  Users,
  IndianRupee,
  Activity,
  Eye
} from 'lucide-react';

const RiskManagement = () => {
  const riskKpis = [
    { 
      title: 'Portfolio at Risk', 
      value: '2.8%', 
      subtitle: 'PAR > 30 days', 
      trend: { value: '0.3% decrease', isPositive: true }, 
      icon: <Shield size={20} /> 
    },
    { 
      title: 'NPL Ratio', 
      value: '1.2%', 
      subtitle: 'Non-performing loans', 
      trend: { value: '0.1% increase', isPositive: false }, 
      icon: <AlertTriangle size={20} /> 
    },
    { 
      title: 'Credit Risk Score', 
      value: '742', 
      subtitle: 'Portfolio average', 
      trend: { value: '12 points up', isPositive: true }, 
      icon: <TrendingDown size={20} /> 
    },
    { 
      title: 'Recovery Rate', 
      value: '87.5%', 
      subtitle: 'Last 12 months', 
      trend: { value: '5.2% improvement', isPositive: true }, 
      icon: <IndianRupee size={20} /> 
    },
  ];

  const riskDistribution = [
    { category: 'Very Low Risk', amount: 1250, percentage: 42.8, color: '#10b981' },
    { category: 'Low Risk', amount: 875, percentage: 29.9, color: '#84cc16' },
    { category: 'Medium Risk', amount: 485, percentage: 16.6, color: '#f59e0b' },
    { category: 'High Risk', amount: 225, percentage: 7.7, color: '#ef4444' },
    { category: 'Very High Risk', amount: 88, percentage: 3.0, color: '#dc2626' },
  ];

  const sectorRisk = [
    { sector: 'MSME', exposure: 35.2, riskScore: 3.2, npl: 2.1 },
    { sector: 'Agriculture', exposure: 28.5, riskScore: 4.1, npl: 3.8 },
    { sector: 'Retail', exposure: 18.3, riskScore: 2.8, npl: 1.5 },
    { sector: 'Services', exposure: 12.7, riskScore: 2.9, npl: 1.2 },
    { sector: 'Manufacturing', exposure: 5.3, riskScore: 3.5, npl: 2.7 },
  ];

  const riskTrends = [
    { month: 'Jan', par: 2.9, npl: 1.1, provisions: 0.8 },
    { month: 'Feb', par: 3.2, npl: 1.2, provisions: 0.9 },
    { month: 'Mar', par: 3.1, npl: 1.3, provisions: 0.9 },
    { month: 'Apr', par: 2.8, npl: 1.2, provisions: 0.8 },
    { month: 'May', par: 2.7, npl: 1.1, provisions: 0.7 },
    { month: 'Jun', par: 2.8, npl: 1.2, provisions: 0.8 },
  ];

  const complianceMetrics = [
    { metric: 'KYC Compliance', status: 'Good', score: 95.2, trend: 'up' },
    { metric: 'AML Screening', status: 'Excellent', score: 98.7, trend: 'up' },
    { metric: 'Credit Appraisal', status: 'Good', score: 92.8, trend: 'stable' },
    { metric: 'Documentation', status: 'Fair', score: 87.5, trend: 'down' },
    { metric: 'Audit Compliance', status: 'Good', score: 94.1, trend: 'up' },
  ];

  const riskAlerts = [
    { id: 1, type: 'High Risk', customer: 'ABC Manufacturing Ltd', amount: '₹25L', priority: 'high', days: 2 },
    { id: 2, type: 'Credit Limit', customer: 'XYZ Retail Chain', amount: '₹15L', priority: 'medium', days: 5 },
    { id: 3, type: 'Documentation', customer: 'PQR Services', amount: '₹8L', priority: 'low', days: 12 },
    { id: 4, type: 'Payment Delay', customer: 'LMN Industries', amount: '₹32L', priority: 'high', days: 1 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risk Management Dashboard</h1>
          <p className="text-gray-600">Monitor and manage portfolio risk exposure</p>
        </div>
      </div>

      {/* Risk KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskKpis.map((kpi, index) => (
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

      {/* Risk Analytics Tabs */}
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="portfolio">Portfolio Risk</TabsTrigger>
          <TabsTrigger value="sector">Sector Analysis</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution (₹ Crores)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                    >
                      {riskDistribution.map((entry, index) => (
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
                <CardTitle>Risk Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={riskTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="par" stroke="#ef4444" strokeWidth={2} name="PAR %" />
                    <Line type="monotone" dataKey="npl" stroke="#f59e0b" strokeWidth={2} name="NPL %" />
                    <Line type="monotone" dataKey="provisions" stroke="#14b8a6" strokeWidth={2} name="Provisions %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sector" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sector-wise Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectorRisk.map((sector, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">{sector.sector}</h3>
                      <Badge variant="outline">{sector.exposure}% exposure</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Risk Score: </span>
                        <span className={`font-medium ${sector.riskScore > 3.5 ? 'text-red-600' : sector.riskScore > 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {sector.riskScore}/5
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">NPL Rate: </span>
                        <span className="font-medium">{sector.npl}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Exposure: </span>
                        <span className="font-medium">₹{(sector.exposure * 10).toFixed(0)}Cr</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceMetrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        metric.status === 'Excellent' ? 'bg-green-500' :
                        metric.status === 'Good' ? 'bg-blue-500' :
                        metric.status === 'Fair' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <div className="font-medium">{metric.metric}</div>
                        <div className={`text-sm ${getStatusColor(metric.status)}`}>{metric.status}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{metric.score}%</div>
                      <div className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                        {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'} {metric.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active Risk Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riskAlerts.map((alert) => (
                  <div key={alert.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className={getPriorityColor(alert.priority)}>
                        {alert.priority.toUpperCase()}
                      </Badge>
                      <div>
                        <div className="font-medium">{alert.type}</div>
                        <div className="text-sm text-gray-600">{alert.customer}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{alert.amount}</div>
                      <div className="text-xs text-gray-500">{alert.days} days ago</div>
                    </div>
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

export default RiskManagement;
