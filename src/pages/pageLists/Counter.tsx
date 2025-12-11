import { useEffect, useState, useRef } from "react";

export default function Counter({ to = 100, duration = 1500 }) {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Start animation
          let start = 0;
          const end = to as number;
          const incrementTime = 15;
          const totalSteps = duration / incrementTime;
          const increment = end / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              start = end;
              clearInterval(timer);
            }
            setValue(Math.floor(start));
          }, incrementTime);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, duration, hasAnimated]);

  return <span ref={ref}>{value}</span>;
}
