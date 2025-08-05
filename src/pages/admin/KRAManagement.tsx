
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Target, TrendingUp, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddKRAModal from '@/components/admin/AddKRAModal';

interface KRA {
  id: string;
  name: string;
  role: string;
  metric: string;
  target: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  weight: number;
  incentiveStructure: string;
  status: 'active' | 'inactive';
  assignedUsers: number;
  avgAchievement: number;
}

const mockKRAs: KRA[] = [
  {
    id: '1',
    name: 'Lead Conversion Rate',
    role: 'sales_executive',
    metric: 'Percentage',
    target: '65%',
    frequency: 'monthly',
    weight: 30,
    incentiveStructure: '5% bonus at 100% achievement',
    status: 'active',
    assignedUsers: 45,
    avgAchievement: 72
  },
  {
    id: '2',
    name: 'Customer Visits',
    role: 'sales_executive',
    metric: 'Count',
    target: '150 visits',
    frequency: 'monthly',
    weight: 20,
    incentiveStructure: '₹50 per extra visit above target',
    status: 'active',
    assignedUsers: 45,
    avgAchievement: 87
  },
  {
    id: '3',
    name: 'SHG Formation',
    role: 'sales_executive',
    metric: 'Count',
    target: '5 SHGs',
    frequency: 'monthly',
    weight: 25,
    incentiveStructure: '₹2000 per SHG formed',
    status: 'active',
    assignedUsers: 45,
    avgAchievement: 65
  },
  {
    id: '4',
    name: 'Portfolio Growth',
    role: 'relationship_manager',
    metric: 'Amount',
    target: '₹50L',
    frequency: 'quarterly',
    weight: 40,
    incentiveStructure: '0.1% of excess growth',
    status: 'active',
    assignedUsers: 12,
    avgAchievement: 78
  },
  {
    id: '5',
    name: 'Team Target Achievement',
    role: 'supervisor',
    metric: 'Percentage',
    target: '85%',
    frequency: 'monthly',
    weight: 50,
    incentiveStructure: '10% bonus at 100% achievement',
    status: 'active',
    assignedUsers: 8,
    avgAchievement: 82
  }
];

