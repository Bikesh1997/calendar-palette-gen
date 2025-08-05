import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search,
  Eye,
  Edit,
  Kanban,
  Plus,
  Filter,
  Phone,
  MapPin,
  Mail,
  Clock,
  Calendar,
  TrendingUp,
  UserCheck,
  Sun
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import KanbanBoard from '@/components/tasks/KanbanBoard';
import DragDropKanbanBoard from '@/components/tasks/DragDropKanbanBoard';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import TaskFilter from '@/components/tasks/TaskFilter';
import NewCampaignModal from '@/components/campaigns/NewCampaignModal';
import CampaignDetailsModal from '@/components/campaigns/CampaignDetailsModal';
import { useAuth } from '@/contexts/AuthContext';
import { allLeads } from '@/data/leadsData';

const TaskManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    priority: 'all',
    status: 'all',
    date: new Date()
  });

  const [activeTab, setActiveTab] = useState('tasks');

  // Reset to first tab when user changes
  useEffect(() => {
    setActiveTab('tasks');
  }, [user?.id]);
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Follow up with Rajesh Enterprises',
      type: 'Call',
      customer: 'Rajesh Kumar',
      priority: 'High',
      dueDate: '2024-06-04',
      dueTime: '10:00 AM',
      status: 'pending',
      location: 'Phone Call',
      description: 'Discuss loan requirements and documentation'
    },
    {
      id: '2',
      title: 'Site visit to Tech Solutions Ltd',
      type: 'Visit',
      customer: 'Priya Patel',
      priority: 'Medium',
      dueDate: '2024-06-04',
      dueTime: '2:00 PM',
      status: 'pending',
      location: 'Andheri East, Mumbai',
      description: 'Present banking solutions and assess requirements'
    },
    {
      id: '3',
      title: 'Submit loan documentation',
      type: 'Documentation',
      customer: 'Manufacturing Co',
      priority: 'High',
      dueDate: '2024-06-04',
      dueTime: '4:00 PM',
      status: 'in_progress',
      location: 'Branch Office',
      description: 'Complete and submit loan application documents'
    },
    {
      id: '4',
      title: 'Email follow-up for insurance products',
      type: 'Email',
      customer: 'Retail Chain',
      priority: 'Low',
      dueDate: '2024-06-05',
      dueTime: '11:00 AM',
      status: 'pending',
      location: 'Email',
      description: 'Send detailed insurance product brochure'
    }
  ]);

  const campaignsData = [
    {
      id: 'camp-001',
      name: 'Summer Home Loan Drive',
      type: 'Product Campaign',
      target: '50 Applications',
      status: 'active' as const,
      startDate: '01 Jun 2024',
      endDate: '31 Aug 2024',
      progress: 65,
      leads: 127,
      conversions: 23
    },
    {
      id: 'camp-002', 
      name: 'Credit Card Acquisition',
      type: 'Customer Acquisition',
      target: '100 Cards',
      status: 'planned' as const,
      startDate: '15 Jul 2024',
      endDate: '15 Oct 2024',
      progress: 0,
      leads: 0,
      conversions: 0
    },
    {
      id: 'camp-003',
      name: 'Insurance Cross-sell',
      type: 'Cross-sell Campaign',
      target: '₹2Cr Premium',
      status: 'completed' as const,
      startDate: '01 Mar 2024',
      endDate: '31 May 2024',
      progress: 100,
      leads: 89,
      conversions: 34
    }
  ];

  const [campaigns, setCampaigns] = useState(campaignsData);

  // Smart Nudges data
  const smartNudges = [
    {
      icon: <TrendingUp size={20} className="text-blue-600" />,
      text: "80% of your recent FD closures came from customers aged 45–60. Prioritize this age group today for higher conversion.",
      bgColor: "bg-blue-50 border-blue-200"
    },
    {
      icon: <UserCheck size={20} className="text-green-600" />,
      text: "You have 5 inactive SHG customers within 2 km of your current location. Plan a quick visit to revive engagement.",
      bgColor: "bg-green-50 border-green-200"
    },
    {
      icon: <Sun size={20} className="text-orange-600" />,
      text: "Morning visits to Bandra yield 30% more conversions—consider rescheduling your visits before noon.",
      bgColor: "bg-orange-50 border-orange-200"
    }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         task.customer.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === 'all' || task.type === filters.type;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    
    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  const handleAddTask = (newTaskData: any) => {
    const newTask = {
      ...newTaskData,
      id: (tasks.length + 1).toString(),
      status: 'pending'
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleAddCampaign = (newCampaignData: any) => {
    const newCampaign = {
      ...newCampaignData,
      id: (campaigns.length + 1).toString(),
      progress: 0,
      leads: 0,
      conversions: 0
    };
    setCampaigns(prev => [...prev, newCampaign]);
  };

  const handleMarkComplete = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status: 'completed' }
          : task
      )
    );
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: "Task Completed!",
        description: `"${task.title}" has been marked as complete.`,
      });
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'Call': return <Phone size={16} className="text-blue-600" />;
      case 'Visit': return <MapPin size={16} className="text-green-600" />;
      case 'Email': return <Mail size={16} className="text-purple-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task & Campaign Management</h1>
          <p className="text-gray-600">Manage daily tasks and marketing campaigns</p>
        </div>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp size={18} className="mr-2" />
            Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {smartNudges.map((nudge, index) => (
              <div key={index} className={`p-3 border rounded-lg ${nudge.bgColor}`}>
                <div className="flex items-start space-x-3">
                  {nudge.icon}
                  <p className="text-sm text-gray-700">{nudge.text}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          {/* Task Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                  <div className="text-sm text-gray-600">Total Tasks</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{tasks.filter(t => t.status === 'pending').length}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === 'in_progress').length}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'completed').length}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Tasks</CardTitle>
                <div className="flex space-x-2">
                  <TaskFilter filters={filters} onFilterChange={setFilters} />
                  <AddTaskModal onAddTask={handleAddTask} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getTaskIcon(task.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{task.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar size={14} className="mr-1" />
                              {task.dueDate} at {task.dueTime}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin size={14} className="mr-1" />
                              {task.location}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Customer: <span className="font-medium">{task.customer}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                        {task.status !== 'completed' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMarkComplete(task.id)}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{campaigns.filter(c => c.status === 'active').length}</div>
                  <div className="text-sm text-gray-600">Active Campaigns</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{campaigns.filter(c => c.status === 'planned').length}</div>
                  <div className="text-sm text-gray-600">Planned</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">₹45L</div>
                  <div className="text-sm text-gray-600">Revenue Generated</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">18.5%</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Marketing Campaigns</CardTitle>
                <NewCampaignModal onAddCampaign={handleAddCampaign} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>Type: {campaign.type}</span>
                          <span>Target: {campaign.target}</span>
                          <span>{campaign.startDate} - {campaign.endDate}</span>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm font-medium">{campaign.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-teal-600 h-2 rounded-full" 
                              style={{ width: `${campaign.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex space-x-6 mt-3 text-sm">
                          <span>Leads: <span className="font-medium">{campaign.leads}</span></span>
                          <span>Conversions: <span className="font-medium">{campaign.conversions}</span></span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </Badge>
                        <CampaignDetailsModal campaign={campaign} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskManagement;
