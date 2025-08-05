
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndianRupee, Plus, Edit, Trash2, TrendingUp } from 'lucide-react';

interface IncentiveSlab {
  id: string;
  role: string;
  kraType: string;
  threshold: number;
  amount: number;
  type: 'fixed' | 'percentage';
  description: string;
}

const IncentiveConfiguration = () => {
  const [incentiveSlabs, setIncentiveSlabs] = useState<IncentiveSlab[]>([
    {
      id: '1',
      role: 'Field Sales Officer (FSO)',
      kraType: 'SHG Creation',
      threshold: 80,
      amount: 1000,
      type: 'fixed',
      description: 'Complete 80% SHG target'
    },
    {
      id: '2',
      role: 'Field Sales Officer (FSO)',
      kraType: 'SHG Creation',
      threshold: 90,
      amount: 2000,
      type: 'fixed',
      description: 'Complete 90% SHG target'
    },
    {
      id: '3',
      role: 'Field Sales Officer (FSO)',
      kraType: 'SHG Creation',
      threshold: 100,
      amount: 3500,
      type: 'fixed',
      description: 'Complete 100% SHG target'
    },
    {
      id: '4',
      role: 'Relationship Officer (RO)',
      kraType: 'Lead Conversion',
      threshold: 80,
      amount: 2,
      type: 'percentage',
      description: 'Achieve 80% conversion rate'
    },
    {
      id: '5',
      role: 'Relationship Officer (RO)',
      kraType: 'Lead Conversion',
      threshold: 90,
      amount: 3,
      type: 'percentage',
      description: 'Achieve 90% conversion rate'
    },
    {
      id: '6',
      role: 'Supervisor',
      kraType: 'Team Performance',
      threshold: 85,
      amount: 5000,
      type: 'fixed',
      description: 'Team achieves 85% overall performance'
    }
  ]);

  const [newSlab, setNewSlab] = useState({
    role: '',
    kraType: '',
    threshold: 0,
    amount: 0,
    type: 'fixed' as 'fixed' | 'percentage',
    description: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const addIncentiveSlab = () => {
    if (!newSlab.role || !newSlab.kraType || newSlab.threshold <= 0 || newSlab.amount <= 0) {
      alert('Please fill all required fields');
      return;
    }

    const slab: IncentiveSlab = {
      id: Date.now().toString(),
      ...newSlab
    };

    setIncentiveSlabs([...incentiveSlabs, slab]);
    setNewSlab({
      role: '',
      kraType: '',
      threshold: 0,
      amount: 0,
      type: 'fixed',
      description: ''
    });
    setShowAddForm(false);
  };

  const deleteIncentiveSlab = (id: string) => {
    setIncentiveSlabs(incentiveSlabs.filter(slab => slab.id !== id));
  };

  const getRoleSlabs = (role: string) => {
    return incentiveSlabs.filter(slab => slab.role === role);
  };

  const roles = ['Field Sales Officer (FSO)', 'Relationship Officer (RO)', 'Supervisor'];

  // Sample simulation data
  const simulationData = {
    'Field Sales Officer (FSO)': {
      currentPerformance: 85,
      projectedEarnings: 2000,
      nextMilestone: { threshold: 90, amount: 2000 },
      maxEarnings: 3500
    },
    'Relationship Officer (RO)': {
      currentPerformance: 88,
      projectedEarnings: 1800,
      nextMilestone: { threshold: 90, amount: 600 },
      maxEarnings: 2400
    },
    'Supervisor': {
      currentPerformance: 82,
      projectedEarnings: 0,
      nextMilestone: { threshold: 85, amount: 5000 },
      maxEarnings: 5000
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Incentive Configuration</h2>
          <p className="text-sm text-gray-600">Configure incentive slabs and simulation rules</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Incentive Slab
        </Button>
      </div>

      {/* Add New Slab Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Incentive Slab</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Role *</Label>
                <Select value={newSlab.role} onValueChange={(value) => setNewSlab({...newSlab, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>KRA Type *</Label>
                <Input
                  value={newSlab.kraType}
                  onChange={(e) => setNewSlab({...newSlab, kraType: e.target.value})}
                  placeholder="e.g., SHG Creation, Lead Conversion"
                />
              </div>

              <div>
                <Label>Threshold (%) *</Label>
                <Input
                  type="number"
                  value={newSlab.threshold}
                  onChange={(e) => setNewSlab({...newSlab, threshold: Number(e.target.value)})}
                  placeholder="80"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Incentive Type *</Label>
                <Select value={newSlab.type} onValueChange={(value: 'fixed' | 'percentage') => setNewSlab({...newSlab, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                    <SelectItem value="percentage">Percentage of Salary (%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Amount *</Label>
                <div className="flex items-center gap-2">
                  {newSlab.type === 'fixed' && <IndianRupee className="h-4 w-4 text-gray-500" />}
                  <Input
                    type="number"
                    value={newSlab.amount}
                    onChange={(e) => setNewSlab({...newSlab, amount: Number(e.target.value)})}
                    placeholder={newSlab.type === 'fixed' ? '2000' : '5'}
                  />
                  {newSlab.type === 'percentage' && <span className="text-gray-500">%</span>}
                </div>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={newSlab.description}
                onChange={(e) => setNewSlab({...newSlab, description: e.target.value})}
                placeholder="Complete 90% SHG target = ₹2,000 bonus"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button onClick={addIncentiveSlab}>Add Slab</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Incentive Slabs by Role */}
      {roles.map(role => {
        const roleSlabs = getRoleSlabs(role);
        return (
          <Card key={role}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{role} Incentives</span>
                <Badge variant="outline">{roleSlabs.length} slabs</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {roleSlabs.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No incentive slabs configured for this role</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>KRA Type</TableHead>
                      <TableHead>Threshold</TableHead>
                      <TableHead>Incentive</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roleSlabs.map(slab => (
                      <TableRow key={slab.id}>
                        <TableCell className="font-medium">{slab.kraType}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{slab.threshold}%</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {slab.type === 'fixed' ? (
                              <>
                                <IndianRupee className="h-3 w-3" />
                                <span>{slab.amount.toLocaleString()}</span>
                              </>
                            ) : (
                              <span>{slab.amount}% of salary</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{slab.description}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteIncentiveSlab(slab.id)}
                            className="h-7 w-7 p-0 text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Earnings Simulation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Earnings Simulation Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map(role => {
              const sim = simulationData[role as keyof typeof simulationData];
              return (
                <div key={role} className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-sm">{role}</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Performance:</span>
                      <Badge variant={sim.currentPerformance >= 90 ? 'default' : sim.currentPerformance >= 70 ? 'secondary' : 'destructive'}>
                        {sim.currentPerformance}%
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projected Earnings:</span>
                      <span className="font-medium">₹{sim.projectedEarnings.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Milestone:</span>
                      <span className="text-green-600">{sim.nextMilestone.threshold}% (+₹{sim.nextMilestone.amount.toLocaleString()})</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Potential:</span>
                      <span className="font-bold">₹{sim.maxEarnings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Simulation Rules</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Tiered incentives: Higher performance = Higher rewards</li>
              <li>• Threshold achievement unlocks corresponding incentive slab</li>
              <li>• Multiple KRA achievements can stack incentives</li>
              <li>• Performance below red zone = No incentive eligibility</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncentiveConfiguration;
