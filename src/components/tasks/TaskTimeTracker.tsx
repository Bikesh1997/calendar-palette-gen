
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Play, Pause, Square, Clock, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TimeEntry {
  id: string;
  startTime: string;
  endTime?: string;
  duration: number; // in minutes
  description: string;
  date: string;
}

interface TaskTimeTrackerProps {
  taskId: string;
  taskTitle: string;
}

const TaskTimeTracker = ({ taskId, taskTitle }: TaskTimeTrackerProps) => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentSession, setCurrentSession] = useState<{ startTime: Date; description: string } | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showAddManual, setShowAddManual] = useState(false);
  const [manualEntry, setManualEntry] = useState({
    duration: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const { toast } = useToast();

  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    {
      id: '1',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      duration: 90,
      description: 'Initial client research and preparation',
      date: '2024-06-04'
    },
    {
      id: '2',
      startTime: '2:00 PM',
      endTime: '2:45 PM',
      duration: 45,
      description: 'Follow-up phone call',
      date: '2024-06-04'
    }
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && currentSession) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - currentSession.startTime.getTime()) / 1000 / 60);
        setElapsedTime(elapsed);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, currentSession]);

  const startTracking = () => {
    const description = prompt('What are you working on?') || 'Task work';
    setCurrentSession({
      startTime: new Date(),
      description
    });
    setIsTracking(true);
    setElapsedTime(0);
    toast({
      title: "Timer Started",
      description: "Time tracking has begun for this task.",
    });
  };

  const pauseTracking = () => {
    setIsTracking(false);
    toast({
      title: "Timer Paused",
      description: "Time tracking has been paused.",
    });
  };

  const stopTracking = () => {
    if (!currentSession) return;

    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - currentSession.startTime.getTime()) / 1000 / 60);

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      startTime: currentSession.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration,
      description: currentSession.description,
      date: new Date().toISOString().split('T')[0]
    };

    setTimeEntries(prev => [newEntry, ...prev]);
    setCurrentSession(null);
    setIsTracking(false);
    setElapsedTime(0);

    toast({
      title: "Time Logged",
      description: `${duration} minutes logged for this task.`,
    });
  };

  const addManualEntry = () => {
    if (!manualEntry.duration || !manualEntry.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    const duration = parseInt(manualEntry.duration);
    const entry: TimeEntry = {
      id: Date.now().toString(),
      startTime: 'Manual Entry',
      duration,
      description: manualEntry.description,
      date: manualEntry.date
    };

    setTimeEntries(prev => [entry, ...prev]);
    setManualEntry({ duration: '', description: '', date: new Date().toISOString().split('T')[0] });
    setShowAddManual(false);

    toast({
      title: "Time Entry Added",
      description: `${duration} minutes added manually.`,
    });
  };

  const totalTime = timeEntries.reduce((sum, entry) => sum + entry.duration, 0);
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Clock size={16} className="mr-2" />
          Time Tracker
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Time Tracking - {taskTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Timer */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Current Session</h3>
              <Badge variant="outline">
                Total: {formatTime(totalTime)}
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-2xl font-mono">
                {formatTime(elapsedTime)}
              </div>
              
              <div className="flex space-x-2">
                {!isTracking && !currentSession && (
                  <Button onClick={startTracking} size="sm">
                    <Play size={16} className="mr-2" />
                    Start
                  </Button>
                )}
                
                {isTracking && (
                  <Button onClick={pauseTracking} variant="outline" size="sm">
                    <Pause size={16} className="mr-2" />
                    Pause
                  </Button>
                )}
                
                {currentSession && (
                  <Button onClick={stopTracking} variant="destructive" size="sm">
                    <Square size={16} className="mr-2" />
                    Stop
                  </Button>
                )}
                
                <Button onClick={() => setShowAddManual(true)} variant="outline" size="sm">
                  <Plus size={16} className="mr-2" />
                  Manual Entry
                </Button>
              </div>
            </div>

            {currentSession && (
              <p className="text-sm text-gray-600 mt-2">
                Working on: {currentSession.description}
              </p>
            )}
          </div>

          {/* Manual Entry Form */}
          {showAddManual && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">Add Manual Time Entry</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={manualEntry.duration}
                    onChange={(e) => setManualEntry(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="60"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={manualEntry.date}
                    onChange={(e) => setManualEntry(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={manualEntry.description}
                  onChange={(e) => setManualEntry(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What did you work on?"
                  rows={2}
                />
              </div>
              <div className="flex space-x-2 mt-4">
                <Button onClick={addManualEntry} size="sm">Add Entry</Button>
                <Button onClick={() => setShowAddManual(false)} variant="outline" size="sm">Cancel</Button>
              </div>
            </div>
          )}

          {/* Time Entries */}
          <div>
            <h3 className="font-medium mb-3">Time Entries</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {timeEntries.map((entry) => (
                <div key={entry.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{entry.description}</p>
                      <div className="text-sm text-gray-600">
                        {entry.endTime ? (
                          <span>{entry.startTime} - {entry.endTime}</span>
                        ) : (
                          <span>{entry.startTime}</span>
                        )}
                        <span className="ml-2">• {entry.date}</span>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {formatTime(entry.duration)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskTimeTracker;
