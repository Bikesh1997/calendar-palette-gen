
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DollarSign, TrendingUp, Award, Zap, Calculator } from 'lucide-react';

interface IncentiveData {
  id: string;
  name: string;
  currentEarnings: number;
  projectedEarnings: number;
  nextThreshold: number;
  progressToNext: number;
  krasCompleted: number;
  totalKras: number;
  potentialBonus: number;
  isCloseToThreshold: boolean;
  thresholdName: string;
  remainingAmount: number;
}

interface SupervisorIncentiveManagementProps {
  incentiveData: IncentiveData[];
  onSimulateKRACompletion: (memberId: string) => void;
}

const SupervisorIncentiveManagement = ({ 
  incentiveData, 
  onSimulateKRACompletion 
}: SupervisorIncentiveManagementProps) => {
  const incentiveTiers = [
    { name: 'Bronze', threshold: 25000, color: '#CD7F32' },
    { name: 'Silver', threshold: 50000, color: '#C0C0C0' },
    { name: 'Silver Plus', threshold: 50000, color: '#E5E5E5' },
    { name: 'Gold Tier', threshold: 75000, color: '#FFD700' },
    { name: 'Platinum', threshold: 100000, color: '#E5E4E2' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Team Incentives</p>
                <p className="text-2xl font-bold">₹{incentiveData.reduce((sum, member) => sum + member.currentEarnings, 0).toLocaleString()}</p>
                <p className="text-sm text-green-600">Current Earnings</p>
              </div>
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projected Total</p>
                <p className="text-2xl font-bold">₹{incentiveData.reduce((sum, member) => sum + member.projectedEarnings, 0).toLocaleString()}</p>
                <p className="text-sm text-blue-600">Month-end Projection</p>
              </div>
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Potential Bonus</p>
                <p className="text-2xl font-bold">₹{incentiveData.reduce((sum, member) => sum + member.potentialBonus, 0).toLocaleString()}</p>
                <p className="text-sm text-purple-600">If KRAs Met</p>
              </div>
              <Award className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Close to Threshold</p>
                <p className="text-2xl font-bold">{incentiveData.filter(m => m.isCloseToThreshold).length}</p>
                <p className="text-sm text-orange-600">Team Members</p>
              </div>
              <Zap className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Incentive Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incentiveData.map((member) => (
              <div key={member.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-teal-100 text-teal-700">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      {member.isCloseToThreshold && (
                        <Badge className="bg-orange-100 text-orange-800 mt-1">
                          Close to {member.thresholdName}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSimulateKRACompletion(member.id)}
                  >
                    <Calculator size={14} className="mr-1" />
                    Simulate KRAs
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Earnings</p>
                    <p className="font-bold text-green-600">₹{member.currentEarnings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Projected</p>
                    <p className="font-bold text-blue-600">₹{member.projectedEarnings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Next Threshold</p>
                    <p className="font-bold">₹{member.nextThreshold.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">KRAs Completed</p>
                    <p className="font-bold">{member.krasCompleted}/{member.totalKras}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Potential Bonus</p>
                    <p className="font-bold text-purple-600">₹{member.potentialBonus.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress to {member.thresholdName}</span>
                    <span>{member.progressToNext}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${member.isCloseToThreshold ? 'bg-orange-500' : 'bg-blue-500'}`}
                      style={{ width: `${member.progressToNext}%` }}
                    ></div>
                  </div>
                  {member.isCloseToThreshold && (
                    <p className="text-sm text-orange-600 mt-1">
                      Only ₹{member.remainingAmount.toLocaleString()} away from next tier!
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>KRA Completion</span>
                    <span>{Math.round((member.krasCompleted / member.totalKras) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${(member.krasCompleted / member.totalKras) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Incentive Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {incentiveTiers.map((tier, index) => (
              <div key={index} className="text-center p-3 border rounded-lg">
                <div 
                  className="w-8 h-8 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: tier.color }}
                ></div>
                <p className="font-medium">{tier.name}</p>
                <p className="text-sm text-gray-600">₹{tier.threshold.toLocaleString()}+</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisorIncentiveManagement;
