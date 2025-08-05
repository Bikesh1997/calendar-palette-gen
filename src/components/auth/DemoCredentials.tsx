
import React from 'react';
import { Button } from '@/components/ui/button';

interface DemoCredentialsProps {
  onFillCredentials: (userType: 'admin' | 'sales2' | 'supervisor' | 'inbound' | 'relationship') => void;
  isLoading: boolean;
}

const DemoCredentials = ({ onFillCredentials, isLoading }: DemoCredentialsProps) => {
  return (
    <div className="mt-6 space-y-3">
      <div className="text-center text-sm text-gray-600 mb-3">
        Demo Accounts:
      </div>
      
      <div className="grid grid-cols-1 gap-2">
   
        <Button 
          variant="outline" 
          onClick={() => onFillCredentials('sales2')}
          className={`w-full text-xs h-10 bg-gray-100 text-gray-400`}
          disabled={isLoading}
        >
          Field Executive  (Anjali)
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onFillCredentials('inbound')}
          className={`w-full text-xs h-10 bg-gray-100 text-gray-400`}
          disabled={isLoading}
        >
          Inbound Sales   (Vikram)
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onFillCredentials('supervisor')}
          className={`w-full text-xs h-10 bg-gray-100 text-gray-400`}
          disabled={isLoading}
        >
          Supervisor 
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onFillCredentials('admin')}
          className={`w-full text-xs h-10 bg-gray-100 text-gray-400`}
          disabled={isLoading}
        >
          Admin 
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onFillCredentials('relationship')}
          className={`w-full text-xs h-10 bg-gray-100 text-gray-400`}
          disabled={isLoading}
        >
          Relationship Manager  (Neha)
        </Button>
      
      </div>
      
    
    </div>
  );
};

export default DemoCredentials;
