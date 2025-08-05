
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface AddKRAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (kraData: any) => void;
}

const AddKRAModal: React.FC<AddKRAModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    metric: '',
    target: '',
    frequency: '',
    weight: 20,
    incentiveStructure: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    
    // Reset form
    setFormData({
      name: '',
      role: '',
      metric: '',
      target: '',
      frequency: '',
      weight: 20,
      incentiveStructure: '',
      description: ''
    });
  };

  const roles = [
    { value: 'sales_executive', label: 'Field Sales Officer' },
    { value: 'relationship_manager', label: 'Relationship Manager' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'inbound_agent', label: 'Inbound Agent' }
  ];

  const metrics = [
    'Team Productivity Score',
    'Target Fulfillment (%)',
    'Compliance Score (%)',
    'Attendance Adherence (%)',
    'Accuracy Rate (%)',
    'Lead Ageing (%)',
    'Training Completion Rate (%)',
    'Escalation Rate',
    'Resolution TAT',
    'App Usage Frequency',
    'Nudge Compliance (%)',
    'First Contact Resolution (%)',
    'Documentation Completion (%)',
    'Conversion Rate (%)',
    'Product-Specific KPI',
    'Distance Travelled (km)',
    'Coverage Index (%)'
  ];

  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Define New KRA</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">KRA Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">KRA Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Lead Conversion Rate"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Applicable Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {roles.map(role => (
                        <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe what this KRA measures..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Target Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="metric">Metric Type</Label>
                  <Select value={formData.metric} onValueChange={(value) => setFormData({...formData, metric: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {metrics.map(metric => (
                        <SelectItem key={metric} value={metric}>{metric}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target">Target Value</Label>
                  <Input
                    id="target"
                    value={formData.target}
                    onChange={(e) => setFormData({...formData, target: e.target.value})}
                    placeholder="e.g., 65%, 150 visits, ₹50L"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {frequencies.map(freq => (
                        <SelectItem key={freq.value} value={freq.value}>{freq.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="weight">Weight (% of total performance)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="weight"
                    type="range"
                    min="5"
                    max="50"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                    className="flex-1"
                  />
                  <div className="text-lg font-medium w-16">{formData.weight}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Incentive Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="incentiveStructure">Incentive Details</Label>
                <Textarea
                  id="incentiveStructure"
                  value={formData.incentiveStructure}
                  onChange={(e) => setFormData({...formData, incentiveStructure: e.target.value})}
                  placeholder="e.g., 5% bonus at 100% achievement, ₹50 per extra visit above target"
                  required
                />
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium mb-2">Incentive Examples:</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Fixed bonus: "₹5000 at 100% achievement"</li>
                  <li>• Percentage bonus: "5% of salary at 100% achievement"</li>
                  <li>• Variable incentive: "₹100 per lead above target"</li>
                  <li>• Tiered structure: "3% at 80%, 5% at 100%, 8% at 120%"</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Create KRA
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddKRAModal;
