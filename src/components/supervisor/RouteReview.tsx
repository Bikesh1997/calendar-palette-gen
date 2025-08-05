
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Route, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Navigation,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RouteComparison {
  staffId: string;
  staffName: string;
  date: string;
  plannedRoute: {
    totalStops: number;
    estimatedDistance: string;
    estimatedTime: string;
    stops: Array<{
      id: string;
      customerName: string;
      address: string;
      plannedTime: string;
      priority: string;
    }>;
  };
  actualRoute: {
    totalStops: number;
    actualDistance: string;
    actualTime: string;
    stops: Array<{
      id: string;
      customerName: string;
      address: string;
      actualTime?: string;
      status: 'completed' | 'missed' | 'pending';
      geoConfirmed: boolean;
    }>;
  };
  deviations: number;
  efficiency: number;
}

const RouteReview = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState('today');
  
  const routeData: RouteComparison[] = [
    {
      staffId: '1',
      staffName: 'Rahul Sharma',
      date: '2024-06-08',
      plannedRoute: {
        totalStops: 8,
        estimatedDistance: '45 km',
        estimatedTime: '6 hours',
        stops: [
          {
            id: '1',
            customerName: 'Sunita Women SHG',
            address: 'Ward 3, Sector 12',
            plannedTime: '10:00 AM',
            priority: 'High'
          },
          {
            id: '2',
            customerName: 'Lakshmi Self Help Group',
            address: 'Ward 5, Main Market',
            plannedTime: '12:30 PM',
            priority: 'Medium'
          }
        ]
      },
      actualRoute: {
        totalStops: 6,
        actualDistance: '52 km',
        actualTime: '7 hours',
        stops: [
          {
            id: '1',
            customerName: 'Sunita Women SHG',
            address: 'Ward 3, Sector 12',
            actualTime: '10:15 AM',
            status: 'completed',
            geoConfirmed: true
          },
          {
            id: '2',
            customerName: 'Lakshmi Self Help Group',
            address: 'Ward 5, Main Market',
            actualTime: '1:00 PM',
            status: 'completed',
            geoConfirmed: false
          }
        ]
      },
      deviations: 3,
      efficiency: 75
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'missed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return 'text-green-600';
    if (efficiency >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleViewFullRoute = (staffId: string) => {
    toast({
      title: "Route Analysis",
      description: "Opening detailed route analysis with GPS trail comparison",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="h-5 w-5" />
          Route Review & Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedDate} onValueChange={setSelectedDate} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {routeData.map((route) => (
              <div key={route.staffId} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{route.staffName}</h3>
                    <p className="text-sm text-gray-600">{route.date}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getEfficiencyColor(route.efficiency)}`}>
                      {route.efficiency}% Efficient
                    </div>
                    <p className="text-xs text-gray-500">Route efficiency</p>
                  </div>
                </div>

                {/* Route Summary */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm text-blue-800 mb-2">Planned Route</h4>
                    <div className="space-y-1 text-xs">
                      <div>Stops: {route.plannedRoute.totalStops}</div>
                      <div>Distance: {route.plannedRoute.estimatedDistance}</div>
                      <div>Time: {route.plannedRoute.estimatedTime}</div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm text-green-800 mb-2">Actual Route</h4>
                    <div className="space-y-1 text-xs">
                      <div>Stops: {route.actualRoute.totalStops}</div>
                      <div>Distance: {route.actualRoute.actualDistance}</div>
                      <div>Time: {route.actualRoute.actualTime}</div>
                    </div>
                  </div>
                </div>

                {/* Deviations & Issues */}
                {route.deviations > 0 && (
                  <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-sm text-orange-800">
                        {route.deviations} Route Deviations Detected
                      </span>
                    </div>
                    <p className="text-xs text-orange-700">
                      Staff deviated from planned route multiple times. Review GPS trail for details.
                    </p>
                  </div>
                )}

                {/* Visit Status */}
                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-sm">Visit Status</h4>
                  {route.actualRoute.stops.map((stop, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getStatusColor(stop.status)}`}>
                          {stop.status}
                        </Badge>
                        <span className="text-sm">{stop.customerName}</span>
                        {stop.geoConfirmed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        {stop.actualTime || 'Not visited'}
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewFullRoute(route.staffId)}
                  className="w-full"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  View Full Route Analysis
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="yesterday">
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Yesterday's route data will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="week">
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Weekly route summary will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RouteReview;
