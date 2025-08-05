
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone,
  AlertTriangle,
  CheckCircle,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FieldStaffLocation {
  id: string;
  name: string;
  role: string;
  currentLocation: {
    latitude: number;
    longitude: number;
    timestamp: Date;
    accuracy: string;
  };
  status: 'active' | 'inactive' | 'on_visit';
  lastActivity: string;
  currentCustomer?: string;
  plannedVisits: number;
  completedVisits: number;
}

const LiveTeamMap = () => {
  const { toast } = useToast();
  const [teamLocations, setTeamLocations] = useState<FieldStaffLocation[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      role: 'Field Executive',
      currentLocation: {
        latitude: 19.0760,
        longitude: 72.8777,
        timestamp: new Date(),
        accuracy: 'High'
      },
      status: 'on_visit',
      lastActivity: '5 minutes ago',
      currentCustomer: 'Sunita Women SHG',
      plannedVisits: 8,
      completedVisits: 3
    },
    {
      id: '2',
      name: 'Anjali Patel',
      role: 'Field Executive',
      currentLocation: {
        latitude: 19.0896,
        longitude: 72.8656,
        timestamp: new Date(),
        accuracy: 'Medium'
      },
      status: 'active',
      lastActivity: '2 minutes ago',
      plannedVisits: 6,
      completedVisits: 4
    },
    {
      id: '3',
      name: 'Vikram Singh',
      role: 'Relationship Manager',
      currentLocation: {
        latitude: 19.0825,
        longitude: 72.8811,
        timestamp: new Date(),
        accuracy: 'High'
      },
      status: 'inactive',
      lastActivity: '45 minutes ago',
      plannedVisits: 5,
      completedVisits: 2
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on_visit': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Navigation className="h-4 w-4 text-green-600" />;
      case 'on_visit': return <MapPin className="h-4 w-4 text-blue-600" />;
      case 'inactive': return <Clock className="h-4 w-4 text-gray-600" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const handleCallStaff = (staff: FieldStaffLocation) => {
    toast({
      title: "Calling Staff Member",
      description: `Initiating call to ${staff.name}`,
    });
  };

  const handleViewRoute = (staffId: string) => {
    toast({
      title: "Route Details",
      description: "Opening detailed route view for selected staff member",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Live Team Locations ({teamLocations.filter(t => t.status !== 'inactive').length} active)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Map Placeholder */}
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Interactive Map View</p>
              <p className="text-sm text-gray-500">Team locations will be displayed here</p>
            </div>
          </div>

          {/* Team List */}
          <div className="space-y-3">
            {teamLocations.map((staff) => (
              <div key={staff.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(staff.status)}
                      <div>
                        <h4 className="font-medium text-sm">{staff.name}</h4>
                        <p className="text-xs text-gray-600">{staff.role}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`text-xs ${getStatusColor(staff.status)}`}>
                          {staff.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {staff.currentLocation.accuracy} accuracy
                        </span>
                      </div>
                      {staff.currentCustomer && (
                        <p className="text-xs text-blue-600 mb-1">
                          Currently at: {staff.currentCustomer}
                        </p>
                      )}
                      <div className="text-xs text-gray-500">
                        <span>Visits: {staff.completedVisits}/{staff.plannedVisits}</span>
                        <span className="mx-2">•</span>
                        <span>Last seen: {staff.lastActivity}</span>
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        {staff.currentLocation.latitude.toFixed(4)}, {staff.currentLocation.longitude.toFixed(4)}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleCallStaff(staff)}
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewRoute(staff.id)}
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Route
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveTeamMap;
