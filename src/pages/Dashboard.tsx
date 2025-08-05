import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import SmartNudges from '@/components/dashboard/SmartNudges';
import ProjectionSection from '@/components/dashboard/ProjectionSection';
import { allLeads } from '@/data/leadsData';
import FieldExecutiveGameDashboard from '@/components/gamification/FieldExecutiveGameDashboard';
import GameifiedKRAProgress from '@/components/gamification/GameifiedKRAProgress';
import { Calendar, Phone } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Calculate metrics based on user role
  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);
  const totalLeads = userLeads.length;
  const convertedLeads = userLeads.filter(lead => lead.status === 'converted').length;
  const openLeads = userLeads.filter(lead => lead.status !== 'converted').length;
  const totalRevenue = userLeads.reduce((sum, lead) => {
    const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
    return sum + value;
  }, 0);

  // Monthly target for salesperson
  const monthlyTarget = 25; // Target number of conversions per month

  const handlePlanRoute = () => {
    navigate('/plan-my-day');
  };

  return (
    <div className="space-y-6">
    
    <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            {/* Welcome back,  */}
            Hey,  {user?.name.split(' ')[0]}!
          </h3>
          {/* <p className="text-gray-600">Here's your sales performance overview</p> */}
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" onClick={handlePlanRoute}>
            <Calendar size={16} className="mr-2" />
            Plan Route
          </Button>
          <Link to="/leads">
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
              <Phone size={16} className="mr-2" />
              Start Calling
            </Button>
          </Link>
        </div>
      </div>

      <FieldExecutiveGameDashboard />
      <GameifiedKRAProgress />

      <ProjectionSection
        currentPerformance={{
          convertedLeads,
          totalRevenue,
          monthlyTarget
        }}
      />
      {/* <SmartNudges />  */}



    </div>
  );
};

export default Dashboard;
