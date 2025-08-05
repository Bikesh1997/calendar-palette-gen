import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  MapPin, 
  Phone, 
  Users, 
  FileText, 
  Star, 
  Clock, 
  CheckCircle, 
  Zap,
  Trophy,
  Target,
  Timer,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface GameTask {
  id: string;
  title: string;
  description: string;
  type: 'visit' | 'call' | 'meeting' | 'documentation';
  xpReward: number;
  timeEstimate: number;
  priority: 'easy' | 'medium' | 'hard';
  status: 'pending' | 'in_progress' | 'completed';
  deadline: string;
  location?: string;
  customer?: string;
}

const GameifiedTaskList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [tasks, setTasks] = useState<GameTask[]>([
    {
      id: '1',
      title: 'Visit Priya SHG 🏠',
      description: 'Conduct SHG formation meeting',
      type: 'visit',
      xpReward: 50,
      timeEstimate: 45,
      priority: 'medium',
      status: 'pending',
      deadline: '10:00 AM',
      location: 'Ward 3, Sector 12',
      customer: 'Heena Thakkar'
    },
    {
      id: '2',
      title: 'Follow-up Call Sprint 📞',
      description: 'Make 5 follow-up calls to pending leads',
      type: 'call',
      xpReward: 30,
      timeEstimate: 25,
      priority: 'easy',
      status: 'in_progress',
      deadline: '11:30 AM',
      customer: 'Multiple Leads'
    },
    {
      id: '3',
      title: 'Loan Document Collection 📋',
      description: 'Collect and verify loan application documents',
      type: 'documentation',
      xpReward: 25,
      timeEstimate: 30,
      priority: 'easy',
      status: 'completed',
      deadline: '2:00 PM',
      customer: 'Rajesh Kumar'
    },
    {
      id: '4',
      title: 'Community Meeting 👥',
      description: 'Facilitate financial literacy session',
      type: 'meeting',
      xpReward: 75,
      timeEstimate: 90,
      priority: 'hard',
      status: 'pending',
      deadline: '4:00 PM',
      location: 'Community Center'
    }
  ]);

  const [showCelebration, setShowCelebration] = useState<string | null>(null);

  const completeTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status === 'completed') return;

    setTasks(prev => 
      prev.map(t => 
        t.id === taskId 
          ? { ...t, status: 'completed' } 
          : t
      )
    );

    // Show celebration
    setShowCelebration(taskId);
    setTimeout(() => setShowCelebration(null), 2000);

    toast({
      title: "🎉 Mission Complete!",
      description: `${task.title} completed! +${task.xpReward} XP earned!`,
    });
  };

  const startTask = (taskId: string) => {
    setTasks(prev => 
      prev.map(t => 
        t.id === taskId 
          ? { ...t, status: 'in_progress' } 
          : t
      )
    );

    const task = tasks.find(t => t.id === taskId);
    toast({
      title: "🚀 Mission Started!",
      description: `Started working on: ${task?.title}`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'visit': return <MapPin className="h-4 w-4 text-blue-600" />;
      case 'call': return <Phone className="h-4 w-4 text-green-600" />;
      case 'meeting': return <Users className="h-4 w-4 text-purple-600" />;
      case 'documentation': return <FileText className="h-4 w-4 text-orange-600" />;
      default: return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  const getPriorityXPMultiplier = (priority: string) => {
    switch (priority) {
      case 'easy': return '⭐';
      case 'medium': return '⭐⭐';
      case 'hard': return '⭐⭐⭐';
      default: return '⭐';
    }
  };

  // Only show for Field Executives
  // if (user?.role !== 'sales_executive') {
  //   return null;
  // }

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalXP = tasks.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.xpReward, 0);

  return (
    <div className="space-y-6">
      {/* Task Overview Header */}
      {/* <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Daily Mission Board 🎯</h2>
              <p className="text-orange-100">Complete missions to earn XP and level up!</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{totalXP} XP</div>
              <div className="text-sm text-orange-100">Earned Today</div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">{completedTasks}</div>
              <div className="text-xs text-orange-100">Missions Complete</div>
            </div>
            <div>
              <div className="text-lg font-bold">{tasks.filter(t => t.status === 'in_progress').length}</div>
              <div className="text-xs text-orange-100">In Progress</div>
            </div>
            <div>
              <div className="text-lg font-bold">{tasks.filter(t => t.status === 'pending').length}</div>
              <div className="text-xs text-orange-100">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-xl">
            <div className="flex items-center">
              <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
              Today's Missions 🚀
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {completedTasks}/{tasks.length} Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => {
              const isCelebrating = showCelebration === task.id;
              
              return (
                <div 
                  key={task.id} 
                  className={`border rounded-lg p-4 transition-all duration-300 ${
                    isCelebrating ? 'animate-bounce-in ring-4 ring-yellow-400 bg-yellow-50' : ''
                  } ${
                    task.status === 'completed' ? 'bg-green-50 border-green-200' : 
                    task.status === 'in_progress' ? 'bg-blue-50 border-blue-200' : 
                    'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Checkbox */}
                    <div className="mt-1">
                      <Checkbox
                        checked={task.status === 'completed'}
                        onCheckedChange={() => task.status !== 'completed' && completeTask(task.id)}
                        className="w-5 h-5"
                      />
                    </div>
                    
                    {/* Task Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            {getTypeIcon(task.type)}
                            <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </h4>
                            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                              {getPriorityXPMultiplier(task.priority)} {task.priority}
                            </Badge>
                          </div>
                          <p className={`text-sm ${task.status === 'completed' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {task.description}
                          </p>
                        </div>
                        
                        {/* XP Reward */}
                        <div className="text-right">
                          <div className="flex items-center text-yellow-600">
                            <Star className="h-4 w-4 mr-1" />
                            <span className="font-bold">+{task.xpReward} XP</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Task Details */}
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {task.timeEstimate} min
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Due: {task.deadline}
                        </div>
                        {task.location && (
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {task.location}
                          </div>
                        )}
                        {task.customer && (
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {task.customer}
                          </div>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        {task.status === 'pending' && (
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => startTask(task.id)}
                          >
                            <Zap className="mr-1 h-3 w-3" />
                            Start Mission
                          </Button>
                        )}
                        
                        {task.status === 'in_progress' && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => completeTask(task.id)}
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Complete +{task.xpReward} XP
                          </Button>
                        )}
                        
                        {task.status === 'completed' && (
                          <div className="flex items-center text-green-600">
                            <Trophy className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">Mission Complete! 🎉</span>
                          </div>
                        )}
                        
                        {/* Progress Indicator */}
                        <div className="ml-auto">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Daily Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Target className="mr-2 h-5 w-5 text-green-500" />
            Daily Performance 📊
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-700">{totalXP}</div>
              <div className="text-sm text-blue-600">Total XP Earned</div>
              <div className="text-xs text-gray-500 mt-1">Great progress! 🌟</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-700">{completedTasks}</div>
              <div className="text-sm text-green-600">Missions Complete</div>
              <div className="text-xs text-gray-500 mt-1">Keep it up! 💪</div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-700">
                {tasks.reduce((sum, t) => t.status === 'completed' ? sum + t.timeEstimate : sum, 0)} min
              </div>
              <div className="text-sm text-yellow-600">Time Invested</div>
              <div className="text-xs text-gray-500 mt-1">Productive day! ⏰</div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-700">
                {Math.round((completedTasks / tasks.length) * 100)}%
              </div>
              <div className="text-sm text-purple-600">Success Rate</div>
              <div className="text-xs text-gray-500 mt-1">Outstanding! 🎯</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameifiedTaskList;