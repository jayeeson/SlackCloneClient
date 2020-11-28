import React, { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';

export interface DividerProps {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  widthRef: React.RefObject<HTMLElement>;
  minWidth?: number;
  maxWidth?: number;
  openLeft?: boolean;
  storeLocal?: string;
}

const Divider = ({ width, setWidth, widthRef, minWidth, maxWidth, openLeft = false, storeLocal }: DividerProps) => {
  const [dragStartClientStartPos, setDragStartClientStartPos] = useState(0);
  const [dragStartElementWidth, setDragStartElementWidth] = useState(width);
  const [] = useState();
  const [resizeEvent, setResizeEvent] = useState(false);

  console.log('storelocal:', storeLocal, 'width', width);

  useLayoutEffect(() => {
    console.log(widthRef.current);
    if (widthRef.current) {
      console.log('width', width);
      widthRef.current.style.flex = `0 0 ${width}px`;
    }
    if (storeLocal) {
      localStorage.setItem(storeLocal, width.toString());
    }
  }, [width, widthRef, storeLocal]);

  const onDividerDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragStartClientStartPos(e.clientX);
    setDragStartElementWidth(width);
    setResizeEvent(true);
  };

  const onDividerDrag = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      console.log('dragStartElementWidth', dragStartElementWidth);
      console.log('e.clientX', e.clientX);
      console.log('dragStartClientStartPos', dragStartClientStartPos);
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
