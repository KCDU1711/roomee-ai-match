import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface SurveyProgressProps {
  currentStep: number;
  totalSteps: number;
  completedSteps?: number[];
}

export const SurveyProgress = ({ 
  currentStep, 
  totalSteps, 
  completedSteps = [] 
}: SurveyProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress bar */}
      <div className="relative h-2 bg-primary/20 rounded-full overflow-hidden mb-4">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = completedSteps.includes(stepNumber);
          const isCurrent = stepNumber === currentStep;
          const isPast = stepNumber < currentStep;

          return (
            <motion.div
              key={stepNumber}
              className={`
                relative flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-semibold
                ${isCurrent 
                  ? 'border-primary bg-primary text-primary-foreground' 
                  : isPast || isCompleted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-primary/30 bg-background text-muted-foreground'
                }
              `}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isCurrent ? 1.1 : 1, 
                opacity: 1 
              }}
              transition={{ 
                duration: 0.3,
                delay: i * 0.1 
              }}
            >
              {isCompleted || isPast ? (
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              ) : (
                stepNumber
              )}

              {/* Connecting line */}
              {i < totalSteps - 1 && (
                <div 
                  className={`
                    absolute left-full top-1/2 w-8 h-0.5 -translate-y-1/2
                    ${isPast ? 'bg-primary' : 'bg-primary/20'}
                  `}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Step text */}
      <motion.p 
        className="text-center text-sm text-muted-foreground mt-3"
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Step {currentStep} of {totalSteps}
      </motion.p>
    </div>
  );
};