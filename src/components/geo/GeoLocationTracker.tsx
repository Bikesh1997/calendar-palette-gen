
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Navigation, 
  Target, 
  Clock,
  CheckCircle,
  AlertCircle 
} from 'lucide-react';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { useAuth } from '@/contexts/AuthContext';

interface GeoLocationTrackerProps {
  leadId?: string;
  showCheckIn?: boolean;
  showTracking?: boolean;
}

const GeoLocationTracker = ({ 
  leadId, 
  showCheckIn = true, 
  showTracking = false 
}: GeoLocationTrackerProps) => {
  const { user } = useAuth();
  const [checkInNotes, setCheckInNotes] = useState('');
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  
  const {
    currentLocation,
    isLoading,
    error,
    isTracking,
    getCurrentLocation,
    startTracking,
    stopTracking,
    createCheckIn,
  } = useGeoLocation({
    enableTracking: showTracking || user?.role === 'sales_executive',
    enableGeoFencing: true,
  });

  // Auto-start tracking for Field Executives
  useEffect(() => {
    if (user?.role === 'sales_executive' && !isTracking) {
      startTracking();
    }
  }, [user?.role, isTracking, startTracking]);

  const handleGetLocation = async () => {
    try {
      await getCurrentLocation();
    } catch (err) {
      console.error('Failed to get location:', err);
    }
  };

  const handleCheckIn = async () => {
    setIsCheckingIn(true);
    try {
      await createCheckIn(checkInNotes || undefined, leadId);
      setCheckInNotes('');
    } catch (err) {
      console.error('Check-in failed:', err);
    } finally {
      setIsCheckingIn(false);
    }
  };

  const handleToggleTracking = () => {
    if (isTracking) {
      stopTracking();
    } else {
      startTracking();
    }
  };

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  const formatAccuracy = (accuracy?: number) => {
    if (!accuracy) return 'Unknown';
    if (accuracy < 10) return 'High';
    if (accuracy < 50) return 'Medium';
    return 'Low';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Services
          {user?.role === 'sales_executive' && (
            <Badge className="bg-green-100 text-green-800">Auto-enabled</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Location Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Location:</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGetLocation}
              disabled={isLoading}
            >
              <Navigation className="h-4 w-4 mr-1" />
              {isLoading ? 'Getting...' : 'Get Location'}
            </Button>
          </div>
          
          {currentLocation && (
            <div className="bg-gray-50 p-3 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="text-sm font-mono">
                  {formatCoordinates(currentLocation.latitude, currentLocation.longitude)}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {formatAccuracy(currentLocation.accuracy)} Accuracy
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Clock className="h-3 w-3" />
                {currentLocation.timestamp.toLocaleString()}
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>

        {/* Location Tracking */}
        {(showTracking || user?.role === 'sales_executive') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Location Tracking:</span>
              <Button
                variant={isTracking ? "destructive" : "default"}
                size="sm"
                onClick={handleToggleTracking}
              >
                {isTracking ? 'Stop Tracking' : 'Start Tracking'}
              </Button>
            </div>
            {isTracking && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                Location tracking is active
              </div>
            )}
          </div>
        )}

        {/* Check-in Section */}
        {showCheckIn && (
          <div className="space-y-3 border-t pt-4">
            <h4 className="font-medium text-sm">Quick Check-in</h4>
            <Textarea
              placeholder="Add notes about this location visit..."
              value={checkInNotes}
              onChange={(e) => setCheckInNotes(e.target.value)}
              rows={2}
            />
            <Button
              onClick={handleCheckIn}
              disabled={!currentLocation || isCheckingIn}
              className="w-full"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isCheckingIn ? 'Checking In...' : 'Check In Here'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeoLocationTracker;
