
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface SetTargetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedMember?: any;
}

const SetTargetsModal = ({ isOpen, onClose, preSelectedMember }: SetTargetsModalProps) => {
  const { toast } = useToast();
  const [selectedMember, setSelectedMember] = useState('');
  const [targets, setTargets] = useState({
    monthly: '',
    quarterly: '',
    annual: '',
    calls: '',
    conversion: '',
    revenue: ''
  });

  const teamMembers = [
    { id: '1', name: 'Rahul Sharma', role: 'Senior Field Executive' },
    { id: '2', name: 'Anjali Patel', role: 'Field Executive' },
    { id: '3', name: 'Vikash Kumar', role: 'Field Executive' },
    { id: '4', name: 'Priya Singh', role: 'Senior Field Executive' }
  ];

  useEffect(() => {
    if (preSelectedMember) {
      setSelectedMember(preSelectedMember.id);
    }
  }, [preSelectedMember]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMember) {
      toast({
        title: "Member Required",
        description: "Please select a team member",
        variant: "destructive"
      });
      return;
    }

    const member = teamMembers.find(m => m.id === selectedMember);
    toast({
      title: "Targets Set Successfully",
      description: `Performance targets have been set for ${member?.name}`,
    });
    
    setSelectedMember('');
    setTargets({
      monthly: '',
      quarterly: '',
      annual: '',
      calls: '',
      conversion: '',
      revenue: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Performance Targets</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Select Team Member</Label>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger>
                <SelectValue placeholder="Choose team member" />
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
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="monthly">Monthly Target (₹L)</Label>
              <Input
                id="monthly"
                value={targets.monthly}
                onChange={(e) => setTargets({ ...targets, monthly: e.target.value })}
                placeholder="15"
              />
            </div>
            
            <div>
              <Label htmlFor="quarterly">Quarterly Target (₹L)</Label>
              <Input
                id="quarterly"
                value={targets.quarterly}
                onChange={(e) => setTargets({ ...targets, quarterly: e.target.value })}
                placeholder="45"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="annual">Annual Target (₹L)</Label>
            <Input
              id="annual"
              value={targets.annual}
              onChange={(e) => setTargets({ ...targets, annual: e.target.value })}
              placeholder="180"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="calls">Daily Calls Target</Label>
              <Input
                id="calls"
                value={targets.calls}
                onChange={(e) => setTargets({ ...targets, calls: e.target.value })}
                placeholder="25"
              />
            </div>
            
            <div>
              <Label htmlFor="conversion">Conversion Rate (%)</Label>
              <Input
                id="conversion"
                value={targets.conversion}
                onChange={(e) => setTargets({ ...targets, conversion: e.target.value })}
                placeholder="30"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="revenue">Revenue Target (₹L)</Label>
            <Input
              id="revenue"
              value={targets.revenue}
              onChange={(e) => setTargets({ ...targets, revenue: e.target.value })}
              placeholder="20"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Set Targets
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SetTargetsModal;
