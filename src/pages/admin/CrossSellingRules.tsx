
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddRuleModal from '@/components/admin/AddRuleModal';
import PreviewRuleModal from '@/components/admin/PreviewRuleModal';

interface CrossSellRule {
  id: string;
  name: string;
  condition: string;
  offer: string;
  status: 'active' | 'inactive';
  priority: number;
  createdDate: string;
  matchedCustomers: number;
}

const mockRules: CrossSellRule[] = [
  {
    id: '1',
    name: 'Savings to FD Cross-sell',
    condition: 'Savings Account + 6 months tenure + Balance > 50k',
    offer: 'Fixed Deposit - Extra 0.5% interest',
    status: 'active',
    priority: 1,
    createdDate: '2024-01-01',
    matchedCustomers: 234
  },
  {
    id: '2',
    name: 'Home Loan to Insurance',
    condition: 'Home Loan + EMI Regular + Age < 45',
    offer: 'Life Insurance - 20% discount on premium',
    status: 'active',
    priority: 2,
    createdDate: '2024-01-05',
    matchedCustomers: 156
  },
  {
    id: '3',
    name: 'MSME to Current Account',
    condition: 'MSME Loan + Business > 2 years',
    offer: 'Current Account - Free for 12 months',
    status: 'inactive',
    priority: 3,
    createdDate: '2024-01-10',
    matchedCustomers: 89
  }
];

const CrossSellingRules = () => {
  const [rules, setRules] = useState<CrossSellRule[]>(mockRules);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<CrossSellRule | null>(null);
  const { toast } = useToast();

  const handleToggleStatus = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
        : rule
    ));
    
    const rule = rules.find(r => r.id === ruleId);
    toast({
      title: "Rule Status Updated",
      description: `${rule?.name} has been ${rule?.status === 'active' ? 'deactivated' : 'activated'}.`,
    });
  };

  const handleDeleteRule = (ruleId: string) => {
    if (confirm('Are you sure you want to delete this rule?')) {
      setRules(rules.filter(rule => rule.id !== ruleId));
      toast({
        title: "Rule Deleted",
        description: "Cross-sell rule has been deleted successfully.",
      });
    }
  };

  const handleAddRule = (ruleData: any) => {
    const newRule: CrossSellRule = {
      id: String(rules.length + 1),
      ...ruleData,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
      matchedCustomers: 0
    };
    setRules([...rules, newRule]);
    setAddModalOpen(false);
    toast({
      title: "Rule Created",
      description: "New cross-sell rule has been created successfully.",
    });
  };

  const activeRules = rules.filter(rule => rule.status === 'active').length;
  const totalMatches = rules.reduce((sum, rule) => sum + rule.matchedCustomers, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cross Selling Rules</h1>
        <Button onClick={() => setAddModalOpen(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-teal-600">{rules.length}</div>
            <div className="text-sm text-gray-600">Total Rules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{activeRules}</div>
            <div className="text-sm text-gray-600">Active Rules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{totalMatches}</div>
            <div className="text-sm text-gray-600">Customers Matched</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">87%</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Rules Table */}
      <Card>
  <CardHeader>
    <CardTitle>Cross-Sell Rules ({rules.length})</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Table for md and up */}
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rule Name</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Offer</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Matched Customers</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell className="font-medium">{rule.name}</TableCell>
              <TableCell className="max-w-xs truncate">{rule.condition}</TableCell>
              <TableCell className="max-w-xs truncate">{rule.offer}</TableCell>
              <TableCell>
                <Badge variant="outline">P{rule.priority}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={rule.status === 'active'}
                    onCheckedChange={() => handleToggleStatus(rule.id)}
                  />
                  <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                    {rule.status}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>{rule.matchedCustomers}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => {
                    setSelectedRule(rule);
                    setPreviewModalOpen(true);
                  }}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteRule(rule.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Card View for small screens */}
    <div className="md:hidden space-y-4">
      {rules.map((rule) => (
        <div key={rule.id} className="border rounded-lg p-4 shadow-sm space-y-2">
          <div className="font-semibold text-lg">{rule.name}</div>
          <div><strong>Condition:</strong> <span className="text-sm text-gray-700">{rule.condition}</span></div>
          <div><strong>Offer:</strong> <span className="text-sm text-gray-700">{rule.offer}</span></div>
          <div><strong>Priority:</strong> <Badge variant="outline">P{rule.priority}</Badge></div>
          <div className="flex items-center gap-2">
            <strong>Status:</strong>
            <Switch
              checked={rule.status === 'active'}
              onCheckedChange={() => handleToggleStatus(rule.id)}
            />
            <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
              {rule.status}
            </Badge>
          </div>
          <div><strong>Matched Customers:</strong> {rule.matchedCustomers}</div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => {
              setSelectedRule(rule);
              setPreviewModalOpen(true);
            }}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDeleteRule(rule.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>


      {/* Modals */}
      <AddRuleModal 
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddRule}
      />
      
      {selectedRule && (
        <PreviewRuleModal 
          isOpen={previewModalOpen}
          onClose={() => {
            setPreviewModalOpen(false);
            setSelectedRule(null);
          }}
          rule={selectedRule}
        />
      )}
    </div>
  );
};

export default CrossSellingRules;
