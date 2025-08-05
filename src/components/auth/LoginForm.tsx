
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoginFormFields from './LoginFormFields';
import DemoCredentials from './DemoCredentials';
import ForgotPasswordForm from './ForgotPasswordForm';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login, resetPassword, isAuthenticated, user } = useAuth();

  // Debug logging for authentication state
  React.useEffect(() => {
    console.log('LoginForm: Auth state - isAuthenticated:', isAuthenticated, 'user:', user?.email);
  }, [isAuthenticated, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('LoginForm: Form submitted with email:', email);
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      console.log('LoginForm: Validation failed - missing fields');
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    console.log('LoginForm: Attempting login...');
    const success = await login({ email, password });
    console.log('LoginForm: Login result:', success);
    
    if (!success) {
      console.log('LoginForm: Login failed, showing error');
      setError('Invalid email or password. Please try again.');
    } else {
      console.log('LoginForm: Login successful');
    }
    
    setIsLoading(false);
  };

  const handleResetPassword = async (resetEmail: string) => {
    return await resetPassword(resetEmail);
  };

  const fillDemoCredentials = (userType: 'admin' | 'sales2' | 'supervisor' | 'inbound' | 'relationship') => {
    console.log('LoginForm: Filling demo credentials for:', userType);
    const credentials = {
      sales2: { email: 'sales2@bank.com', password: 'password123' },
      inbound: { email: 'inbound@bank.com', password: 'password123' },
      supervisor: { email: 'supervisor@bank.com', password: 'password123' },
      admin: { email: 'admin@bank.com', password: 'password123' },
      relationship: { email: 'relationship@bank.com', password: 'password123' }
    };
    
    setEmail(credentials[userType].email);
    setPassword(credentials[userType].password);
    setError('');
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    console.log('LoginForm: User already authenticated, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  if (showForgotPassword) {
    return (
      <ForgotPasswordForm 
        onBack={() => setShowForgotPassword(false)}
        onResetPassword={handleResetPassword}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-4 px-4">
      <div className="max-w-sm w-full space-y-4">
        <div>
          <div className="flex justify-center mb-4">
            <img 
            src={`${process.env.NODE_ENV === 'production' ? '/infinity-fincorp-solutions/' : ''}assets/logo.png`}
              alt="logo" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
          {/* <h2 className="mt-4 text-center text-xl md:text-2xl font-extrabold text-gray-900">
            Sign in to Banking CRM
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sales Force Automation Platform
          </p> */}
        </div>
        
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base md:text-lg">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginFormFields
              email={email}
              password={password}
              showPassword={showPassword}
              error={error}
              isLoading={isLoading}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onSubmit={handleSubmit}
              onForgotPassword={() => setShowForgotPassword(true)}
            />

            <DemoCredentials 
              onFillCredentials={fillDemoCredentials}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
