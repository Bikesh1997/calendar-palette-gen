
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Target, Users, TrendingUp, Eye } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: string;
  target: string;
  status: 'active' | 'planned' | 'completed';
  startDate: string;
  endDate: string;
  progress: number;
  leads: number;
  conversions: number;
}

interface CampaignDetailsModalProps {
  campaign: Campaign;
}

const CampaignDetailsModal = ({ campaign }: CampaignDetailsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const conversionRate = campaign.leads > 0 ? ((campaign.conversions / campaign.leads) * 100).toFixed(1) : '0';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Eye size={16} className="mr-1" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Target size={20} className="text-teal-600" />
            <span>{campaign.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Campaign Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Campaign Type</label>
                <p className="text-sm text-gray-900">{campaign.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Target Audience</label>
                <p className="text-sm text-gray-900">{campaign.target}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <div className="mt-1">
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Duration</label>
                <div className="flex items-center text-sm text-gray-900 mt-1">
                  <Calendar size={14} className="mr-1" />
                  {campaign.startDate} - {campaign.endDate}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Progress</label>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <TrendingUp size={18} className="mr-2 text-teal-600" />
              Performance Metrics
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{campaign.leads}</div>
                <div className="text-sm text-gray-600">Total Leads</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{campaign.conversions}</div>
                <div className="text-sm text-gray-600">Conversions</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{conversionRate}%</div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Users size={18} className="mr-2 text-teal-600" />
              Campaign Details
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Campaign ID:</span>
                <span className="text-sm text-gray-900">#{campaign.id}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Revenue Generated:</span>
                <span className="text-sm font-medium text-green-600">
                  ₹{(campaign.conversions * 50000).toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Cost per Lead:</span>
                <span className="text-sm text-gray-900">₹{campaign.leads > 0 ? (5000 / campaign.leads * 100).toFixed(0) : '0'}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">ROI:</span>
                <span className="text-sm font-medium text-green-600">
                  {campaign.conversions > 0 ? ((campaign.conversions * 50000 - 5000) / 5000 * 100).toFixed(1) : '0'}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetailsModal;
