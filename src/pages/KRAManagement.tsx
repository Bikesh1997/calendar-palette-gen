
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Target, Users, Settings, TrendingUp } from 'lucide-react';
import KRASetupModal from '@/components/kra/KRASetupModal';
import RoleKRATable from '@/components/kra/RoleKRATable';
import IncentiveConfiguration from '@/components/kra/IncentiveConfiguration';
import PerformanceThresholds from '@/components/kra/PerformanceThresholds';

// Sample KRA data
const sampleKRAs = [
  {
    id: '1',
    role: 'Field Sales Officer (FSO)',
    title: 'SHG Creation & Management',
    type: 'numeric',
    target: 25,
    unit: 'SHGs',
    weightage: 40,
    thresholds: { red: 70, amber: 90, green: 90 },
    period: 'monthly'
  },
  {
    id: '2',
    role: 'Field Sales Officer (FSO)',
    title: 'Fixed Deposit Acquisition',
    type: 'numeric',
    target: 15,
    unit: 'FDs',
    weightage: 30,
    thresholds: { red: 70, amber: 90, green: 90 },
    period: 'monthly'
  },
  {
    id: '3',
    role: 'Field Sales Officer (FSO)',
    title: 'Customer Visit Compliance',
    type: 'percentage',
    target: 95,
    unit: '%',
    weightage: 20,
    thresholds: { red: 70, amber: 90, green: 90 },
    period: 'monthly'
  },
  {
    id: '4',
    role: 'Field Sales Officer (FSO)',
    title: 'Attendance Compliance',
    type: 'percentage',
    target: 98,
    unit: '%',
    weightage: 10,
    thresholds: { red: 70, amber: 90, green: 90 },
    period: 'monthly'
  },
  {
    id: '5',
    role: 'Relationship Officer (RO)',
    title: 'Lead Conversion Rate',
    type: 'percentage',
    target: 25,
    unit: '%',
    weightage: 35,
    thresholds: { red: 70, amber: 90, green: 90 },
    period: 'monthly'
  },
  {
    id: '6',
    role: 'Relationship Officer (RO)',
    title: 'Customer Acquisition',
    type: 'numeric',
    target: 20,
    unit: 'customers',
    weightage: 30,
    thresholds: { red: 70, amber: 90, green: 90 },
    period: 'monthly'
  },
  {
    id: '7',
    role: 'Relationship Officer (RO)',
    title: 'Portfolio Growth',
    type: 'percentage',
    target: 15,
    unit: '%',
    weightage: 25,
    thresholds: { red: 70, amber: 90, green: 90 },
    period: 'monthly'
  },
  {
    id: '8',
    role: 'Relationship Officer (RO)',
    title: 'Customer Retention',
    type: 'percentage',
    target: 92,
    unit: '%',
    weightage: 10,
    thresholds: { red: 70, amber: 90, green: 90 },
    period: 'monthly'
  },
  {
    id: '9',
    role: 'Supervisor',
    title: 'Team Performance Achievement',
    type: 'percentage',
    target: 85,
    unit: '%',
    weightage: 50,
    thresholds: { red: 70, amber: 90, green: 90 },
    period: 'monthly'
  },
  {
    id: '10',
    role: 'Supervisor',
    title: 'Team Development Score',
    type: 'percentage',
    target: 80,
    unit: '%',
    weightage: 30,
    thresholds: { red: 70, amber: 90, green: 90 },
    period: 'monthly'
  },
  {
    id: '11',
    role: 'Supervisor',
    title: 'Risk Management Compliance',
    type: 'percentage',
    target: 95,
    unit: '%',
    weightage: 20,
    thresholds: { red: 70, amber: 90, green: 90 },
    period: 'monthly'
  }
];

const roles = ['Field Sales Officer (FSO)', 'Relationship Officer (RO)', 'Supervisor'];

const KRAManagement = () => {
  const [kras, setKras] = useState(sampleKRAs);
  const [selectedRole, setSelectedRole] = useState('Field Sales Officer (FSO)');
  const [isKRASetupOpen, setIsKRASetupOpen] = useState(false);

  const handleAddKRA = (kraData: any) => {
    const newKRA = {
      id: Date.now().toString(),
      role: selectedRole,
      ...kraData
    };
    setKras([...kras, newKRA]);
  };

  const handleUpdateKRA = (id: string, updatedData: any) => {
    setKras(kras.map(kra => kra.id === id ? { ...kra, ...updatedData } : kra));
  };

  const handleDeleteKRA = (id: string) => {
    setKras(kras.filter(kra => kra.id !== id));
  };

  const getRoleKRAs = (role: string) => {
    return kras.filter(kra => kra.role === role);
  };

  const getRoleStats = (role: string) => {
    const roleKRAs = getRoleKRAs(role);
    const totalWeightage = roleKRAs.reduce((sum, kra) => sum + kra.weightage, 0);
    return {
      count: roleKRAs.length,
      totalWeightage,
      isComplete: totalWeightage === 100
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">KRA Management</h1>
          <p className="text-gray-600">Configure Key Result Areas for different roles</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((role) => {
          const stats = getRoleStats(role);
          return (
            <Card key={role}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{role}</p>
                    <p className="text-2xl font-bold">{stats.count} KRAs</p>
                    <p className="text-sm text-gray-500">
                      Weightage: {stats.totalWeightage}%
                      {stats.isComplete ? (
                        <span className="text-green-600 ml-1">✓</span>
                      ) : (
                        <span className="text-red-600 ml-1">⚠</span>
                      )}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-blue-100">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="kras" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="kras">KRAs by Role</TabsTrigger>
          <TabsTrigger value="thresholds">Performance Thresholds</TabsTrigger>
          <TabsTrigger value="incentives">Incentive Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="kras" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Role-based KRAs
                </CardTitle>
                <Button 
                  onClick={() => setIsKRASetupOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add KRA
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedRole} onValueChange={setSelectedRole}>
                <TabsList className="grid w-full grid-cols-3">
                  {roles.map((role) => (
                    <TabsTrigger key={role} value={role} className="text-xs">
                      {role.includes('FSO') ? 'FSO' : role.includes('RO') ? 'RO' : 'Supervisor'}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {roles.map((role) => (
                  <TabsContent key={role} value={role}>
                    <RoleKRATable
                      role={role}
                      kras={getRoleKRAs(role)}
                      onUpdateKRA={handleUpdateKRA}
                      onDeleteKRA={handleDeleteKRA}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thresholds">
          <PerformanceThresholds />
        </TabsContent>

        <TabsContent value="incentives">
          <IncentiveConfiguration />
        </TabsContent>
      </Tabs>

      <KRASetupModal
        open={isKRASetupOpen}
        onOpenChange={setIsKRASetupOpen}
        selectedRole={selectedRole}
        onAddKRA={handleAddKRA}
      />
    </div>
  );
};

export default KRAManagement;
