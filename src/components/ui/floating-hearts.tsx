import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface FloatingHeartsProps {
  trigger?: boolean;
  count?: number;
}

export const FloatingHearts = ({ trigger = false, count = 8 }: FloatingHeartsProps) => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    if (trigger) {
      const newHearts = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        size: Math.random() * 20 + 15,
        color: ['text-pink-400', 'text-red-400', 'text-purple-400'][Math.floor(Math.random() * 3)]
      }));

      setHearts(prev => [...prev, ...newHearts]);

      // Clean up hearts after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => !newHearts.includes(heart)));
      }, 4000);
    }
  }, [trigger, count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className={`absolute ${heart.color}`}
            style={{
              left: heart.x,
              top: heart.y,
              fontSize: heart.size
            }}
            initial={{ 
              y: window.innerHeight + 50,
              opacity: 0,
              scale: 0,
              rotate: 0
            }}
            animate={{ 
              y: -100,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              rotate: 360,
              x: heart.x + (Math.random() - 0.5) * 200
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 4,
              ease: "easeOut"
            }}
          >
            <Heart className="w-full h-full fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};