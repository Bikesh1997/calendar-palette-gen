
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Calendar, Tag, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddOfferModal from '@/components/admin/AddOfferModal';

interface Offer {
  id: string;
  name: string;
  type: 'discount' | 'cashback' | 'extra_benefit' | 'fee_waiver' | 'interest_boost';
  value: string;
  product: string;
  eligibility: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired';
  campaign?: string;
  usage: number;
  maxUsage: number;
}

const mockOffers: Offer[] = [
  {
    id: '1',
    name: 'FD Interest Boost',
    type: 'interest_boost',
    value: '0.5% extra',
    product: 'Fixed Deposit',
    eligibility: 'Savings customers with 6+ months tenure',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'active',
    campaign: 'Q1 Savings Drive',
    usage: 145,
    maxUsage: 500
  },
  {
    id: '2',
    name: 'Home Loan Processing Fee Waiver',
    type: 'fee_waiver',
    value: '100% processing fee',
    product: 'Home Loan',
    eligibility: 'First time home buyers, Age < 40',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    status: 'active',
    campaign: 'Home Loan Festival',
    usage: 67,
    maxUsage: 200
  },
  {
    id: '3',
    name: 'Gold Loan Cashback',
    type: 'cashback',
    value: '₹1000',
    product: 'Gold Loan',
    eligibility: 'Loan amount > ₹50k, Rural customers',
    startDate: '2023-12-01',
    endDate: '2024-01-31',
    status: 'expired',
    campaign: 'Festival Special',
    usage: 89,
    maxUsage: 150
  }
];

const OfferManagementRule = () => {
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || offer.type === filterType;
    const matchesStatus = filterStatus === 'all' || offer.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleToggleStatus = (offerId: string) => {
    setOffers(offers.map(offer => 
      offer.id === offerId 
        ? { ...offer, status: offer.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' | 'expired' }
        : offer
    ));
    
    const offer = offers.find(o => o.id === offerId);
    toast({
      title: "Offer Status Updated",
      description: `${offer?.name} has been ${offer?.status === 'active' ? 'deactivated' : 'activated'}.`,
    });
  };

  const handleDeleteOffer = (offerId: string) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(offer => offer.id !== offerId));
      toast({
        title: "Offer Deleted",
        description: "Offer has been deleted successfully.",
      });
    }
  };

  const handleAddOffer = (offerData: any) => {
    const newOffer: Offer = {
      id: String(offers.length + 1),
      ...offerData,
      status: 'active',
      usage: 0
    };
    setOffers([...offers, newOffer]);
    setAddModalOpen(false);
    toast({
      title: "Offer Created",
      description: "New offer has been created successfully.",
    });
  };

  const getTypeDisplay = (type: string) => {
    const typeMap = {
      'discount': 'Discount',
      'cashback': 'Cashback',
      'extra_benefit': 'Extra Benefit',
      'fee_waiver': 'Fee Waiver',
      'interest_boost': 'Interest Boost'
    };
    return typeMap[type as keyof typeof typeMap] || type;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activeOffers = offers.filter(offer => offer.status === 'active').length;
  const totalUsage = offers.reduce((sum, offer) => sum + offer.usage, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Offer Management</h1>
        <Button onClick={() => setAddModalOpen(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Offer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-teal-600">{offers.length}</div>
            <div className="text-sm text-gray-600">Total Offers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{activeOffers}</div>
            <div className="text-sm text-gray-600">Active Offers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{totalUsage}</div>
            <div className="text-sm text-gray-600">Total Usage</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">78%</div>
            <div className="text-sm text-gray-600">Avg Utilization</div>
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
                  placeholder="Search offers..."
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
                <SelectItem value="discount">Discount</SelectItem>
                <SelectItem value="cashback">Cashback</SelectItem>
                <SelectItem value="extra_benefit">Extra Benefit</SelectItem>
                <SelectItem value="fee_waiver">Fee Waiver</SelectItem>
                <SelectItem value="interest_boost">Interest Boost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Offers Table */}
      <Card>
  <CardHeader>
    <CardTitle>Offers ({filteredOffers.length})</CardTitle>
  </CardHeader>

  <CardContent>
    {/* Table view for desktop */}
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Offer Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOffers.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell>
                <div className="font-medium">{offer.name}</div>
                {offer.campaign && (
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {offer.campaign}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{getTypeDisplay(offer.type)}</Badge>
              </TableCell>
              <TableCell className="font-medium">{offer.value}</TableCell>
              <TableCell>{offer.product}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {offer.startDate}
                  </div>
                  <div className="text-gray-500">to {offer.endDate}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="font-medium">{offer.usage}/{offer.maxUsage}</div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${(offer.usage / offer.maxUsage) * 100}%` }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {offer.status !== 'expired' && (
                    <Switch
                      checked={offer.status === 'active'}
                      onCheckedChange={() => handleToggleStatus(offer.id)}
                    />
                  )}
                  <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteOffer(offer.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Card layout for mobile */}
    <div className="md:hidden space-y-4">
      {filteredOffers.map((offer) => (
        <div key={offer.id} className="border rounded-lg p-4 shadow-sm space-y-2">
          <div className="font-semibold text-base">{offer.name}</div>
          {offer.campaign && (
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {offer.campaign}
            </div>
          )}
          <div><strong>Type:</strong> <Badge variant="outline">{getTypeDisplay(offer.type)}</Badge></div>
          <div><strong>Value:</strong> {offer.value}</div>
          <div><strong>Product:</strong> {offer.product}</div>
          <div>
            <strong>Duration:</strong>
            <div className="text-sm text-gray-700">
              <Calendar className="inline h-3 w-3 mr-1" />
              {offer.startDate} to {offer.endDate}
            </div>
          </div>
          <div>
            <strong>Usage:</strong>
            <div className="text-sm">
              {offer.usage}/{offer.maxUsage}
              <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${(offer.usage / offer.maxUsage) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <strong>Status:</strong>
            {offer.status !== 'expired' && (
              <Switch
                checked={offer.status === 'active'}
                onCheckedChange={() => handleToggleStatus(offer.id)}
              />
            )}
            <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDeleteOffer(offer.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

      {/* Add Offer Modal */}
      <AddOfferModal 
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddOffer}
      />
    </div>
  );
};

export default OfferManagementRule;
