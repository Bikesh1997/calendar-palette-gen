import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Users, 
  Target, 
  TrendingUp,
  Plus,
  Edit,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const TerritoryManagement = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const { toast } = useToast();

  // Reset to first tab when user changes
  useEffect(() => {
    setActiveTab('overview');
  }, [user?.id]);

  const territories = [
    {
      id: '1',
      name: 'Mumbai Central',
      assignedTo: 'Rahul Sharma',
      area: 'Dadar, Prabhadevi, Lower Parel',
      population: 125000,
      businesses: 850,
      currentLeads: 45,
      monthlyTarget: 12,
      achieved: 9,
      potential: 'High',
      performance: 75
    },
    {
      id: '2',
      name: 'Mumbai South',
      assignedTo: 'Priya Singh',
      area: 'Colaba, Nariman Point, Fort',
      population: 98000,
      businesses: 1200,
      currentLeads: 62,
      monthlyTarget: 15,
      achieved: 14,
      potential: 'Very High',
      performance: 93
    },
    {
      id: '3',
      name: 'Andheri West',
      assignedTo: 'Anjali Patel',
      area: 'Andheri West, Juhu, Versova',
      population: 180000,
      businesses: 650,
      currentLeads: 38,
      monthlyTarget: 10,
      achieved: 8,
      potential: 'Medium',
      performance: 80
    },
    {
      id: '4',
      name: 'Thane East',
      assignedTo: 'Vikash Kumar',
      area: 'Thane East, Ghodbunder Road',
      population: 210000,
      businesses: 420,
      currentLeads: 28,
      monthlyTarget: 8,
      achieved: 5,
      potential: 'Medium',
      performance: 63
    }
  ];

  const territoryStats = {
    totalTerritories: territories.length,
    totalPopulation: territories.reduce((sum, t) => sum + t.population, 0),
    totalBusinesses: territories.reduce((sum, t) => sum + t.businesses, 0),
    avgPerformance: Math.round(territories.reduce((sum, t) => sum + t.performance, 0) / territories.length)
  };

  const handleCreateTerritory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const assignedTo = formData.get('assignedTo') as string;
    const area = formData.get('area') as string;
    const population = formData.get('population') as string;
    const businesses = formData.get('businesses') as string;
    const target = formData.get('target') as string;
    const potential = formData.get('potential') as string;

    console.log('Creating territory:', { name, assignedTo, area, population, businesses, target, potential });
    
    toast({
      title: "Territory Created",
      description: `${name} territory has been successfully created and assigned to ${assignedTo}.`,
    });
    
    setIsCreateModalOpen(false);
  };

  const handleEditTerritory = (territory: any) => {
    setSelectedTerritory(territory);
    setIsEditModalOpen(true);
  };

  const handleUpdateTerritory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    
    console.log('Updating territory:', selectedTerritory?.id);
    
    toast({
      title: "Territory Updated",
      description: `${name} territory has been successfully updated.`,
    });
    
    setIsEditModalOpen(false);
    setSelectedTerritory(null);
  };

  const handleAnalyzeTerritory = (territory: any) => {
    console.log('Analyzing territory:', territory.name);
    
    toast({
      title: "Territory Analysis",
      description: `Generating detailed analysis for ${territory.name}. This may take a few moments.`,
    });
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'Very High': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-blue-600';
    if (performance >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Territory Management</h1>
          <p className="text-gray-600">Manage sales territories and assignments</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus size={16} className="mr-2" />
              Create Territory
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Territory</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTerritory} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Territory Name</Label>
                  <Input id="name" name="name" placeholder="Enter territory name" required />
                </div>
                <div>
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input id="assignedTo" name="assignedTo" placeholder="Sales representative name" required />
                </div>
              </div>
              <div>
                <Label htmlFor="area">Coverage Areas</Label>
                <Textarea id="area" name="area" placeholder="List the areas covered by this territory" required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="population">Population</Label>
                  <Input id="population" name="population" type="number" placeholder="Total population" required />
                </div>
                <div>
                  <Label htmlFor="businesses">Businesses</Label>
                  <Input id="businesses" name="businesses" type="number" placeholder="Number of businesses" required />
                </div>
                <div>
                  <Label htmlFor="target">Monthly Target (₹L)</Label>
                  <Input id="target" name="target" type="number" placeholder="Monthly target" required />
                </div>
              </div>
              <div>
                <Label htmlFor="potential">Potential</Label>
                <Select name="potential" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select potential level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Very High">Very High</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                  Create Territory
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Territory Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Territories</p>
                <p className="text-2xl font-bold">{territoryStats.totalTerritories}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Population</p>
                <p className="text-2xl font-bold">{(territoryStats.totalPopulation / 1000).toFixed(0)}K</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Businesses</p>
                <p className="text-2xl font-bold">{territoryStats.totalBusinesses}</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                <p className="text-2xl font-bold">{territoryStats.avgPerformance}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5  gap-1 h-auto">
      <TabsTrigger value="overview "  className="text-xs sm:text-sm px-2 py-2">Territory Overview</TabsTrigger>
          <TabsTrigger value="performance "  className="text-xs sm:text-sm px-2 py-2">Performance Analysis</TabsTrigger>
          <TabsTrigger value="optimization "  className="text-xs sm:text-sm px-2 py-2">Territory Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Territory Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {territories.map((territory) => (
                  <div key={territory.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-lg">{territory.name}</h4>
                          <Badge className={getPotentialColor(territory.potential)}>
                            {territory.potential} Potential
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Assigned to: {territory.assignedTo}</p>
                        <p className="text-sm text-gray-600">Areas: {territory.area}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditTerritory(territory)}>
                          <Edit size={14} className="mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleAnalyzeTerritory(territory)}>
                          <BarChart3 size={14} className="mr-1" />
                          Analyze
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Population</p>
                        <p className="font-medium">{(territory.population / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Businesses</p>
                        <p className="font-medium">{territory.businesses}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Active Leads</p>
                        <p className="font-medium">{territory.currentLeads}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Achievement</p>
                        <p className={`font-medium ${getPerformanceColor(territory.performance)}`}>
                          ₹{territory.achieved}L / ₹{territory.monthlyTarget}L
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Performance</p>
                        <p className={`font-medium ${getPerformanceColor(territory.performance)}`}>
                          {territory.performance}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-teal-600 h-2 rounded-full" 
                          style={{ width: `${territory.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {territories
                    .sort((a, b) => b.performance - a.performance)
                    .map((territory, index) => (
                      <div key={territory.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0 ? 'bg-yellow-100 text-yellow-800' :
                            index === 1 ? 'bg-gray-100 text-gray-800' :
                            index === 2 ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{territory.name}</p>
                            <p className="text-sm text-gray-500">{territory.assignedTo}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${getPerformanceColor(territory.performance)}`}>
                            {territory.performance}%
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{territory.achieved}L / ₹{territory.monthlyTarget}L
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Territory Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Total Target Achievement</span>
                      <span className="text-sm font-medium">
                        {Math.round((territories.reduce((sum, t) => sum + t.achieved, 0) / territories.reduce((sum, t) => sum + t.monthlyTarget, 0)) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-600 h-2 rounded-full" style={{ 
                        width: `${(territories.reduce((sum, t) => sum + t.achieved, 0) / territories.reduce((sum, t) => sum + t.monthlyTarget, 0)) * 100}%` 
                      }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Lead Coverage</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Market Penetration</span>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Territory Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                  <h4 className="font-medium text-green-800 mb-2">Expansion Opportunity</h4>
                  <p className="text-sm text-green-700">
                    Mumbai South territory shows very high potential and excellent performance. 
                    Consider expanding this territory or replicating the strategies used here.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Performance Improvement Needed</h4>
                  <p className="text-sm text-yellow-700">
                    Thane East territory is underperforming with 63% achievement rate. 
                    Consider additional training or reassignment to boost performance.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Resource Reallocation</h4>
                  <p className="text-sm text-blue-700">
                    Mumbai Central has high population density but moderate business count. 
                    Consider focusing on retail customer acquisition in this area.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                  <h4 className="font-medium text-purple-800 mb-2">New Territory Creation</h4>
                  <p className="text-sm text-purple-700">
                    Analysis suggests potential for creating a new territory in Navi Mumbai area 
                    based on population growth and business development trends.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Territory Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Territory</DialogTitle>
          </DialogHeader>
          {selectedTerritory && (
            <form onSubmit={handleUpdateTerritory} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Territory Name</Label>
                  <Input 
                    id="edit-name" 
                    name="name" 
                    defaultValue={selectedTerritory.name} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="edit-assignedTo">Assigned To</Label>
                  <Input 
                    id="edit-assignedTo" 
                    name="assignedTo" 
                    defaultValue={selectedTerritory.assignedTo} 
                    required 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-area">Coverage Areas</Label>
                <Textarea 
                  id="edit-area" 
                  name="area" 
                  defaultValue={selectedTerritory.area} 
                  required 
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-population">Population</Label>
                  <Input 
                    id="edit-population" 
                    name="population" 
                    type="number" 
                    defaultValue={selectedTerritory.population} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="edit-businesses">Businesses</Label>
                  <Input 
                    id="edit-businesses" 
                    name="businesses" 
                    type="number" 
                    defaultValue={selectedTerritory.businesses} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="edit-target">Monthly Target (₹L)</Label>
                  <Input 
                    id="edit-target" 
                    name="target" 
                    type="number" 
                    defaultValue={selectedTerritory.monthlyTarget} 
                    required 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-potential">Potential</Label>
                <Select name="potential" defaultValue={selectedTerritory.potential} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Very High">Very High</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                  Update Territory
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TerritoryManagement;
