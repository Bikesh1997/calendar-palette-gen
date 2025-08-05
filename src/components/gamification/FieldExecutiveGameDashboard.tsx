import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Target, 
  MapPin, 
  Phone, 
  Users, 
  CheckCircle,
  Flame,
  Zap,
  Award,
  Calendar,
  TrendingUp,
  IndianRupee,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import SmartNudges from '../dashboard/SmartNudges';
import { allLeads } from '@/data/leadsData';

interface GameProgress {
  currentXP: number;
  level: number;
  nextLevelXP: number;
  dailyStreak: number;
  weeklyStreak: number;
  badges: string[];
  completedMissions: number;
  totalMissions: number;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'visit' | 'call' | 'meeting' | 'documentation';
  xpReward: number;
  status: 'pending' | 'in_progress' | 'completed';
  icon: any;
  difficulty: 'easy' | 'medium' | 'hard';
  navigationPath:string;
}

const FieldExecutiveGameDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
    const navigate = useNavigate();
    const [openCard, setOpenCard] = useState(null); // 'daily' | 'badges' | null

  const toggleCard = (card) => {
    setOpenCard(openCard === card ? null : card);
  };
    // Calculate metrics based on user role
    const userLeads = user?.role === 'supervisor' ? allLeads : allLeads.filter(lead => lead.assignedToId === user?.id);
    const convertedLeads = userLeads.filter(lead => lead.status === 'converted').length;
    // Monthly target for salesperson
    const monthlyTarget = 25; // Target number of conversions per month
  
  
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    currentXP: 850,
    level: 5,
    nextLevelXP: 1000,
    dailyStreak: 3,
    weeklyStreak: 2,
    badges: ['First Visit', 'Call Master', 'Team Player'],
    completedMissions: 12,
    totalMissions: 15
  });

  const [showCelebration, setShowCelebration] = useState(false);

  const dailyMissions: Mission[] = [
    {
      id: '1',
      title: 'Complete 3 Customer Visits',
      description: 'Visit 3 customers in your beat plan today',
      type: 'visit',
      xpReward: 50,
      status: 'completed',
      icon: MapPin,
      difficulty: 'medium',
      navigationPath: '/customers',
    },
    {
      id: '2',
      title: 'Make 10 Follow-up Calls',
      description: 'Contact pending leads and update status',
      type: 'call',
      xpReward: 30,
      status: 'in_progress',
      icon: Phone,
      difficulty: 'easy',
      navigationPath: '/tasks',
    },
    {
      id: '3',
      title: 'Attend SHG Meeting',
      description: 'Facilitate self-help group formation',
      type: 'meeting',
      xpReward: 75,
      status: 'pending',
      icon: Users,
      difficulty: 'hard',
      navigationPath: '/tasks',
    },
    {
      id: '4',
      title: 'Submit Daily Report',
      description: 'Complete and submit your field activity report',
      type: 'documentation',
      xpReward: 20,
      status: 'pending',
      icon: CheckCircle,
      difficulty: 'easy',
      navigationPath: '/tasks',
    }
  ];

  const availableBadges = [
    { id: 'streak_master', name: 'Streak Master', description: '7-day login streak', earned: true, icon: '🔥' },
    { id: 'visit_champion', name: 'Visit Champion', description: '50 customer visits', earned: true, icon: '🏆' },
    { id: 'call_expert', name: 'Call Expert', description: '100 successful calls', earned: false, icon: '📞' },
    { id: 'team_leader', name: 'Team Leader', description: 'Help 5 team members', earned: false, icon: '👥' }
  ];

  const completeMission = (missionId: string) => {
    const mission = dailyMissions.find(m => m.id === missionId);
    if (!mission || mission.status === 'completed') return;

    // Update mission status
    mission.status = 'completed';
    
    // Add XP
    const newXP = gameProgress.currentXP + mission.xpReward;
    let newLevel = gameProgress.level;
    let nextLevelXP = gameProgress.nextLevelXP;
    
    // Check for level up
    if (newXP >= nextLevelXP) {
      newLevel += 1;
      nextLevelXP += 200; // Each level requires 200 more XP
      setShowCelebration(true);
    }

    setGameProgress(prev => ({
      ...prev,
      currentXP: newXP,
      level: newLevel,
      nextLevelXP,
      completedMissions: prev.completedMissions + 1
    }));

    // Show celebration toast
    toast({
      title: "🎉 Mission Complete!",
      description: `+${mission.xpReward} XP earned! ${newLevel > gameProgress.level ? 'LEVEL UP!' : ''}`,
    });

    // Hide celebration after 2 seconds
    if (newLevel > gameProgress.level) {
      setTimeout(() => setShowCelebration(false), 2000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const progressPercentage = (gameProgress.currentXP / gameProgress.nextLevelXP) * 100;

  // // Only show for Field Executives
  // if (user?.role !== 'sales_executive') {
  //   return null;
  // }

  const remainingTarget = useMemo(() => monthlyTarget - convertedLeads, []);

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-bounce-in text-6xl">🎉</div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
        </div>
      )}

      {/* Game Header */}
      <Card
  className="text-[#1e3a2f] w-full"
  style={{
    background: 'linear-gradient(to right, #c9f1e4, #ffe2c4, #fff2c2)',
  }}
>
  <CardContent className="p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold">Welcome back, Champion! 🏆</h2>
        <p className="text-sm sm:text-base text-[#23a07c]">Ready for today's missions?</p>
      </div>
      <div className="text-left sm:text-center">
        <div className="text-2xl sm:text-3xl font-bold text-[#f59036]">
          Level {gameProgress.level}
        </div>
        <div className="text-xs sm:text-sm text-[#23a07c]">
          {gameProgress.currentXP}/{gameProgress.nextLevelXP} XP
        </div>
      </div>
    </div>

    <div className="mt-4">
      <div className="flex justify-between text-xs sm:text-sm text-[#f59036] mb-2">
        <span>Progress to Level {gameProgress.level + 1}</span>
        <span>{Math.round(progressPercentage)}%</span>
      </div>
      <Progress
        value={progressPercentage}
        className="h-2 sm:h-3 bg-[#d2f1e7] [&>div]:bg-[#23a07c]"
      />
    </div>
  </CardContent>
</Card>



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Stats */}
      {/* Daily Stats Card */}
      <div className="border rounded-lg overflow-hidden">
        <div
          className="flex items-center justify-between p-3 bg-white cursor-pointer md:cursor-default"
          onClick={() => toggleCard("daily")}
        >
          <div className="flex items-center text-base font-semibold">
            <Flame className="mr-2 h-5 w-5 text-orange-500" />
            Daily Stats ⚡
          </div>
          <span className="md:hidden text-sm text-gray-500">{openCard === "daily" ? "▲" : "▼"}</span>
        </div>
        {/* Content: Visible only on desktop or when toggled on mobile */}
        <div className={`p-3 space-y-3 ${openCard === "daily" ? "block" : "hidden"} md:block`}>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Flame className="h-4 w-4 text-orange-500 mr-2" />
              Daily Visit Streak
            </div>
            <span className="bg-orange-100 text-orange-800 font-bold text-xs px-2 py-1 rounded">
              {gameProgress.dailyStreak} days 🔥
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-blue-500 mr-2" />
              Weekly Visit Streak
            </div>
            <span className="bg-blue-100 text-blue-800 font-bold text-xs px-2 py-1 rounded">
              {gameProgress.weeklyStreak} weeks 📅
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
              Mission Progress
            </div>
            <span className="bg-yellow-100 text-yellow-800 font-bold text-xs px-2 py-1 rounded">
              {gameProgress.completedMissions}/{gameProgress.totalMissions} ⭐
            </span>
          </div>
        </div>
      </div>

      {/* Earned Badges Card */}
      <div className="border rounded-lg overflow-hidden">
        <div
          className="flex items-center justify-between p-3 bg-white cursor-pointer md:cursor-default"
          onClick={() => toggleCard("badges")}
        >
          <div className="flex items-center text-base font-semibold">
            <Award className="mr-2 h-5 w-5 text-purple-500" />
            Badges Earned 🏅
          </div>
          <span className="md:hidden text-sm text-gray-500">{openCard === "badges" ? "▲" : "▼"}</span>
        </div>
        {/* Content: Visible only on desktop or when toggled on mobile */}
        <div className={`p-3 space-y-3 ${openCard === "badges" ? "block" : "hidden"} md:block`}>
          {availableBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-2 rounded border flex items-center ${
                badge.earned
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-gray-50 border-gray-200 opacity-60"
              }`}
            >
              <span className="text-xl mr-3">{badge.icon}</span>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{badge.name}</h4>
                <p className="text-xs text-gray-600">{badge.description}</p>
              </div>
              {badge.earned && <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />}
            </div>
          ))}
        </div>
    </div>


        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Zap className="mr-2 h-5 w-5 text-yellow-500" />
              Quick Start Mission 🚀
            </CardTitle>
          </CardHeader>
          <CardContent>
  <div className="space-y-3">
    <Button
      className="w-full text-emerald-800"
      size="lg"
      style={{ backgroundColor: '#d7f4eb' }}
    >
      <MapPin className="mr-2 h-4 w-4" />
      Start Customer Visit +50 XP
    </Button>

    <Button
      className="w-full text-orange-800"
      size="lg"
      style={{ backgroundColor: '#ffe6c7' }}
    >
      <Phone className="mr-2 h-4 w-4" />
      Make Follow-up Call +30 XP
    </Button>

    <Button
      className="w-full text-yellow-800"
      size="lg"
      style={{ backgroundColor: '#fff7d6' }}
    >
      <Users className="mr-2 h-4 w-4" />
      Cross Selling Conversion +75 XP
    </Button>
  </div>
</CardContent>

        </Card>
      </div>
      <SmartNudges/>
      {/* Daily Missions */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Target className="mr-2 h-6 w-6 text-blue-500" />
            Nudge Missions 🎯
            <Badge className="ml-2 bg-blue-100 text-blue-800">
              {dailyMissions.filter(m => m.status === 'completed').length}/{dailyMissions.length} Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyMissions.map((mission) => (
              <div key={mission.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <mission.icon className={`h-5 w-5 mr-2 ${getDifficultyColor(mission.difficulty)}`} />
                    <div>
                      <h4 className="font-medium">{mission.title}</h4>
                      <p className="text-sm text-gray-600">{mission.description}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(mission.status)}`}>
                    {mission.status.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-bold text-yellow-600">+{mission.xpReward} XP</span>
                    <Badge className={`text-xs ${getDifficultyColor(mission.difficulty)}`}>
                      {mission.difficulty}
                    </Badge>
                  </div>
                  
                  {mission.status === 'pending' && (
                    <Button 
                      size="sm" 
                      onClick={() => completeMission(mission.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Start Mission
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                  
                  {mission.status === 'in_progress' && (
                    <Button 
                      size="sm" 
                      onClick={() => completeMission(mission.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Complete +{mission.xpReward} XP
                      <CheckCircle className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                  
                  <Link to= "/customers">
                  {mission.status === 'completed' && (
                                      

                     <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700">

                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">View Customers</span>
                    
                    </Button>
                  
                  )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}


 
 {/* Open Leads */}
  {/* <Card className="p-2 sm:p-4">
    <CardContent className="p-2 sm:p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm text-gray-600">Open Leads</p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">106</p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
            <ArrowDownRight size={12} className="inline-block mr-1" />
            -3% from last month
          </p>
        </div>
        <Clock size={32} className="text-orange-500 opacity-50" />
      </div>
    </CardContent>
  </Card> */}
  
      {/* Performance Insights */}
      <Card className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    {/* Total Leads */}
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Leads</p>
            <p className="text-2xl font-bold text-gray-900">134</p>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <ArrowUpRight size={12} className="mr-1" />
              +12% from last month
            </p>
          </div>
          <Users size={36} className="text-blue-500 opacity-50" />
        </div>
      </CardContent>
    </Card>

    {/* Converted Leads */}
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Converted Leads</p>
            <h3 className="text-2xl font-bold text-gray-900">28</h3>
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <ArrowUpRight size={12} className="mr-1" />
              +8% from last month
            </p>
          </div>
          <CheckCircle size={32} className="text-green-500 opacity-60" />
        </div>
      </CardContent>
    </Card>

    {/* Monthly Target */}
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Monthly Target</p>
            <h3 className="text-2xl font-bold text-gray-900">40</h3>
            <p className="text-xs text-purple-600 mt-1 flex items-center">
              {convertedLeads >= monthlyTarget ? (
                <>
                  <ArrowUpRight size={12} className="mr-1" />
                  Target achieved!
                </>
              ) : (
                <>
                  <Clock size={12} className="mr-1" />
                  {remainingTarget} more needed
                </>
              )}
            </p>
          </div>
          <Target size={32} className="text-purple-500 opacity-60" />
        </div>
      </CardContent>
    </Card>

    {/* Total Revenue */}
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900">₹1.28 Cr</h3>
            <p className="text-xs text-teal-600 mt-1 flex items-center">
              <ArrowUpRight size={12} className="mr-1" />
              +15% from last month
            </p>
          </div>
          <IndianRupee size={32} className="text-teal-500 opacity-60" />
        </div>
      </CardContent>
    </Card>
    
  </div>



        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
            Performance Insights 📊
          </CardTitle>
        </CardHeader>
        <CardContent>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
    
    {/* Card 1 */}
    <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
      <div className="text-center">
        <div className="text-lg sm:text-2xl font-bold text-green-700">85%</div>
        <div className="text-xs sm:text-sm text-green-600">Mission Success Rate</div>
        <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Above average! 🌟</div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
      <div className="text-center">
        <div className="text-lg sm:text-2xl font-bold text-blue-700">1,250</div>
        <div className="text-xs sm:text-sm text-blue-600">Total XP This Week</div>
        <div className="text-[10px] sm:text-xs text-gray-500 mt-1">+300 vs last week 📈</div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
      <div className="text-center">
        <div className="text-lg sm:text-2xl font-bold text-purple-700">3rd</div>
        <div className="text-xs sm:text-sm text-purple-600">Team Ranking</div>
        <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Keep pushing! 💪</div>
      </div>
    </div>

  </div>
</CardContent>

      </Card>
    </div>
  );
};

export default FieldExecutiveGameDashboard;