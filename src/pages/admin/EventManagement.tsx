
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Play, Pause, Search, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddEventModal from '@/components/admin/AddEventModal';

interface SystemEvent {
  id: string;
  name: string;
  trigger: string;
  action: string;
  frequency: string;
  status: 'active' | 'inactive';
  lastExecuted: string;
  executionCount: number;
  successRate: number;
  nextExecution: string;
}

const mockEvents: SystemEvent[] = [
  {
    id: '1',
    name: 'Birthday Wishes',
    trigger: 'Customer Birthday',
    action: 'Send WhatsApp + Assign Task',
    frequency: 'Once per year',
    status: 'active',
    lastExecuted: '2024-01-15 09:30',
    executionCount: 245,
    successRate: 92,
    nextExecution: '2024-01-16 09:00'
  },
  {
    id: '2',
    name: 'FD Maturity Alert',
    trigger: 'FD Maturity - 30 days',
    action: 'Send SMS + Show Dashboard Nudge',
    frequency: 'Once per maturity',
    status: 'active',
    lastExecuted: '2024-01-15 08:15',
    executionCount: 89,
    successRate: 87,
    nextExecution: '2024-01-16 08:00'
  },
  {
    id: '3',
    name: 'EMI Due Reminder',
    trigger: 'EMI Due - 3 days',
    action: 'Send SMS + Email',
    frequency: 'Monthly',
    status: 'active',
    lastExecuted: '2024-01-14 10:00',
    executionCount: 156,
    successRate: 94,
    nextExecution: '2024-02-14 10:00'
  },
  {
    id: '4',
    name: 'Inactive Customer Reactivation',
    trigger: 'No transaction - 90 days',
    action: 'Assign Task to RM',
    frequency: 'Once every 90 days',
    status: 'inactive',
    lastExecuted: '2024-01-10 11:30',
    executionCount: 34,
    successRate: 76,
    nextExecution: 'N/A'
  }
];

const EventManagement = () => {
  const [events, setEvents] = useState<SystemEvent[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.trigger.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, status: event.status === 'active' ? 'inactive' : 'active' }
        : event
    ));
    
    const event = events.find(e => e.id === eventId);
    toast({
      title: "Event Status Updated",
      description: `${event?.name} has been ${event?.status === 'active' ? 'deactivated' : 'activated'}.`,
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
      toast({
        title: "Event Deleted",
        description: "Event has been deleted successfully.",
      });
    }
  };

  const handleAddEvent = (eventData: any) => {
    const newEvent: SystemEvent = {
      id: String(events.length + 1),
      ...eventData,
      status: 'active',
      lastExecuted: 'Never',
      executionCount: 0,
      successRate: 0,
      nextExecution: 'Pending'
    };
    setEvents([...events, newEvent]);
    setAddModalOpen(false);
    toast({
      title: "Event Created",
      description: "New event has been created successfully.",
    });
  };

  const activeEvents = events.filter(event => event.status === 'active').length;
  const totalExecutions = events.reduce((sum, event) => sum + event.executionCount, 0);
  const avgSuccessRate = Math.round(events.reduce((sum, event) => sum + event.successRate, 0) / events.length);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <Button onClick={() => setAddModalOpen(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-teal-600">{events.length}</div>
            <div className="text-sm text-gray-600">Total Events</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{activeEvents}</div>
            <div className="text-sm text-gray-600">Active Events</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{totalExecutions}</div>
            <div className="text-sm text-gray-600">Total Executions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{avgSuccessRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
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
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card>
  <CardHeader>
    <CardTitle>System Events ({filteredEvents.length})</CardTitle>
  </CardHeader>

  <CardContent>
    {/* Desktop Table View */}
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Trigger</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Next Execution</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.name}</TableCell>
              <TableCell>{event.trigger}</TableCell>
              <TableCell>{event.action}</TableCell>
              <TableCell>
                <Badge variant="outline">{event.frequency}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={event.status === 'active'}
                    onCheckedChange={() => handleToggleStatus(event.id)}
                  />
                  <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                    {event.status}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="font-medium">{event.executionCount} executions</div>
                  <div className="text-gray-500">{event.successRate}% success</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {event.nextExecution}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    {event.status === 'active' ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEvent(event.id)}
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
      {filteredEvents.map((event) => (
        <div key={event.id} className="border rounded-lg p-4 shadow-sm space-y-2">
          <div className="font-semibold text-base">{event.name}</div>
          <div><strong>Trigger:</strong> {event.trigger}</div>
          <div><strong>Action:</strong> {event.action}</div>
          <div><strong>Frequency:</strong> <Badge variant="outline">{event.frequency}</Badge></div>
          <div className="flex items-center gap-2">
            <strong>Status:</strong>
            <Switch
              checked={event.status === 'active'}
              onCheckedChange={() => handleToggleStatus(event.id)}
            />
            <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
              {event.status}
            </Badge>
          </div>
          <div>
            <strong>Performance:</strong>
            <div className="text-sm">
              <div className="font-medium">{event.executionCount} executions</div>
              <div className="text-gray-500">{event.successRate}% success</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Calendar className="h-3 w-3" />
            <span><strong>Next:</strong> {event.nextExecution}</span>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              {event.status === 'active' ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteEvent(event.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

      {/* Recent Executions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Event Executions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{event.name}</div>
                  <div className="text-sm text-gray-500">Last executed: {event.lastExecuted}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-600">{event.successRate}% success</div>
                  <div className="text-sm text-gray-500">{event.executionCount} total</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Event Modal */}
      <AddEventModal 
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddEvent}
      />
    </div>
  );
};

export default EventManagement;
