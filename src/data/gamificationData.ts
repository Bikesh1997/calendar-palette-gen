export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    criteria: string;
    points: number;
    unlockedAt?: Date;
  }
  
  export interface Achievement {
    id: string;
    kraId?: string;
    kpaId?: string;
    kraTitle?: string;
    kpaTitle?: string;
    type: 'KRA' | 'KPA';
    employeeId: string;
    employeeName: string;
    targetValue: number;
    achievedValue: number;
    percentage: number;
    points: number;
    date: Date;
    streak?: number;
  }
  
  export interface LeaderboardEntry {
    rank: number;
    employeeId: string;
    employeeName: string;
    role: string;
    totalPoints: number;
    level: number;
    badges: Badge[];
    weeklyPoints: number;
    monthlyPoints: number;
    currentStreak: number;
    longestStreak: number;
    avatar?: string;
  }
  
  export interface Challenge {
    id: string;
    title: string;
    description: string;
    type: 'daily' | 'weekly' | 'monthly';
    category: 'KRA' | 'KPA' | 'BOTH';
    targetValue: number;
    currentValue: number;
    reward: {
      points: number;
      badge?: Badge;
    };
    deadline: Date;
    status: 'active' | 'completed' | 'failed';
    participants: string[];
  }
  
  export interface EmployeeProgress {
    employeeId: string;
    level: number;
    totalPoints: number;
    currentLevelPoints: number;
    nextLevelPoints: number;
    completedKRAs: number;
    totalKRAs: number;
    completedKPAs: number;
    totalKPAs: number;
    badges: Badge[];
    achievements: Achievement[];
    currentStreak: number;
    longestStreak: number;
    weeklyTarget: number;
    weeklyProgress: number;
  }
  
  // Sample badges data
  export const availableBadges: Badge[] = [
    {
      id: 'first_kra',
      name: 'First Steps (KRA)',
      description: 'Complete your first KRA',
      icon: '🌟',
      rarity: 'common',
      criteria: 'Complete 1 KRA',
      points: 10
    },
    {
      id: 'first_kpa',
      name: 'First Steps (KPA)',
      description: 'Complete your first KPA',
      icon: '⭐',
      rarity: 'common',
      criteria: 'Complete 1 KPA',
      points: 10
    },
    {
      id: 'perfect_week',
      name: 'Perfect Week',
      description: 'Achieve 100% on all KRAs and KPAs in a week',
      icon: '🏆',
      rarity: 'rare',
      criteria: 'Weekly completion rate of 100%',
      points: 50
    },
    {
      id: 'top_performer',
      name: 'Top Performer',
      description: 'Rank #1 in monthly leaderboard',
      icon: '👑',
      rarity: 'epic',
      criteria: 'Achieve rank 1 in monthly leaderboard',
      points: 100
    },
    {
      id: 'streak_master',
      name: 'Streak Master',
      description: 'Maintain a 30-day streak',
      icon: '🔥',
      rarity: 'legendary',
      criteria: 'Maintain 30-day achievement streak',
      points: 200
    },
    {
      id: 'team_player',
      name: 'Team Player',
      description: 'Help team achieve collective goals',
      icon: '🤝',
      rarity: 'rare',
      criteria: 'Contribute to team achievements',
      points: 75
    },
    {
      id: 'consistent_performer',
      name: 'Consistent Performer',
      description: 'Achieve 90%+ on KRAs and KPAs for 3 consecutive months',
      icon: '💎',
      rarity: 'epic',
      criteria: '90%+ achievement rate for 3 months',
      points: 150
    },
    {
      id: 'kpa_master',
      name: 'KPA Master',
      description: 'Excel in all assigned KPAs',
      icon: '🎯',
      rarity: 'rare',
      criteria: 'Achieve 95%+ on all KPAs in a month',
      points: 75
    },
    {
      id: 'balanced_achiever',
      name: 'Balanced Achiever',
      description: 'Excel in both KRAs and KPAs equally',
      icon: '⚖️',
      rarity: 'epic',
      criteria: 'Maintain equal performance in KRAs and KPAs',
      points: 125
    }
  ];
  
  // Sample achievements data - now includes both KRA and KPA
  export const sampleAchievements: Achievement[] = [
    {
      id: '1',
      kraId: '1',
      kraTitle: 'SHG Creation & Management',
      type: 'KRA',
      employeeId: 'emp_001',
      employeeName: 'Rajesh Kumar',
      targetValue: 25,
      achievedValue: 28,
      percentage: 112,
      points: 25,
      date: new Date('2024-01-15'),
      streak: 5
    },
    {
      id: '2',
      kpaId: '1',
      kpaTitle: 'Sales Performance Excellence',
      type: 'KPA',
      employeeId: 'emp_001',
      employeeName: 'Rajesh Kumar',
      targetValue: 90,
      achievedValue: 94,
      percentage: 104,
      points: 20,
      date: new Date('2024-01-15'),
      streak: 5
    },
    {
      id: '3',
      kraId: '2',
      kraTitle: 'Fixed Deposit Acquisition',
      type: 'KRA',
      employeeId: 'emp_001',
      employeeName: 'Rajesh Kumar',
      targetValue: 15,
      achievedValue: 18,
      percentage: 120,
      points: 30,
      date: new Date('2024-01-15'),
      streak: 5
    },
    {
      id: '4',
      kpaId: '2',
      kpaTitle: 'Customer Relationship Management',
      type: 'KPA',
      employeeId: 'emp_002',
      employeeName: 'Heena Thakkar',
      targetValue: 85,
      achievedValue: 89,
      percentage: 105,
      points: 20,
      date: new Date('2024-01-14'),
      streak: 3
    },
    {
      id: '5',
      kraId: '3',
      kraTitle: 'Customer Visit Compliance',
      type: 'KRA',
      employeeId: 'emp_002',
      employeeName: 'Heena Thakkar',
      targetValue: 95,
      achievedValue: 98,
      percentage: 103,
      points: 15,
      date: new Date('2024-01-14'),
      streak: 3
    }
  ];
  
  // Sample leaderboard data
  export const sampleLeaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      employeeId: 'emp_001',
      employeeName: 'Rajesh Kumar',
      role: 'Field Sales Officer',
      totalPoints: 1250,
      level: 12,
      badges: [availableBadges[0], availableBadges[2], availableBadges[5], availableBadges[7]],
      weeklyPoints: 85,
      monthlyPoints: 320,
      currentStreak: 15,
      longestStreak: 28,
      avatar: '👨‍💼'
    },
    {
      rank: 2,
      employeeId: 'emp_002',
      employeeName: 'Heena Thakkar',
      role: 'Relationship Officer',
      totalPoints: 1180,
      level: 11,
      badges: [availableBadges[0], availableBadges[1], availableBadges[4], availableBadges[6]],
      weeklyPoints: 92,
      monthlyPoints: 298,
      currentStreak: 12,
      longestStreak: 22,
      avatar: '👩‍💼'
    },
    {
      rank: 3,
      employeeId: 'emp_003',
      employeeName: 'Arun Patel',
      role: 'Supervisor',
      totalPoints: 1095,
      level: 10,
      badges: [availableBadges[0], availableBadges[3]],
      weeklyPoints: 78,
      monthlyPoints: 275,
      currentStreak: 8,
      longestStreak: 18,
      avatar: '👨‍🚀'
    },
    {
      rank: 4,
      employeeId: 'emp_004',
      employeeName: 'Sneha Reddy',
      role: 'Field Sales Officer',
      totalPoints: 985,
      level: 9,
      badges: [availableBadges[0], availableBadges[1]],
      weeklyPoints: 65,
      monthlyPoints: 245,
      currentStreak: 5,
      longestStreak: 15,
      avatar: '👩‍💻'
    },
    {
      rank: 5,
      employeeId: 'emp_005',
      employeeName: 'Vikram Singh',
      role: 'Relationship Officer',
      totalPoints: 920,
      level: 8,
      badges: [availableBadges[0]],
      weeklyPoints: 58,
      monthlyPoints: 210,
      currentStreak: 3,
      longestStreak: 12,
      avatar: '👨‍🔬'
    }
  ];
  
  // Sample challenges data - now includes KPA challenges
  export const sampleChallenges: Challenge[] = [
    {
      id: 'daily_1',
      title: 'Daily Hustle',
      description: 'Complete 3 customer visits today',
      type: 'daily',
      category: 'KRA',
      targetValue: 3,
      currentValue: 1,
      reward: {
        points: 20,
        badge: availableBadges[0]
      },
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: 'active',
      participants: ['emp_001', 'emp_002', 'emp_003']
    },
    {
      id: 'daily_2',
      title: 'KPA Progress Boost',
      description: 'Make progress on all assigned KPAs today',
      type: 'daily',
      category: 'KPA',
      targetValue: 100,
      currentValue: 65,
      reward: {
        points: 25
      },
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: 'active',
      participants: ['emp_001', 'emp_002', 'emp_003', 'emp_004']
    },
    {
      id: 'weekly_1',
      title: 'SHG Champion',
      description: 'Form 5 new SHGs this week (KRA)',
      type: 'weekly',
      category: 'KRA',
      targetValue: 5,
      currentValue: 2,
      reward: {
        points: 100,
        badge: availableBadges[1]
      },
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'active',
      participants: ['emp_001', 'emp_004']
    },
    {
      id: 'weekly_2',
      title: 'KPA Excellence Week',
      description: 'Achieve 95%+ on all KPAs this week',
      type: 'weekly',
      category: 'KPA',
      targetValue: 95,
      currentValue: 87,
      reward: {
        points: 150,
        badge: availableBadges[6]
      },
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'active',
      participants: ['emp_001', 'emp_002', 'emp_003']
    },
    {
      id: 'monthly_1',
      title: 'Portfolio Master',
      description: 'Achieve 110% of monthly KRA targets',
      type: 'monthly',
      category: 'KRA',
      targetValue: 110,
      currentValue: 78,
      reward: {
        points: 300,
        badge: availableBadges[2]
      },
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'active',
      participants: ['emp_001', 'emp_002', 'emp_003', 'emp_004', 'emp_005']
    },
    {
      id: 'monthly_2',
      title: 'Balanced Excellence',
      description: 'Achieve 90%+ on both KRAs and KPAs this month',
      type: 'monthly',
      category: 'BOTH',
      targetValue: 90,
      currentValue: 82,
      reward: {
        points: 400,
        badge: availableBadges[7]
      },
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'active',
      participants: ['emp_001', 'emp_002', 'emp_003', 'emp_004', 'emp_005']
    }
  ];
  
  // Level calculation utilities
  export const getLevel = (totalPoints: number): number => {
    return Math.floor(totalPoints / 100) + 1;
  };
  
  export const getPointsForNextLevel = (totalPoints: number): number => {
    const currentLevel = getLevel(totalPoints);
    return currentLevel * 100;
  };
  
  export const getCurrentLevelPoints = (totalPoints: number): number => {
    const currentLevel = getLevel(totalPoints);
    return totalPoints - (currentLevel - 1) * 100;
  };
  
  export const getPointsForKRACompletion = (percentage: number): number => {
    if (percentage >= 120) return 30;
    if (percentage >= 110) return 25;
    if (percentage >= 100) return 20;
    if (percentage >= 90) return 15;
    if (percentage >= 80) return 10;
    if (percentage >= 70) return 5;
    return 0;
  };
  
  export const getBadgeRarityColor = (rarity: Badge['rarity']): string => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };