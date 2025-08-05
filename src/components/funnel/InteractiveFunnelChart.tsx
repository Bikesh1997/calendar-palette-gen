
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { RefreshCw, Filter, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const InteractiveFunnelChart = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [chartType, setChartType] = useState('bar');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter leads based on user role
  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);

  // Process funnel data
  const funnelStages = [
    { stage: 'Leads', status: ['new'], color: '#94a3b8' },
    { stage: 'Qualified', status: ['qualified'], color: '#3b82f6' },
    { stage: 'Proposal', status: ['proposal'], color: '#f59e0b' },
    { stage: 'Negotiation', status: ['negotiation'], color: '#ef4444' },
    { stage: 'Closed Won', status: ['converted'], color: '#10b981' },
  ];

  const funnelData = funnelStages.map(stage => {
    const stageLeads = userLeads.filter(lead => stage.status.includes(lead.status));
    const totalValue = stageLeads.reduce((sum, lead) => {
      const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
      return sum + value;
    }, 0);
    
    return {
      stage: stage.stage,
      count: stageLeads.length,
      value: totalValue,
      color: stage.color,
      conversion: stage.stage === 'Leads' ? 100 : Math.round((stageLeads.length / userLeads.length) * 100)
    };
  });

  // Conversion trend data (simulated)
  const conversionTrendData = [
    { week: 'Week 1', conversion: 18, target: 25 },
    { week: 'Week 2', conversion: 22, target: 25 },
    { week: 'Week 3', conversion: 28, target: 25 },
    { week: 'Week 4', conversion: 25, target: 25 },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={funnelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'count' ? `${value} leads` : `₹${value}L`,
                  name === 'count' ? 'Lead Count' : 'Total Value'
                ]}
              />
              <Bar dataKey="count" fill="#14b8a6" name="count" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={funnelData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                label={({ stage, count }) => `${stage}: ${count}`}
              >
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'trend':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={conversionTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="conversion" stroke="#14b8a6" strokeWidth={3} name="Actual" />
              <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Interactive Sales Funnel
          </CardTitle>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
                <SelectItem value="trend">Trend Line</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderChart()}
        
        {/* Funnel Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {funnelData.map((stage, index) => (
            <div key={stage.stage} className="text-center p-3 rounded-lg border">
              <div className="text-2xl font-bold" style={{ color: stage.color }}>
                {stage.count}
              </div>
              <div className="text-sm text-gray-600">{stage.stage}</div>
              <div className="text-xs text-teal-600 font-medium">₹{stage.value}L</div>
              <div className="text-xs text-gray-500">{stage.conversion}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveFunnelChart;
