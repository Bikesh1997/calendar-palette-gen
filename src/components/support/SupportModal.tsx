
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { HelpCircle, MessageSquare, Phone, Mail } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'medium'
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support ticket submitted:', formData);
    
    toast({
      title: "Support Ticket Submitted",
      description: "Your support request has been submitted successfully. Our team will get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      category: '',
      subject: '',
      description: '',
      priority: 'medium'
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <HelpCircle className="mr-2" size={20} />
            Support & Helpdesk
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Phone className="mx-auto mb-2 text-teal-600" size={24} />
              <p className="text-sm font-medium">Call Support</p>
              <p className="text-xs text-gray-600">1800-208-2121</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Mail className="mx-auto mb-2 text-teal-600" size={24} />
              <p className="text-sm font-medium">Email Support</p>
              <p className="text-xs text-gray-600">support@infinity.com</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <MessageSquare className="mx-auto mb-2 text-teal-600" size={24} />
              <p className="text-sm font-medium">Live Chat</p>
              <p className="text-xs text-gray-600">Available 9AM-6PM</p>
            </div>
          </div>

          {/* Support Ticket Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue category" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="technical">Technical Issues</SelectItem>
                  <SelectItem value="leads">Lead Management</SelectItem>
                  <SelectItem value="tasks">Task Management</SelectItem>
                  <SelectItem value="reports">Reports & Analytics</SelectItem>
                  <SelectItem value="account">Account Issues</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Please provide detailed information about your issue"
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Submit Ticket
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportModal;
