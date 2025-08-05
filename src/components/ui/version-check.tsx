
import { useEffect, useState } from 'react';
import { getBuildVersion } from '@/utils/cacheUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

export const VersionCheck = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);

  useEffect(() => {
    const checkVersion = () => {
      const version = getBuildVersion();
      const storedVersion = localStorage.getItem('app-version');
      
      if (storedVersion && storedVersion !== version) {
        setShowUpdatePrompt(true);
      }
      
      setCurrentVersion(version);
      if (version) {
        localStorage.setItem('app-version', version);
      }
    };

    checkVersion();
    
    // Check for updates every 30 seconds
    const interval = setInterval(checkVersion, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = () => {
    // Clear cache and reload
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    
    window.location.reload();
  };

  if (!showUpdatePrompt) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="w-80 bg-white shadow-lg border-teal-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-teal-700 flex items-center gap-2">
            <RefreshCw size={16} />
            Update Available
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 mb-4">
            A new version of the application is available. Please update to get the latest features and improvements.
          </p>
          <div className="flex gap-2">
            <Button 
              onClick={handleUpdate}
              className="bg-teal-600 hover:bg-teal-700 text-white"
              size="sm"
            >
              Update Now
            </Button>
            <Button 
              onClick={() => setShowUpdatePrompt(false)}
              variant="outline"
              size="sm"
            >
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
