import React, { useEffect } from 'react';
import { handleGoogleAuthCallback } from '@/utils/googleCalendar';

const GoogleAuthCallback: React.FC = () => {
  useEffect(() => {
    const processAuth = async () => {
      const code = await handleGoogleAuthCallback();
      if (code) {
        // Success handled by postMessage
        window.close();
      } else {
        // Handle error
        console.error('Authentication failed');
        window.close();
      }
    };

    processAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-foreground">Completing authentication...</h2>
        <p className="text-muted-foreground">This window will close automatically.</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;