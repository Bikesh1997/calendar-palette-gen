
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone, Clock, User, Building, CreditCard, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CallCustomerModalProps {
  customer: {
    name: string;
    phone: string;
    lastInteraction: string;
    relationshipValue: string;
    accountType?: string;
    branch?: string;
    segment?: string;
  };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CallCustomerModal = ({ customer, isOpen, onOpenChange }: CallCustomerModalProps) => {
  const [selectedConversation, setSelectedConversation] = useState('');
  const { toast } = useToast();

  // Auto-generated conversation starters based on customer data
  const getConversationStarters = () => {
    const starters = [
      `Hello ${customer.name}, this is from infinity-fincorp-solutions. I hope you're doing well today.`,
      `Hi ${customer.name}, I'm calling to check on your banking experience and see how we can better serve you.`,
      `Good day ${customer.name}, I wanted to personally reach out to discuss your financial goals with us.`
    ];

    // Add relationship value-specific starters
    if (customer.relationshipValue.includes('High')) {
      starters.push(`Hello ${customer.name}, as one of our valued premium customers, I wanted to personally ensure you're getting the best from our services.`);
      starters.push(`Hi ${customer.name}, I have some exclusive offers for our high-value customers that might interest you.`);
    }

    // Add segment-specific starters
    if (customer.segment === 'Premium') {
      starters.push(`Hello ${customer.name}, our premium banking team wanted to discuss some tailored solutions for you.`);
    } else if (customer.segment === 'SME') {
      starters.push(`Hi ${customer.name}, I'm calling to discuss how we can support your business growth through our SME solutions.`);
    }

    // Add interaction-based starters
    if (customer.lastInteraction.includes('transaction')) {
      starters.push(`Hello ${customer.name}, I noticed your recent transaction and wanted to ensure everything went smoothly.`);
    }

    return starters;
  };

  const conversationStarters = getConversationStarters();

  const makeCall = () => {
    if (!selectedConversation) {
      toast({
        title: "Select Conversation Starter",
        description: "Please select a conversation starter before making the call.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Call Initiated",
      description: `Calling ${customer.name} - ${selectedConversation.substring(0, 50)}...`,
    });
    
    // Simulate making a call
    window.open(`tel:${customer.phone}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center text-green-700">
            <Phone size={20} className="mr-2" />
            Call Customer
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                <p className="text-xl font-mono text-blue-700">{customer.phone}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingUp size={16} className="text-blue-500" />
                <span className="text-blue-700">{customer.relationshipValue}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-blue-500" />
                <span className="text-blue-700">{customer.lastInteraction}</span>
              </div>
              {customer.accountType && (
                <div className="flex items-center space-x-2">
                  <CreditCard size={16} className="text-blue-500" />
                  <span className="text-blue-700">{customer.accountType}</span>
                </div>
              )}
              {customer.branch && (
                <div className="flex items-center space-x-2">
                  <Building size={16} className="text-blue-500" />
                  <span className="text-blue-700">{customer.branch}</span>
                </div>
              )}
            </div>
          </div>

          {/* Conversation Starters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Conversation Starter *
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {conversationStarters.map((starter, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <input
                    type="radio"
                    id={`customer-starter-${index}`}
                    name="customer-conversation-starter"
                    value={starter}
                    checked={selectedConversation === starter}
                    onChange={(e) => setSelectedConversation(e.target.value)}
                    className="mt-1"
                  />
                  <label 
                    htmlFor={`customer-starter-${index}`}
                    className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                  >
                    {starter}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={makeCall}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3"
            >
              <Phone size={16} className="mr-2" />
              Start Call
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallCustomerModal;
