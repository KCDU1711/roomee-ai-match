import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Heart, 
  Home, 
  Search, 
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare
} from "lucide-react";
import { AnimatedCounter } from "./animated-counter";

// Mock data
const mockStats = {
  totalUsers: 1247,
  activeMatches: 89,
  roomsAssigned: 156,
  pendingVerifications: 23
};

const mockUsers = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya@gmail.com",
    age: 24,
    location: "Mumbai",
    verified: true,
    joinDate: "2024-01-15",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "2",
    name: "Ananya Gupta",
    email: "ananya@gmail.com",
    age: 22,
    location: "Delhi",
    verified: false,
    joinDate: "2024-01-20",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "3",
    name: "Sneha Patel",
    email: "sneha@gmail.com",
    age: 26,
    location: "Bangalore",
    verified: true,
    joinDate: "2024-01-18",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  }
];

const mockMatches = [
  {
    id: "1",
    user1: "Priya Sharma",
    user2: "Ananya Gupta",
    score: 92,
    status: "active",
    createdAt: "2024-01-22"
  },
  {
    id: "2",
    user1: "Sneha Patel",
    user2: "Priya Sharma",
    score: 87,
    status: "pending",
    createdAt: "2024-01-23"
  }
];

export const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-primary-glow p-6">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, matches, and room assignments</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                <AnimatedCounter from={0} to={mockStats.totalUsers} />
              </div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Matches</CardTitle>
              <Heart className="h-4 w-4 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-500">
                <AnimatedCounter from={0} to={mockStats.activeMatches} />
              </div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rooms Assigned</CardTitle>
              <Home className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                <AnimatedCounter from={0} to={mockStats.roomsAssigned} />
              </div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <XCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                <AnimatedCounter from={0} to={mockStats.pendingVerifications} />
              </div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants}>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/10">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { action: "New user registered", user: "Priya Sharma", time: "2 hours ago" },
                      { action: "Match created", user: "Ananya & Sneha", time: "4 hours ago" },
                      { action: "Room assigned", user: "Priya Sharma", time: "6 hours ago" }
                    ].map((activity, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-primary/5"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.user}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/10">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Review Pending Verifications
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      View Support Tickets
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Home className="w-4 h-4 mr-2" />
                      Manage Room Inventory
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              {/* Search and Filter */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Users Table */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/10">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers.map((user, i) => (
                      <motion.div
                        key={user.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={user.photo} alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{user.name}</h3>
                              {user.verified ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-orange-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.location} • Age {user.age} • Joined {user.joinDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="matches" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/10">
                <CardHeader>
                  <CardTitle>Match Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMatches.map((match, i) => (
                      <motion.div
                        key={match.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-primary/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-pink-500" />
                            <span className="font-semibold text-2xl text-pink-500">{match.score}%</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{match.user1} ↔ {match.user2}</h3>
                            <p className="text-sm text-muted-foreground">Created {match.createdAt}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={match.status === 'active' ? 'default' : 'secondary'}>
                            {match.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rooms" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/10">
                <CardHeader>
                  <CardTitle>Room Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Room management features coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
};