import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

interface MatchScoreRevealProps {
  score: number;
  onComplete?: () => void;
  className?: string;
}

export const MatchScoreReveal = ({ score, onComplete, className }: MatchScoreRevealProps) => {
  const [currentScore, setCurrentScore] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(true);
      
      // Animate score counting
      let start = 0;
      const increment = score / 50; // 50 steps
      const scoreTimer = setInterval(() => {
        start += increment;
        if (start >= score) {
          setCurrentScore(score);
          setIsComplete(true);
          clearInterval(scoreTimer);
          onComplete?.();
        } else {
          setCurrentScore(Math.floor(start));
        }
      }, 40);

      return () => clearInterval(scoreTimer);
    }, 500);

    return () => clearTimeout(timer);
  }, [score, onComplete]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-yellow-500";
    if (score >= 70) return "text-orange-500";
    return "text-red-500";
  };

  const particles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Animated particles */}
      <AnimatePresence>
        {showParticles && (
          <>
            {particles.map((i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  scale: 0, 
                  rotate: 0,
                  x: 0,
                  y: 0
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  rotate: 360,
                  x: Math.cos((i * 30) * Math.PI / 180) * 100,
                  y: Math.sin((i * 30) * Math.PI / 180) * 100,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              >
                {i % 3 === 0 ? (
                  <Heart className="w-4 h-4 text-pink-400" />
                ) : i % 3 === 1 ? (
                  <Sparkles className="w-4 h-4 text-purple-400" />
                ) : (
                  <Star className="w-4 h-4 text-yellow-400" />
                )}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Score circle */}
      <motion.div
        className="relative w-32 h-32"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 1,
          ease: "easeOut",
          type: "spring",
          stiffness: 100
        }}
      >
        {/* Background circle */}
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="56"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: currentScore / 100 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              strokeDasharray: "351.86", // 2 * π * 56
              strokeDashoffset: 351.86 * (1 - currentScore / 100)
            }}
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              className={`text-3xl font-bold ${getScoreColor(currentScore)}`}
              animate={isComplete ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {currentScore}%
            </motion.div>
            <div className="text-xs text-muted-foreground font-medium">Match</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};