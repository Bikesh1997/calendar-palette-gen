
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SetAlertModalProps {
  customerName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SetAlertModal = ({ customerName, isOpen, onOpenChange }: SetAlertModalProps) => {
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const { toast } = useToast();

  const alertTypes = [
    {
      id: 'payment-due',
      title: 'Payment Due Reminder',
      description: 'Alert when loan/credit card payment is due',
      icon: Calendar,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'high-transaction',
      title: 'High Transaction Alert',
      description: 'Alert for transactions above ₹50,000',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'product-maturity',
      title: 'Product Maturity',
      description: 'Alert before FD/insurance policy maturity',
      icon: Bell,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'risk-change',
      title: 'Risk Profile Change',
      description: 'Alert when customer risk score changes',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-800'
    }
  ];

  const toggleAlert = (alertId: string) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const handleSetAlerts = () => {
    if (selectedAlerts.length === 0) {
      toast({
        title: "No Alerts Selected",
        description: "Please select at least one alert type.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Alerts Set Successfully",
      description: `${selectedAlerts.length} alert(s) configured for ${customerName}`,
    });
    
    setSelectedAlerts([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bell size={20} className="mr-2 text-teal-600" />
            Set Alerts for {customerName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Select the types of alerts you want to receive for this customer:
          </p>
          
          <div className="space-y-3">
            {alertTypes.map((alert) => {
              const Icon = alert.icon;
              const isSelected = selectedAlerts.includes(alert.id);
              
              return (
                <div
                  key={alert.id}
                  onClick={() => toggleAlert(alert.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${alert.color}`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                    {isSelected && (
                      <Badge className="bg-teal-100 text-teal-800">Selected</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handleSetAlerts}
              className="flex-1 bg-teal-600 hover:bg-teal-700"
              disabled={selectedAlerts.length === 0}
            >
              Set Alerts ({selectedAlerts.length})
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

export default SetAlertModal;
