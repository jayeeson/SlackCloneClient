import { useLayoutEffect, useState } from 'react';

const useMsgPanelWidth = (msgPanelRef: React.RefObject<HTMLDivElement>) => {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const setWidthCallback = () => {
      console.log(msgPanelRef.current?.getBoundingClientRect().width);
      // setWidth(msgPanelRef.current);
    };
    if (msgPanelRef) {
      window.addEventListener('resize', setWidthCallback);
      setWidthCallback();
    }
    return () => window.removeEventListener('resize', setWidthCallback);
  }, [msgPanelRef]);
  return width;
};

export default useMsgPanelWidth;
