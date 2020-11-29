import { useEffect, useLayoutEffect, useState } from 'react';

const useMsgPanelWidth = (setMsgPanelWidth: React.Dispatch<React.SetStateAction<number>>) => {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const setWidthCallback = () => {
      const domWidth = document.getElementById('msgPanel')?.getBoundingClientRect().width;
      if (domWidth) {
        setWidth(domWidth);
      }
    };
    window.addEventListener('resize', setWidthCallback);
    setWidthCallback();
    return () => window.removeEventListener('resize', setWidthCallback);
  }, []);

  useEffect(() => {
    setMsgPanelWidth(width);
  }, [setMsgPanelWidth, width]);

  return width;
};

export default useMsgPanelWidth;
