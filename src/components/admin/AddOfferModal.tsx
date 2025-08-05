
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface AddOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (offerData: any) => void;
}

const AddOfferModal: React.FC<AddOfferModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    value: '',
    product: '',
    eligibility: '',
    startDate: '',
    endDate: '',
    campaign: '',
    maxUsage: 100,
    geography: '',
    customerType: '',
    minTenure: '',
    minRelationshipValue: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: '',
      type: '',
      value: '',
      product: '',
      eligibility: '',
      startDate: '',
      endDate: '',
      campaign: '',
      maxUsage: 100,
      geography: '',
      customerType: '',
      minTenure: '',
      minRelationshipValue: ''
    });
  };

  const offerTypes = [
    { value: 'discount', label: 'Discount' },
    { value: 'cashback', label: 'Cashback' },
    { value: 'extra_benefit', label: 'Extra Benefit' },
    { value: 'fee_waiver', label: 'Fee Waiver' },
    { value: 'interest_boost', label: 'Interest Boost' }
  ];

  const products = [
    'Savings Account', 'Current Account', 'Fixed Deposit', 'Recurring Deposit',
    'Home Loan', 'Personal Loan', 'Vehicle Loan', 'Gold Loan', 'MSME Loan',
    'Life Insurance', 'General Insurance', 'Mutual Funds', 'Credit Card'
  ];

  const customerTypes = ['Individual', 'HNI', 'MSME', 'Corporate', 'Rural', 'Urban'];
  const geographies = ['All India', 'North', 'South', 'East', 'West', 'Central', 'Rural', 'Urban'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Create New Offer</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Offer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Offer Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., FD Interest Boost"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="campaign">Campaign (Optional)</Label>
                  <Input
                    id="campaign"
                    value={formData.campaign}
                    onChange={(e) => setFormData({...formData, campaign: e.target.value})}
                    placeholder="e.g., Q1 Savings Drive"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Offer Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {offerTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="value">Offer Value</Label>
                  <Input
                    id="value"
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    placeholder="e.g., 0.5% extra, ₹1000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="maxUsage">Max Usage Limit</Label>
                  <Input
                    id="maxUsage"
                    type="number"
                    value={formData.maxUsage}
                    onChange={(e) => setFormData({...formData, maxUsage: Number(e.target.value)})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="product">Product/Service</Label>
                <Select value={formData.product} onValueChange={(value) => setFormData({...formData, product: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {products.map(product => (
                      <SelectItem key={product} value={product}>{product}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="eligibility">Eligibility Description</Label>
                <Textarea
                  id="eligibility"
                  value={formData.eligibility}
                  onChange={(e) => setFormData({...formData, eligibility: e.target.value})}
                  placeholder="Describe the eligibility criteria..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerType">Customer Type</Label>
                  <Select value={formData.customerType} onValueChange={(value) => setFormData({...formData, customerType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {customerTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="geography">Geography</Label>
                  <Select value={formData.geography} onValueChange={(value) => setFormData({...formData, geography: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select geography" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {geographies.map(geo => (
                        <SelectItem key={geo} value={geo}>{geo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minTenure">Minimum Tenure (months)</Label>
                  <Input
                    id="minTenure"
                    type="number"
                    value={formData.minTenure}
                    onChange={(e) => setFormData({...formData, minTenure: e.target.value})}
                    placeholder="e.g., 6"
                  />
                </div>
                <div>
                  <Label htmlFor="minRelationshipValue">Min Relationship Value (₹)</Label>
                  <Input
                    id="minRelationshipValue"
                    type="number"
                    value={formData.minRelationshipValue}
                    onChange={(e) => setFormData({...formData, minRelationshipValue: e.target.value})}
                    placeholder="e.g., 50000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Validity Period</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Create Offer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOfferModal;
