import React, { memo, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { debounce } from '../utils/debounce';

export interface DividerProps {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  minWidth?: number;
  maxWidth?: number;
  openLeft?: boolean;
  storeLocal?: string;
  display?: string;
}

const Divider = ({ width, setWidth, minWidth, maxWidth, openLeft = false, storeLocal, display }: DividerProps) => {
  const [dragStartClientStartPos, setDragStartClientStartPos] = useState(0);
  const [dragStartElementWidth, setDragStartElementWidth] = useState(width);
  const [debouncedWidth, setDebouncedWidth] = useState<number>(width);
  const [resizeEvent, setResizeEvent] = useState(false);

  console.log('storelocal:', storeLocal, 'width', width);

  useEffect(() => {
    debounce(() => {
      setDebouncedWidth(width);
    }, 5000);
  }, [width]);

  useEffect(() => {
    if (storeLocal && debouncedWidth > 0) {
      localStorage.setItem(storeLocal, debouncedWidth.toString());
    }
  }, [debouncedWidth, storeLocal]);

  const onDividerDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragStartClientStartPos(e.clientX);
    setDragStartElementWidth(width);
    setResizeEvent(true);
  };

  const onDividerDrag = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const desiredNewWidth = openLeft
        ? dragStartElementWidth - e.clientX + dragStartClientStartPos
        : dragStartElementWidth + e.clientX - dragStartClientStartPos;
      // max width to be based on media query
      // minWidth
      const newWidth =
        minWidth && desiredNewWidth < minWidth
          ? minWidth
          : maxWidth && desiredNewWidth > maxWidth
          ? maxWidth
          : desiredNewWidth;
      setWidth(newWidth);
    },
    [dragStartClientStartPos, dragStartElementWidth, maxWidth, minWidth, openLeft, setWidth]
  );

  const onSidebarDividerDragEnd = useCallback(() => {
    window.removeEventListener('mousemove', onDividerDrag);
    window.removeEventListener('mouseup', onSidebarDividerDragEnd);
    setResizeEvent(false);
  }, [onDividerDrag]);

  useEffect(() => {
    if (resizeEvent) {
      window.addEventListener('mousemove', onDividerDrag);
      window.addEventListener('mouseup', onSidebarDividerDragEnd);
    }
  }, [onDividerDrag, onSidebarDividerDragEnd, resizeEvent]);

  const style = {
    flex: '0 0 6px',
    backgroundColor: 'red',
    cursor: 'default',
    display: display || 'initial',
  };

  return (
    <React.Fragment>
      <div
        style={style}
        onMouseDown={onDividerDragStart}
        onMouseOver={e => (e.currentTarget.style.cursor = 'col-resize')}
      ></div>
    </React.Fragment>
  );
};
export default memo(Divider);
