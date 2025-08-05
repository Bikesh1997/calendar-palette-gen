
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Phone, Edit } from 'lucide-react';
import LeadViewModal from './LeadViewModal';
import CallInProgressModal from './CallInProgressModal';
import EditLeadModal from './EditLeadModal';
import { useLeadActions } from '@/hooks/useLeadActions';
import { useToast } from '@/hooks/use-toast';

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

interface LeadActionsMenuProps {
  lead: Lead;
  onEditLead?: (leadId: string, updatedData: Partial<Lead>) => void;
}

const LeadActionsMenu = ({ lead, onEditLead }: LeadActionsMenuProps) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [callInProgressOpen, setCallInProgressOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { toast } = useToast();
  
  const { handleEmail, canEdit, handleEditAttempt } = useLeadActions(lead);

  // Random business names for the call modal
  const businessNames = ['TechCorp Solutions', 'Innovative Enterprises', 'Global Dynamics', 'Smart Systems', 'Digital Ventures', 'Future Industries'];
  const randomBusinessName = businessNames[Math.floor(Math.random() * businessNames.length)];

  const handleViewLead = () => {
    setViewModalOpen(true);
  };

  const handleCall = () => {
    console.log('Calling lead:', lead.phone);
    setCallInProgressOpen(true);
  };

  const handleEdit = () => {
    if (handleEditAttempt()) {
      setEditModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex space-x-1">
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={handleViewLead}
        >
          <Eye size={14} />
        </Button>
        <Button 
          size="sm" 
          variant="default" 
          onClick={handleCall}
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
        >
          <Phone size={14} className="mr-1" />
          Call
        </Button>
        <Button 
          size="sm" 
          variant="default" 
          onClick={handleEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <Edit size={14} className="mr-1" />
          Edit
        </Button>
      </div>

      <LeadViewModal 
        lead={lead}
        isOpen={viewModalOpen}
        onOpenChange={setViewModalOpen}
      />

      <CallInProgressModal 
        prospectName={lead.contact}
        businessName={randomBusinessName}
        phoneNumber={lead.phone}
        isOpen={callInProgressOpen}
        onOpenChange={setCallInProgressOpen}
      />

      {onEditLead && (
        <EditLeadModal 
          lead={lead}
          isOpen={editModalOpen}
          onOpenChange={setEditModalOpen}
          onEditLead={onEditLead}
        />
      )}
    </>
  );
};

export default LeadActionsMenu;
