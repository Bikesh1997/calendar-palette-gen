
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Target, IndianRupee, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateOfferModalProps {
  customerName: string;
  productSuggestion?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateOfferModal = ({ customerName, productSuggestion, isOpen, onOpenChange }: CreateOfferModalProps) => {
  const [selectedProduct, setSelectedProduct] = useState(productSuggestion || '');
  const [offerAmount, setOfferAmount] = useState('');
  const [validityDays, setValidityDays] = useState('30');
  const { toast } = useToast();

  const products = [
    'Personal Loan',
    'Home Loan',
    'Car Loan',
    'Credit Card',
    'Fixed Deposit',
    'Mutual Funds',
    'Life Insurance',
    'Health Insurance',
    'Business Loan',
    'Gold Loan'
  ];

  const handleCreateOffer = () => {
    if (!selectedProduct || !offerAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Offer Created Successfully",
      description: `${selectedProduct} offer of ₹${offerAmount} created for ${customerName}`,
    });
    
    // Reset form
    setSelectedProduct('');
    setOfferAmount('');
    setValidityDays('30');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-teal-700">
            <Target size={20} className="mr-2" />
            Create Offer for {customerName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Type *
            </label>
            <select 
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Select product...</option>
              {products.map((product) => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Offer Amount *
            </label>
            <div className="relative">
              <IndianRupee size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                placeholder="Enter amount (e.g., 5L, 50000)"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Offer Validity (Days)
            </label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select 
                value={validityDays}
                onChange={(e) => setValidityDays(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="15">15 days</option>
                <option value="30">30 days</option>
                <option value="45">45 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>
            </div>
          </div>

          {selectedProduct && offerAmount && (
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
              <h4 className="font-medium text-teal-800 mb-1">Offer Summary</h4>
              <p className="text-sm text-teal-700">
                {selectedProduct} offer of ₹{offerAmount} valid for {validityDays} days
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handleCreateOffer}
              className="flex-1 bg-teal-600 hover:bg-teal-700"
              disabled={!selectedProduct || !offerAmount}
            >
              Create Offer
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

export default CreateOfferModal;
