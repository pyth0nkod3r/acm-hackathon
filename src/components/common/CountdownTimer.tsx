import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

export const CountdownTimer = ({
  targetDate,
  className = '',
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(prev => {
          // Prevent state update if the values are identical to avoid unnecessary re-renders
          if (
            prev.days === days &&
            prev.hours === hours &&
            prev.minutes === minutes &&
            prev.seconds === seconds
          ) {
            return prev;
          }
          return { days, hours, minutes, seconds };
        });
      } else {
        setTimeLeft(prev => {
          if (
            prev.days === 0 &&
            prev.hours === 0 &&
            prev.minutes === 0 &&
            prev.seconds === 0
          ) {
            return prev;
          }
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className={`flex gap-4 justify-center ${className}`}>
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
            <div className="text-2xl md:text-3xl font-bold text-white">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-white/80 uppercase tracking-wide">
              {unit.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
