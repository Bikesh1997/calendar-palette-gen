
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, MapPin, Search, ChevronRight, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddGeoLocationModal from '@/components/admin/AddGeoLocationModal';

interface GeoLocation {
  id: string;
  name: string;
  type: 'zone' | 'region' | 'branch' | 'pincode';
  parent?: string;
  code: string;
  assignedUsers: number;
  status: 'active' | 'inactive';
  children?: GeoLocation[];
}

const mockGeoData: GeoLocation[] = [
  {
    id: '1',
    name: 'North Zone',
    type: 'zone',
    code: 'NZ',
    assignedUsers: 45,
    status: 'active',
    children: [
      {
        id: '11',
        name: 'Delhi NCR',
        type: 'region',
        parent: '1',
        code: 'NCR',
        assignedUsers: 25,
        status: 'active',
        children: [
          {
            id: '111',
            name: 'Delhi North',
            type: 'branch',
            parent: '11',
            code: 'DN',
            assignedUsers: 12,
            status: 'active'
          },
          {
            id: '112',
            name: 'Gurgaon Central',
            type: 'branch',
            parent: '11',
            code: 'GC',
            assignedUsers: 13,
            status: 'active'
          }
        ]
      },
      {
        id: '12',
        name: 'Punjab',
        type: 'region',
        parent: '1',
        code: 'PB',
        assignedUsers: 20,
        status: 'active',
        children: [
          {
            id: '121',
            name: 'Ludhiana Branch',
            type: 'branch',
            parent: '12',
            code: 'LDH',
            assignedUsers: 20,
            status: 'active'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'West Zone',
    type: 'zone',
    code: 'WZ',
    assignedUsers: 38,
    status: 'active',
    children: [
      {
        id: '21',
        name: 'Mumbai',
        type: 'region',
        parent: '2',
        code: 'MUM',
        assignedUsers: 30,
        status: 'active',
        children: [
          {
            id: '211',
            name: 'Mumbai Central',
            type: 'branch',
            parent: '21',
            code: 'MC',
            assignedUsers: 18,
            status: 'active'
          },
          {
            id: '212',
            name: 'Andheri East',
            type: 'branch',
            parent: '21',
            code: 'AE',
            assignedUsers: 12,
            status: 'active'
          }
        ]
      },
      {
        id: '22',
        name: 'Gujarat',
        type: 'region',
        parent: '2',
        code: 'GJ',
        assignedUsers: 8,
        status: 'active'
      }
    ]
  }
];

const GeoHierarchyManagement = () => {
  const [geoData, setGeoData] = useState<GeoLocation[]>(mockGeoData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState<GeoLocation | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1', '2']));
  const { toast } = useToast();

  const toggleExpanded = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleDeleteLocation = (locationId: string) => {
    if (confirm('Are you sure you want to delete this location? This will also remove all child locations.')) {
      // Implementation would handle nested deletion
      toast({
        title: "Location Deleted",
        description: "Geographic location has been deleted successfully.",
      });
    }
  };

  const handleAddLocation = (locationData: any) => {
    // Implementation would add to appropriate parent
    toast({
      title: "Location Added",
      description: "New geographic location has been added successfully.",
    });
    setAddModalOpen(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'zone': return 'bg-purple-100 text-purple-800';
      case 'region': return 'bg-blue-100 text-blue-800';
      case 'branch': return 'bg-green-100 text-green-800';
      case 'pincode': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderGeoTree = (locations: GeoLocation[], level: number = 0) => {
    return locations.map((location) => (
      <div key={location.id} className="border rounded-lg mb-2">
        <div
          className={`p-4 cursor-pointer hover:bg-gray-50 ${level > 0 ? `ml-${level * 4}` : ''}`}
          onClick={() => setSelectedLevel(location)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Left Side: Name and Location */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {location.children && location.children.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpanded(location.id);
                  }}
                >
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${
                      expandedNodes.has(location.id) ? 'rotate-90' : ''
                    }`}
                  />
                </Button>
              )}
              <MapPin className="h-4 w-4 text-gray-400" />
              <div>
                <div className="font-medium text-sm sm:text-base">{location.name}</div>
                <div className="text-xs text-gray-500">Code: {location.code}</div>
              </div>
            </div>
  
            {/* Right Side: Meta Info and Actions */}
            <div className="flex flex-wrap items-center gap-2 justify-start sm:justify-end">
              <Badge className={getTypeColor(location.type)}>{location.type}</Badge>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Users className="h-3 w-3" />
                {location.assignedUsers}
              </div>
              <Badge variant={location.status === 'active' ? 'default' : 'secondary'}>
                {location.status}
              </Badge>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLocation(location.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
  
        {location.children &&
          location.children.length > 0 &&
          expandedNodes.has(location.id) && (
            <div className="pl-4 sm:pl-6 pb-2">
              {renderGeoTree(location.children, level + 1)}
            </div>
          )}
      </div>
    ));
  };
  
  const flattenGeoData = (locations: GeoLocation[]): GeoLocation[] => {
    let flattened: GeoLocation[] = [];
    locations.forEach(location => {
      flattened.push(location);
      if (location.children) {
        flattened = flattened.concat(flattenGeoData(location.children));
      }
    });
    return flattened;
  };

  const allLocations = flattenGeoData(geoData);
  const totalLocations = allLocations.length;
  const totalUsers = allLocations.reduce((sum, loc) => sum + loc.assignedUsers, 0);
  const zones = allLocations.filter(loc => loc.type === 'zone').length;
  const branches = allLocations.filter(loc => loc.type === 'branch').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Geographic Hierarchy Management</h1>
        <Button onClick={() => setAddModalOpen(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-teal-600">{totalLocations}</div>
            <div className="text-sm text-gray-600">Total Locations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{zones}</div>
            <div className="text-sm text-gray-600">Zones</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{branches}</div>
            <div className="text-sm text-gray-600">Branches</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
            <div className="text-sm text-gray-600">Assigned Users</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="zone">Zones</SelectItem>
                <SelectItem value="region">Regions</SelectItem>
                <SelectItem value="branch">Branches</SelectItem>
                <SelectItem value="pincode">Pin Codes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hierarchy Tree */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Hierarchy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {renderGeoTree(geoData)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedLevel ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Name</div>
                    <div className="font-medium">{selectedLevel.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Type</div>
                    <Badge className={getTypeColor(selectedLevel.type)}>
                      {selectedLevel.type}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Code</div>
                    <div className="font-medium">{selectedLevel.code}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Assigned Users</div>
                    <div className="font-medium">{selectedLevel.assignedUsers}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Status</div>
                    <Badge variant={selectedLevel.status === 'active' ? 'default' : 'secondary'}>
                      {selectedLevel.status}
                    </Badge>
                  </div>
                  {selectedLevel.children && (
                    <div>
                      <div className="text-sm text-gray-600">Child Locations</div>
                      <div className="font-medium">{selectedLevel.children.length}</div>
                    </div>
                  )}
                  <div className="flex gap-2 pt-4">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Assign Users
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Select a location to view details
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {/* <Card className="mt-4">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Zone
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Region
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Branch
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Bulk User Assignment
                </Button>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>

      {/* Add Location Modal */}
      <AddGeoLocationModal 
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddLocation}
        parentLocations={allLocations}
      />
    </div>
  );
};

export default GeoHierarchyManagement;
