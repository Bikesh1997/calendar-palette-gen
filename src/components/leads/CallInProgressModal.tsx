
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff, Mic, MicOff, Calendar } from 'lucide-react';

interface CallInProgressModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  prospectName: string;
  businessName: string;
  phoneNumber: string;
}

const CallInProgressModal = ({ isOpen, onOpenChange, prospectName, businessName, phoneNumber }: CallInProgressModalProps) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
      setIsRecording(false);
      setIsMuted(false);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    onOpenChange(false);
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    console.log(`Recording ${!isRecording ? 'started' : 'stopped'}`);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    console.log(`Microphone ${!isMuted ? 'muted' : 'unmuted'}`);
  };

  const handlePendingFollowUp = () => {
    console.log('Pending follow-up calls button clicked');
    // Add functionality for pending follow-up calls
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0 bg-white">
        {/* Pending Follow-up Calls Button */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <Button 
            onClick={handlePendingFollowUp}
            className="text-white px-4 py-2 rounded-lg font-medium shadow-lg"
            style={{ backgroundColor: '#056262' }}
          >
            <Calendar size={16} className="mr-2" />
            Pending follow-up calls
          </Button>
        </div>

        {/* Header */}
        <div className="bg-[#056262] text-white p-4 rounded-t-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-white font-medium">Connected</DialogTitle>
          </DialogHeader>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Call Status */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#056262] rounded-full flex items-center justify-center">
                <Phone size={20} className="text-white" />
              </div>
              <span className="text-sm text-gray-600 mt-2">System</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mb-2"></div>
              <span className="text-sm font-medium text-gray-900">In Call</span>
              <span className="text-xs text-gray-500">with {prospectName}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">
                  {prospectName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-600 mt-2">Customer</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="text-center space-y-1">
            <h3 className="text-lg font-semibold text-gray-900">{prospectName}</h3>
            <p className="text-gray-600 text-sm">{businessName}</p>
            <p className="text-gray-600 text-sm">{phoneNumber}</p>
          </div>

          {/* Call Controls */}
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleToggleMute}
              className={`w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-colors ${
                isMuted ? 'bg-red-100' : 'bg-gray-100'
              }`}
            >
              {isMuted ? (
                <MicOff size={20} className="text-red-600" />
              ) : (
                <Mic size={20} className="text-gray-600" />
              )}
            </button>
            
            <button 
              onClick={handleToggleRecording}
              className={`w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-colors ${
                isRecording ? 'bg-red-500' : 'bg-gray-100'
              }`}
            >
              {isRecording ? (
                <div className="w-3 h-3 bg-white rounded-sm" />
              ) : (
                <div className="w-3 h-3 bg-red-500 rounded-full" />
              )}
            </button>
            
            <button className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Status Messages */}
          <div className="text-center space-y-2">
            {isRecording && (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-500">Recording in progress</span>
              </div>
            )}
            {isMuted && (
              <div className="flex items-center justify-center space-x-2">
                <MicOff size={14} className="text-red-500" />
                <span className="text-sm text-red-500">Microphone muted</span>
              </div>
            )}
          </div>

          {/* End Call Button */}
          <Button 
            onClick={handleEndCall}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium"
          >
            End Call
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallInProgressModal;
