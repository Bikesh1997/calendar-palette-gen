import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  CheckCircle, 
  Star, 
  Trophy, 
  Gift,
  Target,
  ThumbsUp,
  Volume2,
  VolumeX
} from 'lucide-react';

// Visual KRA Item Interface for simplified design
interface VisualKRAItem {
  id: string;
  title: string;
  icon: string;
  progress: number;
  total: number;
  status: 'not_started' | 'in_progress' | 'completed';
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  visualTutorial?: string;
}

// Sample KRA data designed for visual-first approach
const sampleKRAs: VisualKRAItem[] = [
  {
    id: 'kra_1',
    title: 'घर जा कर मिलना',
    icon: '🏠',
    progress: 8,
    total: 10,
    status: 'in_progress',
    points: 50,
    difficulty: 'easy',
    visualTutorial: 'Visit customers at their homes'
  },
  {
    id: 'kra_2',
    title: 'नई बचत खाता',
    icon: '💰',
    progress: 3,
    total: 5,
    status: 'in_progress',
    points: 75,
    difficulty: 'medium',
    visualTutorial: 'Open new savings accounts'
  },
  {
    id: 'kra_3',
    title: 'समूह बनाना',
    icon: '👥',
    progress: 2,
    total: 3,
    status: 'in_progress',
    points: 100,
    difficulty: 'hard',
    visualTutorial: 'Form new customer groups'
  },
  {
    id: 'kra_4',
    title: 'फोन पर बात',
    icon: '📞',
    progress: 15,
    total: 15,
    status: 'completed',
    points: 25,
    difficulty: 'easy',
    visualTutorial: 'Make customer follow-up calls'
  }
];

const GamifiedKRADashboard = () => {
  const [currentPoints, setCurrentPoints] = useState(1250);
  const [currentLevel, setCurrentLevel] = useState(12);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [selectedKRA, setSelectedKRA] = useState<VisualKRAItem | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Calculate overall progress
  const totalKRAs = sampleKRAs.length;
  const completedKRAs = sampleKRAs.filter(kra => kra.status === 'completed').length;
  const overallProgress = (completedKRAs / totalKRAs) * 100;

  // Level progress calculation
  const levelProgress = (currentPoints % 100);

  // Play audio instruction (mock function)
  const playAudioInstruction = (text: string) => {
    if (audioEnabled) {
      // Mock audio play - in real implementation, use Text-to-Speech API
      console.log(`Playing audio: ${text}`);
    }
  };

  // Handle KRA action
  const handleKRAAction = (kra: VisualKRAItem, action: 'start' | 'continue' | 'complete') => {
    playAudioInstruction(`${action === 'start' ? 'शुरू करें' : action === 'continue' ? 'जारी रखें' : 'पूरा करें'} ${kra.title}`);
    setSelectedKRA(kra);
    
    if (action === 'complete' && kra.status !== 'completed') {
      setShowCelebration(true);
      setCurrentPoints(prev => prev + kra.points);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // Get status color and icon
  const getStatusDisplay = (status: VisualKRAItem['status']) => {
    switch (status) {
      case 'not_started':
        return { color: 'bg-gray-100 hover:bg-gray-200', icon: Play, text: 'शुरू करें' };
      case 'in_progress':
        return { color: 'bg-blue-100 hover:bg-blue-200', icon: Target, text: 'जारी रखें' };
      case 'completed':
        return { color: 'bg-green-100', icon: CheckCircle, text: 'पूरा हुआ' };
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: VisualKRAItem['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-50 text-green-600';
      case 'medium': return 'bg-yellow-50 text-yellow-600';
      case 'hard': return 'bg-red-50 text-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 p-4">
      {/* Audio Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="rounded-full w-16 h-16 shadow-lg"
        >
          {audioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </Button>
      </div>

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20">
          <div className="text-center animate-scale-in">
            <div className="text-8xl mb-4">🎉</div>
            <div className="text-4xl font-bold text-yellow-600 mb-2">बधाई हो!</div>
            <div className="text-xl text-gray-600">आपने पॉइंट्स जीते!</div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* User Progress Header */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl text-white">
                  👨‍💼
                </div>
                <div>
                  <h1 className="text-2xl font-bold">राजेश कुमार</h1>
                  <p className="text-gray-600">स्तर {currentLevel} • {currentPoints} पॉइंट्स</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-sm text-gray-600">टीम में #1</div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>अगले स्तर तक</span>
                <span>{levelProgress}/100</span>
              </div>
              <Progress value={levelProgress} className="h-4" />
            </div>

            {/* Overall KRA Progress */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold">आज की प्रगति</span>
                <span className="text-2xl">{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-6" />
              <div className="mt-2 text-sm text-gray-600 text-center">
                {completedKRAs} में से {totalKRAs} काम पूरे हुए
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KRA Grid - Large Touch Targets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleKRAs.map((kra) => {
            const statusDisplay = getStatusDisplay(kra.status);
            const StatusIcon = statusDisplay.icon;
            
            return (
              <Card 
                key={kra.id} 
                className={`transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
                  kra.status === 'completed' ? 'ring-2 ring-green-400' : ''
                }`}
                onClick={() => handleKRAAction(kra, kra.status === 'not_started' ? 'start' : kra.status === 'completed' ? 'complete' : 'continue')}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* KRA Icon and Title */}
                    <div className="flex items-center space-x-4">
                      <div className="text-6xl">{kra.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{kra.title}</h3>
                        <Badge className={getDifficultyColor(kra.difficulty)}>
                          {kra.difficulty === 'easy' ? 'आसान' : kra.difficulty === 'medium' ? 'मध्यम' : 'कठिन'}
                        </Badge>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>प्रगति</span>
                        <span>{kra.progress}/{kra.total}</span>
                      </div>
                      <Progress value={(kra.progress / kra.total) * 100} className="h-4" />
                    </div>

                    {/* Points Display */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="font-bold text-yellow-600">+{kra.points} पॉइंट्स</span>
                      </div>
                      {kra.status === 'completed' && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">पूरा हुआ</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <Button
                      className={`w-full h-14 text-lg font-bold ${statusDisplay.color} text-gray-800 border-2 transition-all`}
                      variant="outline"
                      disabled={kra.status === 'completed'}
                    >
                      <StatusIcon className="mr-2 h-6 w-6" />
                      {statusDisplay.text}
                    </Button>

                    {/* Quick Help Icon */}
                    <div className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          playAudioInstruction(kra.visualTutorial || kra.title);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Volume2 className="h-4 w-4 mr-1" />
                        सुनें
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Rewards Display */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Gift className="mr-2 h-6 w-6 text-orange-600" />
              आज के पुरस्कार
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-bold">5 और काम</div>
                <div className="text-sm text-gray-600">बोनस के लिए</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl mb-2">🎁</div>
                <div className="font-bold">₹500</div>
                <div className="text-sm text-gray-600">इनाम</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl mb-2">⭐</div>
                <div className="font-bold">नया बैज</div>
                <div className="text-sm text-gray-600">अनलॉक करें</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simple Navigation */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-4 bg-white rounded-full p-2 shadow-lg">
            <Button size="lg" className="rounded-full w-14 h-14">
              <Trophy className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full w-14 h-14">
              <Star className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full w-14 h-14">
              <ThumbsUp className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamifiedKRADashboard;