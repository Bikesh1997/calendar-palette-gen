import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Clock, ExternalLink, Newspaper } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: string;
  impact: 'high' | 'medium' | 'low';
  url: string;
}

interface MarketIndicator {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
}

const MarketSentiments = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [marketData, setMarketData] = useState<MarketIndicator[]>([
    {
      name: 'NIFTY 50',
      value: 21850.50,
      change: 156.30,
      changePercent: 0.72,
      trend: 'up'
    },
    {
      name: 'Banking Index',
      value: 47325.85,
      change: -234.15,
      changePercent: -0.49,
      trend: 'down'
    },
    {
      name: 'INR/USD',
      value: 83.42,
      change: 0.15,
      changePercent: 0.18,
      trend: 'up'
    },
    {
      name: 'Gold (₹/10g)',
      value: 62850,
      change: 420,
      changePercent: 0.67,
      trend: 'up'
    }
  ]);

  const [newsData, setNewsData] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'RBI Maintains Repo Rate at 6.5% for Eighth Consecutive Meeting',
      summary: 'The Reserve Bank of India keeps the repo rate unchanged, focusing on inflation control while supporting economic growth.',
      source: 'Economic Times',
      timestamp: '2 hours ago',
      sentiment: 'neutral',
      category: 'monetary-policy',
      impact: 'high',
      url: '#'
    },
    {
      id: '2',
      title: 'Small Finance Banks Report 18% Growth in Credit Portfolio',
      summary: 'Sector shows robust growth driven by rural and semi-urban lending, with improved asset quality metrics.',
      source: 'Business Standard',
      timestamp: '4 hours ago',
      sentiment: 'positive',
      category: 'banking',
      impact: 'medium',
      url: '#'
    },
    {
      id: '3',
      title: 'Digital Payment Transactions Cross 12 Billion Mark in December',
      summary: 'UPI transactions show 44% year-on-year growth, indicating strong digital adoption in financial services.',
      source: 'Mint',
      timestamp: '6 hours ago',
      sentiment: 'positive',
      category: 'fintech',
      impact: 'medium',
      url: '#'
    },
    {
      id: '4',
      title: 'Microfinance Sector Faces Stress in Key States',
      summary: 'Rising defaults in certain geographies raise concerns about over-leveraging in rural markets.',
      source: 'Financial Express',
      timestamp: '8 hours ago',
      sentiment: 'negative',
      category: 'microfinance',
      impact: 'high',
      url: '#'
    }
  ]);

  const categories = [
    { id: 'all', name: 'All News', count: newsData.length },
    { id: 'banking', name: 'Banking', count: newsData.filter(n => n.category === 'banking').length },
    { id: 'microfinance', name: 'Microfinance', count: newsData.filter(n => n.category === 'microfinance').length },
    { id: 'monetary-policy', name: 'Monetary Policy', count: newsData.filter(n => n.category === 'monetary-policy').length },
    { id: 'fintech', name: 'FinTech', count: newsData.filter(n => n.category === 'fintech').length }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'negative': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketData.map((indicator, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">{indicator.name}</span>
                  {indicator.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : indicator.trend === 'down' ? (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  ) : (
                    <div className="h-4 w-4" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-semibold">{indicator.value.toLocaleString()}</div>
                  <div className={`text-sm flex items-center gap-1 ${
                    indicator.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{indicator.change >= 0 ? '+' : ''}{indicator.change}</span>
                    <span>({indicator.change >= 0 ? '+' : ''}{indicator.changePercent}%)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* News Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="text-xs"
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      {/* News Feed */}
      <div className="grid gap-4">
        {filteredNews.map((news) => (
          <Card key={news.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{news.title}</h3>
                  <div className="flex gap-2 flex-shrink-0">
                    <Badge variant="outline" className={`text-xs ${getSentimentColor(news.sentiment)}`}>
                      {news.sentiment}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getImpactColor(news.impact)}`}>
                      {news.impact}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">{news.summary}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Newspaper className="h-3 w-3" />
                      {news.source}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {news.timestamp}
                    </span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Read More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sentiment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Market Sentiment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {newsData.filter(n => n.sentiment === 'positive').length}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">Positive News</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {newsData.filter(n => n.sentiment === 'neutral').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Neutral News</div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {newsData.filter(n => n.sentiment === 'negative').length}
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">Negative News</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketSentiments;