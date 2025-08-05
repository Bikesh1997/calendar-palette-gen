import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Shield,
  Building,
  Users,
  AlertTriangle
} from 'lucide-react';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { GeoFence } from '@/services/geoLocationService';

const GeoFenceManager = () => {
  const [geoFences, setGeoFences] = useState<GeoFence[]>([]);
  const [newFence, setNewFence] = useState({
    name: '',
    latitude: '',
    longitude: '',
    radius: '100',
    type: 'client_location' as GeoFence['type'],
  });

  const { currentLocation, addGeoFence } = useGeoLocation();

  const handleAddGeoFence = () => {
    if (!newFence.name || !newFence.latitude || !newFence.longitude) {
      return;
    }

    const geoFence: GeoFence = {
      id: `fence_${Date.now()}`,
      name: newFence.name,
      latitude: parseFloat(newFence.latitude),
      longitude: parseFloat(newFence.longitude),
      radius: parseInt(newFence.radius),
      type: newFence.type,
    };

    setGeoFences(prev => [...prev, geoFence]);
    addGeoFence(geoFence);
    
    // Reset form
    setNewFence({
      name: '',
      latitude: '',
      longitude: '',
      radius: '100',
      type: 'client_location',
    });
  };

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      setNewFence(prev => ({
        ...prev,
        latitude: currentLocation.latitude.toString(),
        longitude: currentLocation.longitude.toString(),
      }));
    }
  };

  const handleRemoveGeoFence = (fenceId: string) => {
    setGeoFences(prev => prev.filter(fence => fence.id !== fenceId));
  };

  const getTypeIcon = (type: GeoFence['type']) => {
    switch (type) {
      case 'office': return <Building className="h-4 w-4" />;
      case 'client_location': return <Users className="h-4 w-4" />;
      case 'territory': return <MapPin className="h-4 w-4" />;
      case 'restricted': return <AlertTriangle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: GeoFence['type']) => {
    switch (type) {
      case 'office': return 'bg-blue-100 text-blue-800';
      case 'client_location': return 'bg-green-100 text-green-800';
      case 'territory': return 'bg-purple-100 text-purple-800';
      case 'restricted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Geo-fence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Geo-fence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Geo-fence name"
              value={newFence.name}
              onChange={(e) => setNewFence(prev => ({ ...prev, name: e.target.value }))}
            />
            <Select 
              value={newFence.type} 
              onValueChange={(value) => setNewFence(prev => ({ ...prev, type: value as GeoFence['type'] }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client_location">Client Location</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="territory">Territory</SelectItem>
                <SelectItem value="restricted">Restricted Area</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Latitude"
              value={newFence.latitude}
              onChange={(e) => setNewFence(prev => ({ ...prev, latitude: e.target.value }))}
            />
            <Input
              placeholder="Longitude"
              value={newFence.longitude}
              onChange={(e) => setNewFence(prev => ({ ...prev, longitude: e.target.value }))}
            />
            <Input
              placeholder="Radius (meters)"
              value={newFence.radius}
              onChange={(e) => setNewFence(prev => ({ ...prev, radius: e.target.value }))}
            />
            <Button 
              variant="outline" 
              onClick={handleUseCurrentLocation}
              disabled={!currentLocation}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>
          </div>
          <Button onClick={handleAddGeoFence} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Create Geo-fence
          </Button>
        </CardContent>
      </Card>

      {/* Existing Geo-fences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Active Geo-fences ({geoFences.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {geoFences.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No geo-fences created yet</p>
              <p className="text-sm">Create your first geo-fence above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {geoFences.map((fence) => (
                <div key={fence.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(fence.type)}
                    <div>
                      <div className="font-medium">{fence.name}</div>
                      <div className="text-sm text-gray-500">
                        {fence.latitude.toFixed(4)}, {fence.longitude.toFixed(4)} • {fence.radius}m radius
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(fence.type)}>
                      {fence.type.replace('_', ' ')}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveGeoFence(fence.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GeoFenceManager;
