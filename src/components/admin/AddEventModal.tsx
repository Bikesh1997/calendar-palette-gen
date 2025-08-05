
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (eventData: any) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    trigger: '',
    triggerCondition: '',
    frequency: '',
    actions: [] as string[],
    smsTemplate: '',
    whatsappTemplate: '',
    emailTemplate: '',
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      action: formData.actions.join(' + ')
    };
    
    onAdd(eventData);
    
    // Reset form
    setFormData({
      name: '',
      trigger: '',
      triggerCondition: '',
      frequency: '',
      actions: [],
      smsTemplate: '',
      whatsappTemplate: '',
      emailTemplate: '',
      priority: 'medium'
    });
  };

  const triggers = [
    'Customer Birthday',
    'FD Maturity',
    'EMI Due Date',
    'Account Inactivity',
    'Loan Application',
    'High Balance Alert',
    'Low Balance Alert',
    'Transaction Pattern Change',
    'Product Eligibility',
    'Campaign Trigger'
  ];

  const frequencies = [
    'Once',
    'Daily',
    'Weekly',
    'Monthly',
    'Quarterly',
    'Annually',
    'On Event',
    'Custom'
  ];

  const actionTypes = [
    'Send SMS',
    'Send WhatsApp',
    'Send Email',
    'Assign Task',
    'Show Dashboard Nudge',
    'Create Lead',
    'Update Customer Record',
    'Trigger Workflow'
  ];

  const handleActionChange = (action: string, checked: boolean) => {
    if (checked) {
      setFormData({...formData, actions: [...formData.actions, action]});
    } else {
      setFormData({...formData, actions: formData.actions.filter(a => a !== action)});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Create System Event</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Event Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Birthday Wishes"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trigger Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="trigger">Trigger Type</Label>
                  <Select value={formData.trigger} onValueChange={(value) => setFormData({...formData, trigger: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {triggers.map(trigger => (
                        <SelectItem key={trigger} value={trigger}>{trigger}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {frequencies.map(freq => (
                        <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="triggerCondition">Trigger Condition</Label>
                <Textarea
                  id="triggerCondition"
                  value={formData.triggerCondition}
                  onChange={(e) => setFormData({...formData, triggerCondition: e.target.value})}
                  placeholder="Describe when this event should trigger..."
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Actions to Execute</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {actionTypes.map((action) => (
                    <div key={action} className="flex items-center space-x-2">
                      <Checkbox
                        id={action}
                        checked={formData.actions.includes(action)}
                        onCheckedChange={(checked) => handleActionChange(action, checked as boolean)}
                      />
                      <Label htmlFor={action} className="text-sm">{action}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {(formData.actions.includes('Send SMS') || 
            formData.actions.includes('Send WhatsApp') || 
            formData.actions.includes('Send Email')) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Message Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.actions.includes('Send SMS') && (
                  <div>
                    <Label htmlFor="smsTemplate">SMS Template</Label>
                    <Textarea
                      id="smsTemplate"
                      value={formData.smsTemplate}
                      onChange={(e) => setFormData({...formData, smsTemplate: e.target.value})}
                      placeholder="SMS message template..."
                    />
                  </div>
                )}
                
                {formData.actions.includes('Send WhatsApp') && (
                  <div>
                    <Label htmlFor="whatsappTemplate">WhatsApp Template</Label>
                    <Textarea
                      id="whatsappTemplate"
                      value={formData.whatsappTemplate}
                      onChange={(e) => setFormData({...formData, whatsappTemplate: e.target.value})}
                      placeholder="WhatsApp message template..."
                    />
                  </div>
                )}
                
                {formData.actions.includes('Send Email') && (
                  <div>
                    <Label htmlFor="emailTemplate">Email Template</Label>
                    <Textarea
                      id="emailTemplate"
                      value={formData.emailTemplate}
                      onChange={(e) => setFormData({...formData, emailTemplate: e.target.value})}
                      placeholder="Email message template..."
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventModal;
