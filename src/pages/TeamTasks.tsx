import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Plus,
  Calendar as CalendarIcon,
  Target,
  Users,
  Activity,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RealTimeTeamMonitor from '@/components/supervisor/RealTimeTeamMonitor';
import ComprehensiveAnalytics from '@/components/analytics/ComprehensiveAnalytics';
import { useAuth } from '@/contexts/AuthContext';

const TeamTasks = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Reset to first tab when user changes
  useEffect(() => {
    setActiveTab('overview');
  }, [user?.id]);
  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);
  const [isCalendarViewOpen, setIsCalendarViewOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'Medium',
    dueDate: '',
    category: 'Campaign'
  });

  const teamTasks = [
    {
      id: '1',
      title: 'Q2 Sales Campaign Launch',
      description: 'Launch new personal loan campaign for Q2',
      assignedTo: 'Rahul Sharma',
      assigneeId: '1',
      priority: 'High',
      status: 'In Progress',
      progress: 75,
      dueDate: '2024-06-15',
      category: 'Campaign'
    },
    {
      id: '2',
      title: 'Customer Satisfaction Survey',
      description: 'Conduct monthly customer satisfaction survey',
      assignedTo: 'Anjali Patel',
      assigneeId: '2',
      priority: 'Medium',
      status: 'Pending',
      progress: 25,
      dueDate: '2024-06-20',
      category: 'Research'
    },
    {
      id: '3',
      title: 'Territory Analysis Report',
      description: 'Analyze territory performance and provide recommendations',
      assignedTo: 'Vikash Kumar',
      assigneeId: '3',
      priority: 'Medium',
      status: 'Completed',
      progress: 100,
      dueDate: '2024-06-10',
      category: 'Analysis'
    },
    {
      id: '4',
      title: 'Lead Qualification Training',
      description: 'Train team on new lead qualification processes',
      assignedTo: 'Priya Singh',
      assigneeId: '4',
      priority: 'High',
      status: 'In Progress',
      progress: 60,
      dueDate: '2024-06-18',
      category: 'Training'
    },
    {
      id: '5',
      title: 'Monthly Performance Review',
      description: 'Review and document monthly performance metrics',
      assignedTo: 'Rahul Sharma',
      assigneeId: '1',
      priority: 'Low',
      status: 'Overdue',
      progress: 40,
      dueDate: '2024-06-05',
      category: 'Review'
    }
  ];

  const teamMembers = [
    { id: '1', name: 'Rahul Sharma', activeTasks: 2, completedTasks: 8 },
    { id: '2', name: 'Anjali Patel', activeTasks: 1, completedTasks: 6 },
    { id: '3', name: 'Vikash Kumar', activeTasks: 1, completedTasks: 4 },
    { id: '4', name: 'Priya Singh', activeTasks: 1, completedTasks: 7 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'In Progress': return <Clock size={16} className="text-blue-600" />;
      case 'Overdue': return <AlertTriangle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const taskStats = {
    total: teamTasks.length,
    completed: teamTasks.filter(t => t.status === 'Completed').length,
    inProgress: teamTasks.filter(t => t.status === 'In Progress').length,
    overdue: teamTasks.filter(t => t.status === 'Overdue').length
  };

  const handleAssignTask = () => {
    setIsAssignTaskModalOpen(true);
  };

  const handleOpenCalendarView = () => {
    setIsCalendarViewOpen(true);
  };

  const handleSubmitTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.assignedTo || !newTask.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Task Assigned!",
      description: `"${newTask.title}" has been assigned to ${newTask.assignedTo}.`,
    });

    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'Medium',
      dueDate: '',
      category: 'Campaign'
    });
    setIsAssignTaskModalOpen(false);
  };

  const getTasksForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return teamTasks.filter(task => task.dueDate === dateString);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Team Management</h1>
          <p className="text-gray-600">Complete team oversight with real-time monitoring and analytics</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAssignTask}>
          <Plus size={16} className="mr-2" />
          Assign New Task
        </Button>
      </div>

      {/* Enhanced Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold">{taskStats.total}</p>
                <p className="text-xs text-gray-500">+5 this week</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">{taskStats.inProgress}</p>
                <p className="text-xs text-yellow-600">2 due today</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{taskStats.completed}</p>
                <p className="text-xs text-green-600">+3 today</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold">{taskStats.overdue}</p>
                <p className="text-xs text-red-600">Needs attention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Task Overview</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="monitor">Real-Time Monitor</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(task.status)}
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Assigned to: {task.assignedTo}</span>
                          <span>Due: {task.dueDate}</span>
                          <span>Category: {task.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Member Task Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-teal-100 text-teal-700">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-gray-500">Team Member</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Active Tasks</p>
                        <p className="text-lg font-bold text-blue-600">{member.activeTasks}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Completed</p>
                        <p className="text-lg font-bold text-green-600">{member.completedTasks}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-gray-600 mb-2">Current Tasks:</div>
                      <div className="space-y-1">
                        {teamTasks
                          .filter(task => task.assigneeId === member.id && task.status !== 'Completed')
                          .map(task => (
                            <div key={task.id} className="text-xs bg-gray-50 p-2 rounded">
                              {task.title} - {task.status}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitor" className="space-y-6">
          <RealTimeTeamMonitor />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <ComprehensiveAnalytics />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Task Calendar View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CalendarIcon size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar Integration</h3>
                <p className="text-gray-600 mb-4">View tasks in calendar format with due dates and milestones</p>
                <Button onClick={handleOpenCalendarView}>Open Calendar View</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assign New Task Modal */}
      <Dialog open={isAssignTaskModalOpen} onOpenChange={setIsAssignTaskModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Assign New Task</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmitTask} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter task description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assign To *</Label>
                <Select value={newTask.assignedTo} onValueChange={(value) => 
                  setNewTask(prev => ({ ...prev, assignedTo: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map(member => (
                      <SelectItem key={member.id} value={member.name}>{member.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={newTask.priority} onValueChange={(value) => 
                  setNewTask(prev => ({ ...prev, priority: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newTask.category} onValueChange={(value) => 
                  setNewTask(prev => ({ ...prev, category: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Campaign">Campaign</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Analysis">Analysis</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Assign Task
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsAssignTaskModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Calendar View Modal */}
      <Dialog open={isCalendarViewOpen} onOpenChange={setIsCalendarViewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Task Calendar View
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border pointer-events-auto"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">
                Tasks for {selectedDate?.toLocaleDateString() || 'Selected Date'}
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedDate ? getTasksForDate(selectedDate).map((task) => (
                  <div key={task.id} className="border rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(task.status)}
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{task.description}</p>
                    <p className="text-xs text-gray-500">Assigned to: {task.assignedTo}</p>
                  </div>
                )) : null}
                
                {selectedDate && getTasksForDate(selectedDate).length === 0 && (
                  <p className="text-gray-500 text-sm">No tasks scheduled for this date.</p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamTasks;
