import { useCallback, useEffect, useRef, useState } from "react";

const useCountdown = (initialSeconds) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const intervalRef = useRef(null);

  const startCountdown = useCallback(() => {
    if (timeLeft > 0 && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
  }, [timeLeft]);

  const resetCountdown = useCallback(
    (newSeconds = initialSeconds) => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimeLeft(newSeconds);
    },
    [initialSeconds]
  );

  // When the countdown reaches 0, clear the countdown interval
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [timeLeft]);

  // Clear interval when component unmounts
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { timeLeft, startCountdown, resetCountdown };
};

export default useCountdown;
