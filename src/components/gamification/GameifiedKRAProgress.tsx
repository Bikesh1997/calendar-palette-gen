import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Target,
  Star,
  Trophy,
  Users,
  Phone,
  MapPin,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface KRAItem {
  id: string;
  title: string;
  target: number;
  current: number;
  xpReward: number;
  category: 'visits' | 'calls' | 'conversions' | 'meetings';
  icon: any;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
}

const GameifiedKRAProgress = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [showCelebration, setShowCelebration] = useState<string | null>(null);

  const kraItems: KRAItem[] = [
    {
      id: 'visits',
      title: 'Customer Visits 🏠',
      target: 20,
      current: 16,
      xpReward: 10,
      category: 'visits',
      icon: MapPin,
      level: 'gold'
    },
    {
      id: 'calls',
      title: 'Follow-up Calls 📞',
      target: 50,
      current: 42,
      xpReward: 5,
      category: 'calls',
      icon: Phone,
      level: 'silver'
    },
    {
      id: 'conversions',
      title: 'Lead Conversions 💰',
      target: 8,
      current: 6,
      xpReward: 25,
      category: 'conversions',
      icon: Target,
      level: 'platinum'
    },
    {
      id: 'meetings',
      title: 'SHG Meetings 👥',
      target: 5,
      current: 4,
      xpReward: 15,
      category: 'meetings',
      icon: Users,
      level: 'bronze'
    }
  ];

  const addProgress = (kraId: string, amount: number = 1) => {
    const kra = kraItems.find(k => k.id === kraId);
    if (!kra || kra.current >= kra.target) return;

    kra.current = Math.min(kra.current + amount, kra.target);

    if (kra.current === kra.target) {
      setShowCelebration(kraId);
      setTimeout(() => setShowCelebration(null), 2000);
    }

    toast({
      title: '🎯 Progress Updated!',
      description: `+${amount} ${kra.title.split(' ')[0]} • +${kra.xpReward * amount} XP earned!`,
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'bronze': return '🥉';
      case 'silver': return '🥈';
      case 'gold': return '🥇';
      case 'platinum': return '💎';
      default: return '⭐';
    }
  };

  const renderKRACard = (kra: KRAItem, progress: number, completed: boolean, celebrating: boolean) => (
    <Card
      key={kra.id}
      className={`transition-all duration-300 ${celebrating ? 'animate-pulse ring-4 ring-yellow-400' : ''} ${completed ? 'bg-green-50 border-green-200' : ''}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center">
            <kra.icon className="mr-2 h-5 w-5 text-blue-600" />
            {kra.title}
          </div>
          <Badge className={getLevelColor(kra.level)}>
            {getLevelIcon(kra.level)} {kra.level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {kra.current}<span className="text-lg text-gray-500">/{kra.target}</span>
            </div>
            <div className="text-sm text-gray-600">
              {completed ? 'Mission Complete! 🎉' : `${kra.target - kra.current} remaining`}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium">XP Earned</span>
            </div>
            <div className="text-sm font-bold text-blue-600">
              {kra.current * kra.xpReward} / {kra.target * kra.xpReward} XP
            </div>
          </div>

          <div className="flex space-x-2">
            {!completed ? (
              <>
                <Button
                  size="sm"
                  className="flex-1 text-[#23a07c] hover:bg-[#e3f6f1]"
                  style={{ backgroundColor: '#d2f1e7' }}
                  onClick={() => addProgress(kra.id, 1)}
                >
                  <Zap className="mr-1 h-3 w-3" />
                  +1 Progress
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => addProgress(kra.id, 3)}
                >
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +3 Boost
                </Button>
              </>
            ) : (
              <div className="flex-1 text-center p-2 bg-green-100 rounded-lg">
                <div className="flex items-center justify-center text-green-700">
                  <Trophy className="h-4 w-4 mr-2" />
                  <span className="font-medium">Mission Complete!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const totalXP = kraItems.reduce((sum, kra) => sum + (kra.current * kra.xpReward), 0);
  const maxXP = kraItems.reduce((sum, kra) => sum + (kra.target * kra.xpReward), 0);
  const overallProgress = (totalXP / maxXP) * 100;

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="border border-gray-200 rounded-lg shadow-sm">
        <AccordionItem value="kra-mission">
          <AccordionTrigger className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">KRA Mission Control 🎯</h2>
              <p className="text-sm text-muted-foreground">Track your key results and earn XP!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{totalXP} XP</div>
              <div className="text-sm">Total Earned</div>
            </div>
          </AccordionTrigger>
  
          <AccordionContent>
            <div className="p-6 pt-0 space-y-4">
              {/* Overall Progress */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall KRA Progress</span>
                  <span>{Math.round(overallProgress)}% Complete</span>
                </div>
                <Progress value={overallProgress} className="h-3 bg-green-400/30" />
              </div>
  
              {/* XP Summary */}
              <div className="grid grid-cols-2 gap-4 text-center mt-2">
                <div>
                  <div className="text-lg font-bold">
                    {kraItems.filter(k => k.current >= k.target).length}
                  </div>
                  <div className="text-xs text-gray-600">Missions Complete</div>
                </div>
                <div>
                  <div className="text-lg font-bold">{maxXP - totalXP} XP</div>
                  <div className="text-xs text-gray-600">Remaining to Unlock</div>
                </div>
              </div>
  
              {/* Accordion View for Mobile */}
              <div className="md:hidden">
                <Accordion type="multiple" className="space-y-2">
                  {kraItems.map((kra) => {
                    const progress = (kra.current / kra.target) * 100;
                    const completed = kra.current >= kra.target;
                    const celebrating = showCelebration === kra.id;
                    return (
                      <AccordionItem key={kra.id} value={kra.id}>
                        <AccordionTrigger className="text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <kra.icon className="h-4 w-4 text-blue-600" />
                            <span>{kra.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {renderKRACard(kra, progress, completed, celebrating)}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
  
              {/* Grid View for Desktop */}
              <div className="hidden md:grid md:grid-cols-2 gap-4">
                {kraItems.map((kra) => {
                  const progress = (kra.current / kra.target) * 100;
                  const completed = kra.current >= kra.target;
                  const celebrating = showCelebration === kra.id;
                  return renderKRACard(kra, progress, completed, celebrating);
                })}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
  
};

export default GameifiedKRAProgress;
