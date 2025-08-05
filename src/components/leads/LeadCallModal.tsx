
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone, User, Building, TrendingUp, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  status: string;
  source: string;
  value: string;
  assignedTo: string;
  assignedToId: string;
  lastContact: string;
  priority: string;
}

interface LeadCallModalProps {
  lead: Lead;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadCallModal = ({ lead, isOpen, onOpenChange }: LeadCallModalProps) => {
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState('');

  // Auto-generated conversation starters based on lead data
  const getConversationStarters = () => {
    const starters = [
      `Hi ${lead.contact}, this is regarding your inquiry about our financial services for ${lead.name}.`,
      `Hello ${lead.contact}, I'm calling to follow up on your recent interest in our business solutions.`,
      `Good day ${lead.contact}, I wanted to discuss how we can help ${lead.name} achieve your financial goals.`
    ];

    // Add status-specific starters
    if (lead.status === 'new') {
      starters.push(`Hi ${lead.contact}, thank you for showing interest in our services. I'd like to understand your requirements better.`);
    } else if (lead.status === 'qualified') {
      starters.push(`Hello ${lead.contact}, based on our previous discussion, I have some tailored solutions for ${lead.name}.`);
    } else if (lead.status === 'proposal') {
      starters.push(`Hi ${lead.contact}, I'm calling to discuss the proposal we sent for ${lead.name} and address any questions.`);
    }

    // Add priority-specific starters
    if (lead.priority === 'high') {
      starters.push(`Hello ${lead.contact}, as a priority client, I wanted to personally ensure we're meeting all your needs for ${lead.name}.`);
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

    console.log('Calling lead:', lead.phone);
    toast({
      title: "Call Initiated",
      description: `Calling ${lead.contact} at ${lead.phone}`,
    });
    window.open(`tel:${lead.phone}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-green-700 flex items-center">
            <Phone size={20} className="mr-2" />
            Make a Call
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{lead.contact}</h3>
                <p className="text-xl font-mono text-green-700">{lead.phone}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Building size={16} className="text-gray-500" />
                <span className="text-gray-700">{lead.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp size={16} className="text-gray-500" />
                <span className="text-gray-700">{lead.value}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-gray-500" />
                <span className="text-gray-700">{lead.lastContact}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lead.priority === 'high' ? 'bg-red-100 text-red-800' :
                  lead.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {lead.priority} priority
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  lead.status === 'qualified' ? 'bg-green-100 text-green-800' :
                  lead.status === 'proposal' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {lead.status}
                </span>
              </div>
            </div>
          </div>

          {/* Conversation Starters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Conversation Starter *
            </label>
            <div className="space-y-2">
              {conversationStarters.map((starter, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <input
                    type="radio"
                    id={`starter-${index}`}
                    name="conversation-starter"
                    value={starter}
                    checked={selectedConversation === starter}
                    onChange={(e) => setSelectedConversation(e.target.value)}
                    className="mt-1"
                  />
                  <label 
                    htmlFor={`starter-${index}`}
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

export default LeadCallModal;
