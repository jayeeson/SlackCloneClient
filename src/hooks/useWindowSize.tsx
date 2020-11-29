import { useLayoutEffect, useState } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const setSizeCallback = () => {
      setSize({ x: window.innerWidth, y: window.innerHeight });
    };
    window.addEventListener('resize', setSizeCallback);
    setSizeCallback();
    return () => window.removeEventListener('resize', setSizeCallback);
  }, []);

  return size;
};

export default useWindowSize;
