import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  CheckCircle, 
  Star, 
  Camera,
  MapPin,
  Clock,
  Award,
  Volume2
} from 'lucide-react';

interface KRAStep {
  id: string;
  title: string;
  icon: string;
  completed: boolean;
  instruction: string;
  audioInstruction: string;
  visualCue?: string;
}

interface VisualKRATrackerProps {
  kraId: string;
  kraTitle: string;
  kraIcon: string;
  steps: KRAStep[];
  onStepComplete: (stepId: string) => void;
  onKRAComplete: () => void;
}

const VisualKRATracker: React.FC<VisualKRATrackerProps> = ({
  kraId,
  kraTitle,
  kraIcon,
  steps,
  onStepComplete,
  onKRAComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;
  const currentStep = steps[currentStepIndex];

  const playAudioInstruction = (text: string) => {
    // Mock audio play - in real implementation, use Text-to-Speech API
    console.log(`Playing audio: ${text}`);
  };

  const handleStepComplete = () => {
    if (currentStep && !currentStep.completed) {
      onStepComplete(currentStep.id);
      
      // Show success animation
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);

      // Move to next step or complete KRA
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      } else {
        onKRAComplete();
      }
    }
  };

  const handleStepNavigation = (index: number) => {
    setCurrentStepIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="text-center animate-scale-in">
            <div className="text-8xl mb-4">✅</div>
            <div className="text-3xl font-bold text-green-600">बहुत बढ़िया!</div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-6xl">{kraIcon}</div>
              <div>
                <h1 className="text-2xl font-bold">{kraTitle}</h1>
                <p className="text-gray-600">स्टेप बाई स्टेप गाइड</p>
              </div>
            </div>
            
            {/* Overall Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>कुल प्रगति</span>
                <span>{completedSteps}/{steps.length} स्टेप</span>
              </div>
              <Progress value={progress} className="h-4" />
            </div>
          </CardContent>
        </Card>

        {/* Step Navigation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center overflow-x-auto space-x-2">
              {steps.map((step, index) => (
                <Button
                  key={step.id}
                  variant={index === currentStepIndex ? "default" : step.completed ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => handleStepNavigation(index)}
                  className={`min-w-20 h-16 flex-col space-y-1 ${
                    step.completed ? 'bg-green-100 text-green-800' : ''
                  }`}
                >
                  <div className="text-2xl">{step.icon}</div>
                  <div className="text-xs">स्टेप {index + 1}</div>
                  {step.completed && <CheckCircle className="h-4 w-4" />}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Step Detail */}
        {currentStep && (
          <Card className="border-2 border-blue-300">
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                {/* Step Icon */}
                <div className="text-8xl">{currentStep.icon}</div>
                
                {/* Step Title */}
                <h2 className="text-3xl font-bold text-blue-900">
                  {currentStep.title}
                </h2>
                
                {/* Visual Instruction */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-xl text-gray-800 leading-relaxed">
                    {currentStep.instruction}
                  </p>
                </div>

                {/* Audio Instruction Button */}
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => playAudioInstruction(currentStep.audioInstruction)}
                  className="h-16 px-8 text-lg"
                >
                  <Volume2 className="mr-3 h-6 w-6" />
                  निर्देश सुनें
                </Button>

                {/* Visual Cue */}
                {currentStep.visualCue && (
                  <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                    <div className="text-4xl mb-2">💡</div>
                    <p className="text-lg text-yellow-800">{currentStep.visualCue}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col space-y-4">
                  {!currentStep.completed && (
                    <Button
                      size="lg"
                      onClick={handleStepComplete}
                      className="h-16 text-xl font-bold bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-3 h-6 w-6" />
                      यह स्टेप पूरा करें
                    </Button>
                  )}

                  {/* Helper Action Buttons */}
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-14 flex-col space-y-1"
                    >
                      <Camera className="h-6 w-6" />
                      <span className="text-sm">फोटो लें</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-14 flex-col space-y-1"
                    >
                      <MapPin className="h-6 w-6" />
                      <span className="text-sm">लोकेशन</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-14 flex-col space-y-1"
                    >
                      <Clock className="h-6 w-6" />
                      <span className="text-sm">समय सेट</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Rewards */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-yellow-600" />
                <div>
                  <h3 className="text-lg font-bold">प्रगति पुरस्कार</h3>
                  <p className="text-sm text-gray-600">हर स्टेप के लिए पॉइंट्स पाएं</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-600">+{completedSteps * 10}</div>
                <div className="text-sm text-gray-600">पॉइंट्स अर्जित</div>
              </div>
            </div>
            
            {/* Step Rewards */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`p-3 rounded-lg text-center ${
                    step.completed 
                      ? 'bg-green-100 border border-green-300' 
                      : index === currentStepIndex
                      ? 'bg-blue-100 border border-blue-300'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{step.icon}</div>
                  <div className="text-xs font-medium">स्टेप {index + 1}</div>
                  {step.completed && (
                    <div className="text-xs text-green-600 font-bold">+10 पॉइंट्स</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Sample usage component
export const SampleKRATracker = () => {
  const [steps, setSteps] = useState<KRAStep[]>([
    {
      id: 'step_1',
      title: 'ग्राहक का घर खोजें',
      icon: '🏠',
      completed: false,
      instruction: 'ग्राहक के घर का पता लगाएं और वहाँ जाएं',
      audioInstruction: 'ग्राहक के घर का पता लगाएं और वहाँ जाएं',
      visualCue: 'मैप का उपयोग करें या किसी से पूछें'
    },
    {
      id: 'step_2',
      title: 'ग्राहक से मिलें',
      icon: '🤝',
      completed: false,
      instruction: 'ग्राहक से विनम्रता से मिलें और अपना परिचय दें',
      audioInstruction: 'ग्राहक से विनम्रता से मिलें और अपना परिचय दें',
      visualCue: 'मुस्कराएं और नमस्ते कहें'
    },
    {
      id: 'step_3',
      title: 'बचत योजना समझाएं',
      icon: '💰',
      completed: false,
      instruction: 'ग्राहक को बचत योजना के फायदे बताएं',
      audioInstruction: 'ग्राहक को बचत योजना के फायदे बताएं',
      visualCue: 'ब्रोशर दिखाएं और सरल भाषा में समझाएं'
    },
    {
      id: 'step_4',
      title: 'फॉर्म भरें',
      icon: '📝',
      completed: false,
      instruction: 'ग्राहक की जानकारी फॉर्म में भरें',
      audioInstruction: 'ग्राहक की जानकारी फॉर्म में भरें',
      visualCue: 'साफ लिखावट में फॉर्म भरें'
    }
  ]);

  const handleStepComplete = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
  };

  const handleKRAComplete = () => {
    console.log('KRA completed successfully!');
  };

  return (
    <VisualKRATracker
      kraId="kra_home_visit"
      kraTitle="घर जा कर मिलना"
      kraIcon="🏠"
      steps={steps}
      onStepComplete={handleStepComplete}
      onKRAComplete={handleKRAComplete}
    />
  );
};

export default VisualKRATracker;