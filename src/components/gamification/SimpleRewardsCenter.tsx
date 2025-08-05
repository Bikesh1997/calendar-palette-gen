import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Gift, 
  Star, 
  Trophy, 
  Crown,
  Sparkles,
  Coins,
  Heart,
  Zap
} from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  icon: string;
  description: string;
  cost: number;
  available: boolean;
  category: 'daily' | 'weekly' | 'monthly' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  earned: boolean;
  date?: Date;
  points: number;
}

const sampleRewards: Reward[] = [
  {
    id: 'reward_1',
    title: 'चाय का कूपन',
    icon: '☕',
    description: 'मुफ्त चाय पीने का कूपन',
    cost: 50,
    available: true,
    category: 'daily',
    rarity: 'common'
  },
  {
    id: 'reward_2',
    title: 'मोबाइल रिचार्ज',
    icon: '📱',
    description: '₹100 का मोबाइल रिचार्ज',
    cost: 200,
    available: true,
    category: 'weekly',
    rarity: 'rare'
  },
  {
    id: 'reward_3',
    title: 'शॉपिंग वाउचर',
    icon: '🛍️',
    description: '₹500 का शॉपिंग वाउचर',
    cost: 500,
    available: true,
    category: 'monthly',
    rarity: 'epic'
  },
  {
    id: 'reward_4',
    title: 'छुट्टी का दिन',
    icon: '🏖️',
    description: 'एक दिन की अतिरिक्त छुट्टी',
    cost: 1000,
    available: false,
    category: 'special',
    rarity: 'legendary'
  }
];

const sampleAchievements: Achievement[] = [
  {
    id: 'ach_1',
    title: 'पहला कदम',
    icon: '⭐',
    description: 'पहला KRA पूरा किया',
    earned: true,
    date: new Date('2024-01-15'),
    points: 25
  },
  {
    id: 'ach_2',
    title: 'टीम प्लेयर',
    icon: '🤝',
    description: 'सभी साथियों की मदद की',
    earned: true,
    date: new Date('2024-01-20'),
    points: 50
  },
  {
    id: 'ach_3',
    title: 'चैंपियन',
    icon: '🏆',
    description: 'महीने का सबसे अच्छा प्रदर्शन',
    earned: false,
    points: 100
  }
];

