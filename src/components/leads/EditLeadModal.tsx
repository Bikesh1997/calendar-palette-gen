import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface EditLeadModalProps {
  lead: Lead;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEditLead: (leadId: string, updatedData: Partial<Lead>) => void;
}

const EditLeadModal = ({ lead, isOpen, onOpenChange, onEditLead }: EditLeadModalProps) => {
  const [formData, setFormData] = useState({
    name: lead.name,
    contact: lead.contact,
    phone: lead.phone,
    email: lead.email,
    status: lead.status,
    source: lead.source,
    value: lead.value,
    priority: lead.priority,
    assignedTo: lead.assignedTo,
    assignedToId: lead.assignedToId,
    lastContact: lead.lastContact
  });
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      name: lead.name,
      contact: lead.contact,
      phone: lead.phone,
      email: lead.email,
      status: lead.status,
      source: lead.source,
      value: lead.value,
      priority: lead.priority,
      assignedTo: lead.assignedTo,
      assignedToId: lead.assignedToId,
      lastContact: lead.lastContact
    });
  }, [lead]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating lead:', lead.id, formData);
    
    onEditLead(lead.id, formData);
    
    toast({
      title: "Lead Updated",
      description: `Lead "${formData.name}" has been updated successfully.`,
    });
    onOpenChange(false);
  };

  const handleAssigneeChange = (value: string) => {
    const assigneeMap: { [key: string]: { name: string; id: string } } = {
      'Rahul Sharma': { name: 'Rahul Sharma', id: '1' },
      'Anjali Patel': { name: 'Anjali Patel', id: '2' },
      'Vikash Kumar': { name: 'Vikash Kumar', id: '3' },
      'Priya Singh': { name: 'Priya Singh', id: '4' }
    };

    const assignee = assigneeMap[value];
    if (assignee) {
      setFormData({ 
        ...formData, 
        assignedTo: assignee.name,
        assignedToId: assignee.id
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Lead - {lead.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Person</Label>
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="Enter contact person name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="document_received">Document Received</SelectItem>
                <SelectItem value="under_process">Under Process</SelectItem>
                <SelectItem value="section_approved">Section/Approved</SelectItem>
                <SelectItem value="disbursed">Disbursed</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website Forms">Website Forms</SelectItem>
                <SelectItem value="WhatsApp Business">WhatsApp Business</SelectItem>
                <SelectItem value="Call Center">Call Center</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Cold Call">Cold Call</SelectItem>
                <SelectItem value="Trade Show">Trade Show</SelectItem>
                <SelectItem value="Social Media">Social Media</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Estimated Value</Label>
            <Input
              id="value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="e.g., ₹10L"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Select value={formData.assignedTo} onValueChange={handleAssigneeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rahul Sharma">Rahul Sharma</SelectItem>
                <SelectItem value="Anjali Patel">Anjali Patel</SelectItem>
                <SelectItem value="Vikash Kumar">Vikash Kumar</SelectItem>
                <SelectItem value="Priya Singh">Priya Singh</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastContact">Last Contact</Label>
            <Select value={formData.lastContact} onValueChange={(value) => setFormData({ ...formData, lastContact: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select last contact time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Just now">Just now</SelectItem>
                <SelectItem value="1 hour ago">1 hour ago</SelectItem>
                <SelectItem value="2 hours ago">2 hours ago</SelectItem>
                <SelectItem value="3 hours ago">3 hours ago</SelectItem>
                <SelectItem value="4 hours ago">4 hours ago</SelectItem>
                <SelectItem value="5 hours ago">5 hours ago</SelectItem>
                <SelectItem value="1 day ago">1 day ago</SelectItem>
                <SelectItem value="2 days ago">2 days ago</SelectItem>
                <SelectItem value="3 days ago">3 days ago</SelectItem>
                <SelectItem value="1 week ago">1 week ago</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Lead</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLeadModal;
