
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Star, GitFork, Users, Calendar, MapPin, Link as LinkIcon, ExternalLink, Loader2, Search, Code2, Terminal, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const handleSearch = async () => {
    if (!username.trim()) {
      toast({
        title: "Missing Username",
        description: "Please type in a GitHub username.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const profileResponse = await fetch(`http://localhost:5000/github/profile/${username}`);
      const profileData = await profileResponse.json();

      if (profileResponse.ok) {
        setProfile(profileData);
        toast({
          title: "User Loaded",
          description: `${profileData.name || profileData.login}'s profile loaded.`
        });

        const reposResponse = await fetch(`http://localhost:5000/github/repos/${username}`);
        const reposData = await reposResponse.json();

        if (reposResponse.ok) {
          setRepositories(reposData);
        } else {
          setRepositories([]);
        }
      } else {
        setProfile(null);
        setRepositories([]);
        toast({
          title: "User Not Found",
          description: "That GitHub user doesn't exist.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error contacting backend:', error);
      toast({
        title: "Server Error",
        description: "Couldn't fetch data. Is your backend running?",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString('en-IN');

  const openRepository = (url) => window.open(url, '_blank');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <Github className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">DevLookup</h1>
            </div>
            <div className="text-sm text-slate-600">
              Explore GitHub profiles & repositories
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 mb-3">
              Find any developer
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Search GitHub profiles, explore repositories, and discover what developers are building
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-11 h-12 text-lg border-slate-300 focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={loading}
              className="w-full mt-4 h-12 text-lg bg-slate-900 hover:bg-slate-800"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                'Search Developer'
              )}
            </Button>
          </div>
        </div>

        {/* Profile Section */}
        {profile && (
          <div className="mb-12">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={profile.avatar_url} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-xl border-2 border-slate-200" 
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <CardTitle className="text-2xl text-slate-900 mb-1">
                          {profile.name || profile.login}
                        </CardTitle>
                        <CardDescription className="text-lg">
                          @{profile.login}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                          <Users className="w-3 h-3 mr-1" />
                          {profile.followers} followers
                        </Badge>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                          <Github className="w-3 h-3 mr-1" />
                          {profile.public_repos} repos
                        </Badge>
                      </div>
                    </div>
                    
                    {profile.bio && (
                      <p className="text-slate-700 mb-4 text-lg leading-relaxed">
                        {profile.bio}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-slate-600">
                      {profile.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                      {profile.blog && (
                        <div className="flex items-center gap-2">
                          <LinkIcon className="w-4 h-4" />
                          <a 
                            href={profile.blog} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Website
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {formatDate(profile.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Repositories Section */}
        {repositories.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="w-6 h-6 text-slate-700" />
              <h3 className="text-2xl font-bold text-slate-900">
                Recent Repositories
              </h3>
              <Badge className="bg-slate-100 text-slate-700 border-slate-300">
                {repositories.length}
              </Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {repositories.map((repo) => (
                <Card 
                  key={repo.id} 
                  className="border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer group"
                  onClick={() => openRepository(repo.html_url)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        {repo.name}
                      </CardTitle>
                      <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardDescription className="text-slate-600 line-clamp-2">
                      {repo.description || 'No description available'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                      <span className="text-xs">
                        {formatDate(repo.updated_at)}
                      </span>
                    </div>
                    {repo.language && (
                      <Badge 
                        variant="outline" 
                        className="mt-3 text-xs border-slate-300 text-slate-600"
                      >
                        {repo.language}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!profile && !loading && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Terminal className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Ready to explore
              </h3>
              <p className="text-slate-600">
                Enter a GitHub username above to view their profile and repositories
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Built for developers, by developers</span>
            </div>
            <div>
              Powered by GitHub API
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
