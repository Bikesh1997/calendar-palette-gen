
interface GeoLocation {
  latitude: number;
  longitude: number;
  timestamp: Date;
  accuracy?: number;
}

interface GeoFence {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
  type: 'client_location' | 'office' | 'territory' | 'restricted';
}

interface GeoTaggedActivity {
  id: string;
  type: 'check_in' | 'lead_visit' | 'task_completion' | 'call_log';
  location: GeoLocation;
  notes?: string;
  leadId?: string;
  taskId?: string;
}

class GeoLocationService {
  private watchId: number | null = null;
  private geoFences: GeoFence[] = [];
  private currentLocation: GeoLocation | null = null;

  // Get current location
  async getCurrentLocation(): Promise<GeoLocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: GeoLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date(),
            accuracy: position.coords.accuracy,
          };
          this.currentLocation = location;
          resolve(location);
        },
        (error) => {
          reject(new Error(`Location error: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  }

  // Start watching location for geo-fencing
  startLocationTracking(onLocationUpdate: (location: GeoLocation) => void, onGeoFenceEvent: (event: any) => void) {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported');
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location: GeoLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date(),
          accuracy: position.coords.accuracy,
        };
        
        this.currentLocation = location;
        onLocationUpdate(location);
        
        // Check geo-fences
        this.checkGeoFences(location, onGeoFenceEvent);
      },
      (error) => {
        console.error('Location tracking error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 30000,
      }
    );
  }

  // Stop location tracking
  stopLocationTracking() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Calculate distance between two points (Haversine formula)
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  }

  // Add geo-fence
  addGeoFence(geoFence: GeoFence) {
    this.geoFences.push(geoFence);
  }

  // Remove geo-fence
  removeGeoFence(geoFenceId: string) {
    this.geoFences = this.geoFences.filter(fence => fence.id !== geoFenceId);
  }

  // Check if location is within any geo-fences
  checkGeoFences(location: GeoLocation, onGeoFenceEvent: (event: any) => void) {
    this.geoFences.forEach(fence => {
      const distance = this.calculateDistance(
        location.latitude,
        location.longitude,
        fence.latitude,
        fence.longitude
      );

      if (distance <= fence.radius) {
        onGeoFenceEvent({
          type: 'enter',
          geoFence: fence,
          location: location,
          distance: distance,
        });
      }
    });
  }

  // Create geo-tagged activity
  createGeoTaggedActivity(activity: Omit<GeoTaggedActivity, 'id' | 'location'>): Promise<GeoTaggedActivity> {
    return this.getCurrentLocation().then(location => {
      const geoTaggedActivity: GeoTaggedActivity = {
        id: `activity_${Date.now()}`,
        location,
        ...activity,
      };
      
      // Store in localStorage for demo purposes
      const activities = this.getStoredActivities();
      activities.push(geoTaggedActivity);
      localStorage.setItem('geoTaggedActivities', JSON.stringify(activities));
      
      return geoTaggedActivity;
    });
  }

  // Get stored activities
  getStoredActivities(): GeoTaggedActivity[] {
    const stored = localStorage.getItem('geoTaggedActivities');
    return stored ? JSON.parse(stored) : [];
  }

  // Get current location (cached)
  getCurrentLocationCached(): GeoLocation | null {
    return this.currentLocation;
  }
}

export const geoLocationService = new GeoLocationService();
export type { GeoLocation, GeoFence, GeoTaggedActivity };
