
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface GeoLocation {
  id: string;
  name: string;
  type: 'zone' | 'region' | 'branch' | 'pincode';
  code: string;
}

interface AddGeoLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (locationData: any) => void;
  parentLocations: GeoLocation[];
}

const AddGeoLocationModal: React.FC<AddGeoLocationModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd, 
  parentLocations 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    code: '',
    parent: '',
    description: '',
    pincodes: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    
    // Reset form
    setFormData({
      name: '',
      type: '',
      code: '',
      parent: '',
      description: '',
      pincodes: '',
      address: ''
    });
  };

  const locationTypes = [
    { value: 'zone', label: 'Zone' },
    { value: 'region', label: 'Region' },
    { value: 'branch', label: 'Branch' },
    { value: 'pincode', label: 'Pin Code Area' }
  ];

  const getAvailableParents = () => {
    switch (formData.type) {
      case 'region':
        return parentLocations.filter(loc => loc.type === 'zone');
      case 'branch':
        return parentLocations.filter(loc => loc.type === 'region');
      case 'pincode':
        return parentLocations.filter(loc => loc.type === 'branch');
      default:
        return [];
    }
  };

  const availableParents = getAvailableParents();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Add Geographic Location</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Location Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Mumbai Central"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="code">Location Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="e.g., MC, WZ"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Location Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {locationTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.type && formData.type !== 'zone' && (
                  <div>
                    <Label htmlFor="parent">Parent Location</Label>
                    <Select value={formData.parent} onValueChange={(value) => setFormData({...formData, parent: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        {availableParents.map(parent => (
                          <SelectItem key={parent.id} value={parent.id}>
                            {parent.name} ({parent.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe this location..."
                />
              </div>
            </CardContent>
          </Card>

          {formData.type === 'branch' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Branch Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Branch Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Complete branch address..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="pincodes">Served Pin Codes</Label>
                  <Input
                    id="pincodes"
                    value={formData.pincodes}
                    onChange={(e) => setFormData({...formData, pincodes: e.target.value})}
                    placeholder="e.g., 400001, 400002, 400003"
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    Enter comma-separated pin codes served by this branch
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {formData.type === 'pincode' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pin Code Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pincodes">Pin Code</Label>
                  <Input
                    id="pincodes"
                    value={formData.pincodes}
                    onChange={(e) => setFormData({...formData, pincodes: e.target.value})}
                    placeholder="e.g., 400001"
                    pattern="[0-9]{6}"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Area Description</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="e.g., Nariman Point, Fort"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Add Location
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGeoLocationModal;
