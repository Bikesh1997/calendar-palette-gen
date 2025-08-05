
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingPage } from '@/components/ui/loading';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Index: Auth state changed - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);
    
    if (!isLoading) {
      if (isAuthenticated) {
        console.log('Index: User authenticated, navigating to dashboard');
        navigate('/dashboard', { replace: true });
      } else {
        console.log('Index: User not authenticated, navigating to login');
        navigate('/login', { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    console.log('Index: Still loading, showing loading page');
    return <LoadingPage text="Loading..." />;
  }

  // Fallback navigation
  console.log('Index: Fallback navigation');
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

export default Index;
