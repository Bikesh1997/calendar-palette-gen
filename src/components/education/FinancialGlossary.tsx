import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Filter, Clock, TrendingUp } from 'lucide-react';
import { financialTerms, contentCategories, searchContent, FinancialTerm } from '@/data/FinancialEducationData';

const FinancialGlossary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<FinancialTerm | null>(null);

  const filteredTerms = financialTerms.filter(term => {
    const matchesSearch = searchQuery === '' || 
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || term.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      banking: 'bg-blue-100 text-blue-700',
      loans: 'bg-purple-100 text-purple-700',
      investments: 'bg-green-100 text-green-700',
      payments: 'bg-orange-100 text-orange-700',
      insurance: 'bg-red-100 text-red-700',
      credit: 'bg-indigo-100 text-indigo-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel - Filters and Terms List */}
      <div className="lg:col-span-2 space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search financial terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
              >
                All Categories
              </Button>
              {contentCategories.map(category => (
                <Button
                  key={category.id}
                  size="sm"
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex gap-2">
              <span className="text-sm font-medium flex items-center gap-1">
                <Filter size={14} />
                Difficulty:
              </span>
              {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
                <Button
                  key={level}
                  size="sm"
                  variant={selectedDifficulty === level ? 'default' : 'outline'}
                  onClick={() => setSelectedDifficulty(level)}
                >
                  {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terms List */}
        <div className="space-y-3">
          {filteredTerms.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No terms found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredTerms.map(term => (
              <Card 
                key={term.id} 
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  selectedTerm?.id === term.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedTerm(term)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-lg">{term.term}</h3>
                        <Badge className={getCategoryColor(term.category)}>
                          {term.category}
                        </Badge>
                        <Badge className={getDifficultyColor(term.difficulty)}>
                          {term.difficulty}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {term.definition}
                      </p>
                    </div>
                    <BookOpen size={20} className="text-gray-400 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Right Panel - Term Details */}
      <div className="space-y-6">
        {selectedTerm ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={20} />
                {selectedTerm.term}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Badge className={getCategoryColor(selectedTerm.category)}>
                  {selectedTerm.category.replace('_', ' ')}
                </Badge>
                <Badge className={getDifficultyColor(selectedTerm.difficulty)}>
                  {selectedTerm.difficulty}
                </Badge>
              </div>

              <div>
                <h4 className="font-medium mb-2">Definition</h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedTerm.definition}
                </p>
              </div>

              {selectedTerm.examples && selectedTerm.examples.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Examples</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedTerm.examples.map((example, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTerm.relatedTerms.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Related Terms</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedTerm.relatedTerms.map(relatedTerm => {
                      const related = financialTerms.find(t => t.term === relatedTerm);
                      return (
                        <Button
                          key={relatedTerm}
                          size="sm"
                          variant="ghost"
                          className="text-xs p-1 h-auto"
                          onClick={() => related && setSelectedTerm(related)}
                        >
                          {relatedTerm}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <Button size="sm" variant="outline" className="w-full">
                  Share this term
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="font-medium mb-2">Select a term to learn more</h3>
              <p className="text-gray-500 text-sm">
                Click on any financial term to see detailed explanation, examples, and related concepts.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp size={16} />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Terms Explored</span>
                <span className="font-medium">12/{financialTerms.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(12 / financialTerms.length) * 100}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="font-medium text-green-600">8</div>
                  <div className="text-gray-500">Beginner</div>
                </div>
                <div>
                  <div className="font-medium text-yellow-600">3</div>
                  <div className="text-gray-500">Intermediate</div>
                </div>
                <div>
                  <div className="font-medium text-red-600">1</div>
                  <div className="text-gray-500">Advanced</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialGlossary;