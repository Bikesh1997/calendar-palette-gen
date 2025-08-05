
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface KRASetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRole: string;
  onAddKRA: (kraData: any) => void;
}

const KRASetupModal = ({ open, onOpenChange, selectedRole, onAddKRA }: KRASetupModalProps) => {
  const [kraData, setKraData] = useState({
    title: '',
    description: '',
    type: 'numeric',
    target: '',
    unit: '',
    weightage: 0,
    period: 'monthly',
    thresholds: {
      red: 70,
      amber: 90,
      green: 90
    }
  });

  const handleSave = () => {
    if (!kraData.title || !kraData.target || kraData.weightage <= 0) {
      alert('Please fill all required fields');
      return;
    }
    
    onAddKRA(kraData);
    onOpenChange(false);
    
    // Reset form
    setKraData({
      title: '',
      description: '',
      type: 'numeric',
      target: '',
      unit: '',
      weightage: 0,
      period: 'monthly',
      thresholds: {
        red: 70,
        amber: 90,
        green: 90
      }
    });
  };

  const updateThreshold = (type: 'red' | 'amber' | 'green', value: number) => {
    setKraData({
      ...kraData,
      thresholds: {
        ...kraData.thresholds,
        [type]: value
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Add KRA for {selectedRole}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic KRA Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">KRA Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">KRA Title *</Label>
                <Input
                  id="title"
                  value={kraData.title}
                  onChange={(e) => setKraData({...kraData, title: e.target.value})}
                  placeholder="e.g., SHG Creation & Management"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={kraData.description}
                  onChange={(e) => setKraData({...kraData, description: e.target.value})}
                  placeholder="Describe the KRA objectives and expectations..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">KRA Type *</Label>
                  <Select value={kraData.type} onValueChange={(value) => setKraData({...kraData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="numeric">Numeric (Count/Quantity)</SelectItem>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="period">Review Period</Label>
                  <Select value={kraData.period} onValueChange={(value) => setKraData({...kraData, period: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="target">Target Value *</Label>
                  <Input
                    id="target"
                    type="number"
                    value={kraData.target}
                    onChange={(e) => setKraData({...kraData, target: e.target.value})}
                    placeholder="e.g., 25"
                  />
                </div>

                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={kraData.unit}
                    onChange={(e) => setKraData({...kraData, unit: e.target.value})}
                    placeholder="e.g., SHGs, %, customers"
                  />
                </div>

                <div>
                  <Label htmlFor="weightage">Weightage (%) *</Label>
                  <Input
                    id="weightage"
                    type="number"
                    value={kraData.weightage}
                    onChange={(e) => setKraData({...kraData, weightage: Number(e.target.value)})}
                    placeholder="0-100"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Thresholds */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Thresholds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="red-threshold">Red Zone (&lt; %)</Label>
                  <Input
                    id="red-threshold"
                    type="number"
                    value={kraData.thresholds.red}
                    onChange={(e) => updateThreshold('red', Number(e.target.value))}
                    min="0"
                    max="100"
                    className="border-red-300"
                  />
                  <p className="text-xs text-red-600 mt-1">Poor performance</p>
                </div>

                <div>
                  <Label htmlFor="amber-threshold">Amber Zone (&lt; %)</Label>
                  <Input
                    id="amber-threshold"
                    type="number"
                    value={kraData.thresholds.amber}
                    onChange={(e) => updateThreshold('amber', Number(e.target.value))}
                    min="0"
                    max="100"
                    className="border-yellow-300"
                  />
                  <p className="text-xs text-yellow-600 mt-1">Needs improvement</p>
                </div>

                <div>
                  <Label htmlFor="green-threshold">Green Zone (≥ %)</Label>
                  <Input
                    id="green-threshold"
                    type="number"
                    value={kraData.thresholds.green}
                    onChange={(e) => updateThreshold('green', Number(e.target.value))}
                    min="0"
                    max="100"
                    className="border-green-300"
                  />
                  <p className="text-xs text-green-600 mt-1">Good performance</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> If Red &lt; 70%, Amber 70-90%, Green ≥ 90%
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!kraData.title || !kraData.target || kraData.weightage <= 0}>
              Add KRA
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KRASetupModal;
