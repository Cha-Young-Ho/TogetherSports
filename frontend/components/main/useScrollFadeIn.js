import { useCallback, useEffect, useRef } from "react";

const useScrollFadeIn = (direction, duration, delay) => {
  const element = useRef();

  // 상하좌우 중 원하는 위치에 숨겨놓기
  const handleDirection = (dir) => {
    switch (dir) {
      case "up":
        return "translate3d(0, 50%, 0";
      case "down":
        return "translate3d(0, -50%, 0)";
      case "left":
        return "translate3d(50%, 0, 0";
      case "right":
        return "translate3d(-50%, 0, 0)";
      default:
        return;
    }
  };

  // 트리거가 발생하면 fadein animation 발생
  const handleScroll = useCallback(
    ([entry]) => {
      const { current } = element;

      if (entry.isIntersecting) {
        current.style.transitionProperty = "all";
        current.style.transitionDuration = `${duration}s`;
        current.style.transitionTimingFunction = "cubic-bezier(0,0,0.2,1)";
        current.style.transitionDelay = `${delay}s`;
        current.style.opacity = 1;
        current.style.transform = "translate3d(0,0,0)";
      }
    },
    [delay, duration]
  );

  useEffect(() => {
    let observer;
    const { current } = element;

    // threshold : element가 어느정도 노출되었을 때 이벤트를 실행할 것인지 (ex. 0.7 : 70% 노출되었을 때 실행)
    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.3 });
      observer.observe(current);
    }

    return () => observer && observer.disconnect();
  }, [handleScroll]);

  return {
    ref: element,
    // element가 상하좌우 중 어디서 튀어나올건지 결정
    style: {
      opacity: 0,
      transform: handleDirection(direction),
    },
  };
};

export default useScrollFadeIn;
