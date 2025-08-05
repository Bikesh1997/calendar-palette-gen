import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Search,
  Play,
  ArrowRight,
  User,
  Star,
  Filter
} from 'lucide-react';
import { howToGuides, contentCategories, HowToGuide, GuideStep } from '@/data/FinancialEducationData';

const HowToGuides: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedGuide, setSelectedGuide] = useState<HowToGuide | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const filteredGuides = howToGuides.filter(guide => {
    const matchesSearch = searchQuery === '' || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || guide.difficulty === selectedDifficulty;
    
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
      digital: 'bg-orange-100 text-orange-700',
      savings: 'bg-green-100 text-green-700',
      credit: 'bg-indigo-100 text-indigo-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const toggleStepCompletion = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const getProgressPercentage = () => {
    if (!selectedGuide) return 0;
    return (completedSteps.size / selectedGuide.steps.length) * 100;
  };

  if (selectedGuide) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => {
              setSelectedGuide(null);
              setCurrentStep(0);
              setCompletedSteps(new Set());
            }}
            className="flex items-center gap-2"
          >
            ← Back to Guides
          </Button>
          <div className="flex items-center gap-2">
            <Badge className={getCategoryColor(selectedGuide.category)}>
              {selectedGuide.category}
            </Badge>
            <Badge className={getDifficultyColor(selectedGuide.difficulty)}>
              {selectedGuide.difficulty}
            </Badge>
          </div>
        </div>

        {/* Guide Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">{selectedGuide.title}</h1>
                <p className="text-gray-600 font-normal">{selectedGuide.description}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{selectedGuide.readTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <User size={16} />
                <span>{selectedGuide.difficulty} level</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen size={16} />
                <span>{selectedGuide.steps.length} steps</span>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-gray-600">
                  {completedSteps.size} of {selectedGuide.steps.length} completed
                </span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Step Navigation */}
          <div className="space-y-2">
            <h3 className="font-medium mb-3">Steps</h3>
            {selectedGuide.steps.map((step, index) => (
              <Button
                key={step.id}
                variant={currentStep === index ? 'default' : 'ghost'}
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => setCurrentStep(index)}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    completedSteps.has(step.id) 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {completedSteps.has(step.id) ? <CheckCircle size={12} /> : index + 1}
                  </div>
                  <span className="text-sm">{step.title}</span>
                </div>
              </Button>
            ))}
          </div>

          {/* Step Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Step {currentStep + 1}</span>
                    <h2 className="text-xl">{selectedGuide.steps[currentStep].title}</h2>
                  </div>
                  <Button
                    size="sm"
                    variant={completedSteps.has(selectedGuide.steps[currentStep].id) ? 'default' : 'outline'}
                    onClick={() => toggleStepCompletion(selectedGuide.steps[currentStep].id)}
                  >
                    {completedSteps.has(selectedGuide.steps[currentStep].id) ? (
                      <>
                        <CheckCircle size={16} className="mr-1" />
                        Completed
                      </>
                    ) : (
                      'Mark Complete'
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {selectedGuide.steps[currentStep].description}
                </p>

                {selectedGuide.steps[currentStep].tips && selectedGuide.steps[currentStep].tips!.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-1">
                      <Star size={16} />
                      Pro Tips
                    </h4>
                    <ul className="space-y-1">
                      {selectedGuide.steps[currentStep].tips!.map((tip, index) => (
                        <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                          <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedGuide.steps[currentStep].warnings && selectedGuide.steps[currentStep].warnings!.length > 0 && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">⚠️ Important Warnings</h4>
                    <ul className="space-y-1">
                      {selectedGuide.steps[currentStep].warnings!.map((warning, index) => (
                        <li key={index} className="text-sm text-red-700 flex items-start gap-2">
                          <span className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous Step
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(Math.min(selectedGuide.steps.length - 1, currentStep + 1))}
                    disabled={currentStep === selectedGuide.steps.length - 1}
                  >
                    Next Step
                    <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search how-to guides..."
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

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No guides found matching your criteria.</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredGuides.map(guide => (
            <Card 
              key={guide.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedGuide(guide)}
            >
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg mb-2">{guide.title}</h3>
                    <p className="text-sm text-gray-600 font-normal line-clamp-2">
                      {guide.description}
                    </p>
                  </div>
                  <Play size={20} className="text-gray-400 flex-shrink-0" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Badge className={getCategoryColor(guide.category)}>
                      {guide.category}
                    </Badge>
                    <Badge className={getDifficultyColor(guide.difficulty)}>
                      {guide.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{guide.readTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      <span>{guide.steps.length} steps</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {guide.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {guide.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{guide.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default HowToGuides;