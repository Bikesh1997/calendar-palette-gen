
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Settings, Save } from 'lucide-react';

const PerformanceThresholds = () => {
  const [thresholds, setThresholds] = useState({
    red: { min: 0, max: 70 },
    amber: { min: 70, max: 90 },
    green: { min: 90, max: 100 }
  });

  const [customThresholds, setCustomThresholds] = useState({
    'Field Sales Officer (FSO)': {
      red: { min: 0, max: 70 },
      amber: { min: 70, max: 90 },
      green: { min: 90, max: 100 }
    },
    'Relationship Officer (RO)': {
      red: { min: 0, max: 75 },
      amber: { min: 75, max: 88 },
      green: { min: 88, max: 100 }
    },
    'Supervisor': {
      red: { min: 0, max: 80 },
      amber: { min: 80, max: 92 },
      green: { min: 92, max: 100 }
    }
  });

  const updateGlobalThreshold = (zone: 'red' | 'amber' | 'green', field: 'min' | 'max', value: number) => {
    setThresholds(prev => ({
      ...prev,
      [zone]: {
        ...prev[zone],
        [field]: value
      }
    }));
  };

  const updateRoleThreshold = (role: string, zone: 'red' | 'amber' | 'green', field: 'min' | 'max', value: number) => {
    setCustomThresholds(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [zone]: {
          ...prev[role][zone],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Performance Thresholds</h2>
          <p className="text-sm text-gray-600">Configure performance categories and thresholds</p>
        </div>
      </div>

      {/* Global Thresholds */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Global Default Thresholds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <Label className="font-medium text-red-700">Red Zone (Poor)</Label>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={thresholds.red.min}
                    onChange={(e) => updateGlobalThreshold('red', 'min', Number(e.target.value))}
                    className="w-20"
                    min="0"
                    max="100"
                  />
                  <span>% to</span>
                  <Input
                    type="number"
                    value={thresholds.red.max}
                    onChange={(e) => updateGlobalThreshold('red', 'max', Number(e.target.value))}
                    className="w-20"
                    min="0"
                    max="100"
                  />
                  <span>%</span>
                </div>
                <p className="text-xs text-gray-600">Performance below expectations</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <Label className="font-medium text-yellow-700">Amber Zone (Needs Improvement)</Label>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={thresholds.amber.min}
                    onChange={(e) => updateGlobalThreshold('amber', 'min', Number(e.target.value))}
                    className="w-20"
                    min="0"
                    max="100"
                  />
                  <span>% to</span>
                  <Input
                    type="number"
                    value={thresholds.amber.max}
                    onChange={(e) => updateGlobalThreshold('amber', 'max', Number(e.target.value))}
                    className="w-20"
                    min="0"
                    max="100"
                  />
                  <span>%</span>
                </div>
                <p className="text-xs text-gray-600">Moderate performance, room for improvement</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <Label className="font-medium text-green-700">Green Zone (Good)</Label>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={thresholds.green.min}
                    onChange={(e) => updateGlobalThreshold('green', 'min', Number(e.target.value))}
                    className="w-20"
                    min="0"
                    max="100"
                  />
                  <span>% to</span>
                  <Input
                    type="number"
                    value={thresholds.green.max}
                    onChange={(e) => updateGlobalThreshold('green', 'max', Number(e.target.value))}
                    className="w-20"
                    min="0"
                    max="100"
                  />
                  <span>%</span>
                </div>
                <p className="text-xs text-gray-600">Meets or exceeds expectations</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Global Thresholds
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Role-specific Thresholds */}
      <Card>
        <CardHeader>
          <CardTitle>Role-specific Thresholds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(customThresholds).map(([role, roleThresholds]) => (
            <div key={role} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{role}</h3>
                <Badge variant="outline">Custom</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm font-medium">Red</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={roleThresholds.red.min}
                      onChange={(e) => updateRoleThreshold(role, 'red', 'min', Number(e.target.value))}
                      className="w-16 text-sm"
                    />
                    <span className="text-xs">to</span>
                    <Input
                      type="number"
                      value={roleThresholds.red.max}
                      onChange={(e) => updateRoleThreshold(role, 'red', 'max', Number(e.target.value))}
                      className="w-16 text-sm"
                    />
                    <span className="text-xs">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span className="text-sm font-medium">Amber</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={roleThresholds.amber.min}
                      onChange={(e) => updateRoleThreshold(role, 'amber', 'min', Number(e.target.value))}
                      className="w-16 text-sm"
                    />
                    <span className="text-xs">to</span>
                    <Input
                      type="number"
                      value={roleThresholds.amber.max}
                      onChange={(e) => updateRoleThreshold(role, 'amber', 'max', Number(e.target.value))}
                      className="w-16 text-sm"
                    />
                    <span className="text-xs">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm font-medium">Green</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={roleThresholds.green.min}
                      onChange={(e) => updateRoleThreshold(role, 'green', 'min', Number(e.target.value))}
                      className="w-16 text-sm"
                    />
                    <span className="text-xs">to</span>
                    <Input
                      type="number"
                      value={roleThresholds.green.max}
                      onChange={(e) => updateRoleThreshold(role, 'green', 'max', Number(e.target.value))}
                      className="w-16 text-sm"
                    />
                    <span className="text-xs">%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Role Thresholds
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Performance Impact Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">Red Zone Actions</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Performance improvement plan</li>
                <li>• Additional training required</li>
                <li>• Weekly review meetings</li>
                <li>• No incentive eligibility</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Amber Zone Actions</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Coaching sessions</li>
                <li>• Bi-weekly check-ins</li>
                <li>• Partial incentive eligibility</li>
                <li>• Resource support</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Green Zone Rewards</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Full incentive payments</li>
                <li>• Recognition programs</li>
                <li>• Bonus opportunities</li>
                <li>• Career advancement</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceThresholds;
