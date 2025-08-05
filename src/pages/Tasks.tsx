import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Target,
  Route,
  Bell,
  Calendar,
  IndianRupee,
  Award,
  Navigation,
  User,
  PhoneCall
} from 'lucide-react';
import DragDropKanbanBoard from '@/components/tasks/DragDropKanbanBoard';
import CallInProgressModal from '@/components/leads/CallInProgressModal';
import { useToast } from '@/hooks/use-toast';
import GameifiedTaskList from '@/components/gamification/GameifiedTaskList';

const Tasks = () => {
  const { toast } = useToast();
  
  const [callPopupOpen, setCallPopupOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  
  const [todaysTasks, setTodaysTasks] = useState([
    {
      id: '1',
      title: 'Visit Mrs. Heena Thakkar - SHG Formation',
      type: 'visit',
      priority: 'High',
      time: '10:00 AM',
      location: 'Ward 3, Sector 12',
      status: 'pending',
      estimatedDuration: '45 min'
    },
    {
      id: '2',
      title: 'Follow up with Rajesh Enterprises - Loan Documentation',
      type: 'call',
      priority: 'High',
      time: '11:30 AM',
      location: 'Phone Call',
      status: 'pending',
      estimatedDuration: '20 min'
    },
    {
      id: '3',
      title: 'Submit 3 loan applications',
      type: 'documentation',
      priority: 'Medium',
      time: '2:00 PM',
      location: 'Branch Office',
      status: 'completed',
      estimatedDuration: '60 min'
    },
    {
      id: '4',
      title: 'Group meeting - Financial Literacy',
      type: 'meeting',
      priority: 'Medium',
      time: '4:00 PM',
      location: 'Community Center',
      status: 'pending',
      estimatedDuration: '90 min'
    }
  ]);

  const beatPlanRoute = [
    {
      id: '1',
      customerName: 'Sunita Women SHG',
      address: 'Ward 3, Sector 12, Near Temple',
      eta: '10:00 AM',
      priority: 'High',
      purpose: 'SHG Formation Meeting',
      phone: '+91 98765 43210'
    },
    {
      id: '2',
      customerName: 'Lakshmi Self Help Group',
      address: 'Ward 5, Main Market Road',
      eta: '12:30 PM',
      priority: 'Medium',
      purpose: 'Loan Application Review',
      phone: '+91 98765 43211'
    },
    {
      id: '3',
      customerName: 'Devi Micro Finance Group',
      address: 'Ward 7, Community Hall',
      eta: '3:00 PM',
      priority: 'High',
      purpose: 'Insurance Product Demo',
      phone: '+91 98765 43212'
    }
  ];

  const pendingFollowups = [
    {
      id: '1',
      leadName: 'Meera Tailoring Group',
      daysOverdue: 3,
      value: '₹2,50,000',
      lastContact: '3 days ago',
      riskLevel: 'High',
      nudge: 'Call this lead now to prevent drop-off',
      phone: '+91 98765 43210'
    },
    {
      id: '2',
      leadName: 'Anita Handicrafts SHG',
      daysOverdue: 1,
      value: '₹1,80,000',
      lastContact: '1 day ago',
      riskLevel: 'Medium',
      nudge: 'Schedule visit within 24 hours',
      phone: '+91 98765 43211'
    },
    {
      id: '3',
      leadName: 'Kavita Food Processing',
      daysOverdue: 5,
      value: '₹3,20,000',
      lastContact: '5 days ago',
      riskLevel: 'Critical',
      nudge: 'Immediate action required - high value lead',
      phone: '+91 98765 43212'
    }
  ];

  const kraMetrics = {
    shgsCreated: { current: 8, target: 12, label: 'SHGs Created' },
    leadsConverted: { current: 15, target: 20, label: 'Leads Converted' },
    followupsPending: { current: 7, target: 5, label: 'Follow-ups Pending' },
    monthlyTarget: { current: 18, target: 25, label: 'Monthly Conversions' }
  };

  const incentiveProgress = {
    current: 10,
    target: 12,
    reward: '₹1,000',
    description: '2 more SHGs to earn',
    progress: (10/12) * 100
  };

  const aiNudges = [
    {
      id: '1',
      type: 'insight',
      title: 'High Conversion Area Identified',
      message: '80% of your recent FD closures came from customers aged 45–60. Prioritize this age group today for higher conversion',
      priority: 'High',
      icon: TrendingUp
    },
    {
      id: '2',
      type: 'timing',
      title: 'Optimal Visit Time',
      message: 'You have 5 inactive SHG customers within 2 km of your current location. Plan a quick visit to revive engagement.',
      priority: 'Medium',
      icon: Clock
    },
    {
      id: '3',
      type: 'product',
      title: 'Cross-sell Opportunity',
      message: 'Morning visits to Bandra yield 30% more conversions—consider rescheduling your visits before noon',
      priority: 'Medium',
      icon: Target
    }
  ];

  const toggleTaskComplete = (taskId: string) => {
    setTodaysTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
    
    const task = todaysTasks.find(t => t.id === taskId);
    toast({
      title: task?.status === 'completed' ? "Task Unmarked" : "Task Completed!",
      description: task?.status === 'completed' ? "Task moved back to pending" : "Great job completing this task!",
    });
  };

  const handleCall = (phone: string, name: string) => {
    toast({
      title: "Calling...",
      description: `Initiating call to ${name}`,
    });
  };

  const handleCallNow = (contact: any) => {
    setSelectedContact(contact);
    setCallPopupOpen(true);
  };

  const handleStartCall = () => {
    setCallPopupOpen(false);
    setCallModalOpen(true);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'visit': return <MapPin size={16} className="text-blue-600" />;
      case 'call': return <Phone size={16} className="text-green-600" />;
      case 'meeting': return <Users size={16} className="text-purple-600" />;
      case 'documentation': return <CheckCircle size={16} className="text-orange-600" />;
      default: return <Clock size={16} />;
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enhanced Task Management</h1>
          <p className="text-gray-600">Your complete daily dashboard for field operations</p>
        </div>
      </div>

      {/* Top Row - Today's Tasks only */}
      <div className="grid grid-cols-1 gap-6">
        {/* Today's Tasks */}
              <GameifiedTaskList/>

        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Today's Tasks ({todaysTasks.filter(t => t.status === 'pending').length} pending)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysTasks.map((task) => (
                <div key={task.id} className={`p-3 border rounded-lg ${task.status === 'completed' ? 'bg-gray-50 opacity-75' : 'bg-white'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Checkbox
                        checked={task.status === 'completed'}
                        onCheckedChange={() => toggleTaskComplete(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                          <span className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            {task.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin size={12} className="mr-1" />
                            {task.location}
                          </span>
                          <span>{task.estimatedDuration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTaskIcon(task.type)}
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Middle Row - Pending Follow-ups and Incentive Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Follow-ups - removed background colors */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
              Pending Follow-ups ({pendingFollowups.length} overdue)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingFollowups.map((followup) => (
                <div key={followup.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">{followup.leadName}</h4>
                        <Badge className={`text-xs ${getRiskColor(followup.riskLevel)}`}>
                          {followup.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-xs font-medium text-orange-700 mt-1">{followup.nudge}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
                        <span>{followup.daysOverdue} days overdue</span>
                        <span>Value: {followup.value}</span>
                        <span>Last: {followup.lastContact}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-orange-600 hover:bg-orange-700"
                      onClick={() => handleCallNow(followup)}
                    >
                      <Phone size={12} className="mr-1" />
                      Call Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Incentive Progress Bar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-purple-500" />
              Incentive Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{incentiveProgress.current}/{incentiveProgress.target}</div>
                <div className="text-sm text-gray-600">SHGs Created</div>
              </div>
              <Progress value={incentiveProgress.progress} className="h-3" />
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{incentiveProgress.reward}</div>
                <div className="text-sm text-gray-600">{incentiveProgress.description}</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <div className="text-sm font-medium text-purple-800">
                  83% Complete! Almost there! 🎯
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - KRA Summary and AI Nudges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KRA Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              KRA Summary Card
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(kraMetrics).map(([key, metric]) => (
                <div key={key} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {metric.current}/{metric.target}
                    </div>
                    <div className="text-xs text-gray-600">{metric.label}</div>
                    <Progress 
                      value={(metric.current / metric.target) * 100} 
                      className="h-2 mt-2" 
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.round((metric.current / metric.target) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Nudges/Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiNudges.map((nudge) => (
                <div key={nudge.id} className="p-3 border rounded-lg bg-gradient-to-r from-blue-50 to-teal-50">
                  <div className="flex items-start space-x-3">
                    <nudge.icon className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900">{nudge.title}</h4>
                      <p className="text-xs text-gray-700 mt-1">{nudge.message}</p>
                      <Badge className={`text-xs mt-2 ${getPriorityColor(nudge.priority)}`}>
                        {nudge.priority} Priority
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Original Kanban Board */}
      <Card>
        <CardHeader>
          <CardTitle>Task Board</CardTitle>
        </CardHeader>
        <CardContent>
          <DragDropKanbanBoard />
        </CardContent>
      </Card>

      {/* Call Popup Modal */}
      <Dialog open={callPopupOpen} onOpenChange={setCallPopupOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Initiate Call</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">{selectedContact.leadName}</h3>
                <p className="text-gray-600 font-mono">{selectedContact.phone}</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleStartCall}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <PhoneCall size={16} className="mr-2" />
                  Start Call
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setCallPopupOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Call In Progress Modal */}
      {selectedContact && (
        <CallInProgressModal
          isOpen={callModalOpen}
          onOpenChange={setCallModalOpen}
          prospectName={selectedContact.leadName}
          businessName=""
          phoneNumber={selectedContact.phone}
        />
      )}
    </div>
  );
};

export default Tasks;
