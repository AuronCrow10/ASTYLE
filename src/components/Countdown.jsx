import { useState, useEffect } from "react";

const Countdown = ({ initialSeconds }) => {
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(true);

  if (loading && initialSeconds > 0) {
    setTime(initialSeconds);
    setLoading(false);
  }

  useEffect(() => {
    if (time > 0) {
      const timerId = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [time]);

  const formatTime = (time) => {
    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return <div>{formatTime(time)}</div>;
};

export default Countdown;
