
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  IndianRupee,
  GraduationCap,
  Home,
  Heart,
  Car,
  Briefcase,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  title: string;
  category: 'education' | 'housing' | 'retirement' | 'health' | 'business' | 'travel';
  targetAmount: string;
  currentAmount: string;
  targetDate: string;
  progress: number;
  priority: 'High' | 'Medium' | 'Low';
  recommendations: string[];
  nextAction: string;
  timeline: string;
}

interface GoalBasedNudgesProps {
  customerName: string;
  onCreatePlan: (goalId: string) => void;
}

const GoalBasedNudges = ({ customerName, onCreatePlan }: GoalBasedNudgesProps) => {
  const { toast } = useToast();

  const customerGoals: Goal[] = [
    {
      id: 'goal1',
      title: "Child's Higher Education",
      category: 'education',
      targetAmount: '₹25L',
      currentAmount: '₹8.5L',
      targetDate: 'Dec 2030',
      progress: 34,
      priority: 'High',
      recommendations: ['Increase SIP by ₹5K', 'Consider ELSS funds', 'Education insurance plan'],
      nextAction: 'Set up additional SIP of ₹5,000',
      timeline: '7 days'
    },
    {
      id: 'goal2',
      title: 'Home Purchase - Pune',
      category: 'housing',
      targetAmount: '₹80L',
      currentAmount: '₹15L',
      targetDate: 'Mar 2026',
      progress: 19,
      priority: 'High',
      recommendations: ['Pre-approved home loan', 'Systematic savings plan', 'Real estate investment'],
      nextAction: 'Apply for pre-approved home loan',
      timeline: '14 days'
    },
    {
      id: 'goal3',
      title: 'Retirement Planning',
      category: 'retirement',
      targetAmount: '₹2.5Cr',
      currentAmount: '₹45L',
      targetDate: 'Jan 2045',
      progress: 18,
      priority: 'Medium',
      recommendations: ['Pension plan', 'Equity mutual funds', 'NPS contribution'],
      nextAction: 'Start NPS with ₹2L annual contribution',
      timeline: '21 days'
    },
    {
      id: 'goal4',
      title: 'Health Emergency Fund',
      category: 'health',
      targetAmount: '₹10L',
      currentAmount: '₹6L',
      targetDate: 'Ongoing',
      progress: 60,
      priority: 'Medium',
      recommendations: ['Health insurance top-up', 'Liquid funds', 'Critical illness cover'],
      nextAction: 'Upgrade health insurance coverage',
      timeline: '10 days'
    }
  ];

  const getGoalIcon = (category: string) => {
    switch (category) {
      case 'education': return GraduationCap;
      case 'housing': return Home;
      case 'retirement': return Heart;
      case 'health': return Heart;
      case 'business': return Briefcase;
      case 'travel': return Car;
      default: return Target;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education': return 'bg-blue-50 border-blue-200';
      case 'housing': return 'bg-green-50 border-green-200';
      case 'retirement': return 'bg-purple-50 border-purple-200';
      case 'health': return 'bg-red-50 border-red-200';
      case 'business': return 'bg-orange-50 border-orange-200';
      case 'travel': return 'bg-indigo-50 border-indigo-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return 'text-green-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target size={20} className="mr-2" />
          Goal-Based Financial Planning & Nudges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customerGoals.map((goal) => {
            const IconComponent = getGoalIcon(goal.category);
            return (
              <div key={goal.id} className={`p-4 border rounded-lg ${getCategoryColor(goal.category)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <IconComponent size={20} className="text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                      <p className="text-sm text-gray-600">Target: {goal.targetAmount} by {goal.targetDate}</p>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(goal.priority)}>
                    {goal.priority}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className={`text-sm font-bold ${getProgressColor(goal.progress)}`}>
                      {goal.progress}% ({goal.currentAmount} / {goal.targetAmount})
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-3" />
                </div>

                <div className="mb-3">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      Next Action: {goal.timeline}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border border-teal-200">
                    <p className="text-sm font-medium text-teal-800">{goal.nextAction}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">AI Recommendations:</p>
                  <div className="flex flex-wrap gap-1">
                    {goal.recommendations.map((rec, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {rec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => onCreatePlan(goal.id)}
                  >
                    Create Action Plan
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Goal Updated",
                        description: `Progress tracking enabled for ${goal.title}`,
                      });
                    }}
                  >
                    Track Progress
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Review Scheduled",
                        description: `Goal review meeting scheduled for ${goal.title}`,
                      });
                    }}
                  >
                    Schedule Review
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

export default GoalBasedNudges;
