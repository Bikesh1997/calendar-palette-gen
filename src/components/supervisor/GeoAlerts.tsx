
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Phone,
  Bell,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GeoAlert {
  id: string;
  type: 'missed_visit' | 'not_updated' | 'geo_deviation' | 'late_arrival';
  severity: 'high' | 'medium' | 'low';
  staffName: string;
  customerName?: string;
  message: string;
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
  actionRequired: boolean;
}

const GeoAlerts = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<GeoAlert[]>([
    {
      id: '1',
      type: 'missed_visit',
      severity: 'high',
      staffName: 'Rahul Sharma',
      customerName: 'ABC Enterprises',
      message: 'Scheduled visit to ABC Enterprises was missed. No geo-confirmation received.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      actionRequired: true
    },
    {
      id: '2',
      type: 'not_updated',
      severity: 'medium',
      staffName: 'Anjali Patel',
      customerName: 'Lakshmi SHG',
      message: 'Visit to Lakshmi SHG completed but lead status not updated in system.',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      location: { latitude: 19.0760, longitude: 72.8777 },
      actionRequired: true
    },
    {
      id: '3',
      type: 'geo_deviation',
      severity: 'medium',
      staffName: 'Vikram Singh',
      message: 'Staff deviated 2km from planned route without explanation.',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      location: { latitude: 19.0825, longitude: 72.8811 },
      actionRequired: false
    },
    {
      id: '4',
      type: 'late_arrival',
      severity: 'low',
      staffName: 'Neha Gupta',
      customerName: 'Devi Micro Finance',
      message: 'Arrived 30 minutes late to scheduled appointment.',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      actionRequired: false
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'missed_visit': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'not_updated': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'geo_deviation': return <MapPin className="h-4 w-4 text-blue-600" />;
      case 'late_arrival': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'missed_visit': return 'Missed Visit';
      case 'not_updated': return 'Not Updated';
      case 'geo_deviation': return 'Route Deviation';
      case 'late_arrival': return 'Late Arrival';
      default: return 'Alert';
    }
  };

  const handleCallStaff = (staffName: string) => {
    toast({
      title: "Calling Staff",
      description: `Initiating call to ${staffName}`,
    });
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast({
      title: "Alert Resolved",
      description: "Alert has been marked as resolved",
    });
  };

  const handleViewLocation = (alert: GeoAlert) => {
    if (alert.location) {
      toast({
        title: "Location Details",
        description: `Lat: ${alert.location.latitude}, Lng: ${alert.location.longitude}`,
      });
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hours ago`;
  };

  const highPriorityAlerts = alerts.filter(alert => alert.severity === 'high').length;
  const actionRequiredAlerts = alerts.filter(alert => alert.actionRequired).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Geo Monitoring Alerts
          {highPriorityAlerts > 0 && (
            <Badge className="bg-red-100 text-red-800">
              {highPriorityAlerts} High Priority
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">All Clear!</h3>
            <p className="text-gray-600">No geo monitoring alerts at this time.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Total Alerts: <strong>{alerts.length}</strong></span>
                <span>Action Required: <strong>{actionRequiredAlerts}</strong></span>
              </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(alert.type)}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {getTypeLabel(alert.type)}
                            </Badge>
                            <span className="font-medium text-sm">{alert.staffName}</span>
                            {alert.actionRequired && (
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                Action Required
                              </Badge>
                            )}
                          </div>
                          {alert.customerName && (
                            <p className="text-xs text-gray-700 mb-1">
                              Customer: {alert.customerName}
                            </p>
                          )}
                          <p className="text-sm">{alert.message}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                            <span>{formatTimeAgo(alert.timestamp)}</span>
                            {alert.location && (
                              <button 
                                onClick={() => handleViewLocation(alert)}
                                className="text-blue-600 hover:underline"
                              >
                                View Location
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCallStaff(alert.staffName)}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleResolveAlert(alert.id)}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeoAlerts;
