
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Github, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Please fill in all fields",
        description: "Both email and password are required to sign in.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in.",
      });
      navigate('/app');
      setLoading(false);
    }, 1200);
  };

  const handleGitHubLogin = () => {
    toast({
      title: "GitHub OAuth",
      description: "Redirecting to GitHub for authentication...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
        
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Sign in to DevLookup</CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Welcome back! Please enter your details.
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 border-gray-300 focus:border-gray-400 focus:ring-gray-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 border-gray-300 focus:border-gray-400 focus:ring-gray-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Forgot your password?
                  </a>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white h-11"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <Button
              onClick={handleGitHubLogin}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-11"
            >
              <Github className="w-4 h-4 mr-2" />
              Continue with GitHub
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-gray-900 hover:text-gray-700 font-medium">
                Sign up
              </a>
            </div>
            
            <div className="text-center">
              <Link to="/app" className="text-sm text-gray-600 hover:text-gray-900">
                Continue as guest →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
