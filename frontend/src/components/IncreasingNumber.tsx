import { useEffect, useState } from "react";

interface IProps {
    until: number;
    loadTime?: number
}

export default function IncreasingNumber({ until, loadTime = 1000 }: IProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (until <= 0) return;

    const interval = 10;
    const increment = Math.ceil(until / (loadTime / interval)); 

    const intervalId = setInterval(() => {
      setCount(prev => {
        const nextValue = prev + increment;
        return nextValue >= until ? until : nextValue;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [until]);

  return (
      <code style={{fontSize: '4rem'}}>{count}</code>
  );
}
