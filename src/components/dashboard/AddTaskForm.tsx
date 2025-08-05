
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Phone, MapPin, UserCheck, CheckCircle, X } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  type: 'call' | 'visit' | 'meeting' | 'task';
  time: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  location?: string;
  contact?: string;
  description?: string;
}

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  onCancel: () => void;
}

const AddTaskForm = ({ onAddTask, onCancel }: AddTaskFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'call' as 'call' | 'visit' | 'meeting' | 'task',
    time: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    location: '',
    contact: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.time) return;

    onAddTask({
      title: formData.title,
      type: formData.type,
      time: formData.time,
      priority: formData.priority,
      location: formData.location || undefined,
      contact: formData.contact || undefined,
      description: formData.description || undefined
    });

    // Reset form
    setFormData({
      title: '',
      type: 'call',
      time: '',
      priority: 'Medium',
      location: '',
      contact: '',
      description: ''
    });
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone size={16} className="text-green-600" />;
      case 'visit': return <MapPin size={16} className="text-blue-600" />;
      case 'meeting': return <UserCheck size={16} className="text-purple-600" />;
      case 'task': return <CheckCircle size={16} className="text-orange-600" />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            {getTaskIcon(formData.type)}
            <span className="ml-2">Add New Task</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Task Type</Label>
              <Select value={formData.type} onValueChange={(value: 'call' | 'visit' | 'meeting' | 'task') => 
                setFormData(prev => ({ ...prev, type: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="visit">Visit</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value: 'High' | 'Medium' | 'Low') => 
                setFormData(prev => ({ ...prev, priority: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.type === 'call') && (
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="+91 98765 43210"
                />
              </div>
            )}

            {(formData.type === 'visit' || formData.type === 'meeting') && (
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter location"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Add Task
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTaskForm;