const KRAManagement = () => {
  const [kras, setKRAs] = useState<KRA[]>(mockKRAs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterFrequency, setFilterFrequency] = useState('all');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredKRAs = kras.filter(kra => {
    const matchesSearch = kra.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kra.metric.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || kra.role === filterRole;
    const matchesFrequency = filterFrequency === 'all' || kra.frequency === filterFrequency;
    
    return matchesSearch && matchesRole && matchesFrequency;
  });

  const handleDeleteKRA = (kraId: string) => {
    if (confirm('Are you sure you want to delete this KRA?')) {
      setKRAs(kras.filter(kra => kra.id !== kraId));
      toast({
        title: "KRA Deleted",
        description: "KRA has been deleted successfully.",
      });
    }
  };

  const handleAddKRA = (kraData: any) => {
    const newKRA: KRA = {
      id: String(kras.length + 1),
      ...kraData,
      status: 'active',
      assignedUsers: 0,
      avgAchievement: 0
    };
    setKRAs([...kras, newKRA]);
    setAddModalOpen(false);
    toast({
      title: "KRA Created",
      description: "New KRA has been created successfully.",
    });
  };

  const getRoleDisplay = (role: string) => {
    const roleMap = {
      'sales_executive': 'Field Sales Officer',
      'relationship_manager': 'Relationship Manager',
      'supervisor': 'Supervisor',
      'inbound_agent': 'Inbound Agent'
    };
    return roleMap[role as keyof typeof roleMap] || role;
  };

  const getAchievementColor = (achievement: number) => {
    if (achievement >= 90) return 'text-green-600';
    if (achievement >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalKRAs = kras.length;
  const avgWeight = Math.round(kras.reduce((sum, kra) => sum + kra.weight, 0) / kras.length);
  const overallAchievement = Math.round(kras.reduce((sum, kra) => sum + kra.avgAchievement, 0) / kras.length);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">KRA Management</h1>
        <Button onClick={() => setAddModalOpen(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" />
          Add KRA
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-teal-600" />
              <div>
                <div className="text-2xl font-bold text-teal-600">{totalKRAs}</div>
                <div className="text-sm text-gray-600">Total KRAs</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{overallAchievement}%</div>
                <div className="text-sm text-gray-600">Avg Achievement</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{avgWeight}%</div>
            <div className="text-sm text-gray-600">Avg Weight</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">110</div>
            <div className="text-sm text-gray-600">Total Assigned Users</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search KRAs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="sales_executive">Field Sales Officer</SelectItem>
                <SelectItem value="relationship_manager">Relationship Manager</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="inbound_agent">Inbound Agent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterFrequency} onValueChange={setFilterFrequency}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Frequency" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* KRAs Table */}
      <Card>
  <CardHeader>
    <CardTitle>KRA Definitions ({filteredKRAs.length})</CardTitle>
  </CardHeader>

  <CardContent>
    {/* Desktop Table View */}
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>KRA Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Assigned Users</TableHead>
            <TableHead>Avg Achievement</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredKRAs.map((kra) => (
            <TableRow key={kra.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{kra.name}</div>
                  <div className="text-sm text-gray-500">{kra.metric}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{getRoleDisplay(kra.role)}</Badge>
              </TableCell>
              <TableCell className="font-medium">{kra.target}</TableCell>
              <TableCell>
                <Badge variant="secondary">{kra.frequency}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{kra.weight}%</Badge>
              </TableCell>
              <TableCell>{kra.assignedUsers}</TableCell>
              <TableCell>
                <div className={`font-medium ${getAchievementColor(kra.avgAchievement)}`}>
                  {kra.avgAchievement}%
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteKRA(kra.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Mobile Card View */}
    <div className="md:hidden space-y-4">
      {filteredKRAs.map((kra) => (
        <div
          key={kra.id}
          className="border rounded-lg p-4 shadow-sm space-y-2"
        >
          <div>
            <div className="font-medium">{kra.name}</div>
            <div className="text-sm text-gray-500">{kra.metric}</div>
          </div>
          <div>
            <strong>Role:</strong>{' '}
            <Badge variant="outline">{getRoleDisplay(kra.role)}</Badge>
          </div>
          <div>
            <strong>Target:</strong> {kra.target}
          </div>
          <div>
            <strong>Frequency:</strong>{' '}
            <Badge variant="secondary">{kra.frequency}</Badge>
          </div>
          <div>
            <strong>Weight:</strong>{' '}
            <Badge variant="outline">{kra.weight}%</Badge>
          </div>
          <div>
            <strong>Assigned Users:</strong> {kra.assignedUsers}
          </div>
          <div>
            <strong>Avg Achievement:</strong>{' '}
            <span className={`font-medium ${getAchievementColor(kra.avgAchievement)}`}>
              {kra.avgAchievement}%
            </span>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteKRA(kra.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>


      {/* KRA Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>KRA Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['sales_executive', 'relationship_manager', 'supervisor'].map((role) => {
              const roleKRAs = kras.filter(kra => kra.role === role);
              const roleAvg = roleKRAs.length > 0 
                ? Math.round(roleKRAs.reduce((sum, kra) => sum + kra.avgAchievement, 0) / roleKRAs.length)
                : 0;
              
              return (
                <div key={role} className="p-4 border rounded-lg">
                  <div className="text-lg font-medium mb-2">{getRoleDisplay(role)}</div>
                  <div className="text-2xl font-bold mb-1">{roleAvg}%</div>
                  <div className="text-sm text-gray-600">{roleKRAs.length} KRAs defined</div>
                  <div className="mt-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${roleAvg}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add KRA Modal */}
      <AddKRAModal 
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddKRA}
      />
    </div>
  );
};

export default KRAManagement;
