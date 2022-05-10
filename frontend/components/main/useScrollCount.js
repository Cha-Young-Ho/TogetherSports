import { useCallback, useEffect, useRef } from "react";

const UseScrollCount = (end, start = 0, duration = 3000) => {
  const element = useRef();
  const stepTime = Math.abs(Math.floor(duration / (end - start)));

  const handleScroll = useCallback(([entry]) => {
    const { current } = element;

    if (entry.isIntersecting) {
      let currentNumber = start;
      const counter = setInterval(() => {
        currentNumber += 1;

        if (currentNumber === end) {
          clearInterval(counter);
        }
      }, stepTime);
    }
  }, []);

  useEffect(() => {
    let observer;
    const { current } = element;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.5 });
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return {
    ref: element,
  };
};

export default UseScrollCount;
