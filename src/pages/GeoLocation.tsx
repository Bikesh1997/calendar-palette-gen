
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, Shield, Activity, Users, Route, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import GeoLocationTracker from '@/components/geo/GeoLocationTracker';
import GeoFenceManager from '@/components/geo/GeoFenceManager';
import LiveTeamMap from '@/components/supervisor/LiveTeamMap';
import RouteReview from '@/components/supervisor/RouteReview';
import GeoAlerts from '@/components/supervisor/GeoAlerts';

const GeoLocation = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Geo Location & Fencing</h1>
          <p className="text-gray-600">
            {user?.role === 'supervisor' 
              ? 'Manage geo-fences and monitor team field activities'
              : 'Track locations and log field activities'
            }
          </p>
        </div>
        {user?.role !== 'supervisor' && (
          <Badge className="bg-green-100 text-green-800">
            Auto-tracking Enabled
          </Badge>
        )}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="tracking" className="w-full">
        <TabsList className={`grid w-full ${
          user?.role === 'supervisor' 
            ? 'grid-cols-5' 
            : 'grid-cols-2'
        }`}>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location Tracking
          </TabsTrigger>
          {user?.role === 'supervisor' && (
            <>
              <TabsTrigger value="live-monitoring" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Live Team Monitor
              </TabsTrigger>
              <TabsTrigger value="route-review" className="flex items-center gap-2">
                <Route className="h-4 w-4" />
                Route Review
              </TabsTrigger>
              <TabsTrigger value="geo-alerts" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Geo Alerts
              </TabsTrigger>
              <TabsTrigger value="geofencing" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Geo-Fencing
              </TabsTrigger>
            </>
          )}
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GeoLocationTracker 
              showCheckIn={true} 
              showTracking={true} 
            />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="text-sm font-medium">Check-in at Client Location</div>
                      <div className="text-xs text-gray-500">10 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className="text-sm font-medium">Entered Territory: Downtown</div>
                      <div className="text-xs text-gray-500">1 hour ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                    <div>
                      <div className="text-sm font-medium">Lead Visit Completed</div>
                      <div className="text-xs text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {user?.role === 'supervisor' && (
          <>
            <TabsContent value="live-monitoring" className="space-y-6">
              <LiveTeamMap />
            </TabsContent>

            <TabsContent value="route-review" className="space-y-6">
              <RouteReview />
            </TabsContent>

            <TabsContent value="geo-alerts" className="space-y-6">
              <GeoAlerts />
            </TabsContent>

            <TabsContent value="geofencing" className="space-y-6">
              <GeoFenceManager />
            </TabsContent>
          </>
        )}

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Geo-Tagged Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">Client Meeting - ABC Corp</h3>
                      <p className="text-sm text-gray-600">Check-in at client location</p>
                    </div>
                    <span className="text-xs text-gray-500">Today, 2:30 PM</span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    40.7128, -74.0060 • Accuracy: High
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">Lead Visit - XYZ Inc</h3>
                      <p className="text-sm text-gray-600">Prospecting visit completed</p>
                    </div>
                    <span className="text-xs text-gray-500">Today, 11:15 AM</span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    40.7589, -73.9851 • Accuracy: Medium
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">Territory Entry</h3>
                      <p className="text-sm text-gray-600">Entered Downtown sales territory</p>
                    </div>
                    <span className="text-xs text-gray-500">Today, 9:00 AM</span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    40.7505, -73.9934 • Accuracy: High
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeoLocation;
