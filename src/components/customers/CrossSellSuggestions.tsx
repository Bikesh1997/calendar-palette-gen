
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  IndianRupee, 
  Users, 
  Shield, 
  Briefcase,
  GraduationCap,
  Heart,
  Car,
  Home
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CrossSellSuggestionsProps {
  customerName: string;
  segment: string;
  relationshipValue: string;
  onCreateOffer: (product: string) => void;
}

const CrossSellSuggestions = ({ customerName, segment, relationshipValue, onCreateOffer }: CrossSellSuggestionsProps) => {
  const { toast } = useToast();

  const getAdvancedSuggestions = () => {
    const baseSuggestions = [
      {
        product: 'Personal Loan',
        score: 92,
        reason: 'Excellent credit history, recent salary increment',
        potential: '₹8L',
        category: 'lending',
        icon: IndianRupee,
        urgency: 'High',
        timeline: '7 days',
        benefits: ['Lower interest rates', 'Quick approval', 'Flexible tenure']
      },
      {
        product: 'Life Insurance',
        score: 88,
        reason: 'Family protection needs, age group analysis',
        potential: '₹50L cover',
        category: 'insurance',
        icon: Shield,
        urgency: 'Medium',
        timeline: '14 days',
        benefits: ['Tax savings', 'Family security', 'Investment returns']
      },
      {
        product: 'Investment Portfolio',
        score: 85,
        reason: 'High savings rate, investment appetite',
        potential: '₹3L SIP',
        category: 'investments',
        icon: TrendingUp,
        urgency: 'Medium',
        timeline: '21 days',
        benefits: ['Wealth creation', 'Tax efficiency', 'Diversification']
      },
      {
        product: 'Credit Card Premium',
        score: 82,
        reason: 'Premium segment, high spending pattern',
        potential: '₹5L limit',
        category: 'cards',
        icon: Briefcase,
        urgency: 'Low',
        timeline: '30 days',
        benefits: ['Premium rewards', 'Airport lounge access', 'Cashback offers']
      }
    ];

    // Add segment-specific suggestions
    if (segment === 'Premium') {
      baseSuggestions.push({
        product: 'Private Banking',
        score: 95,
        reason: 'High net worth individual, exclusive services needed',
        potential: '₹25L relationship',
        category: 'banking',
        icon: Users,
        urgency: 'High',
        timeline: '3 days',
        benefits: ['Dedicated RM', 'Priority services', 'Exclusive products']
      });
    }

    return baseSuggestions.sort((a, b) => b.score - a.score);
  };

  const suggestions = getAdvancedSuggestions();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lending': return 'bg-blue-50 border-blue-200';
      case 'insurance': return 'bg-green-50 border-green-200';
      case 'investments': return 'bg-purple-50 border-purple-200';
      case 'cards': return 'bg-orange-50 border-orange-200';
      case 'banking': return 'bg-indigo-50 border-indigo-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target size={20} className="mr-2" />
          AI-Powered Cross-Sell Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => {
            const IconComponent = suggestion.icon;
            return (
              <div key={index} className={`p-4 border rounded-lg ${getCategoryColor(suggestion.category)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <IconComponent size={20} className="text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{suggestion.product}</h4>
                      <p className="text-sm text-gray-600">{suggestion.reason}</p>
                    </div>
                  </div>
                  <Badge className={getUrgencyColor(suggestion.urgency)}>
                    {suggestion.urgency}
                  </Badge>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Conversion Probability</span>
                    <span className="text-sm font-bold text-teal-600">{suggestion.score}%</span>
                  </div>
                  <Progress value={suggestion.score} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-gray-600">Potential Value:</span>
                    <span className="font-semibold ml-1">{suggestion.potential}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Timeline:</span>
                    <span className="font-semibold ml-1">{suggestion.timeline}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">Key Benefits:</p>
                  <div className="flex flex-wrap gap-1">
                    {suggestion.benefits.map((benefit, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => onCreateOffer(suggestion.product)}
                  >
                    Create Offer
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Analysis Scheduled",
                        description: `Detailed analysis for ${suggestion.product} will be prepared.`,
                      });
                    }}
                  >
                    Deep Analysis
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CrossSellSuggestions;
