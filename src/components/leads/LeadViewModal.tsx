import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare, 
  Bot, 
  Clock,
  User,
  Building,
  FileText,
  TrendingUp,
  Plus
} from 'lucide-react';

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

interface LeadViewModalProps {
  lead: Lead;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadViewModal = ({ lead, isOpen, onOpenChange }: LeadViewModalProps) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showAddFollowUp, setShowAddFollowUp] = useState(false);
  const [communicationType, setCommunicationType] = useState('Call');
  const [communicationNotes, setCommunicationNotes] = useState('');
  const [outcome, setOutcome] = useState('Neutral');

  // Follow-up form state
  const [followUpType, setFollowUpType] = useState('Call');
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpDescription, setFollowUpDescription] = useState('');
  const [followUpPriority, setFollowUpPriority] = useState('Medium');

  const [communicationHistory, setCommunicationHistory] = useState([
    {
      id: '1',
      type: 'Call',
      status: 'positive',
      date: '2025-06-06',
      summary: 'Follow-up call about investment products. Customer showed interest in mutual funds and requested a detailed presentation for next week.',
      conversation: [
        { time: '00:03', speaker: 'Agent', message: 'Hello, this is your financial advisor. How can I assist you today?' },
        { time: '00:10', speaker: 'Customer', message: 'Hi, I received information about investment options and I\'m interested to know more.' },
        { time: '00:18', speaker: 'Agent', message: 'Great! I can help you understand our investment products. What are your investment goals?' },
        { time: '00:26', speaker: 'Customer', message: 'I\'m looking for long-term wealth creation and want to start with mutual funds.' },
        { time: '00:35', speaker: 'Agent', message: 'Perfect! Let me explain our SIP options and portfolio strategies.' },
        { time: '00:42', speaker: 'Customer', message: 'That sounds good. Can you schedule a detailed meeting for next week?' }
      ]
    },
    {
      id: '2',
      type: 'Meeting',
      status: 'positive', 
      date: '2025-04-20',
      summary: 'Productive meeting with customer. Discussed investment portfolio and financial planning strategies.',
      conversation: []
    },
    {
      id: '3',
      type: 'Email',
      status: 'neutral',
      date: '2025-04-15',
      summary: 'Sent product brochure and investment guide. Customer acknowledged receipt but no immediate response on next steps.',
      conversation: []
    }
  ]);

  const [followUpActions, setFollowUpActions] = useState([
    {
      id: '1',
      type: 'Call',
      scheduledDate: '2025-06-10',
      description: 'Follow-up call to discuss mutual fund investment details',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: '2',
      type: 'Meeting',
      scheduledDate: '2025-06-12',
      description: 'Portfolio review meeting with investment advisor',
      priority: 'High',
      status: 'Scheduled'
    },
    {
      id: '3',
      type: 'Email',
      scheduledDate: '2025-06-08',
      description: 'Send detailed investment brochure and SIP calculator',
      priority: 'Medium',
      status: 'Completed'
    }
  ]);

  const guidedScripts = [
    {
      id: '1',
      title: 'Investment Product Introduction',
      category: 'Sales',
      content: `Hi [Customer Name], 

I hope you're doing well. I'm calling to discuss some exciting investment opportunities that align with your financial goals.

Key Points to Cover:
1. Understand current financial situation
2. Explain SIP benefits and compound growth
3. Discuss risk tolerance and investment horizon
4. Present suitable mutual fund options
5. Schedule follow-up meeting for detailed proposal

Remember to:
- Listen actively to customer needs
- Provide clear examples and calculations
- Address any concerns about market volatility
- Emphasize long-term wealth creation benefits`
    },
    {
      id: '2',
      title: 'Follow-up Call Script',
      category: 'Follow-up',
      content: `Hello [Customer Name],

Thank you for your time during our last conversation about investment options.

Purpose of today's call:
1. Address any questions from our previous discussion
2. Present customized investment proposal
3. Explain next steps for account opening
4. Schedule documentation appointment

Key Benefits to Reinforce:
- Tax savings under 80C
- Professional fund management
- Diversified portfolio
- Flexible investment amounts`
    },
    {
      id: '3',
      title: 'Objection Handling Guide',
      category: 'Support',
      content: `Common Objections and Responses:

"Market is too volatile"
→ Explain SIP reduces volatility through rupee cost averaging
→ Show historical long-term returns data
→ Emphasize disciplined investing approach

"I don't have enough money to invest"
→ Highlight minimum SIP amounts (₹500/month)
→ Explain how small amounts grow significantly over time
→ Use SIP calculator for demonstration

"I need time to think"
→ Acknowledge their caution as wise
→ Offer to send educational material
→ Schedule follow-up call in 2-3 days`
    }
  ];

  const analysisReport = {
    sentiment: 'Positive and interested',
    customerConcerns: 'The customer showed genuine interest in investment products with focus on long-term wealth creation.',
    decisionDrivers: 'Investment returns and tax benefits. The customer is primarily motivated by financial growth and tax optimization.',
    conversionLikelihood: 'High (80%)',
    conversionDetails: 'Customer expressed clear intent to start SIP investments and requested detailed meeting.',
    riskTolerance: 'Moderate',
    riskToleranceDetails: 'Customer prefers balanced approach with moderate risk for better returns over long term.',
    investmentReadiness: 'High',
    investmentReadinessDetails: 'Customer has stable income and is ready to commit to systematic investment planning.'
  };

  const templates = [
    'Investment Product Pitch',
    'SIP Benefits Email', 
    'Portfolio Review Meeting',
    'Follow-up Investment Call'
  ];

  const handleLogCommunication = () => {
    if (!communicationNotes.trim()) return;

    const newCommunication = {
      id: Date.now().toString(),
      type: communicationType,
      status: outcome.toLowerCase(),
      date: new Date().toISOString().split('T')[0],
      summary: communicationNotes,
      conversation: []
    };

    setCommunicationHistory(prev => [newCommunication, ...prev]);
    setCommunicationNotes('');
    console.log('Communication logged:', newCommunication);
  };

  const handleAddFollowUp = () => {
    setShowAddFollowUp(true);
  };

  const handleSaveFollowUp = () => {
    if (!followUpDescription.trim() || !followUpDate) return;

    const newFollowUp = {
      id: Date.now().toString(),
      type: followUpType,
      scheduledDate: followUpDate,
      description: followUpDescription,
      priority: followUpPriority,
      status: 'Pending'
    };

    setFollowUpActions(prev => [newFollowUp, ...prev]);
    
    // Reset form
    setFollowUpType('Call');
    setFollowUpDate('');
    setFollowUpDescription('');
    setFollowUpPriority('Medium');
    setShowAddFollowUp(false);
    
    console.log('Follow-up action added:', newFollowUp);
  };

  const handleAnalyzeCall = () => {
    setShowAnalysis(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto p-3 sm:p-4 lg:p-6">
        <DialogHeader className="mb-4 sm:mb-6">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl">
            <Building size={20} />
            Lead Details - {lead.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 order-2 xl:order-1">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4 sm:mb-6 h-auto p-1">
                <TabsTrigger 
                  value="details" 
                  className="text-[10px] xs:text-xs sm:text-sm px-2 py-2 sm:py-2.5 leading-tight"
                >
                  <span className="hidden xs:inline">Details</span>
                  <span className="xs:hidden">Info</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="activity" 
                  className="text-[10px] xs:text-xs sm:text-sm px-2 py-2 sm:py-2.5 leading-tight"
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger 
                  value="followups" 
                  className="text-[10px] xs:text-xs sm:text-sm px-2 py-2 sm:py-2.5 leading-tight"
                >
                  <span className="hidden sm:inline">Follow-ups</span>
                  <span className="sm:hidden">Follow</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="scripts" 
                  className="text-[10px] xs:text-xs sm:text-sm px-2 py-2 sm:py-2.5 leading-tight"
                >
                  Scripts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Company</label>
                        <p className="text-sm text-gray-900 break-words">{lead.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Contact Person</label>
                        <p className="text-sm text-gray-900 break-words">{lead.contact}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-sm text-gray-900 break-words">{lead.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <p className="text-sm text-gray-900 break-words">{lead.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <Badge variant="outline" className="capitalize">{lead.status}</Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Source</label>
                        <p className="text-sm text-gray-900 break-words">{lead.source}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Value</label>
                        <p className="text-sm text-gray-900">{lead.value}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Priority</label>
                        <Badge variant="outline" className="capitalize">{lead.priority}</Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Assigned To</label>
                        <p className="text-sm text-gray-900 break-words">{lead.assignedTo}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Last Contact</label>
                        <p className="text-sm text-gray-900">{lead.lastContact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-base sm:text-lg">Communication History</span>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                        Lead auto-escalated to Sales team
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {communicationHistory.map((comm) => (
                      <div key={comm.id} className="border rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            {comm.type === 'Call' ? (
                              <Phone size={16} className="text-blue-600 flex-shrink-0" />
                            ) : comm.type === 'Meeting' ? (
                              <Calendar size={16} className="text-green-600 flex-shrink-0" />
                            ) : (
                              <Mail size={16} className="text-purple-600 flex-shrink-0" />
                            )}
                            <span className="font-medium text-sm">{comm.type}</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${comm.status === 'positive' ? 'text-green-700 border-green-200' : 'text-gray-700'}`}
                            >
                              {comm.status}
                            </Badge>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">

                          Scheduled: {new Date(comm.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })}
                          </span>
                        </div>
                        
                        {comm.conversation.length > 0 && (
                          <>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-blue-600 mb-2 text-sm"
                              onClick={() => {/* View call details */}}
                            >
                              View call details →
                            </Button>

                            <div className="bg-gray-50 rounded p-3 mb-3">
                              <h4 className="font-medium text-sm mb-2">Conversation</h4>
                              <div className="space-y-2 max-h-32 overflow-y-auto">
                                {comm.conversation.map((msg, idx) => (
                                  <div key={idx} className="text-xs">
                                    <span className="text-gray-500">{msg.time}</span>
                                    <div className={`p-2 rounded mt-1 ${
                                      msg.speaker === 'Agent' 
                                        ? 'bg-blue-50 text-blue-900 ml-2 sm:ml-4' 
                                        : 'bg-white border mr-2 sm:mr-4'
                                    }`}>
                                      <strong>{msg.speaker}:</strong> {msg.message}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        <div className="bg-blue-50 rounded p-3">
                          <h4 className="font-medium text-sm mb-1">Summary</h4>
                          <p className="text-sm text-gray-700">{comm.summary}</p>
                        </div>

                        {comm.type === 'Call' && (
                          <div className="mt-3 flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={handleAnalyzeCall}
                              className="flex items-center gap-2 text-xs sm:text-sm"
                            >
                              <Bot size={14} />
                              <span className="hidden sm:inline">Analyze call summary with AI</span>
                              <span className="sm:hidden">AI Analysis</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="followups" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-base sm:text-lg">Follow-up Actions</span>
                      <Button 
                        size="sm" 
                        onClick={handleAddFollowUp}
                        className="flex items-center gap-2 bg-[#056262] hover:bg-[#045050] text-xs sm:text-sm"
                      >
                        <Plus size={16} />
                        Add Follow-up
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {followUpActions.map((action) => (
                        <div key={action.id} className="border rounded-lg p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              {action.type === 'Call' ? (
                                <Phone size={16} className="text-blue-600 flex-shrink-0" />
                              ) : action.type === 'Meeting' ? (
                                <Calendar size={16} className="text-green-600 flex-shrink-0" />
                              ) : (
                                <Mail size={16} className="text-purple-600 flex-shrink-0" />
                              )}
                              <span className="font-medium text-sm">{action.type}</span>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  action.priority === 'High' ? 'text-red-700 border-red-200' :
                                  action.priority === 'Medium' ? 'text-yellow-700 border-yellow-200' :
                                  'text-green-700 border-green-200'
                                }`}
                              >
                                {action.priority}
                              </Badge>
                            </div>
                            <Badge 
                              variant={action.status === 'Completed' ? 'default' : 'secondary'}
                              className={`text-xs ${action.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}`}
                            >
                              {action.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{action.description}</p>
                          <p className="text-xs text-gray-500">Scheduled: {action.scheduledDate}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scripts" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Guided Scripts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {guidedScripts.map((script) => (
                        <div key={script.id} className="border rounded-lg p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h4 className="font-medium text-sm sm:text-base">{script.title}</h4>
                            <Badge variant="outline" className="text-xs w-fit">{script.category}</Badge>
                          </div>
                          <div className="bg-gray-50 rounded p-3">
                            <pre className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap font-sans">
                              {script.content}
                            </pre>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                              <FileText size={14} className="mr-1" />
                              Copy Script
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 order-1 xl:order-2">
            {/* Log Communication */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Log Communication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Communication Type</label>
                  <Select value={communicationType} onValueChange={setCommunicationType}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Call">Call</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Meeting">Meeting</SelectItem>
                      <SelectItem value="SMS">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <Textarea
                    placeholder="Enter communication details..."
                    value={communicationNotes}
                    onChange={(e) => setCommunicationNotes(e.target.value)}
                    rows={3}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Outcome</label>
                  <Select value={outcome} onValueChange={setOutcome}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Positive">Positive</SelectItem>
                      <SelectItem value="Neutral">Neutral</SelectItem>
                      <SelectItem value="Negative">Negative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleLogCommunication}
                  className="w-full bg-[#056262] hover:bg-[#045050] text-sm"
                >
                  <MessageSquare size={16} className="mr-2" />
                  Log Communication
                </Button>
              </CardContent>
            </Card>

            {/* Communication Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Communication Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {templates.map((template, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="w-full justify-start text-xs sm:text-sm h-auto py-2 px-3"
                  >
                    {template}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Analysis Modal */}
        {showAnalysis && (
          <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
            <DialogContent className="max-w-md w-[90vw]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Bot size={20} className="text-blue-600" />
                  AI Call Analysis
                </DialogTitle>
                <p className="text-sm text-gray-600">Analysis complete</p>
              </DialogHeader>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-medium mb-3 text-sm sm:text-base">Call Analysis Report</h3>
                  
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div>
                      <strong>Customer Sentiment:</strong> {analysisReport.sentiment}
                      <br />
                      {analysisReport.customerConcerns}
                    </div>

                    <div>
                      <strong>Decision Drivers:</strong> {analysisReport.decisionDrivers}
                    </div>

                    <div>
                      <strong>Conversion Likelihood:</strong> {analysisReport.conversionLikelihood}
                      <br />
                      {analysisReport.conversionDetails}
                    </div>

                    <div>
                      <strong>Risk Tolerance:</strong> {analysisReport.riskTolerance}
                      <br />
                      {analysisReport.riskToleranceDetails}
                    </div>

                    <div>
                      <strong>Investment Readiness:</strong> {analysisReport.investmentReadiness}
                      <br />
                      {analysisReport.investmentReadinessDetails}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowAnalysis(false)}
                  className="w-full text-sm"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Add Follow-up Modal */}
        {showAddFollowUp && (
          <Dialog open={showAddFollowUp} onOpenChange={setShowAddFollowUp}>
            <DialogContent className="max-w-md w-[90vw]">
              <DialogHeader>
                <DialogTitle className="text-base sm:text-lg">Add Follow-up Action</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <Select value={followUpType} onValueChange={setFollowUpType}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Call">Call</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Meeting">Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Scheduled Date</label>
                  <Input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Enter follow-up description..."
                    value={followUpDescription}
                    onChange={(e) => setFollowUpDescription(e.target.value)}
                    rows={3}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={followUpPriority} onValueChange={setFollowUpPriority}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button 
                    onClick={handleSaveFollowUp}
                    className="flex-1 bg-[#056262] hover:bg-[#045050] text-sm"
                  >
                    Save Follow-up
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddFollowUp(false)}
                    className="flex-1 text-sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadViewModal;