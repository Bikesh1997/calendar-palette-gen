import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import {
//   Card, CardContent, CardHeader, CardTitle,
//   Badge, Button
// } from '@/components/ui';
import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // or your equivalent import

import {
  Trophy, Target, MapPin, Zap, Star,
  Users, IndianRupee, Calendar, Clock,
  ChevronRight, CheckCircle,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { allLeads } from '@/data/leadsData';

interface Nudge {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'kra' | 'route' | 'follow-up' | 'cross-sell';
  priority: 'High' | 'Medium' | 'Low';
  actionLabel: string;
  navigationPath: string;
  value?: string;
  count?: number;
  deadline?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

const SmartNudges = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);
  const overdueLeads = userLeads.filter(lead => lead.lastContact.includes('days ago') || lead.lastContact.includes('week ago'));
  const highValueProspects = userLeads.filter(lead => parseFloat(lead.value.replace('₹', '').replace('L', '')) > 30);

  const getBaseNudges = (): Nudge[] => {
    const baseNudges: Nudge[] = [
      {
        id: '2',
        title: 'KRA Achievement Mission 🏆',
        description: `Complete ${3 - userLeads.filter(lead => lead.status === 'converted').length} more loan disbursals to achieve 100% KRA and unlock ₹45K incentive`,
        type: 'kra',
        priority: 'High',
        actionLabel: 'Start Mission',
        navigationPath: '/funnel',
        count: 3 - userLeads.filter(lead => lead.status === 'converted').length,
        value: '₹45K',
        deadline: '15 days left',
        status: 'pending'
      },
      {
        id: '4',
        title: 'Follow-up Sprint Mission 📞',
        description: `3 leads haven't been contacted in 3+ days. Total potential value: ₹${Math.round(overdueLeads.slice(0, 3).reduce((sum, lead) => sum + parseFloat(lead.value.replace('₹', '').replace('L', '')), 0))}L`,
        type: 'follow-up',
        priority: 'High',
        actionLabel: 'Accept Challenge',
        navigationPath: '/tasks',
        count: 3,
        value: `₹${Math.round(overdueLeads.slice(0, 3).reduce((sum, lead) => sum + parseFloat(lead.value.replace('₹', '').replace('L', '')), 0))}L`,
        status: 'pending'
      },
      {
        id: '5',
        title: 'Cross-Sell Quest 💼',
        description: `3 converted customers are eligible for insurance products. Potential additional revenue: ₹12L`,
        type: 'cross-sell',
        priority: 'Medium',
        actionLabel: 'Begin Quest',
        navigationPath: '/customers',
        count: 3,
        value: '₹12L',
        status: 'pending'
      }
    ];

    if (user?.name !== 'Vikram Singh') {
      baseNudges.splice(1, 0, {
        id: '3',
        title: 'Territory Conquest Mission 🗺️',
        description: `Visit customers in Bandra area today. ${overdueLeads.length + 3} high-value prospects within 2km radius.`,
        type: 'route',
        priority: 'Medium',
        actionLabel: 'Launch Mission',
        navigationPath: '/plan-my-day',
        count: overdueLeads.length + 3,
        status: 'pending'
      });
    }

    if (user?.id === '5' && user?.name === 'Neha Gupta') {
      baseNudges.unshift({
        id: '1',
        title: 'Elite Portfolio Mission 💎',
        description: `You have ${highValueProspects.length} senior citizens eligible for FD products. Average ticket size: ₹35L`,
        type: 'opportunity',
        priority: 'High',
        actionLabel: 'Start Mission',
        navigationPath: '/leads',
        count: highValueProspects.length,
        value: '₹35L',
        status: 'pending'
      });
    }

    return baseNudges;
  };

  const [nudges, setNudges] = useState<Nudge[]>(getBaseNudges());

  const getXPReward = (type: string, priority: string) => {
    const baseXP = { 'High': 75, 'Medium': 50, 'Low': 25 };
    return baseXP[priority as keyof typeof baseXP] || 25;
  };

  const getNudgeIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      opportunity: <Trophy className="h-5 w-5 text-yellow-500" />,
      kra: <Target className="h-5 w-5 text-orange-500" />,
      route: <MapPin className="h-5 w-5 text-green-500" />,
      'follow-up': <Zap className="h-5 w-5 text-red-500" />,
      'cross-sell': <Star className="h-5 w-5 text-purple-500" />
    };
    return icons[type] || <Trophy className="h-5 w-5" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStart = (nudge: Nudge) => {
    setNudges(prev =>
      prev.map(n => (n.id === nudge.id ? { ...n, status: 'in_progress' } : n))
    );
    toast({ title: '🎯 Mission Started', description: `+${getXPReward(nudge.type, nudge.priority)} XP earned` });
    navigate(nudge.navigationPath);
  };

  const completeNudge = (id: string) => {
    setNudges(prev =>
      prev.map(n => (n.id === id ? { ...n, status: 'completed' } : n))
    );
    toast({ title: '✅ Mission Completed!', description: 'Great job finishing this task!' });
  };

  return (
    <Accordion type="single" collapsible className="rounded-lg shadow-sm border border-gray-200">
    <AccordionItem value="nudge-missions">
      <AccordionTrigger className="p-6 flex justify-between items-center text-left">
        <div className="flex items-center text-xl font-semibold">
          <Target className="mr-2 h-6 w-6 text-blue-500" />
          Nudge Missions 🎯
          <Badge className="ml-3 bg-blue-100 text-blue-800">
            {nudges.filter((n) => n.status === "completed").length}/{nudges.length} Complete
          </Badge>
        </div>
      </AccordionTrigger>
  
      <AccordionContent>
        <div className="p-4 md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
          {nudges.map((nudge) => (
            <div
              key={nudge.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow space-y-3"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  {getNudgeIcon(nudge.type)}
                  <div className="ml-2">
                    <h4 className="font-medium">{nudge.title}</h4>
                    <p className="text-sm text-gray-600">{nudge.description}</p>
                  </div>
                </div>
                <Badge className={`text-xs ${getPriorityColor(nudge.priority)}`}>
                  {nudge.status.replace("_", " ")}
                </Badge>
              </div>
  
              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-bold text-yellow-600">
                    +{getXPReward(nudge.type, nudge.priority)} XP
                  </span>
                  <Badge className={`text-xs ${getPriorityColor(nudge.priority)}`}>
                    {nudge.priority}
                  </Badge>
                </div>
  
                {/* Action Buttons */}
                {nudge.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => handleStart(nudge)}
                    className="bg-[#23a07c] hover:bg-[#1c8a6b] text-white"
                  >
                    Start Mission <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
                {nudge.status === "in_progress" && (
                  <Button
                    size="sm"
                    onClick={() => completeNudge(nudge.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Complete <CheckCircle className="ml-1 h-4 w-4" />
                  </Button>
                )}
                {nudge.status === "completed" && (
                  <Link to={nudge.navigationPath}>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      View Result
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  );
};

export default SmartNudges;
