
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCheck } from 'lucide-react';
import IndiaRegionMap from '@/components/supervisor/IndiaRegionMap';

interface Lead {
  id: string;
  name: string;
  contact: string;
  value: string;
  priority: string;
}

interface TeamMember {
  id: string;
  name: string;
  status: string;
  leads: number;
  capacity: number;
}

interface SupervisorOverviewProps {
  unassignedLeads: Lead[];
  teamMembers: TeamMember[];
  onAutoAssign: () => void;
  onAssignLead: (leadId: string, memberId: string) => void;
}

const SupervisorOverview = ({ 
  unassignedLeads, 
  teamMembers, 
  onAutoAssign, 
  onAssignLead 
}: SupervisorOverviewProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <IndiaRegionMap />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lead Allocation Required</CardTitle>
            <Button 
              size="sm" 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={onAutoAssign}
              disabled={unassignedLeads.length === 0}
            >
              Auto-Assign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {unassignedLeads.length === 0 ? (
            <div className="text-center py-8">
              <UserCheck size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All Leads Assigned!</h3>
              <p className="text-gray-600">Great job! All leads have been assigned to team members.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {unassignedLeads.map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.contact} • {lead.value}</p>
                    <Badge className={`text-xs mt-1 ${getPriorityColor(lead.priority)}`}>
                      {lead.priority}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <select 
                      className="text-xs border rounded px-2 py-1"
                      onChange={(e) => e.target.value && onAssignLead(lead.id, e.target.value)}
                      defaultValue=""
                    >
                      <option value="">Assign to...</option>
                      {teamMembers.filter(m => m.status === 'active' && m.leads < m.capacity).map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name} ({member.capacity - member.leads} slots)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisorOverview;
