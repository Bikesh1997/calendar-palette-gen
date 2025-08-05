import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Calculator, 
  Video, 
  Award, 
  TrendingUp, 
  Users,
  Search,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  modules: number;
  completed: number;
  category: string;
  progress: number;
}

interface CustomerSegment {
  id: string;
  name: string;
  count: number;
  engagementScore: number;
  preferredContent: string[];
  recentActivity: string;
}

const CustomerEngagementHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'Banking Basics for First-Time Users',
      description: 'Learn the fundamentals of banking, from opening accounts to understanding interest rates.',
      difficulty: 'beginner',
      duration: '2 weeks',
      modules: 8,
      completed: 5,
      category: 'banking',
      progress: 62
    },
    {
      id: '2',
      title: 'Smart Savings Strategies',
      description: 'Discover effective ways to save money and make your money work for you.',
      difficulty: 'intermediate',
      duration: '3 weeks',
      modules: 12,
      completed: 8,
      category: 'savings',
      progress: 67
    },
    {
      id: '3',
      title: 'Understanding Loans & Credit',
      description: 'Everything you need to know about loans, EMIs, and building a good credit score.',
      difficulty: 'intermediate',
      duration: '4 weeks',
      modules: 15,
      completed: 3,
      category: 'loans',
      progress: 20
    },
    {
      id: '4',
      title: 'Digital Banking & Security',
      description: 'Master online banking, mobile apps, and stay safe from financial fraud.',
      difficulty: 'beginner',
      duration: '1 week',
      modules: 6,
      completed: 6,
      category: 'digital',
      progress: 100
    }
  ];

  const customerSegments: CustomerSegment[] = [
    {
      id: 'new-to-credit',
      name: 'New to Credit',
      count: 1250,
      engagementScore: 78,
      preferredContent: ['Basic Banking', 'Loan Education', 'Credit Score'],
      recentActivity: 'Completed "What is CIBIL Score?" guide'
    },
    {
      id: 'savers',
      name: 'Active Savers',
      count: 850,
      engagementScore: 85,
      preferredContent: ['Investment Guides', 'Savings Calculators', 'FD Information'],
      recentActivity: 'Used FD Calculator 5 times this week'
    },
    {
      id: 'loan-seekers',
      name: 'Loan Seekers',
      count: 620,
      engagementScore: 72,
      preferredContent: ['EMI Calculators', 'Loan Process', 'Interest Rates'],
      recentActivity: 'Downloaded "Loan Application Checklist"'
    },
    {
      id: 'business-owners',
      name: 'Business Owners',
      count: 340,
      engagementScore: 90,
      preferredContent: ['Business Banking', 'Cash Flow', 'Working Capital'],
      recentActivity: 'Attended "Business Banking Webinar"'
    }
  ];

  const engagementMetrics = {
    totalUsers: 3060,
    activeThisWeek: 2140,
    completedCourses: 1890,
    averageEngagement: 81
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredPaths = learningPaths.filter(path =>
    path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    path.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Engagement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Users</span>
            </div>
            <div className="text-2xl font-bold mt-2">{engagementMetrics.totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Active This Week</span>
            </div>
            <div className="text-2xl font-bold mt-2 text-green-600">{engagementMetrics.activeThisWeek.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Completed Courses</span>
            </div>
            <div className="text-2xl font-bold mt-2 text-blue-600">{engagementMetrics.completedCourses.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Avg Engagement</span>
            </div>
            <div className="text-2xl font-bold mt-2 text-yellow-600">{engagementMetrics.averageEngagement}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="learning-paths" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="segments">Customer Segments</TabsTrigger>
          <TabsTrigger value="content">Popular Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="learning-paths" className="space-y-4">
          {/* Search */}
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search learning paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Learning Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPaths.map((path) => (
              <Card key={path.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{path.title}</CardTitle>
                    <Badge className={`text-xs ${getDifficultyColor(path.difficulty)}`}>
                      {path.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{path.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {path.duration}
                    </span>
                    <span>{path.modules} modules</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{path.completed}/{path.modules} completed</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      {path.progress === 100 ? 'Review' : 'Continue'}
                    </Button>
                    <Button size="sm" variant="outline">
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid gap-4">
            {customerSegments.map((segment) => (
              <Card key={segment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{segment.name}</h3>
                      <p className="text-sm text-muted-foreground">{segment.count} customers</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{segment.engagementScore}%</div>
                      <div className="text-xs text-muted-foreground">Engagement</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1">Preferred Content</div>
                      <div className="flex flex-wrap gap-1">
                        {segment.preferredContent.map((content, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {content}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Recent Activity</div>
                      <div className="text-sm text-muted-foreground">{segment.recentActivity}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Most Read Articles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>What is CIBIL Score?</span>
                  <span className="text-muted-foreground">2.1k views</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>How to Open Savings Account</span>
                  <span className="text-muted-foreground">1.8k views</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>EMI Calculator Guide</span>
                  <span className="text-muted-foreground">1.5k views</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Popular Calculators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>EMI Calculator</span>
                  <span className="text-muted-foreground">5.2k uses</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>FD Calculator</span>
                  <span className="text-muted-foreground">3.1k uses</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>SIP Calculator</span>
                  <span className="text-muted-foreground">2.8k uses</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Trending Videos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Digital Banking Safety</span>
                  <span className="text-muted-foreground">890 views</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Loan Application Process</span>
                  <span className="text-muted-foreground">760 views</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Investment Basics</span>
                  <span className="text-muted-foreground">650 views</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Content Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completion Rate</span>
                    <span className="font-semibold">78%</span>
                  </div>
                  <Progress value={78} />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Satisfaction</span>
                    <span className="font-semibold">4.6/5</span>
                  </div>
                  <Progress value={92} />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Share Rate</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <Progress value={15} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Learning Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>85% improved financial literacy scores</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>67% increased product adoption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>42% reduction in support queries</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>91% customer satisfaction</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerEngagementHub;