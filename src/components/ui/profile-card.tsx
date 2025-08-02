import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Briefcase, Heart, MessageCircle, Star } from "lucide-react";

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    location: string;
    occupation?: string;
    bio?: string;
    photo?: string;
    matchScore?: number;
    interests?: string[];
  };
  onLike?: () => void;
  onMessage?: () => void;
  className?: string;
  index?: number;
}

export const ProfileCard = ({ 
  profile, 
  onLike, 
  onMessage, 
  className = "",
  index = 0 
}: ProfileCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 border-green-200 bg-green-50";
    if (score >= 80) return "text-yellow-600 border-yellow-200 bg-yellow-50";
    return "text-orange-600 border-orange-200 bg-orange-50";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
        {/* Profile Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={profile.photo || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face"}
            alt={profile.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Match Score Badge */}
          {profile.matchScore && (
            <motion.div
              className={`absolute top-3 right-3 px-2 py-1 rounded-full border text-xs font-semibold ${getScoreColor(profile.matchScore)}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {profile.matchScore}% Match
            </motion.div>
          )}

          {/* Floating hearts on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Heart className="w-8 h-8 text-white drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </div>

        {/* Profile Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-foreground">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">Age {profile.age}</p>
            </div>
            <Avatar className="w-12 h-12 border-2 border-primary/20">
              <AvatarImage src={profile.photo} alt={profile.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Location & Occupation */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{profile.location}</span>
            </div>
            {profile.occupation && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="w-4 h-4 text-primary" />
                <span>{profile.occupation}</span>
              </div>
            )}
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              "{profile.bio}"
            </p>
          )}

          {/* Interests */}
          {profile.interests && profile.interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.interests.slice(0, 3).map((interest, i) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Badge variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                </motion.div>
              ))}
              {profile.interests.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{profile.interests.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={onLike}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart className="w-4 h-4" />
              Like
            </motion.button>
            <motion.button
              onClick={onMessage}
              className="flex-1 bg-white border-2 border-primary text-primary py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-4 h-4" />
              Chat
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};