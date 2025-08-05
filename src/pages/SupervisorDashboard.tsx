import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';
import { useToast } from '@/hooks/use-toast';
import AddTeamMemberModal from '@/components/team/AddTeamMemberModal';
import TeamSettingsModal from '@/components/team/TeamSettingsModal';
import ViewDetailsModal from '@/components/team/ViewDetailsModal';
import SupervisorKPICards from '@/components/supervisor/SupervisorKPICards';
import SupervisorQuickActions from '@/components/supervisor/SupervisorQuickActions';
import SupervisorOverview from '@/components/supervisor/SupervisorOverview';
import SupervisorTeamPerformance from '@/components/supervisor/SupervisorTeamPerformance';
import SupervisorIncentiveManagement from '@/components/supervisor/SupervisorIncentiveManagement';

const SupervisorDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isTeamSettingsModalOpen, setIsTeamSettingsModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [assignedLeads, setAssignedLeads] = useState<string[]>([]);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Team data with proper structure for ViewDetailsModal
  const [teamMembers, setTeamMembers] = useState([
    { 
      id: '1', 
      name: 'Rahul Sharma', 
      email: 'rahul.sharma@company.com',
      role: 'Field Executive',
      department: 'Sales',
      status: 'active',
      joinDate: '2023-01-15',
      performance: 92,
      targets: { monthly: 15, achieved: 12.5 },
      lastActive: '2 hours ago',
      leads: 25, 
      converted: 8, 
      revenue: 12.5, 
      target: 15,
      lastActivity: '2 hours ago',
      capacity: 30
    },
    { 
      id: '3', 
      name: 'Anjali Patel', 
      email: 'anjali.patel@company.com',
      role: 'Field Executive',
      department: 'Sales',
      status: 'active',
      joinDate: '2023-03-10',
      performance: 88,
      targets: { monthly: 12, achieved: 8.2 },
      lastActive: '30 min ago',
      leads: 18, 
      converted: 5, 
      revenue: 8.2, 
      target: 12,
      lastActivity: '30 min ago',
      capacity: 25
    },
    { 
      id: '4', 
      name: 'Vikram Singh', 
      email: 'vikram.singh@company.com',
      role: 'Inbound sales',
      department: 'Inbound',
      status: 'active',
      joinDate: '2022-11-20',
      performance: 85,
      targets: { monthly: 18, achieved: 15.3 },
      lastActive: '45 min ago',
      leads: 32, 
      converted: 11, 
      revenue: 15.3, 
      target: 18,
      lastActivity: '45 min ago',
      capacity: 35
    },
    { 
      id: '5', 
      name: 'Neha Gupta', 
      email: 'neha.gupta@company.com',
      role: 'Relationship Manager',
      department: 'Branch',
      status: 'active',
      joinDate: '2023-05-05',
      performance: 95,
      targets: { monthly: 20, achieved: 18.5 },
      lastActive: '1 hour ago',
      leads: 30, 
      converted: 12, 
      revenue: 18.5, 
      target: 20,
      lastActivity: '1 hour ago',
      capacity: 35
    }
  ]);

  // Unassigned leads requiring allocation (filter out already assigned leads)
  const unassignedLeads = allLeads.filter(lead => !lead.assignedToId && !assignedLeads.includes(lead.id)).slice(0, 8);

  const handleAutoAssign = () => {
    if (unassignedLeads.length === 0) {
      toast({
        title: "No Unassigned Leads",
        description: "All leads have been assigned",
      });
      return;
    }

    const availableMembers = teamMembers
      .filter(m => m.status === 'active' && m.leads < m.capacity)
      .sort((a, b) => {
        const aCapacity = a.capacity - a.leads;
        const bCapacity = b.capacity - b.leads;
        return bCapacity - aCapacity;
      });
    
    if (availableMembers.length === 0) {
      toast({
        title: "No Available Capacity",
        description: "All active team members are at capacity",
        variant: "destructive"
      });
      return;
    }

    const prioritySortedLeads = [...unassignedLeads].sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    const assignments: { leadId: string; memberId: string; leadName: string; memberName: string }[] = [];
    const updatedMembers = [...teamMembers];
    const newlyAssignedLeads: string[] = [];

    for (const lead of prioritySortedLeads) {
      const bestMember = availableMembers.find(member => member.leads < member.capacity);

      if (bestMember) {
        assignments.push({
          leadId: lead.id,
          memberId: bestMember.id,
          leadName: lead.name,
          memberName: bestMember.name
        });

        const memberIndex = updatedMembers.findIndex(m => m.id === bestMember.id);
        if (memberIndex !== -1) {
          updatedMembers[memberIndex].leads++;
        }

        const availableMemberIndex = availableMembers.findIndex(m => m.id === bestMember.id);
        if (availableMemberIndex !== -1) {
          availableMembers[availableMemberIndex].leads++;
          if (availableMembers[availableMemberIndex].leads >= availableMembers[availableMemberIndex].capacity) {
            availableMembers.splice(availableMemberIndex, 1);
          }
        }

        newlyAssignedLeads.push(lead.id);

        if (availableMembers.length === 0) break;
      }
    }

    setTeamMembers(updatedMembers);
    setAssignedLeads(prev => [...prev, ...newlyAssignedLeads]);

    toast({
      title: "Auto-Assignment Complete",
      description: `${assignments.length} leads assigned successfully. ${assignments.map(a => `${a.leadName} → ${a.memberName}`).join(', ')}`,
    });
  };

  const handleAssignLead = (leadId: string, memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    const lead = unassignedLeads.find(l => l.id === leadId);
    
    if (member && lead) {
      if (member.leads >= member.capacity) {
        toast({
          title: "Capacity Exceeded",
          description: `${member.name} is already at capacity (${member.capacity} leads)`,
          variant: "destructive"
        });
        return;
      }

      setTeamMembers(prev => prev.map(m => 
        m.id === memberId 
          ? { ...m, leads: m.leads + 1 }
          : m
      ));

      setAssignedLeads(prev => [...prev, leadId]);

      toast({
        title: "Lead Assigned",
        description: `${lead.name} has been assigned to ${member.name}`,
      });
    }
  };

  const handleViewDetails = (member: any) => {
    setSelectedMember(member);
    setIsViewDetailsModalOpen(true);
  };

  const handleAssignLeads = (member: any) => {
    toast({
      title: "Lead Assignment",
      description: `Opening lead assignment interface for ${member.name}`,
    });
  };

  const handleGenerateReports = () => {
    toast({
      title: "Generating Reports",
      description: "Team performance analytics are being compiled...",
    });
    
    setTimeout(() => {
      toast({
        title: "Reports Ready",
        description: "Team performance reports have been generated and are ready for download.",
      });
    }, 3000);
  };

  const handleScheduleReview = () => {
    toast({
      title: "Schedule Review",
      description: "Opening review scheduling interface for team members...",
    });
  };

  const handleSetTargets = () => {
    toast({
      title: "Set Targets",
      description: "Opening target setting interface for team KPIs...",
    });
  };

  const handleAddMember = (memberData: any) => {
    const newMember = {
      id: (teamMembers.length + 1).toString(),
      name: memberData.name,
      email: memberData.email,
      role: memberData.role,
      department: memberData.department,
      status: 'active',
      joinDate: memberData.joiningDate || new Date().toISOString().split('T')[0],
      performance: 0,
      targets: { monthly: 0, achieved: 0 },
      lastActive: 'Just joined',
      leads: 0,
      converted: 0,
      revenue: 0,
      target: 0,
      lastActivity: 'Just joined',
      capacity: 25
    };
    
    setTeamMembers(prevMembers => [...prevMembers, newMember]);
  };

  // Incentive data structure
  const incentiveData = [
    {
      id: '1',
      name: 'Rahul Sharma',
      currentEarnings: 45000,
      projectedEarnings: 62000,
      nextThreshold: 75000,
      progressToNext: 82.7,
      krasCompleted: 7,
      totalKras: 10,
      potentialBonus: 15000,
      isCloseToThreshold: true,
      thresholdName: 'Gold Tier',
      remainingAmount: 13000
    },
    {
      id: '3',
      name: 'Anjali Patel',
      currentEarnings: 38000,
      projectedEarnings: 48000,
      nextThreshold: 50000,
      progressToNext: 96.0,
      krasCompleted: 8,
      totalKras: 10,
      potentialBonus: 8000,
      isCloseToThreshold: true,
      thresholdName: 'Silver Plus',
      remainingAmount: 2000
    },
    {
      id: '4',
      name: 'Vikram Singh',
      currentEarnings: 28000,
      projectedEarnings: 35000,
      nextThreshold: 50000,
      progressToNext: 70.0,
      krasCompleted: 5,
      totalKras: 10,
      potentialBonus: 12000,
      isCloseToThreshold: false,
      thresholdName: 'Silver Plus',
      remainingAmount: 15000
    },
    {
      id: '5',
      name: 'Neha Gupta',
      currentEarnings: 52000,
      projectedEarnings: 68000,
      nextThreshold: 75000,
      progressToNext: 90.7,
      krasCompleted: 9,
      totalKras: 10,
      potentialBonus: 18000,
      isCloseToThreshold: true,
      thresholdName: 'Gold Tier',
      remainingAmount: 7000
    }
  ];

  const simulateKRACompletion = (memberId: string) => {
    const member = incentiveData.find(m => m.id === memberId);
    if (member) {
      const remainingKras = member.totalKras - member.krasCompleted;
      const additionalEarnings = remainingKras * 5000; // ₹5k per KRA
      const newProjected = member.projectedEarnings + additionalEarnings;
      
      toast({
        title: "KRA Simulation Complete",
        description: `If ${member.name} completes all remaining KRAs, projected earnings would be ₹${newProjected.toLocaleString()}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
  <div>
    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Supervisor Dashboard</h1>
    <p className="text-sm text-gray-600">Team management and performance oversight</p>
  </div>

  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3 w-full sm:w-auto">
    <Button 
      variant="outline" 
      size="sm"
      className="w-full sm:w-auto"
      onClick={() => setIsAddMemberModalOpen(true)}
    >
      <UserPlus size={16} className="mr-2" />
      Add Team Member
    </Button>

    <Button 
      size="sm" 
      className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto"
      onClick={() => setIsTeamSettingsModalOpen(true)}
    >
      <Settings size={16} className="mr-2" />
      Team Settings
    </Button>
  </div>
</div>


      {/* KPI Cards */}
      <SupervisorKPICards 
        teamMembersCount={teamMembers.length}
        unassignedLeadsCount={unassignedLeads.length}
      />

      {/* Quick Actions */}
      <SupervisorQuickActions 
        onGenerateReports={handleGenerateReports}
        onScheduleReview={handleScheduleReview}
        onSetTargets={handleSetTargets}
      />

      {/* Modals */}
      <AddTeamMemberModal 
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onAddMember={handleAddMember}
      />
      
      <TeamSettingsModal 
        isOpen={isTeamSettingsModalOpen}
        onClose={() => setIsTeamSettingsModalOpen(false)}
      />
      
      {selectedMember && (
        <ViewDetailsModal 
          isOpen={isViewDetailsModalOpen}
          onClose={() => {
            setIsViewDetailsModalOpen(false);
            setSelectedMember(null);
          }}
          member={selectedMember}
        />
      )}

      {/* Tabs - Removed quick-actions tab */}
      <Tabs defaultValue="overview" className="grid w-full  gap-1 h-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 py-2">Overview</TabsTrigger>
          <TabsTrigger value="team-performance" className="text-xs sm:text-sm px-2 py-2">Team Performance</TabsTrigger>
          <TabsTrigger value="incentive-management" className="text-xs sm:text-sm px-2 py-2">Incentive Management</TabsTrigger>
        </TabsList> 
    


        <TabsContent value="overview" className="space-y-6">
          <SupervisorOverview 
            unassignedLeads={unassignedLeads}
            teamMembers={teamMembers}
            onAutoAssign={handleAutoAssign}
            onAssignLead={handleAssignLead}
          />
        </TabsContent>

        <TabsContent value="team-performance" className="space-y-6">
          <SupervisorTeamPerformance 
            teamMembers={teamMembers}
            onViewDetails={handleViewDetails}
            onAssignLeads={handleAssignLeads}
          />
        </TabsContent>

        <TabsContent value="incentive-management" className="space-y-6">
          <SupervisorIncentiveManagement 
            incentiveData={incentiveData}
            onSimulateKRACompletion={simulateKRACompletion}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupervisorDashboard;
