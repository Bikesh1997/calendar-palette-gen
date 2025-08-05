
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface ScheduleReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleReviewModal = ({ isOpen, onClose }: ScheduleReviewModalProps) => {
  const { toast } = useToast();
  const [reviewData, setReviewData] = useState({
    memberId: '',
    date: '',
    time: '',
    type: '',
    agenda: '',
    location: ''
  });

  const teamMembers = [
    { id: '1', name: 'Rahul Sharma', role: 'Senior Field Executive' },
    { id: '2', name: 'Anjali Patel', role: 'Field Executive' },
    { id: '3', name: 'Vikash Kumar', role: 'Field Executive' },
    { id: '4', name: 'Priya Singh', role: 'Senior Field Executive' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewData.memberId || !reviewData.date || !reviewData.time || !reviewData.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const member = teamMembers.find(m => m.id === reviewData.memberId);
    toast({
      title: "Review Scheduled",
      description: `${reviewData.type} review scheduled with ${member?.name} on ${reviewData.date}`,
    });
    
    setReviewData({
      memberId: '',
      date: '',
      time: '',
      type: '',
      agenda: '',
      location: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Team Review</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Team Member *</Label>
            <Select value={reviewData.memberId} onValueChange={(value) => setReviewData({ ...reviewData, memberId: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="reviewType">Review Type *</Label>
            <Select value={reviewData.type} onValueChange={(value) => setReviewData({ ...reviewData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select review type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="One-on-One">One-on-One Review</SelectItem>
                <SelectItem value="Performance">Performance Review</SelectItem>
                <SelectItem value="Goal Setting">Goal Setting Session</SelectItem>
                <SelectItem value="Feedback">Feedback Session</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={reviewData.date}
                onChange={(e) => setReviewData({ ...reviewData, date: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={reviewData.time}
                onChange={(e) => setReviewData({ ...reviewData, time: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={reviewData.location}
              onChange={(e) => setReviewData({ ...reviewData, location: e.target.value })}
              placeholder="Conference Room / Virtual / Office"
            />
          </div>
          
          <div>
            <Label htmlFor="agenda">Agenda</Label>
            <Textarea
              id="agenda"
              value={reviewData.agenda}
              onChange={(e) => setReviewData({ ...reviewData, agenda: e.target.value })}
              placeholder="Meeting agenda and key discussion points..."
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Schedule Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleReviewModal;
