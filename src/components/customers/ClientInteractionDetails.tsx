
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MapPin,
  MessageSquare,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ClientInteractionDetails = ({ customerName }: { customerName: string }) => {
  const { toast } = useToast();
  const [interactionData, setInteractionData] = useState({
    personalMet: false,
    date: '',
    time: '',
    modeOfInteraction: '',
    geoTagging: '',
    remarks: ''
  });

  const handleSave = () => {
    toast({
      title: "Interaction Details Saved",
      description: `Client interaction details for ${customerName} have been recorded successfully.`,
    });
    // Reset form
    setInteractionData({
      personalMet: false,
      date: '',
      time: '',
      modeOfInteraction: '',
      geoTagging: '',
      remarks: ''
    });
  };

  const modeOptions = [
    { value: 'video', label: 'Video Call', icon: Video },
    { value: 'phone', label: 'Phone Call', icon: Phone },
    { value: 'physical', label: 'Physical Meeting', icon: UserCheck }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare size={20} className="mr-2" />
            Client Interaction Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Met Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <UserCheck size={20} className="text-teal-600" />
              <Label className="text-base font-medium">Personal Meeting Status</Label>
            </div>
            <div className="flex space-x-4">
              <Button
                variant={interactionData.personalMet ? "default" : "outline"}
                onClick={() => setInteractionData({...interactionData, personalMet: true})}
                className={interactionData.personalMet ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                Met Personally
              </Button>
              <Button
                variant={!interactionData.personalMet ? "default" : "outline"}
                onClick={() => setInteractionData({...interactionData, personalMet: false})}
                className={!interactionData.personalMet ? "bg-gray-600 hover:bg-gray-700" : ""}
              >
                Not Met Personally
              </Button>
            </div>
          </div>

          {/* Date and Time Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-teal-600" />
                <Label htmlFor="date">Date of Interaction</Label>
              </div>
              <Input
                id="date"
                type="date"
                value={interactionData.date}
                onChange={(e) => setInteractionData({...interactionData, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-teal-600" />
                <Label htmlFor="time">Time of Interaction</Label>
              </div>
              <Input
                id="time"
                type="time"
                value={interactionData.time}
                onChange={(e) => setInteractionData({...interactionData, time: e.target.value})}
              />
            </div>
          </div>

          {/* Mode of Interaction */}
          <div className="space-y-2">
            <Label>Mode of Interaction</Label>
            <Select
              value={interactionData.modeOfInteraction}
              onValueChange={(value) => setInteractionData({...interactionData, modeOfInteraction: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select interaction mode" />
              </SelectTrigger>
              <SelectContent>
                {modeOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <IconComponent size={16} />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Condition-based Geo-tagging */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-teal-600" />
              <Label htmlFor="geoTagging">Geo-tagging Location</Label>
            </div>
            <Input
              id="geoTagging"
              value={interactionData.geoTagging}
              onChange={(e) => setInteractionData({...interactionData, geoTagging: e.target.value})}
              placeholder="Enter location details or coordinates"
            />
            <p className="text-xs text-gray-500">
              Location will be automatically captured for physical meetings
            </p>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={interactionData.remarks}
              onChange={(e) => setInteractionData({...interactionData, remarks: e.target.value})}
              placeholder="Add any additional notes or observations about the interaction..."
              rows={4}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={!interactionData.date || !interactionData.time || !interactionData.modeOfInteraction}
            >
              <Save size={16} className="mr-2" />
              Save Interaction Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Interactions History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Interaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-teal-600" />
                  <span className="font-medium">Phone Call</span>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-600">
                Discussed FD renewal options. Customer showed interest in higher tenure.
              </p>
              <p className="text-xs text-gray-500 mt-1">Location: Office Call</p>
            </div>
            
            <div className="p-3 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <UserCheck size={16} className="text-teal-600" />
                  <span className="font-medium">Physical Meeting</span>
                </div>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
              <p className="text-sm text-gray-600">
                Branch visit for loan documentation completion.
              </p>
              <p className="text-xs text-gray-500 mt-1">Location: Bandra Branch, Mumbai</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientInteractionDetails;
