
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Target, X } from 'lucide-react';

interface KRAItem {
  id: string;
  description: string;
  target: string;
  weightage: number;
  dueDate: string;
}

interface KPASetupModalProps {
  trigger: React.ReactNode;
  employeeName?: string;
  onSave?: (kpaData: any) => void;
}

const KPASetupModal = ({ trigger, employeeName, onSave }: KPASetupModalProps) => {
  const [open, setOpen] = useState(false);
  const [kpaData, setKpaData] = useState({
    title: '',
    description: '',
    category: '',
    period: '',
    employee: employeeName || '',
    priority: 'Medium',
    overallTarget: ''
  });
  
  const [kras, setKras] = useState<KRAItem[]>([]);

  const addKRA = () => {
    const newKRA: KRAItem = {
      id: Date.now().toString(),
      description: '',
      target: '',
      weightage: 0,
      dueDate: ''
    };
    setKras([...kras, newKRA]);
  };

  const updateKRA = (id: string, field: keyof KRAItem, value: string | number) => {
    setKras(kras.map(kra => 
      kra.id === id ? { ...kra, [field]: value } : kra
    ));
  };

  const removeKRA = (id: string) => {
    setKras(kras.filter(kra => kra.id !== id));
  };

  const handleSave = () => {
    const totalWeightage = kras.reduce((sum, kra) => sum + kra.weightage, 0);
    if (totalWeightage !== 100) {
      alert('Total KRA weightage must equal 100%');
      return;
    }
    
    onSave?.({ ...kpaData, kras });
    setOpen(false);
    // Reset form
    setKpaData({
      title: '',
      description: '',
      category: '',
      period: '',
      employee: employeeName || '',
      priority: 'Medium',
      overallTarget: ''
    });
    setKras([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Set KPA & KRAs
            {employeeName && <span className="ml-2 text-sm font-normal text-gray-600">for {employeeName}</span>}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* KPA Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Performance Area (KPA)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">KPA Title *</Label>
                  <Input
                    id="title"
                    value={kpaData.title}
                    onChange={(e) => setKpaData({...kpaData, title: e.target.value})}
                    placeholder="e.g., Sales Performance Excellence"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={kpaData.category} onValueChange={(value) => setKpaData({...kpaData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales Performance</SelectItem>
                      <SelectItem value="customer-acquisition">Customer Acquisition</SelectItem>
                      <SelectItem value="customer-retention">Customer Retention</SelectItem>
                      <SelectItem value="process-improvement">Process Improvement</SelectItem>
                      <SelectItem value="team-development">Team Development</SelectItem>
                      <SelectItem value="risk-management">Risk Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="period">Review Period *</Label>
                  <Select value={kpaData.period} onValueChange={(value) => setKpaData({...kpaData, period: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Q1-2024">Q1 2024</SelectItem>
                      <SelectItem value="Q2-2024">Q2 2024</SelectItem>
                      <SelectItem value="Q3-2024">Q3 2024</SelectItem>
                      <SelectItem value="Q4-2024">Q4 2024</SelectItem>
                      <SelectItem value="H1-2024">H1 2024</SelectItem>
                      <SelectItem value="H2-2024">H2 2024</SelectItem>
                      <SelectItem value="Annual-2024">Annual 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={kpaData.priority} onValueChange={(value) => setKpaData({...kpaData, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={kpaData.description}
                  onChange={(e) => setKpaData({...kpaData, description: e.target.value})}
                  placeholder="Describe the key performance area and its objectives..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="overallTarget">Overall Target</Label>
                <Input
                  id="overallTarget"
                  value={kpaData.overallTarget}
                  onChange={(e) => setKpaData({...kpaData, overallTarget: e.target.value})}
                  placeholder="e.g., Achieve 120% of sales target"
                />
              </div>
            </CardContent>
          </Card>

          {/* KRAs */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Key Result Areas (KRAs)</CardTitle>
                <Button onClick={addKRA} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add KRA
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {kras.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Target className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No KRAs added yet. Click "Add KRA" to get started.</p>
                </div>
              ) : (
                kras.map((kra, index) => (
                  <div key={kra.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">KRA {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeKRA(kra.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="md:col-span-2">
                        <Label>Description *</Label>
                        <Textarea
                          value={kra.description}
                          onChange={(e) => updateKRA(kra.id, 'description', e.target.value)}
                          placeholder="Describe what needs to be achieved..."
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label>Target/Metric *</Label>
                        <Input
                          value={kra.target}
                          onChange={(e) => updateKRA(kra.id, 'target', e.target.value)}
                          placeholder="e.g., 15 new customers per month"
                        />
                      </div>
                      <div>
                        <Label>Weightage (%) *</Label>
                        <Input
                          type="number"
                          value={kra.weightage}
                          onChange={(e) => updateKRA(kra.id, 'weightage', Number(e.target.value))}
                          placeholder="0-100"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div>
                        <Label>Due Date</Label>
                        <Input
                          type="date"
                          value={kra.dueDate}
                          onChange={(e) => updateKRA(kra.id, 'dueDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
              {kras.length > 0 && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  <strong>Total Weightage: {kras.reduce((sum, kra) => sum + kra.weightage, 0)}%</strong>
                  {kras.reduce((sum, kra) => sum + kra.weightage, 0) !== 100 && (
                    <span className="text-red-600 ml-2">(Must equal 100%)</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!kpaData.title || !kpaData.category || kras.length === 0}>
              Save KPA & KRAs
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KPASetupModal;
