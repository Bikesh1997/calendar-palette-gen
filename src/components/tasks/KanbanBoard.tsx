import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Clock, User, Calendar, Edit, Timer } from 'lucide-react';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import TaskTimeTracker from './TaskTimeTracker';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  leadId?: string;
  timeSpent?: number; // in minutes
  estimatedTime?: number; // in minutes
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Follow up with Rajesh Enterprises',
      description: 'Schedule product demo meeting',
      assignee: 'Rahul Sharma',
      priority: 'high',
      dueDate: '2024-06-05',
      status: 'todo',
      leadId: '1',
      timeSpent: 45,
      estimatedTime: 120
    },
    {
      id: '2',
      title: 'Prepare proposal for Tech Solutions',
      description: 'Create detailed loan proposal',
      assignee: 'Rahul Sharma',
      priority: 'high',
      dueDate: '2024-06-06',
      status: 'in_progress',
      leadId: '2',
      timeSpent: 90,
      estimatedTime: 180
    },
    {
      id: '3',
      title: 'Submit documentation review',
      description: 'Review and submit customer documents',
      assignee: 'Rahul Sharma',
      priority: 'medium',
      dueDate: '2024-06-04',
      status: 'review',
      leadId: '4',
      timeSpent: 60,
      estimatedTime: 90
    },
    {
      id: '4',
      title: 'Close deal with Construction Corp',
      description: 'Finalize contract signing',
      assignee: 'Rahul Sharma',
      priority: 'high',
      dueDate: '2024-06-03',
      status: 'completed',
      leadId: '6',
      timeSpent: 240,
      estimatedTime: 180
    }
  ]);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-50' },
    { id: 'in_progress', title: 'In Progress', color: 'bg-blue-50' },
    { id: 'review', title: 'Review', color: 'bg-yellow-50' },
    { id: 'completed', title: 'Completed', color: 'bg-green-50' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleAddTask = (newTaskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: (tasks.length + 1).toString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleEditTask = (taskId: string, updatedData: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, ...updatedData }
          : task
      )
    );
  };

  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
    setEditModalOpen(true);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const timeProgress = task.estimatedTime ? Math.min((task.timeSpent || 0) / task.estimatedTime * 100, 100) : 0;
    const isOverTime = task.timeSpent && task.estimatedTime && task.timeSpent > task.estimatedTime;

    return (
      <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow">
        <CardContent className="p-3">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-sm">{task.title}</h4>
            <div className="flex items-center gap-1">
              <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </Badge>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-6 w-6 p-0"
                onClick={() => handleTaskEdit(task)}
              >
                <Edit size={12} />
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-3">{task.description}</p>
          
          {/* Time tracking information */}
          {(task.timeSpent || task.estimatedTime) && (
            <div className="mb-3 p-2 bg-gray-50 rounded">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1">
                  <Timer size={10} />
                  Time
                </span>
                <span className={isOverTime ? 'text-red-600' : 'text-gray-600'}>
                  {task.timeSpent ? formatTime(task.timeSpent) : '0m'} / {task.estimatedTime ? formatTime(task.estimatedTime) : 'N/A'}
                </span>
              </div>
              {task.estimatedTime && (
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full ${isOverTime ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(timeProgress, 100)}%` }}
                  />
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {task.dueDate}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {task.assignee.split(' ')[0]}
            </div>
          </div>

          {/* Time Tracker Button */}
          <div className="mt-2 pt-2 border-t">
            <TaskTimeTracker taskId={task.id} taskTitle={task.title} />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Enhanced Task Management</h2>
        <AddTaskModal onAddTask={handleAddTask} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(column => (
          <div key={column.id} className={`rounded-lg p-4 ${column.color}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">{column.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {tasks.filter(task => task.status === column.id).length}
              </Badge>
            </div>
            
            <div className="space-y-2">
              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          </div>
        ))}
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          isOpen={editModalOpen}
          onOpenChange={setEditModalOpen}
          onEditTask={handleEditTask}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
