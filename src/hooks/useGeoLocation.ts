
import { useState, useEffect, useCallback } from 'react';
import { geoLocationService, GeoLocation, GeoFence } from '@/services/geoLocationService';
import { useToast } from '@/hooks/use-toast';

interface UseGeoLocationOptions {
  enableTracking?: boolean;
  enableGeoFencing?: boolean;
}

export const useGeoLocation = (options: UseGeoLocationOptions = {}) => {
  const [currentLocation, setCurrentLocation] = useState<GeoLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const { toast } = useToast();

  // Get current location
  const getCurrentLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const location = await geoLocationService.getCurrentLocation();
      setCurrentLocation(location);
      return location;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location';
      setError(errorMessage);
      toast({
        title: "Location Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Start location tracking
  const startTracking = useCallback(() => {
    if (!options.enableTracking) return;

    try {
      geoLocationService.startLocationTracking(
        (location) => {
          setCurrentLocation(location);
        },
        (geoFenceEvent) => {
          if (options.enableGeoFencing) {
            toast({
              title: "Geo-fence Event",
              description: `Entered ${geoFenceEvent.geoFence.name}`,
            });
          }
        }
      );
      setIsTracking(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start tracking';
      setError(errorMessage);
      toast({
        title: "Tracking Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [options.enableTracking, options.enableGeoFencing, toast]);

  // Stop location tracking
  const stopTracking = useCallback(() => {
    geoLocationService.stopLocationTracking();
    setIsTracking(false);
  }, []);

  // Create geo-tagged check-in
  const createCheckIn = useCallback(async (notes?: string, leadId?: string) => {
    try {
      const activity = await geoLocationService.createGeoTaggedActivity({
        type: 'check_in',
        notes,
        leadId,
      });
      
      toast({
        title: "Check-in Successful",
        description: "Location has been recorded",
      });
      
      return activity;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create check-in';
      toast({
        title: "Check-in Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  // Add geo-fence
  const addGeoFence = useCallback((geoFence: GeoFence) => {
    geoLocationService.addGeoFence(geoFence);
    toast({
      title: "Geo-fence Added",
      description: `${geoFence.name} geo-fence has been created`,
    });
  }, [toast]);

  // Calculate distance to location
  const calculateDistanceTo = useCallback((latitude: number, longitude: number) => {
    if (!currentLocation) return null;
    
    return geoLocationService.calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      latitude,
      longitude
    );
  }, [currentLocation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isTracking) {
        stopTracking();
      }
    };
  }, [isTracking, stopTracking]);

  return {
    currentLocation,
    isLoading,
    error,
    isTracking,
    getCurrentLocation,
    startTracking,
    stopTracking,
    createCheckIn,
    addGeoFence,
    calculateDistanceTo,
  };
};
