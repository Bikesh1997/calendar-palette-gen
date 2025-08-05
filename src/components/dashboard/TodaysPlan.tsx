import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Target,
  Route,
  PhoneCall,
  MessageSquare,
  TrendingUp,
  Users,
  IndianRupee,
  AlertCircle,
  Award,
  FileText
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CallInProgressModal from '@/components/leads/CallInProgressModal';

const TodaysPlan = () => {
  const { user } = useAuth();
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callPopupOpen, setCallPopupOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  // Check if current user is Anjali Patel
  const isAnjaliAccount = user?.name === 'Anjali Patel';

  // Mock data for today's activities
  const pendingFollowUps = [
    { id: 1, name: 'Rajesh Kumar', business: 'Tech Solutions Pvt Ltd', phone: '+91 98765 43210', time: '10:30 AM', priority: 'High' },
    { id: 2, name: 'Heena Thakkar', business: 'Digital Marketing Co', phone: '+91 87654 32109', time: '2:15 PM', priority: 'Medium' },
    { id: 3, name: 'Amit Patel', business: 'Construction Corp', phone: '+91 76543 21098', time: '4:00 PM', priority: 'High' }
  ];

  const scheduledMeetings = [
    { id: 1, client: 'Mumbai Industries', time: '11:00 AM', location: 'Bandra Office', type: 'Site Visit' },
    { id: 2, client: 'Global Exports', time: '3:30 PM', location: 'Video Call', type: 'Proposal Discussion' }
  ];

  const todaysTasks = [
    { id: 1, task: 'Prepare loan documentation for Tech Solutions', deadline: '5:00 PM', status: 'pending' },
    { id: 2, task: 'Follow up on credit verification', deadline: '6:00 PM', status: 'pending' },
    { id: 3, task: 'Submit quarterly report', deadline: '7:00 PM', status: 'completed' }
  ];

  const beatPlanLocations = [
    { id: 1, area: 'Bandra West', prospects: 5, distance: '2.3 km', priority: 'High' },
    { id: 2, area: 'Andheri East', prospects: 3, distance: '4.1 km', priority: 'Medium' },
    { id: 3, area: 'Powai', prospects: 7, distance: '6.8 km', priority: 'High' }
  ];

  // Additional data for Anjali's Daily Snapshot
  const anjaliTodaysTasks = [
    { id: 1, task: 'Visit SHG meeting in Ward 3', deadline: '10:00 AM', status: 'pending', type: 'visit' },
    { id: 2, task: 'Document collection from Meera Devi', deadline: '2:00 PM', status: 'pending', type: 'document' },
    { id: 3, task: 'Follow up with Sunita Group leader', deadline: '4:00 PM', status: 'completed', type: 'call' },
    { id: 4, task: 'Submit SHG formation paperwork', deadline: '6:00 PM', status: 'pending', type: 'admin' }
  ];

  const anjaliRouteCustomers = [
    { id: 1, name: 'Kamala Devi', address: 'Ward 3, Slum Area A', eta: '10:15 AM', priority: 'High', purpose: 'SHG Formation' },
    { id: 2, name: 'Rekha Group', address: 'Ward 4, Community Center', eta: '11:30 AM', priority: 'Medium', purpose: 'Loan Discussion' },
    { id: 3, name: 'Sunita SHG', address: 'Ward 5, School Building', eta: '2:15 PM', priority: 'High', purpose: 'Document Collection' },
    { id: 4, name: 'Geeta Collective', address: 'Ward 3, Health Center', eta: '3:45 PM', priority: 'Medium', purpose: 'Follow-up Meeting' }
  ];

  const anjaliOverdueLeads = [
    { id: 1, name: 'Priya Group', lastContact: '5 days ago', reason: 'Call to prevent drop-off', priority: 'High' },
    { id: 2, name: 'Anita SHG', lastContact: '3 days ago', reason: 'Document pending collection', priority: 'Medium' },
    { id: 3, name: 'Radha Collective', lastContact: '7 days ago', reason: 'Interest confirmation needed', priority: 'High' }
  ];

  const handleCallNow = (contact: any) => {
    setSelectedContact(contact);
    setCallPopupOpen(true);
  };

  const handleStartCall = () => {
    setCallPopupOpen(false);
    setCallModalOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'visit': return <MapPin size={12} className="text-blue-600" />;
      case 'document': return <FileText size={12} className="text-orange-600" />;
      case 'call': return <Phone size={12} className="text-green-600" />;
      case 'admin': return <CheckCircle size={12} className="text-purple-600" />;
      default: return <Clock size={12} className="text-gray-600" />;
    }
  };

  // Check if user should see Smart Beat Plan Route - hide for Inbound saless
  const shouldShowBeatPlan = user?.role !== 'inbound_agent';

  if (isAnjaliAccount) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Daily Snapshot</h2>
          <p className="text-gray-600">Your personalized daily overview and action items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Tasks - Enhanced for Anjali */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle size={18} className="mr-2" />
                Today's Tasks
                <Badge className="ml-2 bg-orange-100 text-orange-800">
                  {anjaliTodaysTasks.filter(task => task.status === 'pending').length} Pending
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {anjaliTodaysTasks.map((task) => (
                  <div key={task.id} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getTaskTypeIcon(task.type)}
                          <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                            {task.task}
                          </h4>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Clock size={10} className="mr-1" />
                          Due: {task.deadline}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {task.status === 'completed' ? (
                          <CheckCircle size={16} className="text-green-600" />
                        ) : (
                          <>
                            <Button size="sm" variant="outline" className="text-xs">
                              Quick Action
                            </Button>
                            <Clock size={16} className="text-orange-600" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Smart Beat Plan Route - Enhanced */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Route size={18} className="mr-2" />
                Smart Beat Plan Route
                <Badge className="ml-2 bg-green-100 text-green-800">
                  Optimized
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {anjaliRouteCustomers.map((customer) => (
                  <div key={customer.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{customer.name}</h4>
                        <p className="text-sm text-gray-600">{customer.address}</p>
                        <p className="text-xs text-gray-500">{customer.purpose}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getPriorityColor(customer.priority)}>
                          {customer.priority}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">ETA: {customer.eta}</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <MapPin size={12} className="mr-1" />
                      Navigate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Follow-ups - Enhanced */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle size={18} className="mr-2" />
                Pending Follow-ups
                <Badge className="ml-2 bg-red-100 text-red-800">
                  {anjaliOverdueLeads.length} Overdue
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {anjaliOverdueLeads.map((lead) => (
                  <div key={lead.id} className="border rounded-lg p-3 bg-red-50 border-red-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{lead.name}</h4>
                        <p className="text-sm text-gray-600">{lead.reason}</p>
                        <p className="text-xs text-gray-500">Last contact: {lead.lastContact}</p>
                      </div>
                      <Badge className={getPriorityColor(lead.priority)}>
                        {lead.priority}
                      </Badge>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleCallNow(lead)}
                    >
                      <Phone size={12} className="mr-1" />
                      Call Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Incentive Progress Bar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award size={18} className="mr-2" />
                Incentive Progress
                <Badge className="ml-2 bg-purple-100 text-purple-800">
                  80% Complete
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">SHG Formation Goal</span>
                    <span className="text-sm text-gray-600">8/10</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">2 SHGs more to earn ₹1,000</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Monthly Target</span>
                    <span className="text-sm text-gray-600">₹45K/₹50K</span>
                  </div>
                  <Progress value={90} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">₹5K remaining for monthly bonus</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KRA Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target size={18} className="mr-2" />
                KRA Summary
                <Badge className="ml-2 bg-blue-100 text-blue-800">
                  On Track
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">8</div>
                  <div className="text-xs text-blue-600">SHGs Created</div>
                  <div className="text-xs text-gray-500">Target: 10</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">15</div>
                  <div className="text-xs text-green-600">Leads Converted</div>
                  <div className="text-xs text-gray-500">Target: 20</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-700">3</div>
                  <div className="text-xs text-orange-600">Follow-ups Pending</div>
                  <div className="text-xs text-gray-500">Max: 5</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">92%</div>
                  <div className="text-xs text-purple-600">Overall Score</div>
                  <div className="text-xs text-gray-500">Grade: A</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI-Powered Nudges/Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp size={18} className="mr-2" />
                Insights
                <Badge className="ml-2 bg-teal-100 text-teal-800">
                  AI Powered
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Users size={16} className="text-teal-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-teal-900">High Conversion Area</h4>
                      <p className="text-sm text-teal-700">80% of your recent FD closures came from customers aged 45–60. Prioritize this age group today for higher conversion</p>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Calendar size={16} className="text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-orange-900">Optimal Visit Time</h4>
                      <p className="text-sm text-orange-700">You have 5 inactive SHG customers within 2 km of your current location. Plan a quick visit to revive engagement.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <IndianRupee size={16} className="text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-purple-900">Loan Size Opportunity</h4>
                      <p className="text-sm text-purple-700">Morning visits to Bandra yield 30% more conversions—consider rescheduling your visits before noon</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call Popup Modal */}
        <Dialog open={callPopupOpen} onOpenChange={setCallPopupOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Initiate Call</DialogTitle>
            </DialogHeader>
            {selectedContact && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{selectedContact.name}</h3>
                  <p className="text-gray-600">{selectedContact.business || 'Lead Follow-up'}</p>
                  <p className="text-gray-600 font-mono">{selectedContact.phone || '+91 98765 43210'}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleStartCall}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <PhoneCall size={16} className="mr-2" />
                    Start Call
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setCallPopupOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Call In Progress Modal */}
        {selectedContact && (
          <CallInProgressModal
            isOpen={callModalOpen}
            onOpenChange={setCallModalOpen}
            prospectName={selectedContact.name}
            businessName={selectedContact.business || 'Lead Follow-up'}
            phoneNumber={selectedContact.phone || '+91 98765 43210'}
          />
        )}
      </div>
    );
  }

  // Original TodaysPlan for other users
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Follow-ups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone size={18} className="mr-2" />
              Pending Follow-ups
              <Badge className="ml-2 bg-red-100 text-red-800">
                {pendingFollowUps.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingFollowUps.map((contact) => (
                <div key={contact.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{contact.name}</h4>
                      <p className="text-sm text-gray-600">{contact.business}</p>
                      <p className="text-xs text-gray-500">{contact.phone}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getPriorityColor(contact.priority)}>
                        {contact.priority}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{contact.time}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleCallNow(contact)}
                    >
                      <Phone size={12} className="mr-1" />
                      Call Now
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare size={12} className="mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar size={18} className="mr-2" />
              Scheduled Meetings
              <Badge className="ml-2 bg-blue-100 text-blue-800">
                {scheduledMeetings.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduledMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{meeting.client}</h4>
                      <p className="text-sm text-gray-600">{meeting.type}</p>
                    </div>
                    <span className="text-sm font-medium text-blue-700">{meeting.time}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin size={10} className="mr-1" />
                    {meeting.location}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle size={18} className="mr-2" />
              Today's Tasks
              <Badge className="ml-2 bg-orange-100 text-orange-800">
                {todaysTasks.filter(task => task.status === 'pending').length} Pending
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysTasks.map((task) => (
                <div key={task.id} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                        {task.task}
                      </h4>
                      <div className="flex items-center text-xs text-gray-600 mt-1">
                        <Clock size={10} className="mr-1" />
                        Due: {task.deadline}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {task.status === 'completed' ? (
                        <CheckCircle size={16} className="text-green-600" />
                      ) : (
                        <Clock size={16} className="text-orange-600" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Smart Beat Plan Route - Only show for non-Inbound saless */}
        {shouldShowBeatPlan && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Route size={18} className="mr-2" />
                Smart Beat Plan Route
                <Badge className="ml-2 bg-green-100 text-green-800">
                  Optimized
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {beatPlanLocations.map((location) => (
                  <div key={location.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{location.area}</h4>
                        <p className="text-sm text-gray-600">{location.prospects} prospects</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getPriorityColor(location.priority)}>
                          {location.priority}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{location.distance}</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <MapPin size={12} className="mr-1" />
                      Navigate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Call Popup Modal */}
      <Dialog open={callPopupOpen} onOpenChange={setCallPopupOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Initiate Call</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">{selectedContact.name}</h3>
                <p className="text-gray-600">{selectedContact.business}</p>
                <p className="text-gray-600 font-mono">{selectedContact.phone}</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleStartCall}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <PhoneCall size={16} className="mr-2" />
                  Start Call
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setCallPopupOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Call In Progress Modal */}
      {selectedContact && (
        <CallInProgressModal
          isOpen={callModalOpen}
          onOpenChange={setCallModalOpen}
          prospectName={selectedContact.name}
          businessName={selectedContact.business}
          phoneNumber={selectedContact.phone}
        />
      )}
    </div>
  );
};

export default TodaysPlan;
