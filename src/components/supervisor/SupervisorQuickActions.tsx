
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Calendar, Award } from 'lucide-react';

interface SupervisorQuickActionsProps {
  onGenerateReports: () => void;
  onScheduleReview: () => void;
  onSetTargets: () => void;
}

const SupervisorQuickActions = ({ 
  onGenerateReports, 
  onScheduleReview, 
  onSetTargets 
}: SupervisorQuickActionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onGenerateReports}>
        <CardContent className="p-6 text-center">
          <BarChart3 size={32} className="mx-auto text-blue-600 mb-3" />
          <h3 className="font-medium mb-2">Performance Reports</h3>
          <p className="text-sm text-gray-600">Generate team performance analytics</p>
        </CardContent>
      </Card>
      
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onScheduleReview}>
        <CardContent className="p-6 text-center">
          <Calendar size={32} className="mx-auto text-green-600 mb-3" />
          <h3 className="font-medium mb-2">Schedule Review</h3>
          <p className="text-sm text-gray-600">One-on-one team member reviews</p>
        </CardContent>
      </Card>
      
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onSetTargets}>
        <CardContent className="p-6 text-center">
          <Award size={32} className="mx-auto text-purple-600 mb-3" />
          <h3 className="font-medium mb-2">Set Targets</h3>
          <p className="text-sm text-gray-600">Define goals and KPIs for team</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisorQuickActions;
