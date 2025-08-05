
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Target,
  Award,
  Clock,
  Settings,
  Eye,
  FileText,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import AddTeamMemberModal from '@/components/team/AddTeamMemberModal';
import TeamSettingsModal from '@/components/team/TeamSettingsModal';
import ViewDetailsModal from '@/components/team/ViewDetailsModal';
import SetTargetsModal from '@/components/team/SetTargetsModal';
import ScheduleReviewModal from '@/components/team/ScheduleReviewModal';
import { useAuth } from '@/contexts/AuthContext';

const TeamManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Reset to first tab when user changes
  useEffect(() => {
    setActiveTab('overview');
  }, [user?.id]);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isSetTargetsOpen, setIsSetTargetsOpen] = useState(false);
  const [isScheduleReviewOpen, setIsScheduleReviewOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [targetMember, setTargetMember] = useState(null);

  const [teamMembers, setTeamMembers] = useState([
    { 
      id: '1', 
      name: 'Rahul Sharma', 
      email: 'rahul.sharma@bank.com',
      role: 'Senior Field Executive',
      department: 'Field Sales',
      status: 'active',
      joinDate: '2023-01-15',
      performance: 92,
      targets: { monthly: 15, achieved: 12 },
      lastActive: '2 hours ago'
    },
    { 
      id: '2', 
      name: 'Anjali Patel', 
      email: 'anjali.patel@bank.com',
      role: 'Field Executive',
      department: 'Inbound Sales',
      status: 'active',
      joinDate: '2023-03-20',
      performance: 88,
      targets: { monthly: 12, achieved: 11 },
      lastActive: '30 minutes ago'
    },
    { 
      id: '3', 
      name: 'Vikash Kumar', 
      email: 'vikash.kumar@bank.com',
      role: 'Field Executive',
      department: 'Field Sales',
      status: 'inactive',
      joinDate: '2022-11-10',
      performance: 76,
      targets: { monthly: 14, achieved: 8 },
      lastActive: '2 days ago'
    },
    { 
      id: '4', 
      name: 'Priya Singh', 
      email: 'priya.singh@bank.com',
      role: 'Senior Field Executive',
      department: 'Outbound Sales',
      status: 'active',
      joinDate: '2022-08-05',
      performance: 95,
      targets: { monthly: 18, achieved: 17 },
      lastActive: '1 hour ago'
    }
  ]);

  const handleAutoAssign = () => {
    toast({
      title: "Auto-Assignment Started",
      description: "Leads are being automatically assigned based on capacity and performance",
    });
  };

  const handleViewDetails = (member: any) => {
    setSelectedMember(member);
    setIsViewDetailsOpen(true);
  };

  const handleAssignLeads = (memberName: string) => {
    toast({
      title: "Lead Assignment",
      description: `Opening lead assignment for ${memberName}`,
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Performance Report Generated",
      description: "Team performance analytics report has been generated",
    });
  };

  const handleSetTargets = (member: any) => {
    setTargetMember(member);
    setIsSetTargetsOpen(true);
  };

  const handleEditMember = (member: any) => {
    toast({
      title: "Edit Member",
      description: `Opening edit form for ${member.name}`,
    });
    // You can add edit member modal logic here
  };

  const handleRemoveMember = (member: any) => {
    setTeamMembers(prevMembers => prevMembers.filter(m => m.id !== member.id));
    toast({
      title: "Member Removed",
      description: `${member.name} has been removed from the team`,
      variant: "destructive"
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
      lastActive: 'Just joined'
    };
    
    setTeamMembers(prevMembers => [...prevMembers, newMember]);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-blue-600';
    if (performance >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600">Manage team members and assignments</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings size={16} className="mr-2" />
            Team Settings
          </Button>
          <Button 
            variant="outline"
            onClick={handleAutoAssign}
          >
            <Target size={16} className="mr-2" />
            Auto-Assign
          </Button>
          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => setIsAddMemberOpen(true)}
          >
            <UserPlus size={16} className="mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          variant="outline" 
          className="h-16 justify-start"
          onClick={handleGenerateReport}
        >
          <FileText size={20} className="mr-3" />
          <div className="text-left">
            <p className="font-medium">Performance Reports</p>
            <p className="text-sm text-gray-500">Generate team analytics</p>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-16 justify-start"
          onClick={() => setIsScheduleReviewOpen(true)}
        >
          <Calendar size={20} className="mr-3" />
          <div className="text-left">
            <p className="font-medium">Schedule Review</p>
            <p className="text-sm text-gray-500">One-on-one team reviews</p>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-16 justify-start"
          onClick={() => setIsSetTargetsOpen(true)}
        >
          <Target size={20} className="mr-3" />
          <div className="text-left">
            <p className="font-medium">Set Targets</p>
            <p className="text-sm text-gray-500">Define goals and KPIs</p>
          </div>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Team Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Members</p>
                    <p className="text-2xl font-bold">{teamMembers.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Members</p>
                    <p className="text-2xl font-bold">{teamMembers.filter(m => m.status === 'active').length}</p>
                  </div>
                  <Award className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                    <p className="text-2xl font-bold">
                      {teamMembers.length > 0 ? Math.round(teamMembers.reduce((acc, m) => acc + m.performance, 0) / teamMembers.length) : 0}%
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-teal-100 text-teal-700">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-gray-500">{member.email}</p>
                        <p className="text-sm text-gray-500">{member.role} • {member.department}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getPerformanceColor(member.performance)}`}>
                          {member.performance}% Performance
                        </p>
                        <p className="text-xs text-gray-500">{member.lastActive}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewDetails(member)}
                        >
                          <Eye size={14} className="mr-1" />
                          View Details
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAssignLeads(member.name)}
                        >
                          Assign Leads
                        </Button>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleEditMember(member)}>
                            <Edit size={14} className="mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSetTargets(member)}>
                            <Target size={14} className="mr-2" />
                            Set Targets
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleRemoveMember(member)}
                          >
                            <Trash2 size={14} className="mr-2" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-teal-100 text-teal-700">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${getPerformanceColor(member.performance)}`}>
                        {member.performance}%
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Monthly Target</p>
                        <p className="font-medium">₹{member.targets.monthly}L</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Achieved</p>
                        <p className="font-medium">₹{member.targets.achieved}L</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Achievement Rate</p>
                        <p className="font-medium">{member.targets.monthly > 0 ? Math.round((member.targets.achieved / member.targets.monthly) * 100) : 0}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Clock size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Assignment Management</h3>
                <p className="text-gray-600 mb-4">Manage team member assignments and territories</p>
                <Button>Create New Assignment</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddTeamMemberModal 
        isOpen={isAddMemberOpen} 
        onClose={() => setIsAddMemberOpen(false)}
        onAddMember={handleAddMember}
      />
      
      <TeamSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
      
      <ViewDetailsModal 
        isOpen={isViewDetailsOpen} 
        onClose={() => setIsViewDetailsOpen(false)} 
        member={selectedMember}
      />
      
      <SetTargetsModal 
        isOpen={isSetTargetsOpen} 
        onClose={() => setIsSetTargetsOpen(false)}
        preSelectedMember={targetMember}
      />
      
      <ScheduleReviewModal 
        isOpen={isScheduleReviewOpen} 
        onClose={() => setIsScheduleReviewOpen(false)} 
      />
    </div>
  );
};

export default TeamManagement;
