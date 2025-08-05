import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Trophy, 
  Star, 
  Target, 
  TrendingUp, 
  Award, 
  Calendar, 
  Users, 
  Flame,
  Crown,
  Medal,
  Zap
} from 'lucide-react';
import {
  sampleLeaderboard,
  sampleAchievements,
  sampleChallenges,
  availableBadges,
  getLevel,
  getCurrentLevelPoints,
  getPointsForNextLevel,
  getBadgeRarityColor,
  type LeaderboardEntry,
  type Challenge,
  type Badge as BadgeType
} from '@/data/gamificationData';

const KRAGamification = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [selectedEmployee, setSelectedEmployee] = useState('emp_001');
  const [activeTab, setActiveTab] = useState('overview');

  // Reset to first tab when selectedEmployee changes
  useEffect(() => {
    setActiveTab('overview');
  }, [selectedEmployee]);

  // Get current employee data
  const currentEmployee = sampleLeaderboard.find(emp => emp.employeeId === selectedEmployee) || sampleLeaderboard[0];
  const currentLevel = getLevel(currentEmployee.totalPoints);
  const currentLevelPoints = getCurrentLevelPoints(currentEmployee.totalPoints);
  const nextLevelPoints = getPointsForNextLevel(currentEmployee.totalPoints);

  // Overview Dashboard
  const OverviewDashboard = () => (
    <div className="space-y-6">
      {/* Employee Progress Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{currentEmployee.avatar}</div>
              <div>
                <CardTitle className="text-xl">{currentEmployee.employeeName}</CardTitle>
                <p className="text-muted-foreground">{currentEmployee.role}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">Level {currentLevel}</div>
              <div className="text-sm text-muted-foreground">{currentEmployee.totalPoints} Total Points</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Level Progress</span>
                <span className="text-sm text-muted-foreground">
                  {currentLevelPoints}/{nextLevelPoints - (currentLevel - 1) * 100} XP
                </span>
              </div>
              <Progress 
                value={(currentLevelPoints / (nextLevelPoints - (currentLevel - 1) * 100)) * 100} 
                className="h-3"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{currentEmployee.currentStreak}</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{currentEmployee.badges.length}</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">#{currentEmployee.rank}</div>
                <div className="text-sm text-muted-foreground">Team Rank</div>
              </div>
            </div>
            
            {/* KRA vs KPA Progress */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">12/15</div>
                <div className="text-sm text-blue-600">KRAs Completed</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">5/6</div>
                <div className="text-sm text-purple-600">KPAs Completed</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-lg font-bold">{currentEmployee.weeklyPoints}</div>
                <div className="text-sm text-muted-foreground">Weekly Points</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-lg font-bold">{currentEmployee.monthlyPoints}</div>
                <div className="text-sm text-muted-foreground">Monthly Points</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-lg font-bold">{currentEmployee.longestStreak}</div>
                <div className="text-sm text-muted-foreground">Longest Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-lg font-bold">{availableBadges.length - currentEmployee.badges.length}</div>
                <div className="text-sm text-muted-foreground">Badges to Unlock</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements - showing both KRA and KPA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Recent Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sampleAchievements.slice(0, 4).map((achievement) => (
              <div key={achievement.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${achievement.type === 'KRA' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                    <Trophy className={`h-4 w-4 ${achievement.type === 'KRA' ? 'text-blue-600' : 'text-purple-600'}`} />
                  </div>
                  <div>
                    <div className="font-medium">
                      {achievement.kraTitle || achievement.kpaTitle}
                      <Badge variant="outline" className="ml-2 text-xs">
                        {achievement.type}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.achievedValue}/{achievement.targetValue} ({achievement.percentage}%)
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">+{achievement.points} pts</div>
                  <div className="text-sm text-muted-foreground">
                    {achievement.date.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Leaderboard Component
  const LeaderboardView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Team Leaderboard</h3>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {sampleLeaderboard.slice(0, 3).map((employee, index) => (
          <Card key={employee.employeeId} className={`${index === 0 ? 'border-yellow-300 bg-yellow-50' : index === 1 ? 'border-gray-300 bg-gray-50' : 'border-orange-300 bg-orange-50'}`}>
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </div>
              <div className="text-2xl mb-1">{employee.avatar}</div>
              <div className="font-bold">{employee.employeeName}</div>
              <div className="text-sm text-muted-foreground mb-2">{employee.role}</div>
              <div className="text-lg font-bold text-primary">{employee.totalPoints} pts</div>
              <div className="text-sm">Level {employee.level}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Full Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sampleLeaderboard.map((employee) => (
              <div 
                key={employee.employeeId} 
                className={`flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-muted ${employee.employeeId === selectedEmployee ? 'bg-blue-50 border border-blue-200' : 'bg-background'}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-bold w-8 text-center">#{employee.rank}</div>
                  <div className="text-2xl">{employee.avatar}</div>
                  <div>
                    <div className="font-medium">{employee.employeeName}</div>
                    <div className="text-sm text-muted-foreground">{employee.role}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="font-bold">{employee.totalPoints}</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">Level {employee.level}</div>
                    <div className="text-sm text-muted-foreground">
                      <Flame className="h-3 w-3 inline mr-1" />
                      {employee.currentStreak}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {employee.badges.slice(0, 3).map((badge) => (
                      <div key={badge.id} className="text-lg">{badge.icon}</div>
                    ))}
                    {employee.badges.length > 3 && (
                      <div className="text-sm text-muted-foreground">+{employee.badges.length - 3}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Badges & Achievements
  const BadgesView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Earned Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Medal className="h-5 w-5" />
              <span>Earned Badges ({currentEmployee.badges.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {currentEmployee.badges.map((badge) => (
                <div key={badge.id} className="p-3 border rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <div className="font-medium text-sm">{badge.name}</div>
                    <Badge variant="secondary" className={`text-xs mt-1 ${getBadgeRarityColor(badge.rarity)}`}>
                      {badge.rarity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Available Badges</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availableBadges
                .filter(badge => !currentEmployee.badges.find(b => b.id === badge.id))
                .map((badge) => (
                <div key={badge.id} className="flex items-center space-x-3 p-3 border rounded-lg opacity-60">
                  <div className="text-2xl grayscale">{badge.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium">{badge.name}</div>
                    <div className="text-sm text-muted-foreground">{badge.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">{badge.criteria}</div>
                  </div>
                  <div className="text-sm font-medium text-primary">+{badge.points} pts</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Challenges & Streaks
  const ChallengesView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleChallenges.map((challenge) => (
          <Card key={challenge.id} className={`${
            challenge.category === 'KRA' ? 'border-blue-200' : 
            challenge.category === 'KPA' ? 'border-purple-200' : 
            challenge.category === 'BOTH' ? 'border-gradient-to-r from-blue-200 to-purple-200' :
            challenge.type === 'daily' ? 'border-green-200' : 
            challenge.type === 'weekly' ? 'border-blue-200' : 
            'border-purple-200'
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant={challenge.type === 'daily' ? 'default' : challenge.type === 'weekly' ? 'secondary' : 'outline'}>
                    {challenge.type}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${
                    challenge.category === 'KRA' ? 'text-blue-600 bg-blue-50' :
                    challenge.category === 'KPA' ? 'text-purple-600 bg-purple-50' :
                    'text-gray-600 bg-gray-50'
                  }`}>
                    {challenge.category}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.ceil((challenge.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                </div>
              </div>
              <CardTitle className="text-lg">{challenge.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {challenge.currentValue}/{challenge.targetValue}
                    </span>
                  </div>
                  <Progress value={(challenge.currentValue / challenge.targetValue) * 100} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">+{challenge.reward.points} pts</span>
                  </div>
                  {challenge.reward.badge && (
                    <div className="flex items-center space-x-1">
                      <span className="text-sm">{challenge.reward.badge.icon}</span>
                      <span className="text-xs text-muted-foreground">Badge</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{challenge.participants.length} participants</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Level Up Notification */}
      {currentLevelPoints > 80 && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">Almost Level Up! 🎉</h3>
                <p className="text-muted-foreground">
                  You're just {nextLevelPoints - currentEmployee.totalPoints} points away from Level {currentLevel + 1}!
                </p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                View Progress
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Performance & Achievements</h1>
          <p className="text-muted-foreground">Track your KRA and KPA progress and compete with your team</p>
        </div>
        <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sampleLeaderboard.map((employee) => (
              <SelectItem key={employee.employeeId} value={employee.employeeId}>
                {employee.avatar} {employee.employeeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewDashboard />
        </TabsContent>

        <TabsContent value="leaderboard">
          <LeaderboardView />
        </TabsContent>

        <TabsContent value="badges">
          <BadgesView />
        </TabsContent>

        <TabsContent value="challenges">
          <ChallengesView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KRAGamification;