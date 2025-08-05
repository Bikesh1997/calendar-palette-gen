import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  User, 
  CreditCard, 
  TrendingUp, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Heart,
  Target,
  FileText,
  Bell,
  Shield,
  Activity,
  Clock,
  DollarSign,
  PieChart,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import FamilyGroupTab from './FamilyGroupTab';
import ClientInteractionDetails from './ClientInteractionDetails';
import CrossSellSuggestions from './CrossSellSuggestions';
import GoalBasedNudges from './GoalBasedNudges';
import KYCTab from './KYCTab';
import SetAlertModal from '../alerts/SetAlertModal';
import LeadCallModal from '../leads/LeadCallModal';
import CreateOfferModal from './CreateOfferModal';

interface Customer {
  key: string;
  name: string;
  id: string;
  segment: string;
  relationshipValue: string;
  totalRelationship: string;
  phone: string;
  email: string;
  address: string;
  joinDate: string;
  lastInteraction: string;
  riskScore: string;
  products?: any[];
  interactions?: any[];
  family?: any[];
  opportunities?: any[];
}

interface CustomerDetailsModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomerDetailsModal = ({ customer, isOpen, onOpenChange }: CustomerDetailsModalProps) => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [setAlertModalOpen, setSetAlertModalOpen] = useState(false);
  const [callCustomerModalOpen, setCallCustomerModalOpen] = useState(false);
  const [createOfferModalOpen, setCreateOfferModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string>('');

  // Check if current user is Neha Gupta (Relationship Manager)
  const isNehaAccount = user?.id === '5' && user?.name === 'Neha Gupta';

  if (!customer) return null;

  // Generate active offers for customer 630
  const getActiveOffers = () => {
    if (customer.id === 'CUST001234' || customer.key === 'priya-sharma') {
      return [
        {
          id: 'OFF001',
          productType: 'Personal Loan',
          offerAmount: '₹8,00,000',
          interestRate: '10.5% p.a.',
          validity: '30 days',
          status: 'Active',
          description: 'Pre-approved personal loan based on excellent credit history',
          benefits: ['No processing fee', 'Flexible tenure up to 5 years', 'Quick disbursement'],
          createdDate: '15 Jun 2025',
          expiryDate: '15 Jul 2025'
        },
        {
          id: 'OFF002',
          productType: 'Credit Card Upgrade',
          offerAmount: '₹5,00,000 limit',
          interestRate: '3.5% monthly',
          validity: '45 days',
          status: 'Active',
          description: 'Upgrade to Platinum Credit Card with enhanced benefits',
          benefits: ['Airport lounge access', 'Reward points on all transactions', 'Zero annual fee for first year'],
          createdDate: '10 Jun 2025',
          expiryDate: '25 Jul 2025'
        },
        {
          id: 'OFF003',
          productType: 'Investment Plan',
          offerAmount: '₹2,00,000 SIP',
          interestRate: '12-15% expected returns',
          validity: '60 days',
          status: 'Pending Review',
          description: 'Diversified mutual fund portfolio with tax benefits',
          benefits: ['Tax saving under 80C', 'Professional fund management', 'Systematic investment approach'],
          createdDate: '05 Jun 2025',
          expiryDate: '05 Aug 2025'
        }
      ];
    }
    return [];
  };

  const activeOffers = getActiveOffers();

  // Convert customer to lead format for the call modal
  const customerAsLead = {
    id: customer.id,
    name: customer.name,
    contact: customer.name,
    phone: customer.phone,
    email: customer.email,
    status: 'qualified',
    source: 'Existing Customer',
    value: customer.totalRelationship,
    assignedTo: user?.name || 'Current User',
    assignedToId: user?.id || 'current',
    lastContact: customer.lastInteraction,
    priority: customer.relationshipValue === 'High' ? 'High' : 'Medium'
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'pending review': return 'bg-orange-100 text-orange-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateOffer = (productSuggestion?: string) => {
    setSelectedOpportunity(productSuggestion || '');
    setCreateOfferModalOpen(true);
  };

  const handleAddFamilyMember = () => {
    console.log('Add family member functionality');
  };

  const handleContactFamilyMember = (member: any) => {
    console.log('Contact family member:', member);
  };

  const handleCreateGoalPlan = (goalId: string) => {
    console.log('Create goal plan for:', goalId);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[95vw] sm:max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-3 sm:p-6">
          <DialogHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <DialogTitle className="text-xl sm:text-2xl font-bold">customer 360 view</DialogTitle>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSetAlertModalOpen(true)}
                  className="w-full sm:w-auto"
                >
                  <Bell size={16} className="mr-2" />
                  Set Alert
                </Button>
                <Button 
                  size="sm" 
                  className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto"
                  onClick={() => setCallCustomerModalOpen(true)}
                >
                  <Phone size={16} className="mr-2" />
                  Call Customer
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6">
            {/* Customer Summary and Key Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Customer Summary */}
              <Card className="lg:col-span-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center">
                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4">
                      <AvatarFallback className="text-lg sm:text-xl bg-teal-100 text-teal-700">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900">{customer.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-3">{customer.id}</p>
                    <Badge className="bg-purple-100 text-purple-800 mb-4 text-xs">{customer.segment}</Badge>
                    
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center text-gray-600 justify-center sm:justify-start">
                        <Phone size={12} className="mr-2 flex-shrink-0" />
                        <span className="truncate">{customer.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600 justify-center sm:justify-start">
                        <Mail size={12} className="mr-2 flex-shrink-0" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600 justify-center sm:justify-start">
                        <MapPin size={12} className="mr-2 flex-shrink-0" />
                        <span className="truncate">{customer.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600 justify-center sm:justify-start">
                        <Calendar size={12} className="mr-2 flex-shrink-0" />
                        <span className="truncate">Customer since {customer.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Key Metrics */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                <Card>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-600">Relationship Value</p>
                        <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{customer.totalRelationship}</p>
                        <Badge className="bg-green-100 text-green-800 mt-1 text-xs">{customer.relationshipValue}</Badge>
                      </div>
                      <TrendingUp size={20} className="text-teal-600 flex-shrink-0" />
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Portfolio Growth:</span>
                        <span className="font-medium text-green-600">+12.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Annual Revenue:</span>
                        <span className="font-medium">₹2.8L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Lifetime Value:</span>
                        <span className="font-medium">₹45.2L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Products Count:</span>
                        <span className="font-medium">{customer.products?.length || 0}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-600">Risk Score</p>
                        <p className="text-lg sm:text-xl font-bold text-gray-900">{customer.riskScore}</p>
                        <p className="text-xs text-gray-500 mt-1">Credit Assessment</p>
                      </div>
                      <Shield size={20} className="text-green-600 flex-shrink-0" />
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Credit Score:</span>
                        <span className="font-medium text-green-600">785</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment History:</span>
                        <span className="font-medium text-green-600">Excellent</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Debt-to-Income:</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Risk Trend:</span>
                        <span className="font-medium text-green-600">Improving</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="sm:col-span-2 xl:col-span-1">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-600">Last Interaction</p>
                        <p className="text-lg sm:text-xl font-bold text-gray-900">{customer.lastInteraction}</p>
                        <p className="text-xs text-gray-500 mt-1">Recent Activity</p>
                      </div>
                      <Activity size={20} className="text-orange-600 flex-shrink-0" />
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Channel:</span>
                        <span className="font-medium">Phone Call</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Purpose:</span>
                        <span className="font-medium">FD Renewal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Outcome:</span>
                        <span className="font-medium text-green-600">Interested</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Next Follow-up:</span>
                        <span className="font-medium">In 3 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Information Tabs */}
            <Card>
              <CardContent className="p-3 sm:p-6">
                <Tabs defaultValue="kyc" className="w-full">
                  <TabsList className={`grid w-full ${isNehaAccount ? 'grid-cols-4 sm:grid-cols-8' : 'grid-cols-3 sm:grid-cols-6'} gap-1 h-auto`}>
                    <TabsTrigger value="kyc" className="text-xs sm:text-sm px-2 py-2">KYC</TabsTrigger>
                    <TabsTrigger value="products" className="text-xs sm:text-sm px-2 py-2">Products</TabsTrigger>
                    <TabsTrigger value="family" className="text-xs sm:text-sm px-2 py-2">Family Group</TabsTrigger>
                    <TabsTrigger value="opportunities" className="text-xs sm:text-sm px-2 py-2">Opportunities</TabsTrigger>
                    <TabsTrigger value="offers" className="text-xs sm:text-sm px-2 py-2">Offers</TabsTrigger>
                    <TabsTrigger value="client-details" className="text-xs sm:text-sm px-2 py-2">Client Details</TabsTrigger>
                    {isNehaAccount && <TabsTrigger value="cross-sell" className="text-xs sm:text-sm px-2 py-2">AI Cross-Sell</TabsTrigger>}
                    {isNehaAccount && <TabsTrigger value="goals" className="text-xs sm:text-sm px-2 py-2">Goal Planning</TabsTrigger>}
                  </TabsList>

                  <TabsContent value="kyc" className="space-y-4 mt-4">
                    <KYCTab customerName={customer.name} />
                  </TabsContent>

                  <TabsContent value="products" className="space-y-4 mt-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Product Holdings</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                      {customer.products?.map((product, index) => (
                        <Card key={index} className="border border-gray-200">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                              <div className="flex items-center min-w-0 flex-1">
                                <CreditCard size={14} className="mr-2 text-teal-600 flex-shrink-0" />
                                <h4 className="font-medium text-gray-900 text-sm truncate">{product.type}</h4>
                              </div>
                              <Badge className={`${getStatusColor(product.status || 'Active')} text-xs flex-shrink-0`}>
                                {product.status || 'Active'}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                              {product.balance && <p>Balance: <span className="font-medium">{product.balance}</span></p>}
                              {product.amount && <p>Amount: <span className="font-medium">{product.amount}</span></p>}
                              {product.outstanding && <p>Outstanding: <span className="font-medium">{product.outstanding}</span></p>}
                              {product.limit && <p>Limit: <span className="font-medium">{product.limit}</span></p>}
                              {product.maturity && <p>Maturity: <span className="font-medium">{product.maturity}</span></p>}
                              {product.emi && <p>EMI: <span className="font-medium">{product.emi}</span></p>}
                              {product.utilization && <p>Utilization: <span className="font-medium">{product.utilization}</span></p>}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="family" className="space-y-4 mt-4">
                    <FamilyGroupTab
                      family={customer.family || []}
                      onAddFamilyMember={handleAddFamilyMember}
                      onContactMember={handleContactFamilyMember}
                    />
                  </TabsContent>

                  <TabsContent value="opportunities" className="space-y-4 mt-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Cross-sell & Up-sell Opportunities</h3>
                    <div className="space-y-3">
                      {customer.opportunities?.map((opportunity, index) => (
                        <Card key={index} className="border border-gray-200">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex items-start space-x-3 min-w-0 flex-1">
                                <Target size={18} className="text-teal-600 mt-0.5 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-medium text-gray-900 text-sm">{opportunity.product}</h4>
                                  <p className="text-xs sm:text-sm text-gray-600">{opportunity.reason}</p>
                                  <p className="text-xs sm:text-sm font-medium text-teal-600 mt-1">Potential: {opportunity.potential}</p>
                                </div>
                              </div>
                              <div className="flex flex-col sm:items-end gap-2">
                                <Badge className={`${getPriorityColor(opportunity.priority)} text-xs`}>
                                  {opportunity.priority}
                                </Badge>
                                <Button 
                                  size="sm" 
                                  className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto text-xs"
                                  onClick={() => handleCreateOffer(opportunity.product)}
                                >
                                  Create Offer
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="offers" className="space-y-4 mt-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Active Offers & Campaigns</h3>
                    {activeOffers.length > 0 ? (
                      <div className="space-y-4">
                        {activeOffers.map((offer) => (
                          <Card key={offer.id} className="border border-gray-200">
                            <CardContent className="p-4 sm:p-6">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                                <div className="flex items-center space-x-3 min-w-0 flex-1">
                                  <div className="bg-teal-100 p-2 rounded-lg flex-shrink-0">
                                    <DollarSign size={18} className="text-teal-600" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-base sm:text-lg text-gray-900">{offer.productType}</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">{offer.description}</p>
                                  </div>
                                </div>
                                <Badge className={`${getStatusColor(offer.status)} text-xs flex-shrink-0`}>
                                  {offer.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                                <div>
                                  <p className="text-xs text-gray-500">Offer Amount</p>
                                  <p className="font-medium text-gray-900 text-sm">{offer.offerAmount}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Interest Rate</p>
                                  <p className="font-medium text-gray-900 text-sm">{offer.interestRate}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Valid for</p>
                                  <p className="font-medium text-gray-900 text-sm">{offer.validity}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Expires on</p>
                                  <p className="font-medium text-gray-900 text-sm">{offer.expiryDate}</p>
                                </div>
                              </div>

                              <div className="mb-4">
                                <p className="text-sm font-medium text-gray-900 mb-2">Key Benefits:</p>
                                <ul className="list-disc list-inside space-y-1">
                                  {offer.benefits.map((benefit, index) => (
                                    <li key={index} className="text-xs sm:text-sm text-gray-600">{benefit}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t gap-3">
                                <div className="text-xs text-gray-500">
                                  Created: {offer.createdDate}
                                </div>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                  <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs">
                                    <FileText size={12} className="mr-1" />
                                    View Details
                                  </Button>
                                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto text-xs">
                                    <Phone size={12} className="mr-1" />
                                    Discuss Offer
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">No active offers for this customer</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="client-details" className="space-y-4 mt-4">
                    <ClientInteractionDetails customerName={customer.name} />
                  </TabsContent>

                  {/* Enhanced tabs only for Neha's account */}
                  {isNehaAccount && (
                    <>
                      <TabsContent value="cross-sell" className="space-y-4 mt-4">
                        <CrossSellSuggestions
                          customerName={customer.name}
                          segment={customer.segment}
                          relationshipValue={customer.relationshipValue}
                          onCreateOffer={handleCreateOffer}
                        />
                      </TabsContent>

                      <TabsContent value="goals" className="space-y-4 mt-4">
                        <GoalBasedNudges
                          customerName={customer.name}
                          onCreatePlan={handleCreateGoalPlan}
                        />
                      </TabsContent>
                    </>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sub-modals */}
      <SetAlertModal
        customerName={customer?.name || ''}
        isOpen={setAlertModalOpen}
        onOpenChange={setSetAlertModalOpen}
      />
      
      <LeadCallModal
        lead={customerAsLead}
        isOpen={callCustomerModalOpen}
        onOpenChange={setCallCustomerModalOpen}
      />
      
      <CreateOfferModal
        customerName={customer?.name || ''}
        productSuggestion={selectedOpportunity}
        isOpen={createOfferModalOpen}
        onOpenChange={setCreateOfferModalOpen}
      />
    </>
  );
};

export default CustomerDetailsModal;