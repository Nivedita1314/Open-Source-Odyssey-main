
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Star, GitFork, Users, Calendar, MapPin, Link as LinkIcon, ExternalLink, Loader2, Search, Code2, Building } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const handleSearch = async () => {
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a GitHub username to search.",
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
          title: "Profile loaded",
          description: `Found ${profileData.name || profileData.login}'s GitHub profile.`
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
          title: "User not found",
          description: "No GitHub user found with that username.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      toast({
        title: "Connection error",
        description: "Unable to connect to the server. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });

  const openRepository = (url) => window.open(url, '_blank');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Github className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">DevLookup</h1>
            </div>
            <div className="text-sm text-gray-500">
              Explore GitHub profiles & repositories
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Search Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover developers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Search for any GitHub user to explore their profile, repositories, and contribution history
            </p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Enter GitHub username (e.g., octocat)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-12 h-12 text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={loading}
              className="w-full h-12 text-base bg-gray-900 hover:bg-gray-800"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
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
          <div className="mb-16">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={profile.avatar_url} 
                      alt={`${profile.login}'s avatar`}
                      className="w-24 h-24 rounded-2xl border border-gray-200" 
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <CardTitle className="text-2xl text-gray-900 mb-1">
                          {profile.name || profile.login}
                        </CardTitle>
                        <CardDescription className="text-lg text-gray-600">
                          @{profile.login}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
                          <Users className="w-3 h-3 mr-1" />
                          {profile.followers.toLocaleString()} followers
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
                          <Github className="w-3 h-3 mr-1" />
                          {profile.public_repos} repos
                        </Badge>
                      </div>
                    </div>
                    
                    {profile.bio && (
                      <p className="text-gray-700 mb-6 text-base leading-relaxed">
                        {profile.bio}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-6 text-gray-600">
                      {profile.company && (
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span>{profile.company}</span>
                        </div>
                      )}
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
                            href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
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
            <div className="flex items-center gap-3 mb-8">
              <Code2 className="w-6 h-6 text-gray-700" />
              <h3 className="text-2xl font-bold text-gray-900">
                Popular Repositories
              </h3>
              <Badge className="bg-gray-100 text-gray-700 border-gray-300">
                {repositories.length}
              </Badge>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {repositories.map((repo) => (
                <Card 
                  key={repo.id} 
                  className="border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer group"
                  onClick={() => openRepository(repo.html_url)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {repo.name}
                      </CardTitle>
                      <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                    <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
                      {repo.description || 'No description available'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{repo.stargazers_count.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />
                          <span>{repo.forks_count.toLocaleString()}</span>
                        </div>
                      </div>
                      <span className="text-xs">
                        Updated {formatDate(repo.updated_at)}
                      </span>
                    </div>
                    {repo.language && (
                      <Badge 
                        variant="outline" 
                        className="text-xs border-gray-300 text-gray-600"
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
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Github className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Start exploring
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Enter a GitHub username above to discover their profile, repositories, and development activity
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <span>Built for the developer community</span>
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
