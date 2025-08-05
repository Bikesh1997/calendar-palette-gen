
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList } from 'recharts';
import { RefreshCw, Filter, TrendingUp, Target, Trophy, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const EnhancedFunnelChart = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [chartType, setChartType] = useState('funnel');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);

  const funnelStages = [
    { stage: 'Leads', status: ['new'], color: '#6366f1', icon: '👥' },
    { stage: 'Qualified', status: ['qualified'], color: '#3b82f6', icon: '✅' },
    { stage: 'Proposal', status: ['proposal'], color: '#f59e0b', icon: '📋' },
    { stage: 'Negotiation', status: ['negotiation'], color: '#ef4444', icon: '🤝' },
    { stage: 'Closed Won', status: ['converted'], color: '#10b981', icon: '🏆' },
  ];

  const funnelData = funnelStages.map((stage, index) => {
    const stageLeads = userLeads.filter(lead => stage.status.includes(lead.status));
    const totalValue = stageLeads.reduce((sum, lead) => {
      const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
      return sum + value;
    }, 0);
    
    const prevStageLeads = index === 0 ? userLeads : userLeads.filter(lead => funnelStages[index - 1].status.includes(lead.status));
    const conversionRate = prevStageLeads.length > 0 ? Math.round((stageLeads.length / prevStageLeads.length) * 100) : 100;
    
    return {
      stage: stage.stage,
      count: stageLeads.length,
      value: totalValue,
      color: stage.color,
      icon: stage.icon,
      conversion: index === 0 ? 100 : conversionRate,
      fill: stage.color
    };
  });

  const conversionTrendData = [
    { week: 'Week 1', conversion: 18, target: 25, leads: 45 },
    { week: 'Week 2', conversion: 22, target: 25, leads: 52 },
    { week: 'Week 3', conversion: 28, target: 25, leads: 38 },
    { week: 'Week 4', conversion: 25, target: 25, leads: 47 },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'funnel':
        return (
          <div className="space-y-6">
            <ResponsiveContainer width="100%" height={300}>
              <FunnelChart>
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} leads`,
                    'Count'
                  ]}
                />
                <Funnel
                  dataKey="count"
                  data={funnelData}
                  isAnimationActive
                >
                  <LabelList position="center" fill="#fff" stroke="none" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
            
            {/* Stage-by-stage breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {funnelData.map((stage, index) => (
                <Card key={stage.stage} className="text-center p-4 hover:shadow-lg transition-shadow">
                  <div className="text-2xl mb-2">{stage.icon}</div>
                  <div className="text-lg font-bold" style={{ color: stage.color }}>
                    {stage.count}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{stage.stage}</div>
                  <div className="text-xs text-teal-600 font-medium">₹{stage.value}L</div>
                  {index > 0 && (
                    <div className="flex items-center justify-center mt-2">
                      {stage.conversion >= 25 ? (
                        <div className="flex items-center text-green-600 text-xs">
                          <Target size={10} className="mr-1" />
                          {stage.conversion}%
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600 text-xs">
                          <AlertCircle size={10} className="mr-1" />
                          {stage.conversion}%
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        );
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
              <Bar dataKey="count" fill="#14b8a6" name="count" radius={[4, 4, 0, 0]} />
            </BarChart>
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
              <Line type="monotone" dataKey="conversion" stroke="#14b8a6" strokeWidth={3} name="Actual" dot={{ fill: '#14b8a6', strokeWidth: 2, r: 6 }} />
              <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" name="Target" dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }} />
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
            My Sales Pipeline
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
                <SelectItem value="funnel">Funnel View</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
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
      </CardContent>
    </Card>
  );
};

export default EnhancedFunnelChart;
