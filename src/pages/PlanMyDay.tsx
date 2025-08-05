import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Clock, 
  Route, 
  CheckCircle,
  Navigation,
  Phone,
  User,
  Calendar,
  Target
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CustomerVisit {
  id: string;
  name: string;
  address: string;
  phone: string;
  priority: 'High' | 'Medium' | 'Low';
  purpose: string;
  estimatedDuration: number;
  eta: string;
  distance: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  latitude: number;
  longitude: number;
}

const PlanMyDay = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null);

  // Sample customer visits data
  const [visits, setVisits] = useState<CustomerVisit[]>([
    {
      id: '1',
      name: 'Heena Thakkar',
      address: 'Bandra West, Mumbai 400050',
      phone: '+91 98765 43210',
      priority: 'High',
      purpose: 'Home Loan Discussion',
      estimatedDuration: 45,
      eta: '9:30 AM',
      distance: '2.3 km',
      status: 'pending',
      latitude: 19.0544,
      longitude: 72.8270
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      address: 'Andheri East, Mumbai 400069',
      phone: '+91 98765 43211',
      priority: 'Medium',
      purpose: 'Investment Advisory',
      estimatedDuration: 30,
      eta: '11:00 AM',
      distance: '4.1 km',
      status: 'pending',
      latitude: 19.1136,
      longitude: 72.8697
    },
    {
      id: '3',
      name: 'Anita Patel',
      address: 'Powai, Mumbai 400076',
      phone: '+91 98765 43212',
      priority: 'High',
      purpose: 'Credit Card Application',
      estimatedDuration: 20,
      eta: '12:00 PM',
      distance: '6.8 km',
      status: 'pending',
      latitude: 19.1197,
      longitude: 72.9060
    },
    {
      id: '4',
      name: 'Vikram Singh',
      address: 'Worli, Mumbai 400018',
      phone: '+91 98765 43213',
      priority: 'Medium',
      purpose: 'Portfolio Review',
      estimatedDuration: 60,
      eta: '2:30 PM',
      distance: '8.2 km',
      status: 'pending',
      latitude: 19.0176,
      longitude: 72.8133
    },
    {
      id: '5',
      name: 'Sunita Devi',
      address: 'Kurla West, Mumbai 400070',
      phone: '+91 98765 43214',
      priority: 'Low',
      purpose: 'Account Opening',
      estimatedDuration: 25,
      eta: '4:00 PM',
      distance: '5.5 km',
      status: 'pending',
      latitude: 19.0728,
      longitude: 72.8826
    }
  ]);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'skipped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-orange-100 text-orange-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <Target className="h-4 w-4 text-orange-600" />;
    }
  };

  const handleStatusChange = (visitId: string, newStatus: CustomerVisit['status']) => {
    setVisits(prev => prev.map(visit => 
      visit.id === visitId ? { ...visit, status: newStatus } : visit
    ));
    
    const visit = visits.find(v => v.id === visitId);
    if (visit) {
      toast({
        title: "Visit Status Updated",
        description: `${visit.name} marked as ${newStatus.replace('_', ' ')}`,
      });
    }
  };

  const handleCall = (visit: CustomerVisit) => {
    toast({
      title: "Calling Customer",
      description: `Initiating call to ${visit.name}`,
    });
  };

  const handleNavigate = (visit: CustomerVisit) => {
    toast({
      title: "Navigation Started",
      description: `Navigating to ${visit.name}'s location`,
    });
  };

  // Calculate completion stats
  const completedVisits = visits.filter(v => v.status === 'completed').length;
  const totalVisits = visits.length;
  const progressPercentage = (completedVisits / totalVisits) * 100;
  const totalDistance = visits.reduce((sum, visit) => sum + parseFloat(visit.distance), 0);
  const estimatedTotalTime = visits.reduce((sum, visit) => sum + visit.estimatedDuration, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Day</h1>
          <p className="text-gray-600">
            Optimized route planning for {currentTime.toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Current Time</p>
          <p className="text-lg font-semibold">{currentTime.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Daily Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Visits</p>
                <p className="text-2xl font-bold">{totalVisits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{completedVisits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Route className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Distance</p>
                <p className="text-2xl font-bold">{totalDistance.toFixed(1)} km</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Est. Time</p>
                <p className="text-2xl font-bold">{Math.floor(estimatedTotalTime / 60)}h {estimatedTotalTime % 60}m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Daily Progress</h3>
            <span className="text-sm text-gray-600">{completedVisits}/{totalVisits} visits completed</span>
          </div>
          <Progress value={progressPercentage} className="w-full h-3" />
          <p className="text-sm text-gray-600 mt-2">{progressPercentage.toFixed(0)}% of daily visits completed</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Customer Visits List */}
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Today's Customer Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {visits.map((visit) => (
                <div 
                  key={visit.id} 
                  className={`border rounded-lg p-4 transition-colors ${
                    selectedVisit === visit.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedVisit(visit.id === selectedVisit ? null : visit.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(visit.status)}
                        <h4 className="font-medium">{visit.name}</h4>
                        <Badge className={`text-xs ${getPriorityColor(visit.priority)}`}>
                          {visit.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{visit.purpose}</p>
                      <p className="text-xs text-gray-500">{visit.address}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-xs ${getStatusColor(visit.status)}`}>
                        {visit.status.replace('_', ' ')}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">ETA: {visit.eta}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{visit.distance} • {visit.estimatedDuration} min</span>
                    <span>{visit.phone}</span>
                  </div>

                  <div className="flex space-x-2">
                    {visit.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(visit.id, 'in_progress');
                          }}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Start Visit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCall(visit);
                          }}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      </>
                    )}
                    
                    {visit.status === 'in_progress' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(visit.id, 'completed');
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(visit.id, 'skipped');
                          }}
                        >
                          Skip
                        </Button>
                      </>
                    )}
                    
                    {(visit.status === 'pending' || visit.status === 'in_progress') && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigate(visit);
                        }}
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        Navigate
                      </Button>
                    )}
                    
                    {visit.status === 'completed' && (
                      <div className="flex items-center text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Visit Completed
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Map Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Optimized Route Map
              <Badge className="ml-2 bg-green-100 text-green-800">AI Optimized</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gray-50 rounded-lg border relative overflow-hidden">
              {/* Simple SVG Map Visualization */}
              <svg className="w-full h-full" viewBox="0 0 400 320">
                {/* Background grid */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Roads/Routes */}
                <path d="M 50 50 Q 150 80 200 120 T 350 200" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                <path d="M 200 120 L 250 160 L 320 180" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                <path d="M 100 200 Q 180 220 250 160" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                
                {/* Customer locations */}
                <g>
                  {/* Location 1 - Priya Sharma */}
                  <circle cx="80" cy="70" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                  <text x="95" y="75" fontSize="10" fill="#374151" fontWeight="500">Heena T.</text>
                  <text x="95" y="85" fontSize="8" fill="#6b7280">9:30 AM</text>
                  
                  {/* Location 2 - Rajesh Kumar */}
                  <circle cx="180" cy="140" r="8" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                  <text x="195" y="145" fontSize="10" fill="#374151" fontWeight="500">Rajesh K.</text>
                  <text x="195" y="155" fontSize="8" fill="#6b7280">11:00 AM</text>
                  
                  {/* Location 3 - Anita Patel */}
                  <circle cx="280" cy="120" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                  <text x="295" y="125" fontSize="10" fill="#374151" fontWeight="500">Anita P.</text>
                  <text x="295" y="135" fontSize="8" fill="#6b7280">12:00 PM</text>
                  
                  {/* Location 4 - Vikram Singh */}
                  <circle cx="340" cy="200" r="8" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                  <text x="295" y="220" fontSize="10" fill="#374151" fontWeight="500">Vikram S.</text>
                  <text x="295" y="230" fontSize="8" fill="#6b7280">2:30 PM</text>
                  
                  {/* Location 5 - Sunita Devi */}
                  <circle cx="120" cy="220" r="8" fill="#10b981" stroke="#fff" strokeWidth="2" />
                  <text x="135" y="225" fontSize="10" fill="#374151" fontWeight="500">Sunita D.</text>
                  <text x="135" y="235" fontSize="8" fill="#6b7280">4:00 PM</text>
                </g>
                
                {/* Current location */}
                <g>
                  <circle cx="50" cy="50" r="10" fill="#3b82f6" stroke="#fff" strokeWidth="3" />
                  <circle cx="50" cy="50" r="6" fill="#1d4ed8" />
                  <text x="65" y="45" fontSize="10" fill="#374151" fontWeight="600">You</text>
                  <text x="65" y="55" fontSize="8" fill="#6b7280">Current</text>
                </g>
                
                {/* Distance markers */}
                <text x="110" y="100" fontSize="8" fill="#6b7280">2.3km</text>
                <text x="220" y="180" fontSize="8" fill="#6b7280">4.1km</text>
                <text x="320" y="150" fontSize="8" fill="#6b7280">6.8km</text>
              </svg>
              
              {/* Legend */}
              <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow-sm border text-xs">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>High Priority</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Low</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Navigation className="h-4 w-4 mr-2" />
                Start Navigation
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  toast({
                    title: "Route Optimized",
                    description: "Route has been recalculated for maximum efficiency.",
                  });
                }}
              >
                <Route className="h-4 w-4 mr-2" />
                Optimize Route
              </Button>
            </div>
          </CardContent>
        </Card>

       
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 w-full">
  <Button 
    className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
    onClick={() => {
      const pendingVisits = visits.filter(v => v.status === 'pending');
      if (pendingVisits.length > 0) {
        handleStatusChange(pendingVisits[0].id, 'in_progress');
      } else {
        toast({
          title: "All Visits Completed",
          description: "Great job! You've completed all visits for today.",
        });
      }
    }}
  >
    <Target className="h-4 w-4 mr-2" />
    Start Next Visit
  </Button>

  <Button 
    variant="outline"
    className="w-full sm:w-auto"
    onClick={() => {
      toast({
        title: "Day Completed",
        description: "All visits have been marked as completed. Great work!",
      });
      setVisits(prev => prev.map(visit => ({ ...visit, status: 'completed' as const })));
    }}
  >
    <CheckCircle className="h-4 w-4 mr-2" />
    Mark Day Complete
  </Button>

  <Button 
    variant="outline"
    className="w-full sm:w-auto"
    onClick={() => {
      toast({
        title: "Route Optimized",
        description: "Route has been recalculated for maximum efficiency.",
      });
    }}
  >
    <Route className="h-4 w-4 mr-2" />
    Optimize Route
  </Button>
</div>

    </div>
  );
};

export default PlanMyDay;
