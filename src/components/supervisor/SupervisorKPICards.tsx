
import DashboardCard from '@/components/DashboardCard';
import { Users, Target, TrendingUp, AlertTriangle } from 'lucide-react';

interface SupervisorKPICardsProps {
  teamMembersCount: number;
  unassignedLeadsCount: number;
}

const SupervisorKPICards = ({ teamMembersCount, unassignedLeadsCount }: SupervisorKPICardsProps) => {
  const kpis = [
    { 
      title: 'Team Size', 
      value: "478", 
      subtitle: 'Active team members', 
      trend: { value: '1 new this month', isPositive: true }, 
      icon: <Users size={20} /> 
    },
    { 
      title: 'Team Target', 
      value: '₹85L', 
      subtitle: 'Monthly collective target', 
      trend: { value: '12% above last month', isPositive: true }, 
      icon: <Target size={20} /> 
    },
    { 
      title: 'Team Achievement', 
      value: '₹68.4L', 
      subtitle: 'Current month revenue', 
      trend: { value: '84% of target', isPositive: true }, 
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: 'Unassigned Leads', 
      value: 7, 
      subtitle: 'Require allocation', 
      trend: { value: '5 new today', isPositive: false }, 
      icon: <AlertTriangle size={20} /> 
    },
  ];

  return (
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
  );
};

export default SupervisorKPICards;
