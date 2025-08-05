
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Mail, Phone, UserPlus, Archive, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BulkLeadActionsProps {
  selectedLeads: string[];
  onBulkAction: (action: string, data?: any) => void;
  onClearSelection: () => void;
}

const BulkLeadActions = ({ selectedLeads, onBulkAction, onClearSelection }: BulkLeadActionsProps) => {
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [bulkData, setBulkData] = useState({
    assignTo: '',
    status: '',
    priority: '',
    emailTemplate: '',
    notes: '',
    tags: [] as string[]
  });
  const { toast } = useToast();

  const teamMembers = [
    { id: '1', name: 'Rahul Sharma' },
    { id: '2', name: 'Anjali Patel' },
    { id: '3', name: 'Vikash Kumar' },
    { id: '4', name: 'Priya Singh' }
  ];

  const emailTemplates = [
    { id: 'welcome', name: 'Welcome Email', content: 'Thank you for your interest in our banking services...' },
    { id: 'followup', name: 'Follow-up Email', content: 'We wanted to follow up on your recent inquiry...' },
    { id: 'proposal', name: 'Loan Proposal', content: 'Based on your requirements, we have prepared a customized loan proposal...' }
  ];

  const availableTags = ['VIP', 'High Value', 'Quick Close', 'Referral', 'Cold Lead', 'Hot Lead'];

  const handleBulkAction = (action: string) => {
    setBulkAction(action);
    setShowBulkModal(true);
  };

  const executeBulkAction = () => {
    if (!bulkAction) return;

    let actionData = {};
    
    switch (bulkAction) {
      case 'assign':
        if (!bulkData.assignTo) {
          toast({
            title: "Error",
            description: "Please select a team member to assign to.",
            variant: "destructive"
          });
          return;
        }
        actionData = { assignTo: bulkData.assignTo };
        break;
      
      case 'status':
        if (!bulkData.status) {
          toast({
            title: "Error",
            description: "Please select a status.",
            variant: "destructive"
          });
          return;
        }
        actionData = { status: bulkData.status };
        break;
      
      case 'priority':
        if (!bulkData.priority) {
          toast({
            title: "Error",
            description: "Please select a priority.",
            variant: "destructive"
          });
          return;
        }
        actionData = { priority: bulkData.priority };
        break;
      
      case 'email':
        if (!bulkData.emailTemplate) {
          toast({
            title: "Error",
            description: "Please select an email template.",
            variant: "destructive"
          });
          return;
        }
        actionData = { emailTemplate: bulkData.emailTemplate };
        break;
      
      case 'notes':
        if (!bulkData.notes) {
          toast({
            title: "Error",
            description: "Please enter notes to add.",
            variant: "destructive"
          });
          return;
        }
        actionData = { notes: bulkData.notes };
        break;
      
      case 'tags':
        if (bulkData.tags.length === 0) {
          toast({
            title: "Error",
            description: "Please select at least one tag.",
            variant: "destructive"
          });
          return;
        }
        actionData = { tags: bulkData.tags };
        break;
    }

    onBulkAction(bulkAction, actionData);
    setShowBulkModal(false);
    setBulkData({
      assignTo: '',
      status: '',
      priority: '',
      emailTemplate: '',
      notes: '',
      tags: []
    });

    toast({
      title: "Bulk Action Completed",
      description: `${selectedLeads.length} leads have been updated.`,
    });
  };

  const handleTagToggle = (tag: string) => {
    setBulkData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  if (selectedLeads.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border shadow-lg rounded-lg p-4 z-50">
      <div className="flex items-center space-x-4">
        <Badge variant="secondary">
          {selectedLeads.length} leads selected
        </Badge>
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleBulkAction('assign')}
          >
            <UserPlus size={16} className="mr-2" />
            Assign
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleBulkAction('status')}
          >
            <Archive size={16} className="mr-2" />
            Status
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleBulkAction('email')}
          >
            <Mail size={16} className="mr-2" />
            Email
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleBulkAction('tags')}
          >
            <Tag size={16} className="mr-2" />
            Tags
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleBulkAction('notes')}
          >
            Add Notes
          </Button>
        </div>
        
        <Button 
          size="sm" 
          variant="ghost"
          onClick={onClearSelection}
        >
          Clear
        </Button>
      </div>

      {/* Bulk Action Modal */}
      <Dialog open={showBulkModal} onOpenChange={setShowBulkModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Bulk Action: {bulkAction} ({selectedLeads.length} leads)
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {bulkAction === 'assign' && (
              <div>
                <Label>Assign to Team Member</Label>
                <Select value={bulkData.assignTo} onValueChange={(value) => 
                  setBulkData(prev => ({ ...prev, assignTo: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map(member => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {bulkAction === 'status' && (
              <div>
                <Label>Change Status To</Label>
                <Select value={bulkData.status} onValueChange={(value) => 
                  setBulkData(prev => ({ ...prev, status: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                    <SelectItem value="closed_won">Closed Won</SelectItem>
                    <SelectItem value="closed_lost">Closed Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {bulkAction === 'priority' && (
              <div>
                <Label>Set Priority</Label>
                <Select value={bulkData.priority} onValueChange={(value) => 
                  setBulkData(prev => ({ ...prev, priority: value }))
                }>
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
            )}

            {bulkAction === 'email' && (
              <div>
                <Label>Email Template</Label>
                <Select value={bulkData.emailTemplate} onValueChange={(value) => 
                  setBulkData(prev => ({ ...prev, emailTemplate: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select email template" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {bulkData.emailTemplate && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                    <strong>Preview:</strong>
                    <p>{emailTemplates.find(t => t.id === bulkData.emailTemplate)?.content}</p>
                  </div>
                )}
              </div>
            )}

            {bulkAction === 'notes' && (
              <div>
                <Label>Add Notes</Label>
                <Textarea
                  value={bulkData.notes}
                  onChange={(e) => setBulkData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Enter notes to add to all selected leads..."
                  rows={3}
                />
              </div>
            )}

            {bulkAction === 'tags' && (
              <div>
                <Label>Add Tags</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availableTags.map(tag => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        checked={bulkData.tags.includes(tag)}
                        onCheckedChange={() => handleTagToggle(tag)}
                      />
                      <label className="text-sm">{tag}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-2 pt-4">
              <Button onClick={executeBulkAction}>
                Execute Action
              </Button>
              <Button variant="outline" onClick={() => setShowBulkModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BulkLeadActions;
