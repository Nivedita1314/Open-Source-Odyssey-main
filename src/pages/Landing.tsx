
import { Button } from '@/components/ui/button';
import { Github, Code2, Users, Star, ArrowRight, Terminal, Zap, BookOpen, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Github className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">DevLookup</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/app" className="text-gray-600 hover:text-gray-900 transition-colors">
                Demo
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-8">
            <Terminal className="w-4 h-4 mr-2" />
            <span>Developer tools for the modern workflow</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Explore GitHub like
            <br />
            <span className="text-blue-600">never before</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Search developers, analyze repositories, and discover trending projects. 
            The developer community explorer you've been waiting for.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-base">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/app">
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-base">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for developers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to explore and understand the GitHub ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Github className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Profile Discovery</h3>
              <p className="text-gray-600 leading-relaxed">
                Deep insights into developer profiles, contribution patterns, and coding activity across repositories and organizations.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Repository Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive repository statistics, language breakdowns, and project health metrics to understand codebase quality.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trending Projects</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover emerging projects, track popular repositories, and stay updated with the latest development trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by developers worldwide
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50M+</div>
              <div className="text-gray-600">Developer Profiles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">100M+</div>
              <div className="text-gray-600">Repositories Indexed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">500K+</div>
              <div className="text-gray-600">Daily Searches</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to explore the developer ecosystem?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who use DevLookup to discover, analyze, and connect.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-base">
              Start Exploring
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
                <Github className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">DevLookup</span>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-600 text-sm">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Documentation</a>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4" />
                <span>Powered by GitHub API</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
