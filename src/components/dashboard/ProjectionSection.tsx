import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  Target,
  IndianRupee,
  Calendar,
  ArrowUpRight,
  AlertTriangle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

interface ProjectionSectionProps {
  currentPerformance: {
    convertedLeads: number;
    totalRevenue: number;
    monthlyTarget: number;
  };
}

const ProjectionSection = ({ currentPerformance }: ProjectionSectionProps) => {
  const currentDate = new Date();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const daysPassed = currentDate.getDate();
  const daysRemaining = daysInMonth - daysPassed;

  const dailyConversionRate =
    currentPerformance.convertedLeads / daysPassed;
  const projectedMonthlyConversions = Math.round(
    dailyConversionRate * daysInMonth
  );
  const projectedRevenue = Math.round(
    (currentPerformance.totalRevenue / currentPerformance.convertedLeads) *
      projectedMonthlyConversions
  );

  const projectionData = [
    {
      month: 'Current',
      actual: currentPerformance.convertedLeads,
      projected: projectedMonthlyConversions,
      target: currentPerformance.monthlyTarget,
    },
    {
      month: 'Next',
      actual: 0,
      projected: projectedMonthlyConversions + 2,
      target: currentPerformance.monthlyTarget,
    },
    {
      month: 'Month+2',
      actual: 0,
      projected: projectedMonthlyConversions + 4,
      target: currentPerformance.monthlyTarget,
    },
    {
      month: 'Month+3',
      actual: 0,
      projected: projectedMonthlyConversions + 3,
      target: currentPerformance.monthlyTarget,
    },
  ];

  const revenueProjectionData = [
    {
      month: 'Current',
      revenue: currentPerformance.totalRevenue,
      projected: projectedRevenue,
    },
    { month: 'Next', revenue: 0, projected: projectedRevenue + 5 },
    { month: 'Month+2', revenue: 0, projected: projectedRevenue + 12 },
    { month: 'Month+3', revenue: 0, projected: projectedRevenue + 8 },
  ];

  const targetAchievementRate =
    (projectedMonthlyConversions / currentPerformance.monthlyTarget) * 100;
  const isOnTrack = targetAchievementRate >= 90;
  const growthRate =
    ((projectedMonthlyConversions - currentPerformance.convertedLeads) /
      currentPerformance.convertedLeads) *
    100;

  const chartConfig = {
    actual: {
      label: 'Actual',
      color: '#0d9488',
    },
    projected: {
      label: 'Projected',
      color: '#06b6d4',
    },
    target: {
      label: 'Target',
      color: '#e2e8f0',
    },
    revenue: {
      label: 'Revenue',
      color: '#8b5cf6',
    },
  };

  const renderMetricCards = () => {
    const items = [
      {
        title: 'Month-End Projection',
        value: projectedMonthlyConversions,
        subtitle: (
          <>
            <ArrowUpRight size={14} className="inline-block mr-1" />
            {Math.round(growthRate)}% growth rate
          </>
        ),
        icon: <Target size={48} className="text-blue-500 opacity-50" />,
      },
      {
        title: 'Target Achievement',
        value: `${Math.round(targetAchievementRate)}%`,
        subtitle: (
          <Badge
            variant={isOnTrack ? 'default' : 'destructive'}
            className="text-xs mt-1"
          >
            {isOnTrack ? 'On Track' : 'Below Target'}
          </Badge>
        ),
        icon: (
          <div
            className={`p-2 rounded-full ${
              isOnTrack ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            {isOnTrack ? (
              <TrendingUp className="h-6 w-6 text-green-600" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-red-600" />
            )}
          </div>
        ),
      },
      {
        title: 'Projected Revenue',
        value: `₹${projectedRevenue}L`,
        subtitle: 'Based on current avg. deal size',
        icon: (
          <IndianRupee size={48} className="text-green-500 opacity-50" />
        ),
      },
      {
        title: 'Days to Target',
        value: daysRemaining,
        subtitle: `Need ${
          currentPerformance.monthlyTarget -
          currentPerformance.convertedLeads
        } more conversions`,
        icon: <Calendar size={48} className="text-purple-500 opacity-50" />,
      },
    ];

    return items.map((item, idx) => (
      <Card key={idx}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{item.title}</p>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <div className="text-xs text-gray-500 mt-1">{item.subtitle}</div>
            </div>
            {item.icon}
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Accordion for Sales Forecasts */}
      <Card>
      <Accordion type="single" collapsible defaultValue="sales">
        <AccordionItem value="sales">
          <AccordionTrigger className="text-left text-xl font-bold px-4 py-3 hover:bg-muted rounded-md transition">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              Sales Projections & Forecasts
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 pt-2">
            
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      AI-powered insights based on your current performance
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Adjust Timeline
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {renderMetricCards()}
                </div>
              </CardContent>
          
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </Card>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Trend Projection</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-4 pb-4">
            <div className="w-full h-[250px] sm:h-[300px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="var(--color-target)"
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      name="Target"
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="var(--color-actual)"
                      strokeWidth={3}
                      name="Actual"
                    />
                    <Line
                      type="monotone"
                      dataKey="projected"
                      stroke="var(--color-projected)"
                      strokeWidth={2}
                      strokeDasharray="3 3"
                      name="Projected"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Projection</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-4 pb-4">
            <div className="w-full h-[250px] sm:h-[300px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueProjectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="projected"
                      stroke="var(--color-revenue)"
                      fill="var(--color-revenue)"
                      fillOpacity={0.3}
                      strokeWidth={2}
                      name="Projected Revenue (₹L)"
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-actual)"
                      fill="var(--color-actual)"
                      fillOpacity={0.6}
                      strokeWidth={2}
                      name="Current Revenue (₹L)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-blue-900 mb-2">
                Performance Analysis
              </h4>
              <p className="text-sm text-blue-800">
                Based on your current conversion rate of{' '}
                {dailyConversionRate.toFixed(1)} leads per day, you're{' '}
                {isOnTrack ? 'on track to exceed' : 'likely to fall short of'}{' '}
                your monthly target by{' '}
                {Math.abs(
                  projectedMonthlyConversions -
                    currentPerformance.monthlyTarget
                )}{' '}
                conversions.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-green-900 mb-2">
                Optimization Opportunity
              </h4>
              <p className="text-sm text-green-800">
                To reach your target, focus on {daysRemaining} high-priority
                leads in the next {daysRemaining} days. Increasing your daily
                conversion rate by just 0.5 leads could boost your month-end
                projection by {Math.round(0.5 * daysRemaining)} conversions.
              </p>
            </div>

            {!isOnTrack && (
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-medium text-orange-900 mb-2">
                  Action Required
                </h4>
                <p className="text-sm text-orange-800">
                  Consider prioritizing follow-ups with qualified leads and
                  scheduling additional customer visits to bridge the gap of{' '}
                  {currentPerformance.monthlyTarget -
                    projectedMonthlyConversions}{' '}
                  conversions.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectionSection;
