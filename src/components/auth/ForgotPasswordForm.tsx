
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, KeyRound } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBack: () => void;
  onResetPassword: (email: string) => Promise<boolean>;
}

const ForgotPasswordForm = ({ onBack, onResetPassword }: ForgotPasswordFormProps) => {
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage('');
    setIsLoading(true);

    if (!resetEmail) {
      setResetMessage('Please enter your email address');
      setIsLoading(false);
      return;
    }

    const success = await onResetPassword(resetEmail);
    
    if (success) {
      setResetMessage('Password reset instructions sent to your email');
    } else {
      setResetMessage('Email not found in our records');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-4 px-4">
      <div className="max-w-sm w-full space-y-4">
        <div>
          <div className="flex justify-center mb-4">
            <img 
              src="assets/logo.png" 
              alt="logo" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
          <h2 className="mt-4 text-center text-xl md:text-2xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email to receive reset instructions
          </p>
        </div>
        
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <KeyRound size={18} />
              Password Reset
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="resetEmail" className="text-sm">Email Address</Label>
                <Input
                  id="resetEmail"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="mt-1 h-12"
                />
              </div>

              {resetMessage && (
                <Alert>
                  <AlertDescription className="text-sm">{resetMessage}</AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col gap-2">
                <Button 
                  type="submit" 
                  className="h-12 bg-teal-600 hover:bg-teal-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={onBack}
                  className="h-12"
                >
                  Back to Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
