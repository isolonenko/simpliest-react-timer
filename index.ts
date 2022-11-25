import { useCallback, useEffect, useState } from "react";

interface useTimerProps {
  expiryDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  difference: number;
}

const differenceInMilliseconds = (dateLeft: Date, dateRight: Date) => {
  return dateLeft.getTime() - dateRight.getTime();
};

export const useTimer = ({ expiryDate }: useTimerProps): TimeLeft | null => {
  const calculateTimeLeft = useCallback(() => {
    const difference = differenceInMilliseconds(
      new Date(expiryDate),
      new Date()
    );
    let timeLeft = {} as TimeLeft;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        difference,
      };
    }

    return timeLeft;
  }, [expiryDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer =
      calculateTimeLeft().difference > 0 &&
      setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

    return () => timer && clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft.difference ? timeLeft : null;
};
