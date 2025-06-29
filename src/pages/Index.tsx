
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Star, GitFork, Users, Calendar, MapPin, Link as LinkIcon } from 'lucide-react';

const Index = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const handleSearch = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    try {
      // Fetch GitHub profile
      const profileResponse = await fetch(`https://api.github.com/users/${username}`);
      const profileData = await profileResponse.json();
      
      if (profileResponse.ok) {
        setProfile(profileData);
        
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
      }
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Github className="h-16 w-16 text-green-400 mr-4" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Open Source Odyssey
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Embark on a journey through your GitHub universe. Discover insights, showcase your contributions, 
            and celebrate your open source adventure.
          </p>
          
          {/* Search Section */}
          <div className="flex max-w-md mx-auto gap-2">
            <Input
              type="text"
              placeholder="Enter GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? 'Exploring...' : 'Explore'}
            </Button>
          </div>
        </div>

        {/* Profile Dashboard */}
        {profile && (
          <div className="space-y-8">
            {/* Profile Header */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <img
                    src={profile.avatar_url}
                    alt={profile.name || profile.login}
                    className="w-32 h-32 rounded-full border-4 border-green-400/50"
                  />
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {profile.name || profile.login}
                    </h2>
                    <p className="text-gray-300 mb-4">@{profile.login}</p>
                    {profile.bio && (
                      <p className="text-gray-300 mb-4">{profile.bio}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                      {profile.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {profile.location}
                        </div>
                      )}
                      {profile.blog && (
                        <div className="flex items-center gap-1">
                          <LinkIcon className="h-4 w-4" />
                          <a href={profile.blog} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-400 hover:underline">
                            Website
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {formatDate(profile.created_at)}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-400" />
                        <span className="text-white font-semibold">{profile.followers}</span>
                        <span className="text-gray-400">followers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-400" />
                        <span className="text-white font-semibold">{profile.following}</span>
                        <span className="text-gray-400">following</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Github className="h-5 w-5 text-purple-400" />
                        <span className="text-white font-semibold">{profile.public_repos}</span>
                        <span className="text-gray-400">repositories</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Repositories Grid */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Recent Repositories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repositories.map((repo) => (
                  <Card key={repo.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <span className="truncate">{repo.name}</span>
                        {repo.fork && <GitFork className="h-4 w-4 text-gray-400 flex-shrink-0" />}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        {repo.description || 'No description available'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          {repo.language && (
                            <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                              {repo.language}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {repo.stargazers_count}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="h-4 w-4" />
                          {repo.forks_count}
                        </div>
                        <span>Updated {formatDate(repo.updated_at)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Welcome State */}
        {!profile && !loading && (
          <div className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <Github className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <CardTitle className="text-white">Profile Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Discover detailed insights about your GitHub profile, contributions, and activity patterns.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <Star className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-white">Repository Showcase</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Explore your repositories with beautiful visualizations and detailed statistics.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <CardTitle className="text-white">Community Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
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
