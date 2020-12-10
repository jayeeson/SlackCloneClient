import { makeStyles } from '@material-ui/core';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { debounce } from '../utils/debounce';

export interface DividerProps {
  thisWidth: number;
  panelWidth: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  minWidth?: number;
  maxWidth?: number;
  openLeft?: boolean;
  storeLocal?: string;
  display?: string;
}

const useStyles = makeStyles({
  root: (props: any) => ({
    flex: `0 0 ${props.forceOddThisWidth}px`,
    cursor: 'default',
    display: props.display || 'initial',
    boxSizing: 'border-box',
  }),
  childInactive: (props: any) => ({
    alignItems: 'left',
    borderRight: '1px solid black',
    height: '100vh',
    width: props.childDivWidth,
  }),
  childActive: (props: any) => ({
    alignItems: 'left',
    borderRight: '5px solid #22D2D2',
    height: '100vh',
    width: props.childWidthOnHover,
  }),
});

const DraggableDivider = ({
  thisWidth,
  panelWidth,
  setWidth,
  minWidth,
  maxWidth,
  openLeft = false,
  storeLocal,
  display,
}: DividerProps) => {
  const [dragStartClientStartPos, setDragStartClientStartPos] = useState(0);
  const [dragStartElementWidth, setDragStartElementWidth] = useState(panelWidth);
  const [resizeEvent, setResizeEvent] = useState(false);
  const childDivRef = useRef<HTMLDivElement>(null);

  const forceOddThisWidth = thisWidth % 2 === 0 ? thisWidth + 1 : thisWidth;
  const childDivWidth = (forceOddThisWidth - 1) / 2 + 1;
  const childWidthOnHover = childDivWidth + 2;

  const classes = useStyles({ forceOddThisWidth, display, childDivWidth, childWidthOnHover });
  console.log('storelocal:', storeLocal, 'panelWidth', panelWidth);

  useEffect(() => {
    if (storeLocal) {
      console.log('panelWidth writing to strage', panelWidth);
      localStorage.setItem(storeLocal, panelWidth.toString());
    }
  }, [storeLocal, panelWidth]);

  const onDividerDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragStartClientStartPos(e.clientX);
    setDragStartElementWidth(panelWidth);
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

      if (childDivRef && childDivRef.current) {
        childDivRef.current.className = classes.childActive;
      }
    },
    [classes.childActive, dragStartClientStartPos, dragStartElementWidth, maxWidth, minWidth, openLeft, setWidth]
  );

  const onSidebarDividerDragEnd = useCallback(() => {
    window.removeEventListener('mousemove', onDividerDrag);
    window.removeEventListener('mouseup', onSidebarDividerDragEnd);
    setResizeEvent(false);
    if (childDivRef && childDivRef.current) {
      childDivRef.current.className = classes.childInactive;
    }
  }, [onDividerDrag]);

  const onMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.currentTarget.style.cursor = 'col-resize';
    if (childDivRef && childDivRef.current) {
      childDivRef.current.className = classes.childActive;
    }
  };

  const onMouseOut = () => {
    if (childDivRef && childDivRef.current) {
      childDivRef.current.className = classes.childInactive;
    }
  };

  useEffect(() => {
    if (resizeEvent) {
      window.addEventListener('mousemove', onDividerDrag);
      window.addEventListener('mouseup', onSidebarDividerDragEnd);
    }
  }, [onDividerDrag, onSidebarDividerDragEnd, resizeEvent]);

  return (
    <React.Fragment>
      <div className={classes.root} onMouseDown={onDividerDragStart} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <div ref={childDivRef} className={classes.childInactive}></div>
      </div>
    </React.Fragment>
  );
};
export default memo(DraggableDivider);
