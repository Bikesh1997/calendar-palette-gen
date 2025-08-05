import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator as CalculatorIcon, Download, Share2, RefreshCw } from 'lucide-react';
import { calculators, Calculator } from '@/data/FinancialEducationData';

const FinancialCalculators: React.FC = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<Calculator | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [results, setResults] = useState<Record<string, any> | null>(null);

  const updateFormValue = (fieldId: string, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
    setResults(null); // Clear results when inputs change
  };

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;
    
    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    };
  };

  const calculateFD = (principal: number, rate: number, tenure: number, compounding: string) => {
    const compoundingMap = {
      'Quarterly': 4,
      'Half-yearly': 2,
      'Yearly': 1
    };
    
    const n = compoundingMap[compounding as keyof typeof compoundingMap] || 4;
    const maturityAmount = principal * Math.pow(1 + (rate / 100) / n, n * tenure);
    const interestEarned = maturityAmount - principal;
    
    return {
      maturityAmount: Math.round(maturityAmount),
      interestEarned: Math.round(interestEarned)
    };
  };

  const handleCalculate = () => {
    if (!selectedCalculator) return;

    const values = formValues;
    let calculationResults = {};

    switch (selectedCalculator.id) {
      case '1': // EMI Calculator
        calculationResults = calculateEMI(
          Number(values.principal) || 0,
          Number(values.rate) || 0,
          Number(values.tenure) || 0
        );
        break;
      case '2': // FD Calculator
        calculationResults = calculateFD(
          Number(values.principal) || 0,
          Number(values.rate) || 0,
          Number(values.tenure) || 0,
          values.compounding || 'Quarterly'
        );
        break;
    }

    setResults(calculationResults);
  };

  const resetCalculator = () => {
    setFormValues({});
    setResults(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      loan: 'bg-purple-100 text-purple-700',
      savings: 'bg-green-100 text-green-700',
      investment: 'bg-blue-100 text-blue-700',
      tax: 'bg-orange-100 text-orange-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const renderField = (field: any) => {
    const value = formValues[field.id] || '';

    switch (field.type) {
      case 'select':
        return (
          <Select onValueChange={(value) => updateFormValue(field.id, value)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'currency':
        return (
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
            <Input
              type="number"
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => updateFormValue(field.id, e.target.value)}
              className="pl-8"
              min={field.min}
              max={field.max}
            />
          </div>
        );
      case 'percentage':
        return (
          <div className="relative">
            <Input
              type="number"
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => updateFormValue(field.id, e.target.value)}
              className="pr-8"
              min={field.min}
              max={field.max}
              step="0.1"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
          </div>
        );
      default:
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateFormValue(field.id, e.target.value)}
            min={field.min}
            max={field.max}
          />
        );
    }
  };

  if (selectedCalculator) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => {
              setSelectedCalculator(null);
              resetCalculator();
            }}
          >
            ← Back to Calculators
          </Button>
          <Badge className={getCategoryColor(selectedCalculator.category)}>
            {selectedCalculator.category}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalculatorIcon size={20} />
                {selectedCalculator.name}
              </CardTitle>
              <p className="text-gray-600 text-sm">{selectedCalculator.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedCalculator.fields.map(field => (
                <div key={field.id}>
                  <Label htmlFor={field.id}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))}

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCalculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={resetCalculator}>
                  <RefreshCw size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Calculation Results</CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-4">
                  {selectedCalculator.id === '1' && (
                    <>
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <h3 className="font-medium text-lg mb-2">Monthly EMI</h3>
                        <p className="text-3xl font-bold text-primary">
                          {formatCurrency(results.emi)}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-700">Total Interest</h4>
                          <p className="text-xl font-semibold text-red-600">
                            {formatCurrency(results.totalInterest)}
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-700">Total Amount</h4>
                          <p className="text-xl font-semibold text-blue-600">
                            {formatCurrency(results.totalAmount)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Payment Breakdown</h4>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p>Principal Amount: {formatCurrency(Number(formValues.principal) || 0)}</p>
                          <p>Interest Rate: {formValues.rate || 0}% per annum</p>
                          <p>Loan Tenure: {formValues.tenure || 0} years</p>
                          <p>Total Payments: {(Number(formValues.tenure) || 0) * 12} monthly installments</p>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedCalculator.id === '2' && (
                    <>
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <h3 className="font-medium text-lg mb-2">Maturity Amount</h3>
                        <p className="text-3xl font-bold text-primary">
                          {formatCurrency(results.maturityAmount)}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-700">Interest Earned</h4>
                        <p className="text-xl font-semibold text-green-600">
                          {formatCurrency(results.interestEarned)}
                        </p>
                      </div>

                      <div className="mt-6 p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Investment Summary</h4>
                        <div className="text-sm text-green-700 space-y-1">
                          <p>Principal Amount: {formatCurrency(Number(formValues.principal) || 0)}</p>
                          <p>Interest Rate: {formValues.rate || 0}% per annum</p>
                          <p>Investment Period: {formValues.tenure || 0} years</p>
                          <p>Compounding: {formValues.compounding || 'Quarterly'}</p>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download size={16} className="mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 size={16} className="mr-2" />
                      Share Results
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalculatorIcon size={48} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="font-medium mb-2">Enter values to calculate</h3>
                  <p className="text-gray-500 text-sm">
                    Fill in the required fields and click Calculate to see your results
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Formula Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">How is this calculated?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Formula:</strong> {selectedCalculator.formula}
              </p>
              <p className="text-xs text-gray-600">
                This calculation provides an estimate. Actual results may vary based on specific terms and conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Financial Calculators</h2>
        <p className="text-gray-600">
          Use our free calculators to plan your finances and make informed decisions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map(calculator => (
          <Card 
            key={calculator.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedCalculator(calculator)}
          >
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CalculatorIcon size={20} />
                    <h3 className="text-lg">{calculator.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 font-normal">
                    {calculator.description}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge className={getCategoryColor(calculator.category)}>
                  {calculator.category}
                </Badge>
                <Button size="sm" variant="ghost">
                  Try Now →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Calculations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Popular Calculations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-1">Home Loan EMI</h4>
              <p className="text-gray-600">₹30 lakh at 8.5% for 20 years</p>
              <p className="font-semibold text-primary">EMI: ₹25,983</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-1">Fixed Deposit Returns</h4>
              <p className="text-gray-600">₹5 lakh at 6.5% for 3 years</p>
              <p className="font-semibold text-primary">Maturity: ₹6,06,871</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-1">Personal Loan EMI</h4>
              <p className="text-gray-600">₹2 lakh at 12% for 3 years</p>
              <p className="font-semibold text-primary">EMI: ₹6,644</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialCalculators;