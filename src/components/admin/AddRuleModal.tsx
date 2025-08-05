
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface AddRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (ruleData: any) => void;
}

interface Condition {
  field: string;
  operator: string;
  value: string;
  logic?: 'AND' | 'OR';
}

const AddRuleModal: React.FC<AddRuleModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    priority: 1,
    offer: '',
    offerType: '',
    offerValue: ''
  });
  
  const [conditions, setConditions] = useState<Condition[]>([
    { field: '', operator: '', value: '' }
  ]);

  const fields = [
    'Product Type', 'Account Balance', 'Tenure', 'Age', 'Relationship Value',
    'EMI Status', 'Business Vintage', 'Income Category', 'Location'
  ];

  const operators = ['=', '>', '<', '>=', '<=', 'contains', 'not equals'];
  const offerTypes = ['Discount', 'Cashback', 'Extra Benefit', 'Fee Waiver', 'Interest Boost'];

  const addCondition = () => {
    setConditions([...conditions, { field: '', operator: '', value: '', logic: 'AND' }]);
  };

  const removeCondition = (index: number) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter((_, i) => i !== index));
    }
  };

  const updateCondition = (index: number, field: string, value: any) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setConditions(newConditions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const conditionString = conditions
      .map((condition, index) => {
        const prefix = index > 0 ? ` ${condition.logic} ` : '';
        return `${prefix}${condition.field} ${condition.operator} ${condition.value}`;
      })
      .join('');

    const ruleData = {
      ...formData,
      condition: conditionString,
      offer: `${formData.offer} - ${formData.offerType}: ${formData.offerValue}`
    };

    onAdd(ruleData);
    
    // Reset form
    setFormData({
      name: '',
      priority: 1,
      offer: '',
      offerType: '',
      offerValue: ''
    });
    setConditions([{ field: '', operator: '', value: '' }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto bg-white p-3 sm:p-4 lg:p-6">
        <DialogHeader className="mb-4 sm:mb-6">
          <DialogTitle className="text-lg sm:text-xl lg:text-2xl">Create Cross-Sell Rule</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Rule Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm sm:text-base">Rule Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Savings to FD Cross-sell"
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="priority" className="text-sm sm:text-base">Priority</Label>
                  <Select 
                    value={String(formData.priority)} 
                    onValueChange={(value) => setFormData({...formData, priority: Number(value)})}
                  >
                    <SelectTrigger className="text-sm sm:text-base">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={String(num)} className="text-sm sm:text-base">
                          Priority {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg flex items-center justify-between flex-wrap gap-2">
                <span>Conditions</span>
                <Button type="button" variant="outline" size="sm" onClick={addCondition} className="text-xs sm:text-sm">
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Add Condition
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {conditions.map((condition, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                  {index > 0 && (
                    <div className="w-full sm:w-auto order-1 sm:order-none">
                      <Select 
                        value={condition.logic} 
                        onValueChange={(value) => updateCondition(index, 'logic', value)}
                      >
                        <SelectTrigger className="w-full sm:w-20 text-xs sm:text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="AND" className="text-xs sm:text-sm">AND</SelectItem>
                          <SelectItem value="OR" className="text-xs sm:text-sm">OR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="w-full sm:flex-1 order-2 sm:order-none">
                    <Select 
                      value={condition.field} 
                      onValueChange={(value) => updateCondition(index, 'field', value)}
                    >
                      <SelectTrigger className="w-full text-xs sm:text-sm">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        {fields.map(field => (
                          <SelectItem key={field} value={field} className="text-xs sm:text-sm">
                            {field}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full sm:w-32 order-3 sm:order-none">
                    <Select 
                      value={condition.operator} 
                      onValueChange={(value) => updateCondition(index, 'operator', value)}
                    >
                      <SelectTrigger className="w-full text-xs sm:text-sm">
                        <SelectValue placeholder="Operator" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        {operators.map(op => (
                          <SelectItem key={op} value={op} className="text-xs sm:text-sm">
                            {op}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full sm:flex-1 order-4 sm:order-none">
                    <Input
                      value={condition.value}
                      onChange={(e) => updateCondition(index, 'value', e.target.value)}
                      placeholder="Value"
                      className="w-full text-xs sm:text-sm"
                    />
                  </div>

                  {conditions.length > 1 && (
                    <div className="w-full sm:w-auto flex justify-end order-5 sm:order-none">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeCondition(index)}
                        className="text-xs sm:text-sm"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Offer Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div>
                <Label htmlFor="offer" className="text-sm sm:text-base">Product/Service to Offer</Label>
                <Input
                  id="offer"
                  value={formData.offer}
                  onChange={(e) => setFormData({...formData, offer: e.target.value})}
                  placeholder="e.g., Fixed Deposit, Life Insurance"
                  required
                  className="text-sm sm:text-base"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="offerType" className="text-sm sm:text-base">Offer Type</Label>
                  <Select 
                    value={formData.offerType} 
                    onValueChange={(value) => setFormData({...formData, offerType: value})}
                  >
                    <SelectTrigger className="text-sm sm:text-base">
                      <SelectValue placeholder="Select offer type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {offerTypes.map(type => (
                        <SelectItem key={type} value={type} className="text-sm sm:text-base">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="offerValue" className="text-sm sm:text-base">Offer Value</Label>
                  <Input
                    id="offerValue"
                    value={formData.offerValue}
                    onChange={(e) => setFormData({...formData, offerValue: e.target.value})}
                    placeholder="e.g., 0.5% extra interest, ₹500 cashback"
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-sm sm:text-base"
            >
              Create Rule
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRuleModal;