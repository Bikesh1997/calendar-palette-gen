
import { Card, CardContent } from '@/components/ui/card';

interface Lead {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  status: string;
  source: string;
  value: string;
  assignedTo: string;
  assignedToId: string;
  lastContact: string;
  priority: string;
}

interface LeadStatsCardsProps {
  leads: Lead[];
  userRole: string;
}

const LeadStatsCards = ({ leads, userRole }: LeadStatsCardsProps) => {
  const convertedLeads = leads.filter(lead => lead.status === 'converted');
  const convertedValue = convertedLeads.reduce((sum, lead) => {
    const value = parseFloat(lead.value.replace('₹', '').replace('L', ''));
    return sum + value;
  }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {leads.filter(lead => lead.status === 'new').length}
            </div>
            <div className="text-sm text-gray-600">New Leads</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {leads.filter(lead => lead.status === 'qualified').length}
            </div>
            <div className="text-sm text-gray-600">Qualified</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {convertedLeads.length}
            </div>
            <div className="text-sm text-gray-600">Converted</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">₹{convertedValue}L</div>
            <div className="text-sm text-gray-600">
              {userRole === 'supervisor' ? 'Total Sales' : 'My Sales'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadStatsCards;
