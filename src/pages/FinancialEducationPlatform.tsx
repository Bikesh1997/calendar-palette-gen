import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Calculator,
  GraduationCap,
  Search,
  TrendingUp,
  Users,
  Target,
  Award,
  Clock,
  Star,
  Newspaper,
  UserCheck
} from 'lucide-react';
import FinancialGlossary from '@/components/education/FinancialGlossary';
import HowToGuides from '@/components/education/HowToGuides';
import FinancialCalculators from '@/components/education/FinancialCalculators';
import MarketSentiments from '@/components/education/MarketSentiments';
import CustomerEngagementHub from '@/components/education/CustomerEngagementHub';
import { searchContent, financialTerms, howToGuides, calculators } from '@/data/FinancialEducationData';
import { useAuth } from '@/contexts/AuthContext';

const FinancialEducationPlatform: React.FC = () => {
  const { user } = useAuth();
  const [globalSearch, setGlobalSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Reset to first tab when user changes
  useEffect(() => {
    setActiveTab('overview');
  }, [user?.id]);

  const handleGlobalSearch = (query: string) => {
    setGlobalSearch(query);
    if (query.trim()) {
      const results = searchContent(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const getOverviewStats = () => {
    return {
      totalTerms: financialTerms.length,
      totalGuides: howToGuides.length,
      totalCalculators: calculators.length,
      avgReadTime: Math.round(howToGuides.reduce((sum, guide) => sum + guide.readTime, 0) / howToGuides.length)
    };
  };

  const stats = getOverviewStats();

  const featuredContent = [
    {
      type: 'guide',
      title: 'How to Open a infinity Solutions Account',
      description: 'Complete step-by-step guide for new customers',
      category: 'banking',
      difficulty: 'beginner',
      readTime: 5
    },
    {
      type: 'term',
      title: 'EMI Calculator',
      description: 'Calculate your monthly loan payments',
      category: 'loans',
      difficulty: 'beginner'
    },
    {
      type: 'calculator',
      title: 'Fixed Deposit Calculator',
      description: 'Calculate FD maturity amount and returns',
      category: 'savings',
      difficulty: 'beginner'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <GraduationCap size={32} className="text-primary" />
          <h1 className="text-3xl font-bold">infinity Financial Education</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your trusted guide to financial literacy. Learn banking basics, understand loan terms,
          and make informed financial decisions with our comprehensive educational resources.
        </p>

        {/* Global Search */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for terms, guides, or calculators..."
              value={globalSearch}
              onChange={(e) => handleGlobalSearch(e.target.value)}
              className="pl-12 h-12"
            />
          </div>

          {searchResults.length > 0 && (
            <Card className="mt-2 max-h-60 overflow-y-auto">
              <CardContent className="p-2">
                {searchResults.slice(0, 5).map((result, index) => (
                  <div key={index} className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="flex items-center gap-2">
                      {result.type === 'term' && <BookOpen size={16} />}
                      {result.type === 'guide' && <GraduationCap size={16} />}
                      {result.type === 'calculator' && <Calculator size={16} />}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{result.title || result.term}</p>
                        <p className="text-xs text-gray-600 truncate">
                          {result.description || result.definition}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {result.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-6  gap-1 h-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 py-2">
            <TrendingUp size={16} />
            Overview
          </TabsTrigger>
          <TabsTrigger value="market" className="text-xs sm:text-sm px-2 py-2">
            <Newspaper size={16} />
            Market News
          </TabsTrigger>
          <TabsTrigger value="engagement" className="text-xs sm:text-sm px-2 py-2">
            <UserCheck size={16} />
            Engagement
          </TabsTrigger>
          <TabsTrigger value="glossary" className="text-xs sm:text-sm px-2 py-2">
            <BookOpen size={16} />
            Dictionary
          </TabsTrigger>
          <TabsTrigger value="guides" className="text-xs sm:text-sm px-2 py-2">
            <GraduationCap size={16} />
            How-To Guides
          </TabsTrigger>
          {/* <TabsTrigger value="calculators" className="text-xs sm:text-sm px-2 py-2">
            <Calculator size={16} />
            Calculators
          </TabsTrigger> */}
        </TabsList>



        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen size={32} className="mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">{stats.totalTerms}</p>
                  <p className="text-sm text-gray-600">Financial Terms</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <GraduationCap size={32} className="mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">{stats.totalGuides}</p>
                  <p className="text-sm text-gray-600">How-To Guides</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Calculator size={32} className="mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold">{stats.totalCalculators}</p>
                  <p className="text-sm text-gray-600">Calculators</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock size={32} className="mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold">{stats.avgReadTime}m</p>
                  <p className="text-sm text-gray-600">Avg Read Time</p>
                </CardContent>
              </Card>
            </div>

            {/* Featured Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star size={20} />
                  Featured Content
                </CardTitle>
              </CardHeader>
              <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {featuredContent.map((content, index) => (
    <Card key={index} className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start gap-3">
          {content.type === 'guide' && <GraduationCap size={20} className="text-green-600" />}
          {content.type === 'term' && <BookOpen size={20} className="text-blue-600" />}
          {content.type === 'calculator' && <Calculator size={20} className="text-purple-600" />}
          
          <div className="flex-1">
            <h3 className="font-medium text-base mb-1">{content.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{content.description}</p>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <Badge variant="outline">
                {content.category}
              </Badge>
              <Badge variant="outline">
                {content.difficulty}
              </Badge>
              {content.readTime && (
                <span className="text-gray-500">
                  {content.readTime}m read
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

              </CardContent>
            </Card>

            {/* Learning Paths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target size={20} />
                  Recommended Learning Paths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">New to Banking</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Perfect for first-time bank customers
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>What is a Savings Account?</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>How to Open an Account</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span>Understanding KYC</span>
                      </div>
                    </div>
                    <Button size="sm" className="mt-3" onClick={() => setActiveTab('guides')}>
                      Start Learning
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Loan Planning</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Understand loans and plan your borrowing
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>What is EMI?</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>EMI Calculator</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span>How to Calculate EMI</span>
                      </div>
                    </div>
                    <Button size="sm" className="mt-3" onClick={() => setActiveTab('calculators')}>
                      Start Planning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" onClick={() => setActiveTab('calculators')}>
                    <Calculator size={16} className="mr-2" />
                    Calculate EMI
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('glossary')}>
                    <BookOpen size={16} className="mr-2" />
                    Browse Terms
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('guides')}>
                    <GraduationCap size={16} className="mr-2" />
                    Learn Banking
                  </Button>
                  <Button variant="outline">
                    <Users size={16} className="mr-2" />
                    Contact Expert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="glossary">
          <FinancialGlossary />
        </TabsContent>

        <TabsContent value="guides">
          <HowToGuides />
        </TabsContent>

        <TabsContent value="market">
          <MarketSentiments />
        </TabsContent>

        <TabsContent value="engagement">
          <CustomerEngagementHub />
        </TabsContent>

        {/* <TabsContent value="calculators">
          <FinancialCalculators />
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default FinancialEducationPlatform;