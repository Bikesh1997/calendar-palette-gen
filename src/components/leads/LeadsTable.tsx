import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import LeadActionsMenu from './LeadActionsMenu';

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
  starred?: boolean;
}

interface LeadsTableProps {
  leads: Lead[];
  userRole: string;
  onEditLead?: (leadId: string, updatedData: Partial<Lead>) => void;
}

const LeadsTable = ({ leads, userRole, onEditLead }: LeadsTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'qualified':
        return 'bg-yellow-100 text-yellow-800';
      case 'proposal':
        return 'bg-orange-100 text-orange-800';
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      case 'document received':
        return 'bg-purple-100 text-purple-800';
      case 'under process':
        return 'bg-indigo-100 text-indigo-800';
      case 'sanctioned/approved':
        return 'bg-teal-100 text-teal-800';
      case 'disbursed':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Website Forms':
        return 'bg-blue-100 text-blue-800';
      case 'WhatsApp Business':
        return 'bg-green-100 text-green-800';
      case 'Call Center':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Source</TableHead>
              {userRole === 'supervisor' && <TableHead>Assigned To</TableHead>}
              <TableHead>Last Contact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <div className="font-medium text-gray-900">{lead.name}</div>
                  <div className="text-sm text-gray-500">{lead.id}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-gray-900">{lead.contact}</div>
                  <div className="text-sm text-gray-500">{lead.phone}</div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-gray-900">{lead.value}</TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(lead.priority)}>
                    {lead.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getSourceColor(lead.source)}>
                    {lead.source}
                  </Badge>
                </TableCell>
                {userRole === 'supervisor' && (
                  <TableCell className="text-sm text-gray-900">{lead.assignedTo}</TableCell>
                )}
                <TableCell className="text-sm text-gray-600">{lead.lastContact}</TableCell>
                <TableCell>
                  <LeadActionsMenu lead={lead} onEditLead={onEditLead} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="border rounded-lg shadow-sm p-4 bg-white"
          >
            <div className="font-semibold text-lg text-gray-900">{lead.name}</div>
            <div className="text-sm text-gray-500 mb-2">{lead.id}</div>

            <div className="text-sm text-gray-900">
              <strong>Contact:</strong> {lead.contact}
            </div>
            <div className="text-sm text-gray-500">{lead.phone}</div>
            <div className="text-sm text-gray-500 mb-2">{lead.email}</div>

            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
              <Badge className={getPriorityColor(lead.priority)}>{lead.priority}</Badge>
              <Badge className={getSourceColor(lead.source)}>{lead.source}</Badge>
            </div>

            <div className="text-sm text-gray-900">
              <strong>Value:</strong> {lead.value}
            </div>
            {userRole === 'supervisor' && (
              <div className="text-sm text-gray-900">
                <strong>Assigned To:</strong> {lead.assignedTo}
              </div>
            )}
            <div className="text-sm text-gray-600 mb-3">
              <strong>Last Contact:</strong> {lead.lastContact}
            </div>

            <LeadActionsMenu lead={lead} onEditLead={onEditLead} />
          </div>
        ))}
      </div>
    </>
  );
};

export default LeadsTable;