const SimpleRewardsCenter = () => {
  const [currentPoints, setCurrentPoints] = useState(1250);
  const [selectedCategory, setSelectedCategory] = useState<'rewards' | 'achievements'>('rewards');
  const [showRedemption, setShowRedemption] = useState<Reward | null>(null);

  const getRarityColor = (rarity: Reward['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-600';
      case 'rare': return 'bg-blue-100 text-blue-600';
      case 'epic': return 'bg-purple-100 text-purple-600';
      case 'legendary': return 'bg-yellow-100 text-yellow-600';
    }
  };

  const getCategoryIcon = (category: Reward['category']) => {
    switch (category) {
      case 'daily': return '📅';
      case 'weekly': return '📊';
      case 'monthly': return '🗓️';
      case 'special': return '✨';
    }
  };

  const handleRewardClaim = (reward: Reward) => {
    if (currentPoints >= reward.cost && reward.available) {
      setCurrentPoints(prev => prev - reward.cost);
      setShowRedemption(reward);
      setTimeout(() => setShowRedemption(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
      {/* Redemption Success */}
      {showRedemption && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="text-center animate-scale-in bg-white p-8 rounded-lg shadow-lg">
            <div className="text-8xl mb-4">{showRedemption.icon}</div>
            <div className="text-3xl font-bold text-green-600 mb-2">बधाई हो!</div>
            <div className="text-xl text-gray-600">{showRedemption.title} मिल गया!</div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-6xl">🎁</div>
                <div>
                  <h1 className="text-3xl font-bold">पुरस्कार केंद्र</h1>
                  <p className="text-purple-100">अपने पॉइंट्स का उपयोग करें</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-2xl font-bold">
                  <Coins className="h-8 w-8" />
                  <span>{currentPoints}</span>
                </div>
                <div className="text-purple-100">उपलब्ध पॉइंट्स</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Selector */}
        <div className="flex space-x-4 justify-center">
          <Button
            size="lg"
            variant={selectedCategory === 'rewards' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('rewards')}
            className="h-16 px-8 text-lg"
          >
            <Gift className="mr-2 h-6 w-6" />
            पुरस्कार खरीदें
          </Button>
          <Button
            size="lg"
            variant={selectedCategory === 'achievements' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('achievements')}
            className="h-16 px-8 text-lg"
          >
            <Trophy className="mr-2 h-6 w-6" />
            उपलब्धियां देखें
          </Button>
        </div>

        {/* Rewards Section */}
        {selectedCategory === 'rewards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleRewards.map((reward) => (
              <Card 
                key={reward.id}
                className={`transition-all duration-300 hover:scale-105 ${
                  !reward.available || currentPoints < reward.cost 
                    ? 'opacity-60' 
                    : 'hover:shadow-lg cursor-pointer'
                }`}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Reward Icon and Category */}
                    <div className="flex items-center justify-between">
                      <div className="text-6xl">{reward.icon}</div>
                      <div className="text-2xl">{getCategoryIcon(reward.category)}</div>
                    </div>

                    {/* Reward Title */}
                    <h3 className="text-xl font-bold text-center">{reward.title}</h3>

                    {/* Description */}
                    <p className="text-gray-600 text-center">{reward.description}</p>

                    {/* Rarity Badge */}
                    <div className="flex justify-center">
                      <Badge className={getRarityColor(reward.rarity)}>
                        {reward.rarity === 'common' ? 'सामान्य' : 
                         reward.rarity === 'rare' ? 'दुर्लभ' :
                         reward.rarity === 'epic' ? 'महाकाव्य' : 'पौराणिक'}
                      </Badge>
                    </div>

                    {/* Cost and Button */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-lg font-bold text-purple-600">
                        <Coins className="h-5 w-5" />
                        <span>{reward.cost} पॉइंट्स</span>
                      </div>

                      <Button
                        className="w-full h-12 text-lg font-bold"
                        disabled={!reward.available || currentPoints < reward.cost}
                        onClick={() => handleRewardClaim(reward)}
                        variant={currentPoints >= reward.cost && reward.available ? 'default' : 'outline'}
                      >
                        {!reward.available 
                          ? '🔒 अभी उपलब्ध नहीं' 
                          : currentPoints < reward.cost 
                          ? '💰 अधिक पॉइंट्स चाहिए'
                          : '🎁 अभी लें'
                        }
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Achievements Section */}
        {selectedCategory === 'achievements' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleAchievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className={`transition-all duration-300 ${
                    achievement.earned 
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300' 
                      : 'opacity-60'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4 text-center">
                      {/* Achievement Icon */}
                      <div className="text-6xl">{achievement.icon}</div>

                      {/* Achievement Title */}
                      <h3 className="text-xl font-bold">{achievement.title}</h3>

                      {/* Description */}
                      <p className="text-gray-600">{achievement.description}</p>

                      {/* Points and Status */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2 text-lg font-bold text-blue-600">
                          <Star className="h-5 w-5" />
                          <span>+{achievement.points} पॉइंट्स</span>
                        </div>

                        {achievement.earned ? (
                          <div className="space-y-1">
                            <Badge className="bg-green-100 text-green-600">
                              ✅ प्राप्त
                            </Badge>
                            {achievement.date && (
                              <div className="text-sm text-gray-500">
                                {achievement.date.toLocaleDateString('hi-IN')}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100">
                            🔒 अभी तक नहीं मिला
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Achievement Stats */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Sparkles className="mr-2 h-6 w-6 text-purple-600" />
                  उपलब्धि सांख्यिकी
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-2xl font-bold text-green-600">
                      {sampleAchievements.filter(a => a.earned).length}
                    </div>
                    <div className="text-sm text-gray-600">प्राप्त उपलब्धियां</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {sampleAchievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0)}
                    </div>
                    <div className="text-sm text-gray-600">उपलब्धि पॉइंट्स</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round((sampleAchievements.filter(a => a.earned).length / sampleAchievements.length) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">पूर्णता दर</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-3xl mb-2">🔥</div>
                    <div className="text-2xl font-bold text-orange-600">7</div>
                    <div className="text-sm text-gray-600">लगातार दिन</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleRewardsCenter;