
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Star, GitFork, Users, Calendar, MapPin, Link as LinkIcon, ExternalLink, Loader2, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const handleSearch = async () => {
    if (!username.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter a GitHub username to explore.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      // Fetch GitHub profile
      const profileResponse = await fetch(`https://api.github.com/users/${username}`);
      const profileData = await profileResponse.json();
      
      if (profileResponse.ok) {
        setProfile(profileData);
        toast({
          title: "Profile Found!",
          description: `Successfully loaded ${profileData.name || profileData.login}'s profile.`
        });
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const reposData = await reposResponse.json();
        
        if (reposResponse.ok) {
          setRepositories(reposData);
        }
      } else {
        console.error('Profile not found');
        setProfile(null);
        setRepositories([]);
        toast({
          title: "Profile Not Found",
          description: "Could not find a GitHub user with that username.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to GitHub. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const openRepository = (repoUrl) => {
    window.open(repoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Github className="h-16 w-16 text-green-400 mr-4 animate-pulse" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Open Source Odyssey
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Embark on a journey through your GitHub universe. Discover insights, showcase your contributions, 
            and celebrate your open source adventure.
          </p>
          
          {/* Enhanced Search Section */}
          <div className="flex max-w-md mx-auto gap-2 relative">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 pl-10 transition-all duration-300 focus:bg-gray-800/70 focus:border-green-500"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105 disabled:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Exploring...
                </>
              ) : (
                'Explore'
              )}
            </Button>
          </div>
        </div>

        {/* Profile Dashboard */}
        {profile && (
          <div className="space-y-8 animate-fade-in">
            {/* Enhanced Profile Header */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative group">
                    <img
                      src={profile.avatar_url}
                      alt={profile.name || profile.login}
                      className="w-32 h-32 rounded-full border-4 border-green-400/50 transition-all duration-300 group-hover:border-green-400 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-full bg-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2 hover:text-green-400 transition-colors duration-300">
                      {profile.name || profile.login}
                    </h2>
                    <p className="text-gray-300 mb-4">@{profile.login}</p>
                    {profile.bio && (
                      <p className="text-gray-300 mb-4 italic">{profile.bio}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                      {profile.location && (
                        <div className="flex items-center gap-1 hover:text-green-400 transition-colors duration-300">
                          <MapPin className="h-4 w-4" />
                          {profile.location}
                        </div>
                      )}
                      {profile.blog && (
                        <div className="flex items-center gap-1">
                          <LinkIcon className="h-4 w-4" />
                          <a href={profile.blog} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-400 hover:text-blue-300 hover:underline transition-all duration-300">
                            Website
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-1 hover:text-purple-400 transition-colors duration-300">
                        <Calendar className="h-4 w-4" />
                        Joined {formatDate(profile.created_at)}
                      </div>
                    </div>

                    {/* Enhanced Stats */}
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <Users className="h-5 w-5 text-green-400" />
                        <span className="text-white font-semibold text-lg">{profile.followers}</span>
                        <span className="text-gray-400">followers</span>
                      </div>
                      <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <Users className="h-5 w-5 text-blue-400" />
                        <span className="text-white font-semibold text-lg">{profile.following}</span>
                        <span className="text-gray-400">following</span>
                      </div>
                      <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <Github className="h-5 w-5 text-purple-400" />
                        <span className="text-white font-semibold text-lg">{profile.public_repos}</span>
                        <span className="text-gray-400">repositories</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Repositories Grid */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                Recent Repositories
                <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                  {repositories.length}
                </Badge>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repositories.map((repo, index) => (
                  <Card 
                    key={repo.id} 
                    className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 cursor-pointer group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => openRepository(repo.html_url)}
                  >
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between group-hover:text-blue-400 transition-colors duration-300">
                        <span className="truncate">{repo.name}</span>
                        <div className="flex items-center gap-2">
                          {repo.fork && <GitFork className="h-4 w-4 text-gray-400 flex-shrink-0" />}
                          <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </CardTitle>
                      <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        {repo.description || 'No description available'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          {repo.language && (
                            <Badge variant="secondary" className="bg-gray-700 text-gray-300 group-hover:bg-gray-600 transition-colors duration-300">
                              {repo.language}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1 hover:text-yellow-400 transition-colors duration-300">
                          <Star className="h-4 w-4" />
                          {repo.stargazers_count}
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-400 transition-colors duration-300">
                          <GitFork className="h-4 w-4" />
                          {repo.forks_count}
                        </div>
                        <span className="hover:text-purple-400 transition-colors duration-300">
                          Updated {formatDate(repo.updated_at)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Welcome State */}
        {!profile && !loading && (
          <div className="text-center animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-500/10 group">
                <CardHeader>
                  <Github className="h-12 w-12 text-green-400 mx-auto mb-4 group-hover:animate-pulse" />
                  <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300">Profile Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    Discover detailed insights about your GitHub profile, contributions, and activity patterns.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 group">
                <CardHeader>
                  <Star className="h-12 w-12 text-blue-400 mx-auto mb-4 group-hover:animate-pulse" />
                  <CardTitle className="text-white group-hover:text-blue-400 transition-colors duration-300">Repository Showcase</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    Explore your repositories with beautiful visualizations and detailed statistics.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 group">
                <CardHeader>
                  <Users className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:animate-pulse" />
                  <CardTitle className="text-white group-hover:text-purple-400 transition-colors duration-300">Community Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    Visualize your network, followers, and contributions to the open source community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
