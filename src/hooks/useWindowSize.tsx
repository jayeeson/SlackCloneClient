import { useLayoutEffect, useState } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState({ x: window.innerWidth, y: window.innerHeight });

  useLayoutEffect(() => {
    const setSizeCallback = () => {
      console.log('resize event detected');
      const newWindowSize = { x: window.innerWidth, y: window.innerHeight };
      if (newWindowSize.x > 0 && newWindowSize.y > 0 && (size.x !== newWindowSize.x || size.y !== newWindowSize.y)) {
        setSize(newWindowSize);
      }
    };
    // const onResizeTwo = () => {
    //   console.log('resize);
    // };
    // window.onresize = onResizeTwo;
    window.addEventListener('resize', setSizeCallback);
    setSizeCallback();
    return () => window.removeEventListener('resize', setSizeCallback);
  }, [size.x, size.y]);

  return size;
};

export default useWindowSize;
