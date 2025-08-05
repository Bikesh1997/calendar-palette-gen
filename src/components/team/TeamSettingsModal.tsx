
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface TeamSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamSettingsModal = ({ isOpen, onClose }: TeamSettingsModalProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    autoAssignLeads: true,
    emailNotifications: true,
    performanceAlerts: false,
    dailyReports: true,
    weeklyTargets: true,
    maxLeadsPerMember: 30,
    workingHours: '9:00 AM - 6:00 PM',
    teamName: 'Sales Team Alpha'
  });

  const handleSave = () => {
    toast({
      title: "Settings Updated",
      description: "Team settings have been successfully updated",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Team Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div>
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                value={settings.teamName}
                onChange={(e) => setSettings({ ...settings, teamName: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="workingHours">Working Hours</Label>
              <Input
                id="workingHours"
                value={settings.workingHours}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="maxLeads">Max Leads Per Member</Label>
              <Input
                id="maxLeads"
                type="number"
                value={settings.maxLeadsPerMember}
                onChange={(e) => setSettings({ ...settings, maxLeadsPerMember: parseInt(e.target.value) })}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="automation" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoAssign">Auto-assign new leads</Label>
              <Switch
                id="autoAssign"
                checked={settings.autoAssignLeads}
                onCheckedChange={(checked) => setSettings({ ...settings, autoAssignLeads: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="weeklyTargets">Weekly target updates</Label>
              <Switch
                id="weeklyTargets"
                checked={settings.weeklyTargets}
                onCheckedChange={(checked) => setSettings({ ...settings, weeklyTargets: checked })}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifs">Email notifications</Label>
              <Switch
                id="emailNotifs"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="perfAlerts">Performance alerts</Label>
              <Switch
                id="perfAlerts"
                checked={settings.performanceAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, performanceAlerts: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="dailyReports">Daily reports</Label>
              <Switch
                id="dailyReports"
                checked={settings.dailyReports}
                onCheckedChange={(checked) => setSettings({ ...settings, dailyReports: checked })}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamSettingsModal;
